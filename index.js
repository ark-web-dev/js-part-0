'use strict';

const testBlock = (name) => {
    console.groupEnd();
    console.group(`# ${name}\n`);
};
const areEqual = (a, b) => {
    return a === b;
};
const test = (whatWeTest, actualResult, expectedResult) => {
    if (areEqual(actualResult, expectedResult)) {
        console.log(`[OK] ${whatWeTest}\n`);
    } else {
        console.error(`[FAIL] ${whatWeTest}`);
        console.debug('Expected:');
        console.debug(expectedResult);
        console.debug('Actual:');
        console.debug(actualResult);
        console.log('');
    }
};
const getType = (value) => {};
const getTypesOfItems = (arr) => {};
const allItemsHaveTheSameType = (arr) => {};
const getRealType = (value) => {};
const getRealTypesOfItems = (arr) => {};
const everyItemHasAUniqueRealType = (arr) => {};
const countRealTypes = (arr) => {};
testBlock('getType');
test('Boolean', getType(true), 'boolean');
test('Number', getType(123), 'number');
test('String', getType('whoo'), 'string');
test('Array', getType([]), 'object');
test('Object', getType({}), 'object');
test(
    'Function',
    getType(() => {}),
    'function'
);
test('Undefined', getType(undefined), 'undefined');
test('Null', getType(null), 'object');
testBlock('allItemsHaveTheSameType');
test('All values are numbers', allItemsHaveTheSameType([11, 12, 13]), true);
test('All values are strings', allItemsHaveTheSameType(['11', '12', '13']), true);
test('All values are strings but wait', allItemsHaveTheSameType(['11', new String('12'), '13']));
test('Values like a number', allItemsHaveTheSameType([123, 123 / 'a', 1 / 0]));
test('Values like an object', allItemsHaveTheSameType([{}]), true);
testBlock('getTypesOfItems VS getRealTypesOfItems');
const knownTypes = [];
test('Check basic types', getTypesOfItems(knownTypes), []);
test('Check real types', getRealTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'array',
    'object',
    'function',
    'undefined',
    'null',
    'NaN',
    'Infinity',
    'date',
    'regexp',
    'set',
]);
testBlock('everyItemHasAUniqueRealType');
test('All value types in the array are unique', everyItemHasAUniqueRealType([true, 123, '123']), true);
test('Two values have the same type', everyItemHasAUniqueRealType([true, 123, '123' === 123]), false);
test('There are no repeated types in knownTypes', everyItemHasAUniqueRealType(knownTypes), true);
testBlock('countRealTypes');
test('Count unique types of array items', countRealTypes([true, null, !null, !!null, {}]), [
    ['boolean', 3],
    ['null', 1],
    ['object', 1],
]);
test('Counted unique types are sorted', countRealTypes([{}, null, true, !null, !!null]), [
    ['boolean', 3],
    ['null', 1],
    ['object', 1],
]);
// # sourceMappingURL=index.js.map
