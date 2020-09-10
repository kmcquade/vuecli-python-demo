<template>
    <div>
        <h2>Principals</h2>
        <br>
        <div>
            <h3>Roles</h3>
            <div id="iam.roles" v-bind:key="roleName" v-for="roleName in roleNames">
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
                            <b-row>
                                <b-col lg="4">
                                    <h5>Risks</h5>
                                    <b-list-group>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center"
                                                           :action="true">
                                            Data Exfiltration
                                            <b-badge variant="warning">9 <span
                                                    class="sr-only">data exfiltration risks</span></b-badge>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center"
                                                           :action="true">
                                            Privilege Escalation
                                            <b-badge variant="danger">3 <span
                                                    class="sr-only">privilege escalation risks</span></b-badge>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center"
                                                           :action="true">
                                            Resource Exposure
                                            <b-badge variant="warning">3 <span
                                                    class="sr-only">resource exposure risks</span></b-badge>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center"
                                                           :action="true">
                                            Infrastructure Modification
                                            <b-badge variant="info">3 <span class="sr-only">infrastructure modification risks</span>
                                            </b-badge>
                                        </b-list-group-item>
                                    </b-list-group>
                                </b-col>
                                <b-col>
                                    <h5>Metadata</h5>
                                    <dl class="row">
                                        <dt class="col-sm-3">Created</dt>
                                        <dd class="col-sm-9">2019-08-16 17:27:59+00:00</dd>

                                        <dt class="col-sm-3">ARN</dt>
                                        <dd class="col-sm-9 text-monospace">arn:aws:iam::012345678901:role/MyRole</dd>

                                    </dl>
                                </b-col>
                            </b-row>
                        </b-collapse>

                    </b-container>
                </div>
<!--            <div id="iam.roles" v-bind:key="roleName" v-for="roleName in roleNames">-->
<!--                <div class="col">-->
<!--                    <h4><small class="text-muted">{{ roleName }}</small></h4>-->
<!--                </div>&lt;!&ndash;col&ndash;&gt;-->
<!--                <div class="col">-->
<!--                    <button type="button"-->
<!--                            class="btn btn-secondary collapsed"-->
<!--                            aria-expanded="false"-->
<!--                            v-bind:aria-controls="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'risk' + '.' + 'collapse'">-->
<!--                        Show-->
<!--                    </button>-->
<!--                </div>&lt;!&ndash;col&ndash;&gt;-->
<!--                &lt;!&ndash;Risks&ndash;&gt;-->
<!--                <b-container>-->
<!--                    <b-row class="px-2">-->
<!--                        <h2>MyRole</h2>-->
<!--                    </b-row>-->
<!--                    <b-row>-->
<!--                        <b-col lg="4">-->
<!--                            <h4>Risks</h4>-->
<!--                            <b-list-group>-->
<!--                                <b-list-group-item class="d-flex justify-content-between align-items-center"-->
<!--                                                   :action="true">-->
<!--                                    Data Exfiltration-->
<!--                                    <b-badge variant="warning">9 <span class="sr-only">data exfiltration risks</span>-->
<!--                                    </b-badge>-->
<!--                                </b-list-group-item>-->
<!--                                <b-list-group-item class="d-flex justify-content-between align-items-center"-->
<!--                                                   :action="true">-->
<!--                                    Privilege Escalation-->
<!--                                    <b-badge variant="danger">3 <span class="sr-only">privilege escalation risks</span>-->
<!--                                    </b-badge>-->
<!--                                </b-list-group-item>-->
<!--                                <b-list-group-item class="d-flex justify-content-between align-items-center"-->
<!--                                                   :action="true">-->
<!--                                    Resource Exposure-->
<!--                                    <b-badge variant="warning">3 <span class="sr-only">resource exposure risks</span>-->
<!--                                    </b-badge>-->
<!--                                </b-list-group-item>-->
<!--                                <b-list-group-item class="d-flex justify-content-between align-items-center"-->
<!--                                                   :action="true">-->
<!--                                    Infrastructure Modification-->
<!--                                    <b-badge variant="info">3 <span-->
<!--                                            class="sr-only">infrastructure modification risks</span></b-badge>-->
<!--                                </b-list-group-item>-->
<!--                            </b-list-group>-->
<!--                        </b-col>-->
<!--                        &lt;!&ndash;                  <b-col>&ndash;&gt;-->
<!--                        &lt;!&ndash;                       <dt class="col-sm-8"></dt>&ndash;&gt;-->
<!--                        &lt;!&ndash;                  </b-col>&ndash;&gt;-->
<!--                        <p></p>-->
<!--                        <b-col>-->
<!--                            <h4>Metadata</h4>-->
<!--                            <dl class="row">-->
<!--                                <dt class="col-sm-3">Created</dt>-->
<!--                                <dd class="col-sm-9">2019-08-16 17:27:59+00:00</dd>-->

<!--                                <dt class="col-sm-3">ARN</dt>-->
<!--                                <dd class="col-sm-9 text-monospace">arn:aws:iam::012345678901:role/MyRole</dd>-->

<!--                            </dl>-->
<!--                        </b-col>-->
<!--                    </b-row>-->

