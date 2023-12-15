'use strict';

const testBlock = (name) => {
    console.groupEnd();
    console.group(`# ${name}\n`);
};
const areEqual = (a, b) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!areEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
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
const getType = (value) => {
    return typeof value;
};
const getTypesOfItems = (arr) => {
    return arr.map((item) => typeof item);
};
const everyItemHasAUniqueType = (arr) => {
    const typesSet = new Set(getTypesOfItems(arr));
    return typesSet.size === arr.length;
};
const allItemsHaveTheSameType = (arr) => {
    return arr.every((item) => typeof item === typeof arr[0]);
};
const getRealType = (value) => {
    const valueType = typeof value;
    if (Number.isNaN(value)) {
        return 'NaN';
    }
    if (valueType === 'number' && !Number.isFinite(value)) {
        return 'Infinity';
    }
    if (valueType === 'number' && !Number.isFinite(value)) {
        return 'Infinity';
    }
    if (valueType === 'object') {
        if (value === null) {
            return 'null';
        }
        if (value instanceof RegExp) {
            return 'regexp';
        }
        if (value instanceof Array) {
            return 'array';
        }
        if (value instanceof Map) {
            return 'map';
        }
        if (value instanceof Set) {
            return 'set';
        }
        if (value instanceof Date) {
            return 'date';
        }
    }
    return valueType;
};
const getRealTypesOfItems = (arr) => {
    return arr.map((item) => getRealType(item));
};
const allItemsHaveTheSameRealType = (arr) => {
    const realTypesSet = getRealTypesOfItems(arr);
    return realTypesSet.every((item) => typeof item === typeof arr[0]);
};
const everyItemHasAUniqueRealType = (arr) => {
    const realTypesSet = new Set(getRealTypesOfItems(arr));
    return realTypesSet.size === arr.length;
};
const countRealTypes = (arr) => {
    const storage = {};
    for (const item of arr) {
        const realType = getRealType(item);
        storage[realType] = (storage[realType] || 0) + 1;
    }
    return Object.entries(storage).sort((a, b) => a[0].localeCompare(b[0]));
};
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
test('All values are strings but wait', allItemsHaveTheSameType(['11', new String('12'), '13']), false);
test('Values like a number', allItemsHaveTheSameType([123, 123 / Number('a'), 1 / 0]), true);
test('Values like an object', allItemsHaveTheSameType([{}]), true);
testBlock('getTypesOfItems VS getRealTypesOfItems');
const knownTypes = [
    true,
    1,
    'string',
    [],
    {},
    () => {},
    undefined,
    null,
    NaN,
    Infinity,
    new Date(),
    /a-z/gi,
    new Set(),
    new Map(),
    1n,
    Symbol('1'),
];
test('Check basic types', getTypesOfItems(knownTypes), [
    'boolean',
    'number',
    'string',
    'object',
    'object',
    'function',
    'undefined',
    'object',
    'number',
    'number',
    'object',
    'object',
    'object',
    'object',
    'bigint',
    'symbol',
]);
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
    'map',
    'bigint',
    'symbol',
]);
testBlock('everyItemHasAUniqueRealType');
test('All value types in the array are unique', everyItemHasAUniqueRealType([true, 123, '123']), true);
test('Two values have the same type', everyItemHasAUniqueRealType([true, 123, false]), false);
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
testBlock('everyItemHasAUniqueType');
test('All value types in the array are unique', everyItemHasAUniqueType([{}, undefined, 7]), true);
testBlock('allItemsHaveTheSameRealType');
test('All values are null', allItemsHaveTheSameRealType(['null', 'null', 'null']), true);
testBlock('empty arrays');
test('Empty array', getTypesOfItems([]), []);
test('Empty countRealTypes array', countRealTypes([]), []);
testBlock('custom "new" objects');
test('Type of new Date object', getType(new Date()), 'object');
test('Real Type of new Date object', getRealType(new Date()), 'date');
testBlock('mixed values');
test('Mixed strings and numbers', allItemsHaveTheSameType([1, '2', 3]), false);
test('Mixed strings and numbers (is Uniq)', everyItemHasAUniqueRealType([1, '2']), true);
test('Mixed objects and arrays (is Uniq)', everyItemHasAUniqueRealType([{}, []]), true);
// # sourceMappingURL=index.js.map
