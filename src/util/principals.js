'use strict';
let inlinePolicyUtils = require("./inline-policies");
// let managedPolicyUtils = require("./managed-policies");

function getPrincipal(iam_data, principalName, principalType) {
    if (principalType === "Role") {
        return iam_data["roles"][principalName]
    }
    if (principalType === "Group") {
        return iam_data["groups"][principalName]
    }
    if (principalType === "User") {
        return iam_data["users"][principalName]
    }
}

function getPrincipalNames(iam_data, principalType) {
    if (principalType === "Role") {
        return Object.keys(iam_data["roles"]);
    }
    if (principalType === "Group") {
        return Object.keys(iam_data["groups"]);
    }
    if (principalType === "User") {
        return Object.keys(iam_data["users"]);
    }
}

function getPrincipalPolicies(iam_data, principalName, principalType, policyType) {
    let thePrincipalType;
    if (principalType === "Role") {
        thePrincipalType = "roles"
    } else if (principalType === "Group") {
        thePrincipalType = "groups"
    } else if (principalType === "User") {
        thePrincipalType = "users"
    }

    let thePolicyType;
    if (policyType === "Inline") {
        thePolicyType = "inline_policies"
    } else if (policyType === "Managed") {
        thePolicyType = "managed_policies"
    }
    let policies = iam_data[thePrincipalType][principalName][thePolicyType]
    return Object.keys(policies)
}

function getRiskAssociatedWithPrincipal(iam_data, principalName, principalType, riskType) {
    /*
    riskName: DataExfiltration, PrivilegeEscalation, ResourceExposure, InfrastructureModification
     */
    let inlinePolicyIdsAssociatedWithPrincipal = getPrincipalPolicies(iam_data, principalName, principalType, "Inline");
    // let managedPoliciesAssociatedWithPrincipal = getPrincipalPolicies(iam_data, principalName, principalType, "Managed");
    let inlinePolicyFindings = [];
    // let managedPolicyFindings;
    // NOTE: Will need to merge these and remove duplicates
    if (inlinePolicyIdsAssociatedWithPrincipal.length > 0) {
        let policyId;
        for (policyId of inlinePolicyIdsAssociatedWithPrincipal) {
            let theseInlinePolicyFindings = inlinePolicyUtils.getInlinePolicyFindings(iam_data, policyId, riskType);
            let item;
            for (item of theseInlinePolicyFindings) {
                if (!(item in inlinePolicyFindings)){
                    inlinePolicyFindings.push(item)
                }
                // inlinePolicyFindings.indexOf(item) === -1 ? inlinePolicyFindings.push(item) : console.log("This item already exists");
            }
        }
    }
    // for (let i = 0; i < inlinePoliciesAssociatedWithPrincipal.count;)
    // getInlinePolicyFindings(iam_data, policyId, riskType)
    // getManagedPolicyFindings(iam_data, policyId, riskType)
    return inlinePolicyFindings;
}

exports.getPrincipal = getPrincipal;
exports.getPrincipalNames = getPrincipalNames;
exports.getPrincipalPolicies = getPrincipalPolicies;
exports.getRiskAssociatedWithPrincipal = getRiskAssociatedWithPrincipal;