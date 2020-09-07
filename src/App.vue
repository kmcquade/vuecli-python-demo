<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Report account-id="1234"/>
  </div>
</template>

<script src="sampleReportData.js"></script>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Report from './components/Report.vue'
import ReportMetadata from './components/ReportMetadata.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Report,
    ReportMetadata
  },
  // delimiters: ['${', '}'],
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
