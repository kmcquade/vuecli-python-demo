'use strict';

function getInlinePolicyIds(iam_data) {
    return Object.keys(iam_data["inline-policies"]);
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

exports.getInlinePolicyIds = getInlinePolicyIds;
exports.getInlinePolicyDocument = getInlinePolicyDocument;
exports.getInlinePolicyFindings = getInlinePolicyFindings;
exports.getServicesAffectedByInlinePolicy = getServicesAffectedByInlinePolicy;
exports.getRolesLeveragingInlinePolicy = getRolesLeveragingInlinePolicy;
