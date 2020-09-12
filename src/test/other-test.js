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

it("other.compareValues: array is sorted by band, in ascending order by default", function () {
    const singers = [
      { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
      { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
      { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
      { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
    ];

    const expectedResult = [
      { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
      { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
      { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
      { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 }
    ]

    var result = singers.sort(otherUtil.compareValues("name", "asc"));
    console.log(result)
    chai.assert.deepStrictEqual(result, expectedResult)

    // var expectedResult = "Data Exfiltration"
    // chai.assert(result === expectedResult);
    // console.log(`Should equal Data Exfiltration: ${result}`);
});