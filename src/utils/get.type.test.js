/**
 * @file test the get.type file 
 */
import {
    getType
} from './get.type';
describe('getType', () => {
    const a = {
        a: 0,
        b: 1,
        c: 2
    };
    const b = [1, 2, 3];
    const c = {};
    const d = [];
    const e = () =>  'isfunction'
    
    test('type of object with elements to return Object', () => {
        expect(getType(a)).toEqual('Object');
    })
    test('type of array with elements to return Array', () => {
        expect(getType(b)).toEqual('Array');
    })
    test('type of object without elements to return Object', () => {
        expect(getType(c)).toEqual('Object')
    })
    test('type of array without elements to return Array', () => {
        expect(getType(d)).toEqual('Array');
    })
    // test('type of function  return function', () => {
    //     expect(getType(e)).toEqual('function');
    // })
})