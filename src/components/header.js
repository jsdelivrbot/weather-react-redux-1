import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { toggleCurrent, getCurrentWeather } from '../actions/index';

class Header extends Component {

  constructor(props) {
    super(props);
    this.toggleCurrent = this.toggleCurrent.bind(this);
  }

  toggleCurrent() {
    this.props.toggleCurrent();
  }

  componentDidMount() {
    //wait a half a second to rehydrate state before initial load
    setTimeout( () => {
      console.log('initial load');
      this.props.getCurrentWeather();
    }, 500);
    //set an interval to fetch new weather data while page is loaded
    setInterval( () => {
      console.log('polling');
      this.props.getCurrentWeather();
    }, 86400000 ); //60 * 60 * 24 * 1000 -- milliseconds in one day
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <h1>Weather</h1>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={this.toggleCurrent}>Current</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/historical" onClick={this.toggleCurrent}>Historical</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({weather}) {
  return { weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleCurrent, getCurrentWeather}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
