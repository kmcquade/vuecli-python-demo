<template>
    <div class="report">
        <p>This report contains the security assessment results from <a href="https://github.com/salesforce/cloudsplaining">Cloudsplaining</a>, which maps out the IAM risk landscape in a report, identifies where resource ARN constraints are not used, and identifies other risks in IAM policies like Privilege Escalation, Resource Exposure, Infrastructure Modification, and Data Exfiltration. Remediating these issues, where necessary, will help to limit the blast radius in the case of compromised AWS credentials.
        </p>
        <br>
        <br>
        <p>Account ID: {{ accountId }}</p>
    </div>
</template>

<script>
    export default {
        name: "Summary",
        props: {
            accountId: String
        }
    }
</script>

<style scoped>

</style>