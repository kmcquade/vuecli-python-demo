<!-- Load required Bootstrap and BootstrapVue CSS -->
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap/dist/css/bootstrap.min.css"/>
<link type="text/css" rel="stylesheet" href="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.min.css"/>

<!-- Load the following for BootstrapVueIcons support -->
<!--  Bootstrap-->

<template>
    <div id="app">
        <div class="row">
            <div class="container">
                <nav id="navbar" class="navbar navbar-expand-sm sticky-top navbar-light bg-light">
                    <div class="navbar nav nav-tabs" id="nav-tab" role="tablist">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">Cloudsplaining</a>
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a class="nav-item nav-link active" id="nav-summary-tab" data-toggle="tab"
                                   href="#nav-summary" role="tab" aria-controls="nav-summary" aria-selected="true">Summary</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-customer-managed-tab" data-toggle="tab"
                                   href="#nav-customer-managed" role="tab" aria-controls="nav-customer-managed"
                                   aria-selected="false">Customer policies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-inline-policies-tab" data-toggle="tab"
                                   href="#nav-inline-policies" role="tab" aria-controls="nav-inline-policies"
                                   aria-selected="false">Inline policies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-aws-managed-tab" data-toggle="tab"
                                   href="#nav-aws-managed" role="tab" aria-controls="nav-aws-managed"
                                   aria-selected="false">AWS policies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-principals-tab" data-toggle="tab"
                                   href="#nav-principals" role="tab" aria-controls="nav-principals"
                                   aria-selected="false">IAM Principals</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-guidance-tab" data-toggle="tab"
                                   href="#nav-guidance" role="tab" aria-controls="nav-guidance"
                                   aria-selected="false">Guidance</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-item nav-link" id="nav-appendices-tab" data-toggle="tab"
                                   href="#nav-appendices" role="tab" aria-controls="nav-appendices"
                                   aria-selected="false">Appendices</a>
                            </li>
                            <!--GUIDANCE DROPDOWN-->
<!--                            <li class="nav-item dropdown">-->
<!--                                <a class="nav-link dropdown-toggle" id="nav-guidance-tab" data-toggle="dropdown"-->
<!--                                   href="#" role="button" aria-haspopup="true" aria-expanded="false">Guidance</a>-->
<!--                                <div class="dropdown-menu">-->
<!--                                    &lt;!&ndash;Triage Guidance&ndash;&gt;-->
<!--                                    <a class="dropdown-item" href="#triage-guidance"><b>Triaging</b></a>-->
<!--                                </div>-->
<!--                            </li>-->
                            <!--APPENDICES DROPDOWN-->
<!--                            <li class="nav-item dropdown">-->
<!--                                <a class="nav-link dropdown-toggle" id="nav-appendices-tab" data-toggle="dropdown"-->
<!--                                   href="#" role="tab" aria-haspopup="true" aria-expanded="false">Appendices</a>-->
<!--                                <div class="dropdown-menu">-->
<!--                                    <a class="dropdown-item" href="#appendices"><b>Appendix</b></a>-->
<!--                                </div>-->
<!--                            </li>-->
                        </ul><!--/end navbar list-->
                    </div><!-- /end navbar container -->
                </nav><!-- /end navbar -->

                <div class="row">
                    <div class="col-md-12">
                        <div data-spy="scroll" data-target="#navbar" data-offset="50">
                            <div class="tab-content" id="nav-tabContent">

                                <!--EXECUTIVE SUMMARY TAB-->
                                <div class="tab-pane fade show active" id="nav-summary" role="tabpanel"
                                     aria-labelledby="nav-summary-tab">
                                    <br>
                                    <Summary account-id="1234"/>

                                </div><!--/END SUMMARY TAB-->
                                <!--PRINCIPALS TAB-->
                                <div class="tab-pane fade" id="nav-principals" role="tabpanel"
                                     aria-labelledby="nav-principals-tab">
                                    <br>
                                    <Principals v-bind:iam_data="iam_data"/>

                                </div><!--/end PRINCIPALS TAB-->
                                <!--CUSTOMER-MANAGED TAB-->
                                <div class="tab-pane fade" id="nav-customer-managed" role="tabpanel"
                                     aria-labelledby="nav-customer-managed-tab">
                                    <br>
                                    <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="Customer"/>

                                </div><!--/end CUSTOMER-MANAGED TAB-->
                                <!--Inline policies TAB-->
                                <div class="tab-pane fade" id="nav-inline-policies" role="tabpanel"
                                     aria-labelledby="nav-inline-policies-tab">
                                    <br>
                                    <InlinePolicies v-bind:iam_data="iam_data"/>

                                </div><!--/end CUSTOMER-MANAGED TAB-->
                                <!--AWS-MANAGED TAB-->
                                <div class="tab-pane fade" id="nav-aws-managed" role="tabpanel"
                                     aria-labelledby="nav-aws-managed-tab">
                                    <br>
                                    <ManagedPolicies v-bind:iam_data="iam_data" managedPolicyType="AWS"/>
                                </div><!--/end AWS-MANAGED TAB-->

                                <div class="tab-pane fade" id="nav-guidance" role="tabpanel" aria-labelledby="nav-guidance-tab">
                                <Guidance />
                                </div>
                                <div class="tab-pane fade" id="nav-appendices" role="tabpanel" aria-labelledby="nav-appendices-tab">
                                    <br>
                                    <Glossary />
                                </div>
                            </div><!--/end Tab content-->

                        </div><!--/end data spy-->
                        <br><hr><br>
                        <Glossary />

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Summary from './components/Summary.vue';
    import ManagedPolicies from './components/ManagedPolicies';
    import InlinePolicies from './components/InlinePolicies'
    import Principals from './components/Principals'
    import Guidance from './components/Guidance'
    import Glossary from './components/Glossary'

    // This conditionally loads the local sample data if you are developing, but not if you are viewing the report
    // if (process.env.DEV_MODE) {
    // }

    var sampleData = require('./sampleData');
    let iam_data = sampleData.iam_data;

    export default {
        name: 'App',
        components: {
            Summary,
            ManagedPolicies,
            InlinePolicies,
            Principals,
            Guidance,
            Glossary
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
