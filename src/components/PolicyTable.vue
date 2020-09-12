<template>
    <div>
<!--        <table v-bind:id="policyType + '.' + 'table'" class="display compact responsive"-->
<!--               style="width:100%; border-radius: 10px">-->
<!--            <thead>-->
<!--            <tr>-->
<!--                <th></th>-->
<!--                <th>Policy Name</th>-->
<!--                <th>Attached To Principals</th>-->
<!--                <th>Services Affected</th>-->
<!--                <th><a href="#privilege-escalation">Privilege Escalation</a></th>-->
<!--                <th><a href="#resource-exposure">Resource Exposure</a></th>-->
<!--                <th><a href="#data-exfiltration">Data Exfiltration</a></th>-->
<!--                <th><a href="#roles-assumable-by-compute-services">Compute Role</a></th>-->
<!--                <th><a href="#infrastructure-modification">Infrastructure Modification</a></th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--            <tr v-for="(policy, index) in getManagedPolicyNameMapping" v-bind:key="index">-->
<!--                <td></td>-->
<!--                <td>{{ policy.policy_name }}</td>-->
<!--                <td>{{ policy.attached_to_principals }}</td>-->
<!--                <td>{{ policy.services }}</td>-->
<!--                <td>{{ policy.privilege_escalation }}</td>-->
<!--                <td>{{ policy.resource_exposure }}</td>-->
<!--                <td>{{ policy.data_exfiltration }}</td>-->
<!--                <td>{{ policy.infrastructure_modification }}</td>-->
<!--                <td>{{ policy.compute_role }}</td>-->
<!--            </tr>-->
<!--            </tbody>-->
<!--        </table>-->
<!--            <b-table-->
<!--      :items="items"-->
<!--      :fields="fields"-->
<!--      :sort-by.sync="sortBy"-->
<!--      :sort-desc.sync="sortDesc"-->
<!--      responsive="sm"-->
<!--    ></b-table>-->
    </div>
</template>

<script>
    const managedPoliciesUtil = require('../util/managed-policies');
    const inlinePoliciesUtil = require('../util/inline-policies');


    export default {
        name: "PolicyTable",
        props: {
            iam_data: {
                type: Object
            },
            policyType: {
                type: String
            },
            managedBy: {
                type: String,
                default: "AWS"
            }
        },
        data() {
            return {
                sortBy: 'policy_name',
                sortDesc: false,
                fields: [
                    {key: 'policy_name', sortable: true},
                    {key: 'attached_to_principals', sortable: true},
                    {key: 'services', sortable: true},
                    {key: 'infrastructure_modification', sortable: true},
                    {key: 'privilege_escalation', sortable: true},
                    {key: 'resource_exposure', sortable: true},
                    {key: 'data_exfiltration', sortable: true},
                    {key: 'compute_role', sortable: true},
                ],
            }
        },
        computed: {
            managedPolicyIds() {
                return managedPoliciesUtil.getManagedPolicyIds(this.iam_data);
            },
            inlinePolicyIds() {
                return inlinePoliciesUtil.getInlinePolicyIds(this.iam_data);
            },
            getManagedPolicyNameMapping: function () {
                return managedPoliciesUtil.getManagedPolicyNameMapping(this.iam_data, this.managedBy)
            }
        },
        methods: {
            getManagedPolicyName: function (policyId) {
                return managedPoliciesUtil.getManagedPolicyName(this.iam_data, policyId)
            },
            getServicesAffectedByManagedPolicy: function (policyId) {
                return managedPoliciesUtil.getServicesAffectedByManagedPolicy(this.iam_data, policyId).length
            },
            getManagedPolicyFindings: function (policyId, riskType) {
                return managedPoliciesUtil.getManagedPolicyFindings(this.iam_data, policyId, riskType);
            },
            managedPolicyAssumableByComputeService: function (policyId) {
                return managedPoliciesUtil.managedPolicyAssumableByComputeService(this.iam_data, policyId);
            },
            isManagedPolicyLeveraged: function (policyId) {
                return managedPoliciesUtil.isManagedPolicyLeveraged(this.iam_data, policyId)
            },
            managedPolicy: function (policyId) {
                return managedPoliciesUtil.getManagedPolicy(this.iam_data, policyId);
            },
            servicesAffectedByManagedPolicy: function (policyId) {
                return managedPoliciesUtil.getServicesAffectedByManagedPolicy(this.iam_data, policyId)
            },

        },

    }

</script>


<style scoped>

</style>