import React, {Component} from 'react';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import './App.css';
import { mockData } from "./mock-data";
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents} from './api';



class App extends Component {
  state = {
    events: [],
    locations: []
  }
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }
  componentDidMount(){
    this.mounted = true;
    getEvents().then((events) => {
      if(this.mounted){
      this.setState({events, locations: extractLocations(events)});
      }
    });
  }
  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
  return (
    <div className="App">
      <h1>Meet App</h1>
   <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
      <NumberOfEvents />
      <EventList events={this.state.events} size='6' sm='3'/>
    </div>
  );
}
}


export default App;