<!--                </b-container>-->
<!--                &lt;!&ndash;                <div class="container">&ndash;&gt;-->
<!--                &lt;!&ndash;                    <div class="row px-2">&ndash;&gt;-->
<!--                &lt;!&ndash;                        <div class="col">&ndash;&gt;-->
<!--                &lt;!&ndash;                            <h4><small class="text-muted">{{ roleName }}</small></h4>&ndash;&gt;-->
<!--                &lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                        <div class="col">&ndash;&gt;-->
<!--                &lt;!&ndash;                            <button type="button"&ndash;&gt;-->
<!--                &lt;!&ndash;                                    class="btn btn-secondary collapsed"&ndash;&gt;-->
<!--                &lt;!&ndash;                                    aria-expanded="false"&ndash;&gt;-->
<!--                &lt;!&ndash;                                    v-bind:aria-controls="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'risk' + '.' + 'collapse'">Show&ndash;&gt;-->
<!--                &lt;!&ndash;                            </button>&ndash;&gt;-->
<!--                &lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    <div v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'risk' + '.' + 'collapse'"&ndash;&gt;-->
<!--                &lt;!&ndash;                         class="collapse show">&ndash;&gt;-->
<!--                &lt;!&ndash;                        <div class="row">&ndash;&gt;-->
<!--                &lt;!&ndash;                            <div class="col-lg-4">&ndash;&gt;-->
<!--                &lt;!&ndash;                                <h5>Risks</h5>&ndash;&gt;-->
<!--                &lt;!&ndash;                                <div class="list-group">&ndash;&gt;-->
<!--                &lt;!&ndash;                                    <div v-bind:key="riskName" v-for="riskName in riskNames">&ndash;&gt;-->
<!--                &lt;!&ndash;                                        <div class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">&ndash;&gt;-->
<!--                &lt;!&ndash;                                            {{ addSpacesInPascalCaseString(riskName) }}&ndash;&gt;-->
<!--                &lt;!&ndash;                                            <span class="badge badge-warning">{{ getRiskAssociatedWithPrincipal(roleName, "Role",&ndash;&gt;-->
<!--                &lt;!&ndash;                                            riskName).length }}&ndash;&gt;-->
<!--                &lt;!&ndash;                                                <span class="sr-only">{{ addSpacesInPascalCaseString(riskName) }} risks</span>&ndash;&gt;-->
<!--                &lt;!&ndash;                                            </span>&ndash;&gt;-->
<!--                &lt;!&ndash;                                        </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                                    </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                                </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                            </div>&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                <div v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'details'">&ndash;&gt;&ndash;&gt;-->

<!--                &lt;!&ndash;&lt;!&ndash;                    </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                    <h4 class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">{{ roleName }}</h4>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                    <h4 class="list-group-item-heading list-group-item active role-name">{{ roleName }}</h4>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                    &lt;!&ndash;Group item: Information&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                    <div class="list-group-item">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        <h4 class="list-group-item-heading">Information</h4>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        <div class="list-group-item-text item-margin">Creation date: {{ getPrincipalMetadata(roleName,&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                            'Role')['create_date'] }}&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        <div class="list-group-item-text item-margin">ARN: {{ getPrincipalMetadata(roleName,&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                            'Role')['id'] }}&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                &lt;!&ndash;                    &lt;!&ndash;Group item: Risks&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                    <div class="list-group-item d-flex justify-content-between align-items-center list-group-item-action">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        <h4 class="list-group-item-heading">Risks</h4>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        <div class="container">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                            <div v-bind:key="riskName" v-for="riskName in riskNames">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                <div class="row">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                    <b-list-group-item :action="true"&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                                       class="d-flex justify-content-between align-items-center">&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                        {{ addSpacesInPascalCaseString(riskName) }}&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                        <b-badge variant="info">{{ getRiskAssociatedWithPrincipal(roleName, "Role",&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                            riskName).length }}&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                            <span class="sr-only">{{addSpacesInPascalCaseString(riskName)}} risks</span>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                        </b-badge>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                        <br>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                    </b-list-group-item>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                <br>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                            </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                        </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                    </div>&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&ndash;&gt;-->
<!--                &lt;!&ndash;&lt;!&ndash;                                            </div>&ndash;&gt;&ndash;&gt;-->

<!--                &lt;!&ndash;                &lt;!&ndash;Role Trust Policy Group item&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                &lt;!&ndash;Instance Profiles Group item&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                &lt;!&ndash;Inline Policies&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                &lt;!&ndash;Managed Policies&ndash;&gt;&ndash;&gt;-->
<!--                &lt;!&ndash;                </div>&lt;!&ndash;role&ndash;&gt;&ndash;&gt;-->
<!--            </div>&lt;!&ndash;roles&ndash;&gt;-->
        </div><!--iam.roles-->
        <div id="iam.groups">
        </div><!--iam.groups-->
        <div id="iam.users">
        </div><!--iam.users-->
    </div>

</template>

<script>
    const principalsUtil = require('../util/principals');
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
            getRiskDefinition: function (riskType) {
                return glossary.getRiskDefinition(riskType)
            },
            addSpacesInPascalCaseString: function (s) {
                return otherUtil.addSpacesInPascalCaseString(s)
            },
        }
    }
</script>

<style scoped>

</style>