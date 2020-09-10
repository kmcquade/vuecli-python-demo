var otherUtil = require('./../util/other')

let mocha = require('mocha');
let chai = require('chai');
let it = mocha.it;

it("other.addSpacesInPascalCaseString: should insert spaces before capital letters in a PascalCase string", function () {
    var result = otherUtil.addSpacesInPascalCaseString("DataExfiltration");
    var expectedResult = "Data Exfiltration"
    chai.assert(result === expectedResult);
    console.log(`Should equal Data Exfiltration: ${result}`);
});