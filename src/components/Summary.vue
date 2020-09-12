<template>
    <div class="report">
        <h3>Executive Summary</h3>
        <div style="text-align: justify">
        <!--Summary Text-->
        <p>
            <span v-html="summary"></span>
        </p>
        </div>
        <br>
    </div>
</template>

<script>
    var md = require('markdown-it')({
        html: true,
        linkify: true,
        typographer: true
    });
    import summaryRaw from "../assets/summary.md";

    const summary = md.render(summaryRaw);
    export default {
        name: "Summary",
        props: {
            accountId: String
        },
        computed: {
            summary() {
                return summary;
            }
        },
    }
</script>

<style scoped>

</style>