// var expect = require('chai').expect;
var groups = require('./../util/groups')

let mocha = require('mocha');
let chai = require('chai');
const fs = require('fs');
let it = mocha.it;

let rawData = fs.readFileSync(__dirname + '/../test-example.json', 'utf8');
let iam_data = JSON.parse(rawData);


it("groups.getGroupNames: should return list of group names", function () {
    var result = groups.getGroupNames(iam_data);
    var expectedResult = ["admin"];
    chai.assert(result != null);
    chai.assert(result, expectedResult);
    console.log(`Should be only ["admin"]: ${JSON.stringify(result)}`);
});

it("groups.getGroupMembers: should a list of users that are a member of this group", function () {
    var result = groups.getGroupMembers(iam_data, "admin");
    var expectedResult = ["obama", "userwithlotsofpermissions"];
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult)
    console.log(`Should be ["obama", "userwithlotsofpermissions"] : ${JSON.stringify(result)}`);
});