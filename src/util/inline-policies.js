'use strict';
let roleUtils = require("./roles");

function getInlinePolicyIds(iam_data) {
    return Object.keys(iam_data["inline-policies"]);
}

function getInlinePolicy(iam_data, policyId) {
    return iam_data["inline-policies"][policyId];
}

function getInlinePolicyDocument(iam_data, policyId) {
    return iam_data["inline-policies"][policyId]["PolicyDocument"];
}

function getInlinePolicyFindings(iam_data, policyId, riskType) {
    return iam_data["inline-policies"][policyId][riskType];
}

function getServicesAffectedByInlinePolicy(iam_data, policyId) {
    let servicesAffected = [];
    let actions = iam_data["inline-policies"][policyId]["InfrastructureModification"];
    if (actions.length > 0) {
        let action;
        for (action of actions) {
            let service = action.split(':')[0];
            if (!(service in servicesAffected)) {
                servicesAffected.push(service);
            }
        }
        return Array.from(new Set(servicesAffected)).sort();
    }
    else {
        return [];
    }
}

function getRolesLeveragingInlinePolicy(iam_data, policyId) {
    // Look through roles
    let roles;
    roles = Object.keys(iam_data["roles"]);
    const rolesInQuestion = []
    for (let i = 0; i < roles.length; i++){
        let roleName = roles[i];
        let inlinePolicies = iam_data["roles"][roleName]["inline_policies"];
        if (Object.prototype.hasOwnProperty.call(inlinePolicies, policyId)) {
            rolesInQuestion.push(roleName)
        }
    }
    return rolesInQuestion
}

function getGroupsLeveragingInlinePolicy(iam_data, policyId) {
    // Look through groups
    let groups;
    groups = Object.keys(iam_data["groups"]);
    const groupsInQuestion = []
    for (let i = 0; i < groups.length; i++){
        let groupName = groups[i];
        let inlinePolicies = iam_data["groups"][groupName]["inline_policies"];
        if (Object.prototype.hasOwnProperty.call(inlinePolicies, policyId)) {
            groupsInQuestion.push(groupName)
        }
    }
    return groupsInQuestion
}

function getUsersLeveragingInlinePolicy(iam_data, policyId) {
    // Look through users
    let users;
    users = Object.keys(iam_data["users"]);
    const usersInQuestion = []
    for (let i = 0; i < users.length; i++){
        let userName = users[i];
        let inlinePolicies = iam_data["users"][userName]["inline_policies"];
        if (Object.prototype.hasOwnProperty.call(inlinePolicies, policyId)) {
            usersInQuestion.push(userName)
        }
    }
    return usersInQuestion
}

function getPrincipalTypeLeveragingInlinePolicy(iam_data, policyId, principalType){
    if (principalType === "Role") {
        return getRolesLeveragingInlinePolicy(iam_data, policyId)
    }
    if (principalType === "Group") {
        return getGroupsLeveragingInlinePolicy(iam_data, policyId)
    }
    if (principalType === "User") {
        return getUsersLeveragingInlinePolicy(iam_data, policyId)
    }
}

function inlinePolicyAssumableByComputeService(iam_data, policyId) {
    let roles = getRolesLeveragingInlinePolicy(iam_data, policyId)
    if (!roles.length > 0){
        return []
    }
    else {
        let computeServicesAllowed = [];
        for (let i = 0; i < roles.length; i++) {
            let trustPolicyDocument = roleUtils.getTrustPolicyDocumentForRole(iam_data, roles[i])
            let computeServices = roleUtils.trustPolicyAssumableByComputeService(trustPolicyDocument)
            if (computeServices.length > 0) {
                for (let j = 0; j < computeServices.length; j++) {
                    if (!(computeServices[j] in computeServicesAllowed)) {
                        computeServicesAllowed.push(computeServices[j])
                    }
                }
            }
        }
        return computeServicesAllowed
    }
}

exports.getInlinePolicyIds = getInlinePolicyIds;
exports.getInlinePolicy = getInlinePolicy;
exports.getInlinePolicyDocument = getInlinePolicyDocument;
exports.getInlinePolicyFindings = getInlinePolicyFindings;
exports.getServicesAffectedByInlinePolicy = getServicesAffectedByInlinePolicy;
exports.getRolesLeveragingInlinePolicy = getRolesLeveragingInlinePolicy;
exports.getGroupsLeveragingInlinePolicy = getGroupsLeveragingInlinePolicy;
exports.getUsersLeveragingInlinePolicy = getUsersLeveragingInlinePolicy;
exports.getPrincipalTypeLeveragingInlinePolicy = getPrincipalTypeLeveragingInlinePolicy;
exports.inlinePolicyAssumableByComputeService = inlinePolicyAssumableByComputeService;
