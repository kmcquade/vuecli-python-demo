var principals = require('./../util/principals')

let mocha = require('mocha');
let chai = require('chai');
let it = mocha.it;
const fs = require('fs');

let rawData = fs.readFileSync(__dirname + '/../test-example.json', 'utf8');
let iam_data = JSON.parse(rawData);

it("principals.getPrincipalPolicies: should return Inline policies with principal", function () {
    var result = principals.getPrincipalPolicies(iam_data, "admin", "Group", "Inline");
    var expectedResult = [ '0e1bd3995cfe6cfbbac133f1406839e6b415e5b5a412cd148ac78071d82e5b1b' ]
    // chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult);
    console.log(`Should return inline policy ID [ '0e1bd3995cfe6cfbbac133f1406839e6b415e5b5a412cd148ac78071d82e5b1b' ] associated with group admin: ${JSON.stringify(result)}`);
});


it("principals.getRiskAssociatedWithPrincipal: should return risks associated with principal", function () {
    var result = principals.getRiskAssociatedWithPrincipal(iam_data, "admin", "Group", "ResourceExposure");
    var expectedResult = [
        "s3:BypassGovernanceRetention",
        "s3:DeleteAccessPointPolicy",
        "s3:DeleteBucketPolicy",
        "s3:ObjectOwnerOverrideToBucketOwner",
        "s3:PutAccessPointPolicy",
        "s3:PutAccountPublicAccessBlock",
        "s3:PutBucketAcl",
        "s3:PutBucketPolicy",
        "s3:PutBucketPublicAccessBlock",
        "s3:PutObjectAcl",
        "s3:PutObjectVersionAcl"
    ]
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult);
    console.log(`ResourceExposure risks associated with principal: ${JSON.stringify(result)}`);
});
