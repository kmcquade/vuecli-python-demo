<template>
<div>
    <h3>Principals</h3>
    <div id="iam.roles" v-bind:key="role" v-for="role in roles">
      <div class="row">
      <div v-bind:id="'iam.roles' + '.' + role.id + '.' + 'details'">
        <h4 class="list-group-item-heading list-group-item active role-name">{{ role.name }}</h4>
        <!--Group item: Information-->
        <div class="list-group-item">
          <h4 class="list-group-item-heading">Information</h4>
          <div class="list-group-item-text item-margin">Creation date: {{ role.create_date }}</div>
          <div class="list-group-item-text item-margin">ARN: {{ role.arn }}</div>
        </div>
        <!--Group item: Risks-->
        <div class="list-group-item">
          <h4 class="list-group-item-heading">Risks</h4>
          <div class="container">
            <div class="row">
              <!--TODO: Have a counter here for the number of risk types -->
            </div>
          </div>
          <!--{{ item }} - {{ key }} - {{ index }}-->
          <!--[] - DataExfiltration - 0-->
          <!--[] - ResourceExposure - 1-->
          <!--[] - PrivilegeEscalation - 2-->
          <!--[] - InfrastructureModification - 3-->
        </div>
        <!--Role Trust Policy Group item-->
        <div class="list-group-item">
          <h4 class="list-group-item-heading accordion-heading">Role Trust Policy<a
            class="badge float-right btn-info" data-toggle="collapse"
            v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'assume_role_policy'" role="button"
            aria-expanded="false"
            v-bind:aria-controls="'#iam.roles' + '.' + role.id + '.' + 'assume_role_policy'">Details</a>
          </h4>
          <div class="collapse"
               v-bind:id="'iam.roles' + '.' + role.id + '.' + 'assume_role_policy'">
            <div class="card card-body">
              <pre><code>{{ JSON.parse(JSON.stringify(role.assume_role_policy.PolicyDocument)) }}</code></pre>
            </div>
          </div>
        </div>
        <!--Instance Profiles Group item-->
        <div class="list-group-item">
          <div class="accordion"
               v-bind:id="'#' + 'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + 'accordion'">
            <!--If there is an instance profile, list the details-->
            <div v-if="role.instances_count > 0">
              <h4 class="list-group-item-heading accordion-heading">Instance Profiles<span
                class="badge float-right badge-dark">{{ role.instances_count }}</span>
              </h4>
              <div v-for="instance_profile in role.instance_profiles" :key='instance_profile.name'>
                <h5 class="list-group-item-heading accordion-heading">
                  <samp>{{ instance_profile.name }}</samp>
                  <a class="accordion-toggle collapsed" data-toggle="collapse"
                     v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name"
                     aria-expanded="false">
                    <span class="badge float-right btn-info">Details</span>
                  </a>
                </h5>
                <div
                  v-bind:id="'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name"
                  class="accordion-body item-margin collapse">
                  <div class="accordion-inner">
                    <!--Show the details for each instance
                    key: i-01aa2bb3333cc4444
                    item: Object with all the metadata
                    index: Index of the loop
                    -->
 // eslint-disable-next-line vue/no-unused-vars
                    <div v-for="(item, key, index) in instance_profile.instances">
                      <div class="card">
                        <div class="card-header"
                             v-bind:id="'iam.roles' + '.' + role.id + + '.' + 'instance-profiles' + '.' + instance_profile.name">
                          <h5 class="mb-0">
                            <button class="btn btn-link"
                                    data-toggle="collapse"
                                    v-bind:data-target="'#' + 'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name + '.' + key + 'collapse'"
                                    aria-expanded="false"
                                    v-bind:aria-controls="'#' + 'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name + '.' + key + 'collapse'"
                            >
                              {{ key }}
                            </button>
                          </h5>
                        </div>
                        <div
                          v-bind:id="'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name + '.' + key + 'collapse'"
                          class="collapse"
                          aria-expanded="false"
                          v-bind:aria-labelled-by="'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + instance_profile.name"
                          v-bind:data-parent="'#' + 'iam.roles' + '.' + role.id + '.' + 'instance-profiles' + '.' + 'accordion'"
                        >
                          <div class="card-body">
                            <ul>
                              <li>Instance ID: {{ item.id }}</li>
                              <li>Key name: {{ item.KeyName }}</li>
                              <li>Instance Type: {{ item.InstanceType }}</li>
                              <li>Launch Time: {{ item.LaunchTime }}</li>
                              <li>Subnet ID: {{ item.SubnetId }}</li>
                              <li>Metadata Options:
                                <ul>
                                  <li>HttpEndpoint: {{ item.metadata_options.HttpEndpoint }}</li>
                                  <li>HttpPutResponseHopLimit:
                                    {{item.metadata_options.HttpPutResponseHopLimit}}
                                  </li>
                                  <li>HttpTokens: {{ item.metadata_options.HttpTokens }}</li>
                                  <li>State: {{ item.metadata_options.State }}</li>
                                </ul>
                              </li>
                              <!-- TODO: Add a pop-up for the userdata if it exists-->
                              <li>Userdata:
                                <pre><code> {{ item.user_data }}</code></pre>
                              </li>
                              <li v-for="(eni_item, eni_key, eni_index) in item.network_interfaces">
                                Security groups:
                                <ul>
                                  <li v-for="(sg_item, sg_key, sg_index) in eni_item.Groups">{{
                                    eni_key }}
                                    <ul>
                                      <!--TODO: Make this a pop-up like in ScoutSuite. I will just outline the hierarchy here.-->
                                      <li>Group Name: "{{ sg_item.GroupName }}"
                                        <ul>
                                          <li>Group ID: ({{ sg_item.GroupId }})</li>
                                          <li>Region: (placeholder)</li>
                                          <li>VPC: (placeholder)</li>
                                          <li>Description: (placeholder)</li>
                                          <li>Rules:
                                            <ul>
                                              <li>Ingress Rules:
                                                <ul>
                                                  <li>ALL
                                                    <ul>
                                                      <li>Ports:
                                                        <ul>
                                                          <li>1-65535
                                                            <ul>IP Addresses:
                                                              <li>0.0.0.0/0</li>
                                                            </ul>
                                                          </li>
                                                        </ul>
                                                      </li>
                                                    </ul>
                                                  </li>
                                                  <!--TODO: Make this the same as above, but for TCP and UDP-->
                                                  <li>TCP</li>
                                                  <li>UDP</li>
                                                </ul>
                                              </li>
                                              <li>Egress Rules:
                                              </li>
                                            </ul>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h4 class="list-group-item-heading accordion-heading">Instance Profiles<span
                class="badge float-right badge-light disabled">{{ role.instances_count }}</span>
              </h4>
            </div>
          </div>
        </div>
        <!--Inline Policies-->
        <div class="list-group-item">
          <div class="accordion">
            <div v-if="role.inline_policies_count > 0">
              <h4 class="list-group-item-heading accordion-heading">Inline Policies <span
                class="badge float-right badge-dark">{{ role.inline_policies_count }}</span></h4>
              <div v-for="inline_policy in role.inline_policies" :key='inline_policy.name'>
                <h5 class="list-group-item-heading accordion-heading">
                  <samp>{{ inline_policy.name }}</samp>
                  <a class="accordion-toggle collapsed" data-toggle="collapse"
                     v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'inline-policies' + '.' + inline_policy.name"
                     aria-expanded="false">
                    <span class="badge float-right btn-info">Details</span>
                  </a>
                </h5>

                <div
                  v-bind:id="'iam.roles' + '.' + role.id + '.' + 'inline-policies' + '.' + inline_policy.name"
                  class="accordion-body item-margin collapse">
                  <div class="accordion-inner">
                    <pre><code>{{ JSON.parse(JSON.stringify(inline_policy.PolicyDocument)) }}</code></pre>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <h4 class="list-group-item-heading accordion-heading">Inline Policies <span
                class="badge float-right badge-light disabled">{{ role.inline_policies_count }}</span>
              </h4>
            </div>
          </div>
        </div>
        <!--Managed Policies-->
        <div class="list-group-item">
          <div class="accordion"
               v-bind:id="'#' + 'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' +'accordion'">
            <!--If there is a managed policy attached, list the details-->
            <div v-if="role.policies_count > 0">
              <h4 class="list-group-item-heading accordion-heading">Managed Policies <span
                class="badge float-right badge-dark">{{ role.policies_count }}</span>
              </h4>
              <div v-for="managed_policy in role.policies">
                <h5 class="list-group-item-heading accordion-heading">
                  <samp>{{ managed_policy.PolicyName }}</samp>
                  <a class="accordion-toggle collapsed"
                     data-toggle="collapse"
                     v-bind:href="'#iam.roles' + '.'  + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName"
                     aria-expanded="false"
                  >
                    <span class="badge float-right btn-info">Details</span>
                  </a>
                </h5>
                <div
                  v-bind:id="'iam.roles' + '.' + role.id +  '.' + 'managed-policies' + '.' + managed_policy.PolicyName"
                  class="accordion-body item-margin collapse">
                  <div class="accordion-inner">
                    <ul>
                      <li>Policy Name: {{ managed_policy.PolicyName }}</li>
                      <li>Policy Id: {{ managed_policy.PolicyId }}</li>
                      <li>Policy ARN: {{ managed_policy.Arn }}</li>
                      <li>Path: {{ managed_policy.Path }}</li>
                      <li>Create Date: {{ managed_policy.CreateDate }}</li>
                      <li>Update Date: {{ managed_policy.UpdateDate }}</li>
                    </ul>
                    <!--Policy Document-->
                    <div
                      v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.policydocument.card'">
                      <div class="card">
                        <div class="card-header">
                          <a class="card-link" data-toggle="collapse"
                             v-bind:data-parent="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.policydocument.card'"
                             v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.policydocument.details'"
                          >Policy Document</a>
                        </div>
                        <div
                          v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.policydocument.details'"
                          class="panel-collapse collapse">
                          <div class="card-body">
                            <pre><code>{{ JSON.parse(JSON.stringify(managed_policy.PolicyVersionList[0].Document)) }}</code></pre>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Privilege Escalation details-->
                    <div v-if="managed_policy.PrivilegeEscalation.length < 2">
                      <div
                        v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.privilegeescalation.card'">
                        <div class="card">
                          <div class="card-header">
                            <a class="card-link" data-toggle="collapse"
                               v-bind:data-parent="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.privilegeescalation.card'"
                               v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.privilegeescalation.details'"
                            >Privilege Escalation</a>
                          </div>
                          <div
                            v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.privilegeescalation.details'"
                            class="panel-collapse collapse">
                            <div class="card-body">
                              <pre><code>{{ managed_policy.PrivilegeEscalation }}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Data Exfiltration-->
                    <div v-if="managed_policy.DataExfiltration">
                      <div
                        v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.dataexfiltration.card'">
                        <div class="card">
                          <div class="card-header">
                            <a class="card-link" data-toggle="collapse"
                               v-bind:data-parent="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.dataexfiltration.card'"
                               v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.dataexfiltration.details'"
                            >Data Exfiltration</a>
                          </div>
                          <div
                            v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.dataexfiltration.details'"
                            class="panel-collapse collapse">
                            <div class="card-body">
                              <pre><code>{{ managed_policy.DataExfiltration }}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Resource Exposure-->
                    <div v-if="managed_policy.ResourceExposure">
                      <div
                        v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.resourceexposure.card'">
                        <div class="card">
                          <div class="card-header">
                            <a class="card-link" data-toggle="collapse"
                               v-bind:data-parent="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.resourceexposure.card'"
                               v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.resourceexposure.details'"
                            >Resource Exposure</a>
                          </div>
                          <div
                            v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.resourceexposure.details'"
                            class="panel-collapse collapse">
                            <div class="card-body">
                              <pre><code>{{ managed_policy.PermissionsManagementActions }}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--Infrastructure Modification-->
                    <div v-if="managed_policy.InfrastructureModification">
                      <div
                        v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.infrastructuremodification.card'">
                        <div class="card">
                          <div class="card-header">
                            <a class="card-link" data-toggle="collapse"
                               v-bind:data-parent="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.infrastructuremodification.card'"
                               v-bind:href="'#iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.infrastructuremodification.details'"
                            >Infrastructure Modification</a>
                          </div>
                          <div
                            v-bind:id="'iam.roles' + '.' + role.id + '.' + 'managed-policies' + '.' + managed_policy.PolicyName + '.' + 'finding.infrastructuremodification.details'"
                            class="panel-collapse collapse">
                            <div class="card-body">
                              <pre><code>{{ managed_policy.InfrastructureModification }}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--If there are no managed policies attached-->
            <div v-else>
              <h4 class="list-group-item-heading accordion-heading">Managed Policies <span
                class="badge float-right badge-light disabled">{{ role.policies_count }}</span>
              </h4>
            </div>
          </div>
        </div>

        <br>
        <br>
      </div>
    </div><!--iam.roles-->
  <div id="iam.groups">
  </div><!--iam.groups-->
  <div id="iam.users">
  </div><!--iam.users-->
    </div><!--row-->
</div><!--principals-->

</template>

<script>
    export default {
      name: "Principals",
      props: {
        iam_data: {
            type: Object
      },
      }
    }
</script>

<style scoped>

</style>