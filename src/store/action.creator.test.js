/**
 * @file tests for action creator and the dispatcher 
 */

import configureMockStore from "redux-mock-store";
import {
    dispatchActions
} from './action.creator';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';

// constants 
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const REQUEST = 'REQUEST_TEST_STORE';
const RECIEVE = 'RECIEVE_TEST_STORE';
const FAIL = 'FAIL_TEST_STORE';

// test suites 
describe('async actions ', () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it(' creates a default action RECIEVE_TEST_STORE when test store is done ', () => {
        fetchMock.getOnce('/todos', {
            body: {
                testItems: ['Hey i am an item in the test ']
            }
        })
        const expectedActions = [{
                type: REQUEST,
                fetching: true,
                payload: null
            },
            {
                type: RECIEVE,
                fetching: false,
                payload: {
                    testItems: ['Hey i am an item in the test ']

                }
            }
        ]
        const store = mockStore({
            testStore: {}
        })
        const fetchSomeTest = () => fetch('/todos');
        return store.dispatch(dispatchActions('TEST_STORE', fetchSomeTest)).then((v) => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
describe('synchronous actions ', () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it(' creates a default action RECIEVE_TEST_STORE when test store is done ', () => {
        const payloadItems = {
            testItems: ['Hey i am an item in the test ']
        }
        const expectedActions = {
            type: RECIEVE,
            fetching: false,
            payload: {
                testItems: ['Hey i am an item in the test ']

            }
        }
        expect(dispatchActions('TEST_STORE', payloadItems, false)).toEqual(expectedActions)
    })
})

describe('synchronous actions with parameter functions ', () => {
    afterEach(() => {
        fetchMock.restore();
    })
    it(' creates a default action RECIEVE_TEST_STORE when test store is done ', () => {
        const payloadItems = (item) => item;
        const item = {
            testItems: ['Hey i am an item in the test ']
        };
        const expectedActions = {
            type: RECIEVE,
            fetching: false,
            payload: {
                testItems: ['Hey i am an item in the test ']

            }
        }
        expect(dispatchActions('TEST_STORE', payloadItems, false, [item])).toEqual(expectedActions)
    })
})