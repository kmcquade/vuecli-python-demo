'use strict';

const policyViolations = (policies) => {
    let [privEsc, dataExfil, resExposure, infraMod] = Array(4).fill(0);

    Object.keys(policies).forEach((policyId) => {
        privEsc += policies[policyId]["PrivilegeEscalation"].length;
        dataExfil += policies[policyId]["DataExfiltration"].length;
        resExposure += policies[policyId]["ResourceExposure"].length;
        infraMod += policies[policyId]["InfrastructureModification"].length;
    })

    return {
        "PrivilegeEscalation": privEsc,
        "DataExfiltration": dataExfil,
        "ResourceExposure": resExposure,
        "InfrastructureModification": infraMod
    }
}

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

exports.policyViolations = policyViolations;
exports.addSpacesInPascalCaseString = addSpacesInPascalCaseString;
exports.removeDuplicatesFromArray = removeDuplicatesFromArray;
