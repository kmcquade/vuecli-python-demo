<template>
    <div class="hello">
        <input id="dataExfiltration" type="checkbox" v-model="checkedNames" value="dataExfiltration">
        <label for="dataExfiltration">Data Exfiltration</label>
        <br>
        <input
                id="privilegeEscalation"
                type="checkbox"
                v-model="checkedNames"
                value="privilegeEscalation"
        >
        <label for="privilegeEscalation">Privilege Escalation</label>
        <br>
        <input id="resourceExposure" type="checkbox" v-model="checkedNames" value="resourceExposure">
        <label for="resourceExposure">Resource Exposure</label>
        <br>
        <input
                id="infrastructureModification"
                type="checkbox"
                v-model="checkedNames"
                value="infrastructureModification"
        >
        <label for="infrastructureModification">Infrastructure Modification</label>
        <br>
        <input
                id="leveragedBycomputeRole"
                type="checkbox"
                v-model="checkedNames"
                value="leveragedBycomputeRole"
        >
        <label for="leveragedBycomputeRole">Leveraged by Compute Role</label>
        <br>
        <span>Checked names: {{ checkedNames }}</span>
    </div>
</template>

<script>
    export default {
        name: "SelectByRisk",
        data() {
            return {
                checkedNames: []
            };
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
