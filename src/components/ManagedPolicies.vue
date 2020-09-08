<template>
    <div>
    <h3>{{ managedPolicyType}}-Managed Policies</h3>
    <div v-for="policyId in managedPolicyIds" v-bind:key="policyId">
        <template v-if="managedBy(policyId) === managedPolicyType">
            <template v-if="isManagedPolicyLeveraged(policyId) > 0">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="card">
                                <h6 class="card-header" v-bind:id="'managed-policy' + '-' + policyId + 'card'">
                                    Name: {{ managedPolicy(policyId)["PolicyName"] }}
                                    <br>
                                    <br>
                                    PolicyId: {{ policyId }}
                                    <br>
                                    <br>
                                    Attached to Principals:
                                    <ul>
                                        <li v-if="principalTypeLeveragingManagedPolicy(policyId, 'Role').length > 0">
                                            Roles:
                                            <ul>
                                                <li v-for="role in principalTypeLeveragingManagedPolicy(policyId, 'Role')" v-bind:key="role">
                                                    {{ role }}
                                                </li>
                                            </ul>
                                        </li>
                                        <li v-if="principalTypeLeveragingManagedPolicy(policyId, 'User').length > 0">
                                            Users:
                                            <ul>
                                                <li v-for="user in principalTypeLeveragingManagedPolicy(policyId, 'User')" v-bind:key="user">
                                                    {{ user }}
                                                </li>
                                            </ul>
                                        </li>
                                        <li v-if="principalTypeLeveragingManagedPolicy(policyId, 'Group').length > 0">
                                            Groups:
                                            <ul>
                                                <li v-for="group in principalTypeLeveragingManagedPolicy(policyId, 'Group')" v-bind:key="group">
                                                    {{ group }}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </h6>
                                <div class="card-body">
                                    <p class="card-text">
                                        Services: {{ servicesAffectedByManagedPolicy(policyId).length
                                        }}
                                        <br>
                                        Infrastructure Modification Actions: {{
                                        managedPolicyFindings(policyId,
                                        "InfrastructureModification").length }}
                                        <br>
                                    </p>
                                </div> <!-- /card-text -->
                                <div class="card-footer">
                                    <!--Alert for Risk Type: Privilege Escalation Exposure-->
                                    <template
                                            v-if="managedPolicyFindings(policyId, 'PrivilegeEscalation').length > 0">
                                        <div class="alert alert-danger popovers" data-toggle="popover" data-html="true"
                                             data-placement="top"
                                             title="Privilege Escalation"
                                             v-bind:data-content="getRiskDefinition('PrivilegeEscalation')"
                                             role="alert">Privilege Escalation
                                        </div>
                                    </template>
                                    <!--Alert for Risk Type: Data Exfiltration Escalation-->
                                    <template
                                            v-if="managedPolicyFindings(policyId, 'DataExfiltration').length > 0">
                                        <div class="alert alert-warning popovers" data-toggle="popover" data-html="true"
                                             data-placement="top"
                                             title="Data Exfiltration"
                                             v-bind:data-content="getRiskDefinition('DataExfiltration')"
                                             role="alert">Data Exfiltration
                                        </div>
                                    </template>
                                    <!--Alert for Risk Type: Resource Exposure-->
                                    <template
                                            v-if="managedPolicyFindings(policyId, 'ResourceExposure').length > 0">
                                        <div class="alert alert-danger popovers" data-toggle="popover" data-html="true"
                                             data-placement="top"
                                             title="Resource Exposure"
                                             v-bind:data-content="getRiskDefinition('ResourceExposure')"
                                             role="alert">Resource Exposure
                                        </div>
                                    </template>
                                    <!--                                    &lt;!&ndash;Alert for Assumable By Compute Service&ndash;&gt;-->
                                    <!--                                    <template v-if="managedPolicyFindings(iam_data, policyId, 'AssumableByComputeService').length > 0">-->
                                    <!--                                        <div class="alert info popovers" data-toggle="popover" data-html="true" data-placement="top"-->
                                    <!--                                            title="Policy leveraged by Compute Service Role"-->
                                    <!--                                            data-content="${ glossary.getRiskDefinition('AssumableByComputeService') }"-->
                                    <!--                                            role="alert">Policy leveraged by Compute Service Role-->
                                    <!--                                        </div>-->
                                    <!--                                    </template>-->
                                </div>
                            </div>
                            <br>
                            <br>
                        </div>
                        <div class="col-md-7">
                            <div v-bind:id="'managed-policy'  + '-' + policyId + '-' + 'card-details'">
                                <div class="card">
                                    <!--Policy Document-->
                                    <div class="card-header">
                                        <a class="card-link" data-toggle="collapse"
                                           v-bind:data-parent="'#managed-policy' + '-' + policyId + '-' + 'card-details'"
                                           v-bind:href="'#managed-policy' + '-' + policyId + '-' +'policydocument'"
                                        >Policy Document</a>
                                    </div>
                                    <div v-bind:id="'managed-policy' + '-' + policyId + '-' +'policydocument'"
                                         class="panel-collapse collapse">
                                        <div class="card-body">
