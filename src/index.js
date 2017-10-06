import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import localForage from 'localForage';

import App from './components/app';
import CurrentWeather from './components/weather_current';
import HistoricalWeather from './components/weather_historical';
import reducers from './reducers';

const middlewares = [
  thunk
];

const enhancers = [
  applyMiddleware(...middlewares),
  autoRehydrate({log: true})
];

const store = createStore( reducers, undefined, compose(...enhancers) );
//persist redux store to localforage
persistStore(store, {storage: localForage});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={CurrentWeather} />
        <Route path="historical" component={HistoricalWeather} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
