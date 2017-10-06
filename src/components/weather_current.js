import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.renderCity = this.renderCity.bind(this);
  }

  renderCity(city) {
    const today = moment().format("l");
    const temperature = this.props.weather.temperatures.find( temperature => {
      return temperature.cityId === city.id;
    });

    return (
      <tr key={city.id}>
        <td>{city.name}</td>
        <td>{temperature.high}</td>
        <td>{temperature.low}</td>
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

function mapStateToProps({weather}) {
  return { weather };
}

export default connect(mapStateToProps)(CurrentWeather);
