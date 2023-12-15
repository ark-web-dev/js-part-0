// Types
type TypesJS = object | string | number | boolean | null | undefined | bigint | Symbol;

// Test utils

const testBlock = (name: string) => {
    console.groupEnd();
    console.group(`# ${name}\n`);
};

const areEqual = (a: TypesJS, b: TypesJS) => {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (!areEqual(a[i], b[i])) {
                return false;
            }
        }

        return true;
    }

    return a === b;
    // Compare arrays of primitives
    // Remember: [] !== []
};

const test = (whatWeTest: string, actualResult: TypesJS, expectedResult: TypesJS) => {
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

// Functions

const getType = (value: TypesJS) => {
    // Return string with a native JS type of value
    return typeof value;
};

const getTypesOfItems = (arr: TypesJS[]) => {
    // Return array with types of items of given array
    return arr.map((item) => typeof item);
};

const allItemsHaveTheSameType = (arr: TypesJS[]) => {
    // Return true if all items of array have the same type
    return arr.every((item) => typeof item === typeof arr[0]);
};

const getRealType = (value: TypesJS | unknown) => {
    // Return string with a “real” type of value.
    // For example:
    //     typeof new Date()       // 'object'
    //     getRealType(new Date()) // 'date'
    //     typeof NaN              // 'number'
    //     getRealType(NaN)        // 'NaN'
    // Use typeof, instanceof and some magic. It's enough to have
    // 12-13 unique types but you can find out in JS even more :)
    const valueType = typeof value;

    if (Number.isNaN(value)) return 'NaN';

    if (valueType === 'number' && !Number.isFinite(value)) return 'Infinity';

    if (valueType === 'number' && !Number.isFinite(value)) return 'Infinity';

    if (valueType === 'object') {
        if (value === null) return 'null';
        if (value instanceof RegExp) return 'regexp';
        if (value instanceof Array) return 'array';
        if (value instanceof Map) return 'map';
        if (value instanceof Set) return 'set';
        if (value instanceof Date) return 'date';
    }

    return valueType;
};

const getRealTypesOfItems = (arr: TypesJS[]) => {
    // Return array with real types of items of given array
    return arr.map((item) => getRealType(item));
};

const everyItemHasAUniqueRealType = (arr: TypesJS[]) => {
    // Return true if there are no items in array
    // with the same real type
    const realTypesSet = new Set(getRealTypesOfItems(arr));

    return realTypesSet.size === arr.length;
};

const countRealTypes = (arr: TypesJS[]) => {
    // Return an array of arrays with a type and count of items
    // with this type in the input array, sorted by type.
    // Like an Object.entries() result: [['boolean', 3], ['string', 5]]
    type IStorage = {
        [key: string]: number;
    };

    const storage: IStorage = {};

    for (const item of arr) {
        const realType: string = getRealType(item);

        storage[realType] = (storage[realType] || 0) + 1;
    }

    return Object.entries(storage).sort((a, b) => a[0].localeCompare(b[0]));
};

// Tests

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

test(
    'All values are strings but wait',
    allItemsHaveTheSameType(['11', new String('12'), '13'])
    // What the result?
);

test(
    'Values like a number',
    allItemsHaveTheSameType([123, 123 / 'a', 1 / 0])
    // What the result?
);

test('Values like an object', allItemsHaveTheSameType([{}]), true);

testBlock('getTypesOfItems VS getRealTypesOfItems');

const knownTypes = [
    // Add values of different types like boolean, object, date, NaN and so on
];

test('Check basic types', getTypesOfItems(knownTypes), [
    // What the types?
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
    // What else?
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

// Add several positive and negative tests
