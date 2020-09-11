'use strict';

function addSpacesInPascalCaseString(string) {
    string = string.replace(/([a-z])([A-Z])/g, '$1 $2');
    // console.log(string)
    string = string.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    // console.log(string)
    return string;
}

exports.addSpacesInPascalCaseString = addSpacesInPascalCaseString;