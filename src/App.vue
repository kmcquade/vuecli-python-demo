<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<!--  Bootstrap-->

<template>

  <div id="app">
    <div class="row">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <img alt="Vue logo" src="./assets/logo.png">
            <Report account-id="1234"/>
            <ReportMetadata account-id="1234" reportDate="2020-09-07"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ReportMetadata from "./components/ReportMetadata";
  export default {
    components: {ReportMetadata}
  }
</script>

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

<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>


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
