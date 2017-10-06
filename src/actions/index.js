import axios from 'axios';
import moment from 'moment';
import Guid from 'guid'
import { SAVE_WEATHER, TOGGLE_CURRENT } from './types';

const API_KEY = 'f3116ef35f462c1098abe2b7eb1b971d';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/group?id=4671654,4726206&units=imperial&appid=${API_KEY}`;

export function getCurrentWeather() {
  return (dispatch, getState) => {
    //check state and only get weather from api if no weather for today is stored
    //console.log("state", getState());
    const today = moment().format("l");
    const todayTemps = getState().weather.temperatures.find( temperature => {
      return temperature.date === today;
    });

    if (!todayTemps) {
      //no temps in store for today
      const request = axios.get(ROOT_URL).then( response => {
        let payload = {};

        response.data.list.map( data => {
          const newCity = {
            id: data.id,
            name: data.name,
            country: data.sys.country
          }
          //only add city to payload if it doesn't exist in store
          const cityExists = getState().weather.cities.find( city => {
            return city.id === newCity.id;
          });
          if (!cityExists) {
            payload.city = newCity;
          }

          const temperature = {
            id: Guid.create(),
            cityId: data.id,
            high: data.main.temp_max,
            low: data.main.temp_min,
            date: moment.unix(data.dt).format("l")
          }
          payload.temperature = temperature;

          dispatch({
            payload,
            type: SAVE_WEATHER
          });
        });
      });
    }
  }
}

export function toggleCurrent() {
  return {
    type: TOGGLE_CURRENT
  }
}
