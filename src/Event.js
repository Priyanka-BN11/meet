import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
class Event extends Component {
    toggleEventDetails = () => {
        this.setState({ show: !this.state.show });
      };
      state = { show: false };
      render() {
        const { event } = this.props;
        return (
          <>
    
            <div className="event">
              <Row>
                <Col xl={12}>
              <h1 className="event-summary-title">{event.summary}</h1>
              <p className="event-info">
                {event.start.dateTime} {event.start.timeZone} {event.location}
              </p>
              {this.state.show && (
                <>
                  <h2 className="event-about-title">About event:</h2>
                  <p className="event-description">{event.description}</p>
                  <a
                    href={event.htmlLink}
                    target="_blank"
                    rel="noreferrer"
                    className="event-htmlLink"
                  >
                    See details on Google Calendar
                  </a>
                </>
              )}
              {!this.state.show ? (
                <Button
                  className="event-showDetails-btn details-btn"
                  onClick={this.toggleEventDetails}
                >
                  Show Details
                </Button>
              ) : (
                
                <Button
                  className="event-hideDetails-btn details-btn"
                  onClick={this.toggleEventDetails}
                >
                  Hide Details
                </Button>
              )}
              </Col>
              </Row>
            </div>
          </>
        );
      }
}
export default Event;