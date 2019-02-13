/**
 * @file define actionCreators for hwew
 */

// local imports
import {
    setUpActions
} from './setup.action';

/**
 * @function returnActionsAsync passes the appropriate async actions to the reducer 
 * @param { string } actionDictionaryKey
 */
export const returnActionsAsync = (actionDictionaryKey) => {
    const actionSet = setUpActions()[actionDictionaryKey];
    if (!actionSet) {
        throw new Error(`The dictKey ${ actionDictionaryKey } does not match any parameter of the actionDictionary object `);
    }
    // return appropriate action types 
    const returnSet = {
        request() {
            return {
                type: actionSet.request,
                fetching: true,
                payload: null
            };
        },
        recieve(data) {
            return {
                type: actionSet.recieve,
                fetching: false,
                payload: data
            };
        },
        fail(error) {
            return {
                type: actionSet.fail,
                fetching: false,
                payload: error
            };
        }
    };
    return returnSet;
};

/**
 * @function returnActionSync passes the appropriate synchronous action to the store 
 * @param  { Object } - value, to be passed to the reducer
 *  @param { string } - actionDictionaryKey
 */
const returnActionsSync = (value, actionDictionaryKey) => {
    return {
        recieve(value) {
            return {
                type: `RECIEVE_${actionDictionaryKey}`,
                fetching: false,
                payload: value
            }
        }
    }

}

/**
 * @function dispathActions dispatch actions to the the action creators 
 * @param { string } dictKey - the actionDictionary key that is being called 
 * @param { Object  } eventAction the action to pass to events could be a promise, function or an object
 * @param { boolean ?  }  asyncj  if request is asynchronous is it true otherwuse it is false 
 * @param { parameters ? } parameters array to call with parameters 
 * */
export const dispatchActions = (dictKey, eventAction, asynch = true, parameters = []) => {
    if (!dictKey || !eventAction) {
        throw new Error(' !invalid request didnt pass in adequate parameters ')
    }
    const actions = returnActionsAsync(dictKey);
    return async (dispatch) => {
        if (!asynch) {
            // call synchronous action creator
            // if event action is a function
            if (typeof eventAction === 'function') dispatch(returnActionsSync.recieve(eventAction.apply(this, parameters)));
            // event action  is an object
            else dispatch(actions(eventAction));
        } else {
            // request is asynchronous  
            // dispatch request state 
            dispatch(actions.request());
            const eventPromise =  eventAction.apply(parameters)
            return Promise.resolve(eventPromise).then((value) => {
                return value.json().then(v => {
                  return  dispatch(actions.recieve(v));
                })
            }).catch((err) => {
                return dispatch(actions.fail(err));
            })
        }
    }
};