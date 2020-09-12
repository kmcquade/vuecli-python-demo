<template>
  <div id="main">

      <b-navbar toggleable="md" variant="faded">
        <b-navbar-brand href="#" @click="activeSection = 0">
          <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
          Cloudsplaining
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
                :active="activeSection === 'custom-policies'"
                @click="activeSection = 1"
                href="#">Customer Policies
            </b-nav-item>
            <b-nav-item
                :active="activeSection === 'inline-policies'"
                @click="activeSection = 2"
                href="#">Inline Policies
            </b-nav-item>
            <b-nav-item
                :active="activeSection === 'aws-policies'"
                @click="activeSection = 3"
                href="#">AWS Policies
            </b-nav-item>
            <b-nav-item
                :active="activeSection === 'iam-principals'"
                @click="activeSection = 4"
                href="#">IAM Principals
            </b-nav-item>
            <b-nav-item
                :active="activeSection === 'guidance'"
                @click="activeSection = 5"
                href="#">Guidance
            </b-nav-item>
            <b-nav-item
                :active="activeSection === 'appendices'"
                @click="activeSection = 6"
                href="#">Appendices
            </b-nav-item>


          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-text><strong>Account ID</strong> 123456789012</b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    <b-container class="mt-3 pb-3 report">
      <b-tabs v-model="activeSection" nav-class="d-none">
        <b-tab key="summary">
          <Summary v-bind:iam_data="iam_data" :policy-filter="policyFilter"/>
        </b-tab>
        <b-tab key="custom-policies">
          <h3>Customer-Managed Policies</h3>
          <PolicyTable v-bind:policyNameMapping="getManagedPolicyNameMapping('Customer')"/>
          <ManagedPolicies v-bind:iam_data="iam_data" managedBy="Customer"/>
        </b-tab>
        <b-tab key="inline-policies">
          <h3>Inline Policies</h3>
          <PolicyTable v-bind:policyNameMapping="getInlinePolicyNameMapping()"/>
          <InlinePolicies v-bind:iam_data="iam_data"/>
        </b-tab>
        <b-tab key="aws-policies">
          <h3>AWS-Managed Policies</h3>
          <PolicyTable v-bind:policyNameMapping="getManagedPolicyNameMapping('AWS')"/>
          <ManagedPolicies v-bind:iam_data="iam_data" managedBy="AWS"/>
        </b-tab>
        <b-tab key="iam-principals">
          <Principals v-bind:iam_data="iam_data"/>
        </b-tab>
        <b-tab key="guidance">
          <Guidance/>
        </b-tab>
        <b-tab id="appendices">
          <Glossary/>
        </b-tab>


      </b-tabs>
    </b-container>
    <b-container>
      <b-row class="mt-5">
        <b-col class="text-center text-muted">
          Report Generated: 2020-08-06 &diamond;
          Cloudsplaining version:
          <b-link href="https://github.com/salesforce/cloudsplaining">0.1.6</b-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Summary from './components/Summary.vue';
import ManagedPolicies from './components/ManagedPolicies';
import InlinePolicies from './components/InlinePolicies'
import Principals from './components/Principals'
import Guidance from './components/Guidance'
import Glossary from './components/Glossary'
import PolicyTable from './components/PolicyTable'
const managedPoliciesUtil = require('./util/managed-policies');
const inlinePoliciesUtil = require('./util/inline-policies');
// This conditionally loads the local sample data if you are developing, but not if you are viewing the report
// if (process.env.DEV_MODE) {
// }

const {iam_data} = require('./sampleData');
function getManagedPolicyNameMapping(managedBy) {
    return managedPoliciesUtil.getManagedPolicyNameMapping(iam_data, managedBy)
}

function getInlinePolicyNameMapping() {
    return inlinePoliciesUtil.getInlinePolicyNameMapping(iam_data)
}

export default {
  name: 'App',
  components: {
    Summary,
    ManagedPolicies,
    InlinePolicies,
    Principals,
    Guidance,
    Glossary,
    PolicyTable
  },

  data() {
    return {
      sharedState: iam_data,
      policyFilter: "none",
      activeSection: 0
    };
  },
  computed: {
    iam_data() {
      return this.sharedState
    }
  },
  methods: {
    getManagedPolicyNameMapping: function (managedBy) {
        return getManagedPolicyNameMapping(managedBy)
    },
    getInlinePolicyNameMapping: function () {
        return getInlinePolicyNameMapping()
    }
  }
}
</script>

<style>
#main {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
