'use strict';

function getManagedPolicyIds(iam_data) {
    return Object.keys(iam_data["managed-policies"]);
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

function getRolesLeveragingManagedPolicy(iam_data, policyId) {
    // Look through roles
    let roles;
    roles = Object.keys(iam_data["roles"]);
    // console.log(roles);
    var rolesInQuestion = [];
    for (let i = 0; i < roles.length; i++){
        var roleName = roles[i];
        let managedPolicies = iam_data["roles"][roleName]["managed_policies"];
        if (managedPolicies.hasOwnProperty(policyId)) {
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
        if (managedPolicies.hasOwnProperty(policyId)) {
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
        if (managedPolicies.hasOwnProperty(policyId)) {
            groupsInQuestion.push(groupName);
        }
    }
    return groupsInQuestion
}

exports.getManagedPolicyIds = getManagedPolicyIds;
exports.getManagedPolicyDocument = getManagedPolicyDocument;
exports.getManagedPolicyFindings = getManagedPolicyFindings;
exports.managedPolicyManagedBy = managedPolicyManagedBy;
exports.getRolesLeveragingManagedPolicy = getRolesLeveragingManagedPolicy;
exports.getServicesAffectedByManagedPolicy = getServicesAffectedByManagedPolicy;
exports.getManagedPolicyName = getManagedPolicyName;
exports.getUsersLeveragingManagedPolicy = getUsersLeveragingManagedPolicy;
exports.getGroupsLeveragingManagedPolicy = getGroupsLeveragingManagedPolicy;