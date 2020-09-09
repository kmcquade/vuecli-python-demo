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
            <tabs :mode="mode">
              <tab title="Summary">
                <Report account-id="1234"/>
              </tab>
              <tab title="AWS-Managed Policies">
                <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="AWS" />
              </tab>
              <tab title="Customer-Managed Policies">
                <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer"/>
              </tab>
              <tab title="Inline Policies"><InlinePolicies v-bind:iam_data="iam_data"/></tab>
              <tab title="Definitions">Definitions</tab>
            </tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="sampleData.js"></script>
<script>
import Report from './components/Report.vue';
import ReportMetadata from './components/ReportMetadata.vue';
import ManagedPolicies from './components/ManagedPolicies';
import InlinePolicies from './components/InlinePolicies'
import Tab from "./components/Tab.vue";
import Tabs from "./components/Tabs.vue";

// This conditionally loads the local sample data if you are developing, but not if you are viewing the report
// if (process.env.DEV_MODE) {
// }

// import iam_data from '@/sampleData'
var sampleData = require('./sampleData');
let iam_data = sampleData.iam_data;

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Report,
    ReportMetadata,
    ManagedPolicies,
    InlinePolicies,
    Tab,
    Tabs
  },

  data() {
    return {
        sharedState: iam_data,
        mode: "dark"
     };
  },
  computed: {
    iam_data() {
      return this.sharedState
    }
  },
  methods: {
    changeStyle() {
      if (this.mode === "dark") {
        this.mode = "light";
      } else {
        this.mode = "dark";
      }
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
