import React, {Component} from 'react';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import './App.css';
// import { mockData } from "./mock-data";
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { OfflineAlert } from './Alert';
import EventGenre from './EventGenre';
import { extractLocations, getEvents,checkToken, getAccessToken} from './api';
import 'bootstrap/dist/css/bootstrap.css';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');

    if (window.location.hostname.includes("localhost")) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ 
            events, 
            locations: extractLocations(events),
            showWelcomeScreen: false, 
          });
        }
      });
      return;
    }
    const isTokenValid = (await checkToken(accessToken)).error ? false :true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
    // Navigation
    if (!navigator.onLine) {
      this.setState({
        warningText:
          "It looks like you're not connected to the internet. Data was loaded from the cache.",
      });
    } else {
      this.setState({
        warningText: '',
      });
    }
  }
    componentWillUnmount(){
      this.mounted = false;
    }

    updateEvents = (location, eventCount) => {
      const { numberOfEvents } = this.state;
      if (location === undefined) location = this.state.selectedLocation; // if the user change number of events
      eventCount = eventCount === undefined ? numberOfEvents : eventCount; // if the user change the location

      getEvents().then((events) => {
        console.log(location, eventCount)

        const locationEvents = (location === 'all') ?
          events.slice(0, eventCount) : // Slice by eventCount, so that it is considered (atleast the default)
          events.filter((event) => event.location === location);

          this.setState({
            events: locationEvents,
            selectedLocation: location,
            numberOfEvents: eventCount,
        });
      });
    }

    getData = () => {
      const {locations, events} = this.state;
      const data = locations.map((location)=> {
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift()
        return {city, number};
      })
      return data;
    };
    render() {
      const { locations, numberOfEvents,events } = this.state;
      // if (this.state.showWelcomeScreen === undefined) 
      return (
        <div className="App">
          <h1>Meet App</h1>
          <OfflineAlert text={this.state.warningText} />
          <h4>Choose your nearest city</h4>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents updateEvents={this.updateEvents} 
            numOfEvents={numberOfEvents}/>
          <h4>Events in each city</h4>
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#0e0b0c" />
            </ScatterChart>
          </ResponsiveContainer>
          <EventList events={events} updateEvents={this.updateEvents} 
          numberOfEvents={this.state.numberOfEvents}/>
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
            getAccessToken={() => { getAccessToken() }} />
        </div>  
      );
    }
  }
  export default App;
