import React, { Component } from 'react';

class NumberOfEvents extends Component {
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ 
            numOfEvents: value
        });
    };
    state = { numOfEvents: 32 };
    render(){
        return(
            <div className="NumberOfEvents">
                <input type="number" className="numberofevents" 
                value={this.state.numOfEvents}
                onChange={this.handleInputChanged}/>
            </div>
        )
    }
}
export default NumberOfEvents;
