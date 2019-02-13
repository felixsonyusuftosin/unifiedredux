/**
 * @file tests for action creator and the dispatcher 
 */

// third party imports 
import configureMockStore from "redux-mock-store";
// local imports 
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
    it(' creates a default action LOAD_TEST_STORE when test tore is done ', () => {
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