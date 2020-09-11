<template>
    <div>
        <h2>Principals</h2>
        <br>
        <div>
            <h3>Roles</h3>
            <div id="iam.roles">
            <div v-bind:key="roleName" v-for="roleName in roleNames">
                <br>
                    <b-container>
                        <b-row class="px-2">
                            <b-col>
                                <h4>{{ roleName }}
                                    <br>
                                    <small class="text-muted">{{getPrincipalMetadata(roleName, 'Role')['arn']}}</small>
                                </h4>
                            </b-col>
                            <b-col>
                                <b-button v-b-toggle="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'risk' + '.' + 'collapse'">
                                    Show
                                </b-button>
                            </b-col>
                        </b-row>
                        <br>
                        <b-collapse v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'risk' + '.' + 'collapse'">
                            <b-row class="px-2">
                                <b-col lg="4">
                                    <h5>Risks</h5>
                                    <b-list-group>
                                        <div v-bind:key="riskName" v-for="riskName in riskNames">
                                            <b-list-group-item class="d-flex justify-content-between align-items-center" :action="true">
                                                {{ addSpacesInPascalCaseString(riskName) }}
                                                <b-badge v-bind:variant="getRiskLevel(riskName)">{{getRiskAssociatedWithPrincipal(roleName, "Role", riskName).length }} <span
                                                    class="sr-only">{{ addSpacesInPascalCaseString(riskName) }} risks</span>
                                                </b-badge>
                                            </b-list-group-item>
                                        </div>
                                    </b-list-group>
                                </b-col>
                                <b-col>
                                    <h5>Metadata</h5>
                                    <dl class="row">
                                        <dt class="col-sm-3">Created</dt>
                                        <dd class="col-sm-9">{{getPrincipalMetadata(roleName, 'Role')['create_date']}}</dd>

                                        <dt class="col-sm-3">ARN</dt>
                                        <dd class="col-sm-9 text-monospace">{{getPrincipalMetadata(roleName, 'Role')['arn']}}</dd>

                                        <dt class="col-sm-3">Inline Policies</dt>
                                        <dd class="col-sm-9">
                                            <b-button size="sm" v-b-toggle="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'inline-policies' + '.' + 'collapse'">{{ getPrincipalPolicyNames(roleName, "Role", "Inline").length }}</b-button>
                                            <b-collapse v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'inline-policies' + '.' + 'collapse'">
                                                <br>
                                                <pre><code>{{ getPrincipalPolicyNames(roleName, "Role", "Inline") }}</code></pre>
                                            </b-collapse>
                                        </dd>

                                        <dt class="col-sm-3">Managed Policies</dt>
                                        <dd class="col-sm-9">
                                            <b-button size="sm" v-b-toggle="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'managed-policies' + '.' + 'collapse'">{{ getPrincipalPolicyNames(roleName, "Role", "Managed").length }}</b-button>
                                            <b-collapse v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'managed-policies' + '.' + 'collapse'">
                                                <br>
                                                <pre><code>{{ getPrincipalPolicyNames(roleName, "Role", "Managed") }}</code></pre>
                                            </b-collapse>
                                        </dd>

                                        <dt class="col-sm-3">Role Trust Policy</dt>
                                        <dd class="col-sm-9">
                                            <b-button size="sm" v-b-toggle="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'role-trust-policy' + '.' + 'collapse'">Details</b-button>
                                            <b-collapse v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'role-trust-policy' + '.' + 'collapse'">
                                                <br>
                                                <pre><code>{{ JSON.parse(JSON.stringify(getRoleTrustPolicy(roleName))) }}</code></pre>
                                            </b-collapse>
                                        </dd>
                                        <!--Instance Profiles-->
                                        <dt class="col-sm-3">Instance Profiles</dt>
                                        <dd class="col-sm-9">
                                            <b-button size="sm" v-b-toggle="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'instance-profiles' + '.' + 'collapse'">
                                                {{ getPrincipalMetadata(roleName, 'Role')['instance_profiles'].length }}</b-button>
                                            <b-collapse v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'instance-profiles' + '.' + 'collapse'">
                                                <br>
                                                <pre><code>{{ JSON.parse(JSON.stringify(getPrincipalMetadata(roleName, 'Role')['instance_profiles'])) }}</code></pre>
                                            </b-collapse>
                                        </dd>
                                    </dl>
                                </b-col>
                            </b-row>
                            <br>
                            <br>
                        </b-collapse>
                    </b-container>
                </div>

                                <!--Inline Policies-->
                                <!--Managed Policies-->
            </div>
        </div><!--iam.roles-->
        <div id="iam.groups">
        </div><!--iam.groups-->
        <div id="iam.users">
        </div><!--iam.users-->
    </div>

</template>

<script>
    const principalsUtil = require('../util/principals');
    const managedPoliciesUtil = require('../util/managed-policies');
    const inlinePoliciesUtil = require('../util/inline-policies');
    const rolesUtil = require('../util/roles');
    const otherUtil = require('../util/other');
    // eslint-disable-next-line no-unused-vars
    let glossary = require('../util/glossary');

    export default {
        name: "Principals",
        props: {
            iam_data: {
                type: Object
            },
        },
        computed: {
            roleNames() {
                return principalsUtil.getPrincipalNames(this.iam_data, "Role");
            },
            userNames() {
                return principalsUtil.getPrincipalNames(this.iam_data, "User");
            },
            groupNames() {
                return principalsUtil.getPrincipalNames(this.iam_data, "Group");
            },
            riskNames() {
                return ["DataExfiltration", "ResourceExposure", "PrivilegeEscalation", "InfrastructureModification"]
            }
        },
        methods: {
            getPrincipalMetadata: function (principalName, principalType) {
                return principalsUtil.getPrincipalMetadata(this.iam_data, principalName, principalType)
            },
            getPrincipalPolicies: function (principalName, principalType, policyType) {
                return principalsUtil.getPrincipalPolicies(this.iam_data, principalName, principalType, policyType)
            },
            getRiskAssociatedWithPrincipal: function (principalName, principalType, riskType) {
                return principalsUtil.getRiskAssociatedWithPrincipal(this.iam_data, principalName, principalType, riskType)
            },
            getRoleTrustPolicy: function(roleName) {
                return rolesUtil.getTrustPolicyDocumentForRole(this.iam_data, roleName)
            },
            getRiskDefinition: function (riskType) {
                return glossary.getRiskDefinition(riskType)
            },
            addSpacesInPascalCaseString: function (s) {
                return otherUtil.addSpacesInPascalCaseString(s)
            },
            getPrincipalPolicyNames: function (principalName, principalType, policyType) {
                let policyNames = [];
                let policies = principalsUtil.getPrincipalPolicies(this.iam_data, principalName, principalType, policyType);
                let policyId;
                if ( policyType === "Inline") {
                    for (policyId in policies) {
                        policyNames.push(inlinePoliciesUtil.getInlinePolicy(this.iam_data, policies[policyId])["PolicyName"])
                    }
                } else if ( policyType === "Managed") {
                    for (policyId in policies) {
                        policyNames.push(managedPoliciesUtil.getManagedPolicyName(this.iam_data, policies[policyId]))
                    }
                }
                return policyNames;
            },
            getRiskLevel: function(riskType) {
                if (riskType === "DataExfiltration") {
                    return "warning"
                }
                if (riskType === "PrivilegeEscalation") {
                    return "danger"
                }
                if (riskType === "ResourceExposure") {
                    return "warning"
                }
                if (riskType === "InfrastructureModification") {
                    return "info"
                }
            }
        }
    }
</script>

<style scoped>

</style>