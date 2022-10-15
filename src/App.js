import React, {Component} from 'react';
import EventList from './EventList';
import CitySearch from './CitySearch';
import './App.css';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from "./mock-data";
import { extractLocations } from './api';

class App extends Component {
  state = {
    events: mockData,
    locations: extractLocations(mockData),
  }

  
  


  render() {
  return (
    <div className="App">
      <CitySearch locations={this.state.locations} />
      <NumberOfEvents />
      <EventList events={this.state.events}/>
    </div>
  );
}
}

export default App;
