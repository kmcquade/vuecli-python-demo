'use strict';
let inlinePolicyUtils = require("./inline-policies");
let managedPolicyUtils = require("./managed-policies");
let otherUtils = require("./other");

function getPrincipalMetadata(iam_data, principalName, principalType) {
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
        let result = Object.keys(iam_data["roles"])
        return result.sort();
    }
    if (principalType === "Group") {
        let result = Object.keys(iam_data["groups"]);
        result.sort();
        return result
    }
    if (principalType === "User") {
        let result = Object.keys(iam_data["users"]);
        result.sort();
        return result
    }
}

function getPrincipalPolicies(iam_data, principalName, principalType, policyType) {
    let thePrincipalType;
    if (principalType === "Role") {
        thePrincipalType = "roles";
    } else if (principalType === "Group") {
        thePrincipalType = "groups";
    } else if (principalType === "User") {
        thePrincipalType = "users";
    }

    let thePolicyType;
    if (policyType === "Inline") {
        thePolicyType = "inline_policies";
    } else if (policyType === "Managed") {
        thePolicyType = "managed_policies";
    }
    let policies = iam_data[thePrincipalType][principalName][thePolicyType];
    let result = Object.keys(policies);
    result.sort()
    return result
}

function getRiskAssociatedWithPrincipal(iam_data, principalName, principalType, riskType) {
    /*
    riskName: DataExfiltration, PrivilegeEscalation, ResourceExposure, InfrastructureModification
     */
    let inlinePolicyIdsAssociatedWithPrincipal = getPrincipalPolicies(iam_data, principalName, principalType, "Inline");
    let managedPoliciesAssociatedWithPrincipal = getPrincipalPolicies(iam_data, principalName, principalType, "Managed");
    let findings = [];
    if (inlinePolicyIdsAssociatedWithPrincipal.length > 0) {
        let policyId;
        for (policyId of inlinePolicyIdsAssociatedWithPrincipal) {
            let theseInlinePolicyFindings = inlinePolicyUtils.getInlinePolicyFindings(iam_data, policyId, riskType);
            let item;
            for (item of theseInlinePolicyFindings) {
                if (!(item in findings)){
                    findings.push(item);
                }
            }
        }
    }
    if (managedPoliciesAssociatedWithPrincipal.length > 0) {
        let policyId;
        for (policyId of managedPoliciesAssociatedWithPrincipal) {
            let theseManagedPolicyFindings = managedPolicyUtils.getManagedPolicyFindings(iam_data, policyId, riskType);
            let item;
            for (item of theseManagedPolicyFindings) {
                if (!(item in findings)){
                    findings.push(item);
                }
            }
        }
    }
    if (findings.length > 0) {
        findings.sort();
        findings = otherUtils.removeDuplicatesFromArray(findings)
        return findings;
    } else {
        return []
    }
}

exports.getPrincipalMetadata = getPrincipalMetadata;
exports.getPrincipalNames = getPrincipalNames;
exports.getPrincipalPolicies = getPrincipalPolicies;
exports.getRiskAssociatedWithPrincipal = getRiskAssociatedWithPrincipal;