'use strict';

function addSpacesInPascalCaseString(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    // console.log(string)
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    // console.log(string)
    return string;
}

function removeDuplicatesFromArray(someArray) {
    let uniqueArray = [];
    someArray.forEach((c) => {
        if (!uniqueArray.includes(c)) {
            uniqueArray.push(c);
        }
    });
    return uniqueArray;
}

function compareValues(key, order = 'asc') {
    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  return function innerSort(a, b) {
      // eslint-disable-next-line no-prototype-builtins
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

exports.addSpacesInPascalCaseString = addSpacesInPascalCaseString;
exports.compareValues = compareValues;
exports.removeDuplicatesFromArray = removeDuplicatesFromArray;