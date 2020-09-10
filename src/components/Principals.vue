<template>
<div>
        <div class="container">
        <div class="row">
          <div class="col-md-12">
    <h2>Principals</h2>
  <br>
  <div>
    <h3>Roles</h3>
    <div id="iam.roles" v-bind:key="roleName" v-for="roleName in roleNames">
      <div class="row">
      <div v-bind:id="'iam.roles' + '.' + getPrincipalMetadata(roleName, 'Role')['id'] + '.' + 'details'">
        <h4 class="list-group-item-heading list-group-item active role-name">{{ roleName }}</h4>
        <!--Group item: Information-->
        <div class="list-group-item">
          <h4 class="list-group-item-heading">Information</h4>
          <div class="list-group-item-text item-margin">Creation date: {{ getPrincipalMetadata(roleName, 'Role')['create_date'] }}</div>
          <div class="list-group-item-text item-margin">ARN: {{ getPrincipalMetadata(roleName, 'Role')['id'] }}</div>
        </div>
        <!--Group item: Risks-->
        <div class="list-group-item">
          <h4 class="list-group-item-heading">Risks</h4>
          <div class="container">
              <div v-bind:key="riskName" v-for="riskName in riskNames">
            <div class="row">
                <b-list-group-item class="d-flex justify-content-between align-items-center" :action="true">
                  {{ addSpacesInPascalCaseString(riskName) }}
                  <b-badge variant="info">{{ getRiskAssociatedWithPrincipal(roleName, "Role", riskName).length }}
                    <span class="sr-only">{{addSpacesInPascalCaseString(riskName)}} risks</span></b-badge>
                  <br>
                </b-list-group-item>
            </div>
                <br>
              </div>
            </div>
          </div>
      </div>
          <!--{{ item }} - {{ key }} - {{ index }}-->
          <!--[] - DataExfiltration - 0-->
          <!--[] - ResourceExposure - 1-->
          <!--[] - PrivilegeEscalation - 2-->
          <!--[] - InfrastructureModification - 3-->
      </div> <!--row-->
        <!--Role Trust Policy Group item-->
        <!--Instance Profiles Group item-->
        <!--Inline Policies-->
        <!--Managed Policies-->

      </div><!--role-->
    </div><!--iam.roles-->
  </div>

  <div id="iam.groups">
  </div><!--iam.groups-->
  <div id="iam.users">
  </div><!--iam.users-->
    </div><!--row-->
        </div>
</div>
<!--</div>&lt;!&ndash;principals&ndash;&gt;-->

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
        getPrincipalMetadata: function(principalName, principalType) {
          return principalsUtil.getPrincipalMetadata(this.iam_data, principalName, principalType)
        },
        getPrincipalPolicies: function(principalName, principalType, policyType) {
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