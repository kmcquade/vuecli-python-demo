var inlinePolicies = require('./../util/inline-policies')

let mocha = require('mocha');
let chai = require('chai');
let describe = mocha.describe;
const fs = require('fs');

let rawData = fs.readFileSync(__dirname + '/test-example.json', 'utf8');
let iam_data = JSON.parse(rawData);

it("should return Inline policy document object", function () {
    var result = inlinePolicies.getInlinePolicyDocument(iam_data, "0e1bd3995cfe6cfbbac133f1406839e6b415e5b5a412cd148ac78071d82e5b1b");
    var expectedResult = {
        "Version": "2012-10-17",
        "Statement": [{"Sid": "VisualEditor0", "Effect": "Allow", "Action": ["s3:*"], "Resource": "*"}]
    };
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult);
    console.log(`inline policy document: ${JSON.stringify(result)}`);
});

it("should identify list of services affected by the policy findings with no duplicates", function() {
    var result = inlinePolicies.getServicesAffectedByInlinePolicy(iam_data, "0e1bd3995cfe6cfbbac133f1406839e6b415e5b5a412cd148ac78071d82e5b1b")
    var expectedResult = [
        "s3",
    ]
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult, "lists of services used do not match")
    console.log(`Services affected: ${JSON.stringify(result)}`);
});

it("should return list of roles leveraging Inline policy", function () {
    var result = inlinePolicies.getRolesLeveragingInlinePolicy(iam_data, "aad4a5d1e0cd67fb99c658e1d326f16afd2f6857804f6ffd547c9c13ef508540");
    var expectedResult = ["MyRole"]
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult)
    console.log(`List of roles leveraging the inline policy: ${JSON.stringify(result)}`);
});

it("should return Inline policy findings for PrivilegeEscalation", function () {
    var result = inlinePolicies.getInlinePolicyFindings(iam_data, "aad4a5d1e0cd67fb99c658e1d326f16afd2f6857804f6ffd547c9c13ef508540", "PrivilegeEscalation");
    var expectedResult = []
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult)
    console.log(`PrivilegeEscalation findings: ${JSON.stringify(result)}`);
});

it("should return Inline policy findings for ResourceExposure", function () {
    var result = inlinePolicies.getInlinePolicyFindings(iam_data, "aad4a5d1e0cd67fb99c658e1d326f16afd2f6857804f6ffd547c9c13ef508540", "ResourceExposure");
    var expectedResult = [
        "iam:AddRoleToInstanceProfile",
        "iam:CreateInstanceProfile",
        "iam:PassRole"
    ]
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult)
    console.log(`ResourceExposure findings: ${JSON.stringify(result)}`);
});


it("should print out all inline Policy IDs", function () {
    var result = inlinePolicies.getInlinePolicyIds(iam_data)
    var expectedResult = ["0e1bd3995cfe6cfbbac133f1406839e6b415e5b5a412cd148ac78071d82e5b1b","aad4a5d1e0cd67fb99c658e1d326f16afd2f6857804f6ffd547c9c13ef508540","98f5220d4d4a19fe8da59c7a2a8c2f972303a0b670cf1c3f31cad06159a5742e","4331c4e6419d4ca3e11864e79a062881a78bc46804514465a7fdcb9f3471bf50","4d5d2bf1baaf66fd24b21397410fd0eb30ab5758d69fc365b1862dd9a5be5eb8"]
    chai.assert(result != null);
    chai.assert.deepStrictEqual(result, expectedResult)
    console.log(`Inline Policy IDs: ${JSON.stringify(result)}`);
});