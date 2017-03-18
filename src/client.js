import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IndexRoute, Route, Router, browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { useBasename } from 'history';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

import config from './config';
const client = new ApiClient();

const _browserHistory = useBasename(() => browserHistory)({
  basename: config.app.BaseName || '/'
});

const dest = document.getElementById('app');
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const component = (
  <Router render={(props) => <ReduxAsyncConnect {...props} helpers={{ client }}
    filter={item => !item.deferred} />} history={hashHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);


// if (process.env.NODE_ENV !== 'production') {
//   window.React = React; // enable debugger

//   if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
//     console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
//   }
// }