'use strict';
var roleUtils = require("./roles")

function getManagedPolicyIds(iam_data) {
    return Object.keys(iam_data["managed-policies"]);
}

function getManagedPolicy(iam_data, policyId) {
    return iam_data["managed-policies"][policyId];
}

function getManagedPolicyDocument(iam_data, policyId) {
    return iam_data["managed-policies"][policyId]["PolicyVersionList"][0]["Document"];
}

function getManagedPolicyFindings(iam_data, policyId, riskType) {
    return iam_data["managed-policies"][policyId][riskType];
}

function getManagedPolicyName(iam_data, policyId) {
    return iam_data["managed-policies"][policyId]["PolicyName"];
}

function managedPolicyManagedBy(iam_data, policyId) {
    let arn = iam_data["managed-policies"][policyId]["Arn"];
    if (arn.startsWith("arn:aws:iam::aws:")) {
        return "AWS";
    }
    else {
        return "Customer"
    }
}

function getServicesAffectedByManagedPolicy(iam_data, policyId) {
    let servicesAffected = [];
    let actions = iam_data["managed-policies"][policyId]["InfrastructureModification"];
    let action;
    for (action of actions) {
        let service = action.split(':')[0];
        if (!(service in servicesAffected)) {
            servicesAffected.push(service);
        }
    }
    return Array.from(new Set(servicesAffected)).sort();
}

function getPrincipalTypeLeveragingManagedPolicy(iam_data, policyId, principalType){
    if (principalType === "Role") {
        return getRolesLeveragingManagedPolicy(iam_data, policyId)
    }
    if (principalType === "Group") {
        return getGroupsLeveragingManagedPolicy(iam_data, policyId)
    }
    if (principalType === "User") {
        return getUsersLeveragingManagedPolicy(iam_data, policyId)
    }
}

function getRolesLeveragingManagedPolicy(iam_data, policyId) {
    // Look through roles
    let roles;
    roles = Object.keys(iam_data["roles"]);
    // console.log(roles);
    var rolesInQuestion = [];
    for (let i = 0; i < roles.length; i++){
        var roleName = roles[i];
        let managedPolicies = iam_data["roles"][roleName]["managed_policies"];
        if (Object.prototype.hasOwnProperty.call(managedPolicies, policyId)) {
            rolesInQuestion.push(roleName);
        }
    }
    return rolesInQuestion
}

function getUsersLeveragingManagedPolicy(iam_data, policyId) {
    let users;
    users = Object.keys(iam_data["users"]);
    var usersInQuestion = [];
    for (let i = 0; i < users.length; i++){
        var userName = users[i];
        let managedPolicies = iam_data["users"][userName]["managed_policies"];
        if (Object.prototype.hasOwnProperty.call(managedPolicies, policyId)) {
            usersInQuestion.push(userName);
        }
    }
    return usersInQuestion
}

function getGroupsLeveragingManagedPolicy(iam_data, policyId) {
    let groups;
    groups = Object.keys(iam_data["groups"]);
    var groupsInQuestion = [];
    for (let i = 0; i < groups.length; i++){
        var groupName = groups[i];
        let managedPolicies = iam_data["groups"][groupName]["managed_policies"];
        if (Object.prototype.hasOwnProperty.call(managedPolicies, policyId)) {
            groupsInQuestion.push(groupName);
        }
    }
    return groupsInQuestion
}

function isManagedPolicyLeveraged(iam_data, policyId) {
    let groupCount = getPrincipalTypeLeveragingManagedPolicy(iam_data, policyId, 'Group').length;
    let userCount = getPrincipalTypeLeveragingManagedPolicy(iam_data, policyId, 'User').length;
    let roleCount = getPrincipalTypeLeveragingManagedPolicy(iam_data, policyId, 'Role').length;
    return groupCount + userCount + roleCount
}

function managedPolicyAssumableByComputeService(iam_data, policyId) {
    let roles = getRolesLeveragingManagedPolicy(iam_data, policyId)
    if (!roles.length > 0){
        console.log(`computeServicesAllowed: []`)
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
        console.log(`computeServicesAllowed: ${computeServicesAllowed}`)
        return computeServicesAllowed
    }
}

exports.getManagedPolicyIds = getManagedPolicyIds;
exports.getManagedPolicy = getManagedPolicy;
exports.getManagedPolicyDocument = getManagedPolicyDocument;
exports.getManagedPolicyFindings = getManagedPolicyFindings;
exports.managedPolicyManagedBy = managedPolicyManagedBy;
exports.getRolesLeveragingManagedPolicy = getRolesLeveragingManagedPolicy;
exports.getServicesAffectedByManagedPolicy = getServicesAffectedByManagedPolicy;
exports.getManagedPolicyName = getManagedPolicyName;
exports.getUsersLeveragingManagedPolicy = getUsersLeveragingManagedPolicy;
exports.getGroupsLeveragingManagedPolicy = getGroupsLeveragingManagedPolicy;
exports.isManagedPolicyLeveraged = isManagedPolicyLeveraged;
exports.getPrincipalTypeLeveragingManagedPolicy = getPrincipalTypeLeveragingManagedPolicy;
exports.managedPolicyAssumableByComputeService = managedPolicyAssumableByComputeService;