<pre><code>
{{ JSON.parse(JSON.stringify(managedPolicyDocument(policyId), undefined, '\t')) }}
</code></pre>
                                        </div>
                                    </div><!--Policy Document-->
                                    <!--Data Exfiltration-->
                                    <div v-if="managedPolicyFindings(policyId, 'DataExfiltration').length > 0">
                                        <div class="card-header">
                                            <a class="card-link" data-toggle="collapse"
                                               v-bind:data-parent="'#managed-policy' + '-' + policyId + '-' + 'card-details'"
                                               v-bind:href="'#managed-policy' + '-' + policyId + '-' +'data-exfiltration'"
                                            >Data Exfiltration</a>
                                        </div>
                                        <div v-bind:id="'managed-policy' + '-' + policyId + '-' +'data-exfiltration'"
                                             class="panel-collapse collapse">
                                            <div class="card-body">
<pre><code>
{{ JSON.parse(JSON.stringify(managedPolicyFindings(policyId, 'DataExfiltration'), undefined, '\t')) }}
</code></pre>
                                            </div>
                                        </div>
                                    </div><!--Data Exfiltration-->
                                    <!--Infrastructure Modification Actions-->
                                    <div class="card-header">
                                        <a class="card-link" data-toggle="collapse"
                                           v-bind:data-parent="'#managed-policy' + '-' + policyId + '-' + 'card-details'"
                                           v-bind:href="'#managed-policy' + '-' + policyId + '-' +'infrastructure-modification-actions'"
                                        >Infrastructure Modification Actions</a>
                                    </div>
                                    <div v-bind:id="'managed-policy' + '-' + policyId + '-' +'infrastructure-modification-actions'"
                                         class="panel-collapse collapse">
                                        <div class="card-body">
<pre><code>
{{ JSON.parse(JSON.stringify(managedPolicyFindings(policyId, 'InfrastructureModification'), undefined, '\t')) }}
</code></pre>
                                        </div>
                                    </div><!--Infrastructure Modification Actions-->
                                    <!--PrivilegeEscalation-->
                                    <div v-if="managedPolicyFindings(policyId, 'PrivilegeEscalation').length > 0">
                                        <div class="card-header">
                                            <a class="card-link" data-toggle="collapse"
                                               v-bind:data-parent="'#managed-policy' + '-' + policyId + '-' + 'card-details'"
                                               v-bind:href="'#managed-policy' + '-' + policyId + '-' +'privilege-escalation'"
                                            >Privilege Escalation</a>
                                        </div>
                                        <div v-bind:id="'managed-policy' + '-' + policyId + '-' +'privilege-escalation'"
                                             class="panel-collapse collapse">
                                            <!--TODO: Format the Privilege Escalation stuff-->
                                            <div class="card-body">
<pre><code>
{{ JSON.parse(JSON.stringify(managedPolicyFindings(policyId, 'PrivilegeEscalation'), undefined, '\t')) }}
</code></pre>
                                            </div>
                                        </div>
                                    </div><!--Privilege Escalation-->
                                    <!--ResourceExposure-->
                                    <div v-if="managedPolicyFindings(policyId, 'ResourceExposure').length > 0">
                                        <div class="card-header">
                                            <a class="card-link" data-toggle="collapse"
                                               v-bind:data-parent="'#managed-policy' + '-' + policyId + '-' + 'card-details'"
                                               v-bind:href="'#managed-policy' + '-' + policyId + '-' +'resource-exposure'"
                                            >Resource Exposure</a>
                                        </div>
                                        <div v-bind:id="'managed-policy' + '-' + policyId + '-' +'resource-exposure'"
                                             class="panel-collapse collapse">
                                            <div class="card-body">
<pre><code>
{{ JSON.parse(JSON.stringify(managedPolicyFindings(policyId, 'ResourceExposure'), undefined, '\t')) }}
</code></pre>
                                            </div>
                                        </div>
                                    </div><!--Resource Exposure-->
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </template>
    </div>
        </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const managedPoliciesUtil = require('../util/managed-policies');
// eslint-disable-next-line no-unused-vars
let glossary = require('../util/glossary');

export default {
    name: "ManagedPolicies",
    props: {
        iam_data: {
            type: Object
        },
        managedPolicyType: {
            type: String
        },
        riskDefinitions: {
            type: String
        }
    },
    computed: {
            managedPolicyIds() {
                return managedPoliciesUtil.getManagedPolicyIds(this.iam_data);
            },
        },
    methods: {
        managedPolicyDocument(policyId) {
            return managedPoliciesUtil.getManagedPolicyDocument(this.iam_data, policyId);
        },
        managedPolicy: function(policyId) {
            return managedPoliciesUtil.getManagedPolicy(this.iam_data, policyId);
        },
        managedBy: function(policyId) {
            return managedPoliciesUtil.managedPolicyManagedBy(this.iam_data, policyId);
        },
        principalTypeLeveragingManagedPolicy: function (policyId, principalType) {
            return managedPoliciesUtil.getPrincipalTypeLeveragingManagedPolicy(this.iam_data, policyId, principalType);
        },
        isManagedPolicyLeveraged: function (policyId) {
            return managedPoliciesUtil.isManagedPolicyLeveraged(this.iam_data, policyId)
        },
        managedPolicyFindings: function(policyId, riskType) {
            return managedPoliciesUtil.getManagedPolicyFindings(this.iam_data, policyId, riskType);
        },
        servicesAffectedByManagedPolicy: function(policyId) {
            return managedPoliciesUtil.getServicesAffectedByManagedPolicy(this.iam_data, policyId)
        },
        getRiskDefinition: function(riskType) {
            return glossary.getRiskDefinition(riskType)
        }
    }
}
</script>

<style scoped>

</style>