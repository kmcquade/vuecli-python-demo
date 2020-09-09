<!-- Load required Bootstrap and BootstrapVue CSS -->
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>

<!-- Load the following for BootstrapVueIcons support -->
<!--  Bootstrap-->

<template>
  <div id="app">
    <div class="row">
      <div class="container">
<!--        <div class="row">-->
<!--          <div class="col-md-12">-->
            <h1>Cloudsplaining</h1>

  <!-- Tabs with card integration -->
  <b-card no-block>
    <b-tabs card ref="tabs" content-class="mt-3" fill v-model="tabIndex">
        <b-tab title="Summary">
        <Summary account-id="1234"/>
        </b-tab>
        <b-tab title="AWS-Managed Policies">
        <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="AWS" />
        </b-tab>
        <b-tab title="Customer-Managed Policies">
        <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer" />
        </b-tab>
        <b-tab title="Inline Policies">
        <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer" />
        </b-tab>
        <b-tab title="Principals">
            Principal data should go here.
        </b-tab>
        <b-tab title="Definitions">
        Definitions should go here
        </b-tab>
    </b-tabs>
  </b-card>
<!--            <tabs :mode="mode">-->
<!--              <tab title="Summary">-->
<!--                <Report account-id="1234"/>-->
<!--              </tab>-->
<!--              <tab title="AWS-Managed Policies">-->
<!--                <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="AWS" />-->
<!--              </tab>-->
<!--              <tab title="Customer-Managed Policies">-->
<!--                <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer"/>-->
<!--              </tab>-->
<!--              <tab title="Inline Policies"><InlinePolicies v-bind:iam_data="iam_data"/></tab>-->
<!--              <tab title="Definitions">Definitions</tab>-->
<!--            </tabs>-->
          </div>
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script src="sampleData.js"></script>
<script>
import Summary from './components/Summary.vue';
import ReportMetadata from './components/ReportMetadata.vue';
import ManagedPolicies from './components/ManagedPolicies';
import InlinePolicies from './components/InlinePolicies'

// This conditionally loads the local sample data if you are developing, but not if you are viewing the report
// if (process.env.DEV_MODE) {
// }

// import iam_data from '@/sampleData'
var sampleData = require('./sampleData');
let iam_data = sampleData.iam_data;

export default {
  name: 'App',
  components: {
    Summary,
    ReportMetadata,
    ManagedPolicies,
    InlinePolicies,
  },

  data() {
    return {
        sharedState: iam_data,
     };
  },
  computed: {
    iam_data() {
      return this.sharedState
    }
  },
  methods: {}
  // delimiters: ['${', '}'],
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
