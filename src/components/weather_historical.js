import { connect } from 'react-redux';
import React, { Component } from 'react';
import Graph from './graph';

class HistoricalWeather extends Component {
  constructor(props) {
    super(props);
    this.renderCity = this.renderCity.bind(this);
  }

  renderCity(city) {
    const temperatures = this.props.weather.temperatures.filter( temperature => {
      return temperature.cityId === city.id;
    });

    const highs = temperatures.map(temperature => temperature.high);
    const lows = temperatures.map(temperature => temperature.low);

    return (
      <tr key={city.id}>
        <td>{city.name}</td>
        <td><Graph data={highs} color="red" units="degrees" /></td>
        <td><Graph data={lows} color="blue" units="degrees" /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather ? this.props.weather.cities.map(this.renderCity) : ''}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(HistoricalWeather);
