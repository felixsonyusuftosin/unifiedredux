/**
 * @file define utility types for getting the inner tpyes of values 
 */

const ARRAY = 'Array';
const OBJECT = 'Object';

/**
 * @function getType  Determines the type of an item
 * @param { Any } obj value to check 
 * @return { string } 
 */
export const getType = (obj) => {
    if (obj.constructor == Array) {
        return ARRAY
    } else {
        const newObject = { ...obj
        };
        newObject[0] = 'test';
        if (newObject[0]) {
            return OBJECT;
        } else {
            return typeof obj;
        }
    }

}