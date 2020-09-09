<template>
    <div class="report">
        <p>This report contains the security assessment results from <a href="https://github.com/salesforce/cloudsplaining">Cloudsplaining</a>, which maps out the IAM risk landscape in a report, identifies where resource ARN constraints are not used, and identifies other risks in IAM policies like Privilege Escalation, Resource Exposure, Infrastructure Modification, and Data Exfiltration. Remediating these issues, where necessary, will help to limit the blast radius in the case of compromised AWS credentials.
        </p>
        <br>
        {{ $store.state.user.username }}
        <br>
        <input
                id="infrastructureModification"
                type="checkbox"
                v-model="checkedNames"
                value="infrastructureModification"
                v-on:input="checkboxVal = $store.commit('changeName',{ newName: 'Jesus'})"

        >
        <br>
        <p>Account ID: {{ accountId }}</p>
    </div>
</template>

<script>

    export default {
        name: "Report",
        props: {
            accountId: String
        },
        mounted () {
            console.log(this.$store.getters.firstName);
        },
        data() {
            return {
                checkedNames: []
            };
        }
    }
</script>

<style scoped>

</style>