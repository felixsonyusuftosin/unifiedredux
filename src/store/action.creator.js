/**
 * @file define actionCreators for hwew
 */

// local imports

import {
    actionDictionary
} from './action.dictionary';
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
 * @function a generic action creator 
 * @param { string } dictKey - the actionDictionary key that is being called 
 * @param { ActionFunctionType } the parameter passed could either be 
 * */
export const dispatchActions = (dictKey, eventAction) => {
    const actions = callActionType(dictKey);
    return async (dispatch) => {
        dispatch(actions.request());
        const {
            func,
            value
        } = eventAction;
        if (!func && !value || !dictKey) {
            dispatch(actions.fail('Sorry you didnt provide the full parameters required for loading this action'));
            return false;
        } else {
            // Check if eventAction type 
            if (func) {
                // Run block if func is promiselike  
                try {
                    func()
                        .then((resolved) => {
                            try {
                                resolved.json().then((data) => {
                                    dispatch(actions.recieve(data));
                                }).catch((err) => {
                                    dispatch(actions.recieve(resolved));
                                });
                            } catch (err) {
                                dispatch(actions.recieve(resolved));
                            }
                            // return;
                        })
                        .catch((err) => {
                            dispatch(actions.fail(err));
                            return;
                        });
                } catch (err) {
                    // func is no promiselike 
                    try {
                        dispatch(actions.recieve(func()));
                        return;
                    } catch (err) {
                        dispatch(actions.fail(err));
                        return;
                    }
                }
            } else {
                dispatch(actions.recieve(value));
                return;
            }
            return;
        }
    }
};