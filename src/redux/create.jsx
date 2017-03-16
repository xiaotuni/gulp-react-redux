import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducer from './modules/reducer';
export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  const middleware = [createMiddleware(client), reduxRouterMiddleware];
  const finalCreateStore = compose(applyMiddleware(...middleware))(_createStore);
  // console.log(reducer);
  const store = finalCreateStore(reducer, data);

  return store;
}
