'use strict';
var roleUtils = require("./roles")
var otherUtils = require("./other")

function getManagedPolicyIds(iam_data) {
    // console.log(`managed policy IDs: ${Object.keys(iam_data["managed-policies"])}`)
    let result = [];
    try{
        result = Object.keys(iam_data["managed-policies"]);
    }
    catch(TypeError) {
        result = [];
        console.log(`TypeError on ${result}`)
    }
    // return Object.keys(iam_data["managed-policies"]);
    return result;
}

function getManagedPolicyNames(iam_data) {
    let managedPolicyIds = getManagedPolicyIds(iam_data);
    let names = [];
    for (let i = 0; i < managedPolicyIds.length; i++) {
        names.push(iam_data["managed-policies"][managedPolicyIds[i]]["PolicyName"])
    }
    names.sort();
    return names;
}

function getManagedPolicy(iam_data, policyId) {
    return iam_data["managed-policies"][policyId];
}

function getManagedPolicyDocument(iam_data, policyId) {
    return iam_data["managed-policies"][policyId]["PolicyVersionList"][0]["Document"];
}

function getManagedPolicyFindings(iam_data, policyId, riskType) {
    let result = iam_data["managed-policies"][policyId][riskType];
    result.sort();
    return result;
}

function getManagedPolicyName(iam_data, policyId) {
    return iam_data["managed-policies"][policyId]["PolicyName"];
}

function managedPolicyManagedBy(iam_data, policyId) {
    let arn;
    try {
        arn = iam_data["managed-policies"][policyId]["Arn"];
    }
    catch (TypeError) {
        console.log(`TypeError for policyId: ${policyId}`)
    }

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

function getAllPrincipalsLeveragingManagedPolicy(iam_data, policyId) {
    let users;
    let groups;
    let roles;
    users = getUsersLeveragingManagedPolicy(iam_data, policyId)
    groups = getGroupsLeveragingManagedPolicy(iam_data, policyId)
    roles = getRolesLeveragingManagedPolicy(iam_data, policyId)
    return users.concat(groups, roles)
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
        // console.log(`computeServicesAllowed by ${policyId}: []`)
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
        // console.log(`computeServicesAllowed by ${policyId}: ${computeServicesAllowed}`)
        return computeServicesAllowed
    }
}

function getManagedPolicyItems(iam_data, managedPolicyIds, managedBy) {
    let items = [];
    // let managedPolicyIds = getManagedPolicyIds(iam_data)
    // for (let i = 0; i < managedPolicyIds.length; i++){
    for (let policyId of managedPolicyIds){
        if (managedBy === managedPolicyManagedBy(iam_data, policyId)){
            let policyName = getManagedPolicyName(iam_data, policyId);
            let attachedToPrincipals = getAllPrincipalsLeveragingManagedPolicy(iam_data, policyId);
            let services = getServicesAffectedByManagedPolicy(iam_data, policyId).length
            let infrastructureModification = getManagedPolicyFindings(iam_data, policyId, "InfrastructureModification").length;
            let privilegeEscalation = getManagedPolicyFindings(iam_data, policyId, "PrivilegeEscalation").length;
            let resourceExposure = getManagedPolicyFindings(iam_data, policyId, "ResourceExposure").length;
            let dataExfiltration = getManagedPolicyFindings(iam_data, policyId, "DataExfiltration").length;
            let computeRole = managedPolicyAssumableByComputeService(iam_data, policyId);
            let item = {
                policy_name: policyName,
                attached_to_principals: attachedToPrincipals,
                services: services,
                privilege_escalation: privilegeEscalation,
                resource_exposure: resourceExposure,
                data_exfiltration: dataExfiltration,
                infrastructure_modification: infrastructureModification,
                compute_role: computeRole
            }
            items.push(item)
        }
    }
    return items;
}

function getManagedPolicyNameMapping(iam_data, managedBy) {
    let managedPolicyIds = getManagedPolicyIds(iam_data);
    let names = [];
    let policyId;
    for (policyId of managedPolicyIds) {
        if (iam_data["managed-policies"][policyId]["Arn"].startsWith("arn:aws:iam::aws:")) {
            if (managedBy === "AWS") {
                let policyName = iam_data["managed-policies"][policyId]["PolicyName"];
                names.push({policy_name: policyName, policy_id: policyId})
            }
        } else {
            if (managedBy === "Customer") {
                let policyName = iam_data["managed-policies"][policyId]["PolicyName"];
                names.push({policy_name: policyName, policy_id: policyId})
            }
        }
    }
    names.sort(otherUtils.compareValues("policy_name", "asc"));
    return getManagedPolicyItems(iam_data, managedPolicyIds, managedBy);
}

exports.getManagedPolicyIds = getManagedPolicyIds;
exports.getManagedPolicyNames = getManagedPolicyNames;
exports.getManagedPolicyFindings = getManagedPolicyFindings;
exports.getManagedPolicy = getManagedPolicy;
exports.getManagedPolicyDocument = getManagedPolicyDocument;
exports.managedPolicyManagedBy = managedPolicyManagedBy;
exports.getRolesLeveragingManagedPolicy = getRolesLeveragingManagedPolicy;
exports.getServicesAffectedByManagedPolicy = getServicesAffectedByManagedPolicy;
exports.getManagedPolicyName = getManagedPolicyName;
exports.getUsersLeveragingManagedPolicy = getUsersLeveragingManagedPolicy;
exports.getGroupsLeveragingManagedPolicy = getGroupsLeveragingManagedPolicy;
exports.isManagedPolicyLeveraged = isManagedPolicyLeveraged;
exports.getPrincipalTypeLeveragingManagedPolicy = getPrincipalTypeLeveragingManagedPolicy;
exports.managedPolicyAssumableByComputeService = managedPolicyAssumableByComputeService;
exports.getAllPrincipalsLeveragingManagedPolicy = getAllPrincipalsLeveragingManagedPolicy;
exports.getManagedPolicyItems = getManagedPolicyItems;
exports.getManagedPolicyNameMapping = getManagedPolicyNameMapping;
