import { SAVE_WEATHER, TOGGLE_CURRENT } from '../actions/types';

export default function(state = {current: true, cities: [], temperatures: []}, action) {
  switch (action.type) {
    case SAVE_WEATHER:
      return {
        ...state,
        cities: action.payload.city ? [ ...state.cities, action.payload.city ] : state.cities,
        temperatures: action.payload.temperature ? [ ...state.temperatures, action.payload.temperature ] : state.temperatures
      };
    case TOGGLE_CURRENT:
      return {
        ...state,
        current: !state.current
      };
    default:
      return state;
  }
};
