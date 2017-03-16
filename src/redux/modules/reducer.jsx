import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

// import Common from './reduxCommon';                                // 通用

import { reducer as form } from 'redux-form';
export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect, form
});
