<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>

<!--  Bootstrap-->

<template>
  <div id="app">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h1>Cloudsplaining</h1>
            <Report account-id="1234"/>
            <ReportMetadata account-id="1234" reportDate="2020-09-07"/>
            <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="AWS" />
            <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer"/>
            <InlinePolicies v-bind:iam_data="iam_data"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="sampleData.js"></script>
<script>
import Report from './components/Report.vue'
import ReportMetadata from './components/ReportMetadata.vue'
import ManagedPolicies from './components/ManagedPolicies'
import InlinePolicies from './components/InlinePolicies'

// This conditionally loads the local sample data if you are developing, but not if you are viewing the report
// if (process.env.DEV_MODE) {
// }

// import iam_data from '@/sampleData'
var sampleData = require('./sampleData');
let iam_data = sampleData.iam_data

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Report,
    ReportMetadata,
    ManagedPolicies,
    InlinePolicies
  },

  data() {
    return {
        sharedState: iam_data,
        // sharedState: window.__REPORT2__ || {},
     };
  },
  computed: {
    iam_data() {
      return this.sharedState
    }
  }
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
