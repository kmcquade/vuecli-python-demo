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

exports.addSpacesInPascalCaseString = addSpacesInPascalCaseString;
exports.removeDuplicatesFromArray = removeDuplicatesFromArray;