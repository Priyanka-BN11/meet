import React, { Component } from 'react';
import {ErrorAlert} from './Alert.js';
class NumberOfEvents extends Component {
    state = { 
        numOfEvents: 32,
        errorText:''
     };
    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
        this.setState({ 
            numOfEvents: value,
            errorText: 'Enter number from 1 to 32',
        });
    }
    else {
        this.setState({
            numOfEvents: event.target.value,
            errorText: '',
          });
        }
        this.props.updateEvents(undefined, value);
    };
   
    render(){
        return(
            <div>
            <div className="NumberOfEvents">
                <input type="number" className="numberofevents" 
                value={this.state.numOfEvents} min="1"
                onChange={this.handleInputChanged}/>
            </div>
            <div>
            <ErrorAlert text={this.state.errorText} />
            </div>
            </div>
        )
    }
}
export default NumberOfEvents;
