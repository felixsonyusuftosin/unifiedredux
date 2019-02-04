/**
 * @file define functions that creates a generalised redux store 
 */

// third party imports 
import { applyMiddleware, combineReducers, createStore } from 'redux';

import logger from 'redux-logger';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

// local imports 

import { reducerObject } from "./reducers/action-config-reducers";
import thunk from "redux-thunk";
import { convertStringToCamelCase } from "../utils/string";

/**
 * @function updateReducersObject create
 */
const updateReducersObject = () => {
  const mergedReducers = {};
  const objectDict = reducerObject();
  Object.keys(objectDict).map(key => {
    mergedReducers[String(convertStringToCamelCase(key.toLocaleLowerCase()))] =
      objectDict[key];
    return mergedReducers;
  });
  return mergedReducers;
};

const allReducers = combineReducers({ ...updateReducersObject() });

const middlewares = [thunk, promise];

// Ensure the redux logger is not added in production.
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(allReducers, applyMiddleware(...middlewares));

export default store;