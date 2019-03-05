<template>
    <div id="numPoolManage">
        <header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>号码池管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div style="margin-top: 15px">
            <el-tabs type="border-card" v-model="status" @tab-click="handleClick">
                <el-tab-pane label="可用的号码" name="CanUse">
                    <usableNum @exportNumber400="exportNumber400"></usableNum>
                </el-tab-pane>
                <el-tab-pane label="审核中的号码" name="Auditing">
                    <auditAndUsedNum ref="Auditing" @exportNumber400="exportNumber400"></auditAndUsedNum>
                </el-tab-pane>
                <el-tab-pane label="使用中的号码" name="Used">
                    <auditAndUsedNum ref="Used" @exportNumber400="exportNumber400"></auditAndUsedNum>
                </el-tab-pane>
                <el-tab-pane label="引示号管理" name="Citation">
                    <citationNum @exportGuideNumber="exportGuideNumber"></citationNum>
                </el-tab-pane>
                <el-tab-pane label="冷冻期号码" name="Freeze">
                    <freezingNum @exportNumber400="exportNumber400"></freezingNum>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import usableNum from './numPoolManageElement/usableNum';
    import auditAndUsedNum from './numPoolManageElement/auditAndUsedNum';
    import usingNum from './numPoolManageElement/usingNum';
    import citationNum from './numPoolManageElement/citationNum';
    import freezingNum from './numPoolManageElement/freezingNum';

    export default {
        name: 'numPoolManage',
        components: {
            usableNum,
            auditAndUsedNum,
            usingNum,
            citationNum,
            freezingNum
        },
        data() {
            return {
                page: {
                    currentPage: 1,
                    size: 10,
                    total: 1
                },
                status: 'CanUse'
            }
        },
        methods: {
            handleClick(tab, event) {
                if (tab.name == 'Auditing') {
                    this.$refs.Auditing.loadData(tab.name);
                }
                if (tab.name == 'Used') {
                    this.$refs.Used.loadData(tab.name);
                }
            },
            exportNumber400() {
                const url = this.$global.serverSrc+'/excel/number400';
                window.open(url, '_blank');
            },
            exportGuideNumber() {
                const url = this.$global.serverSrc+'/excel/guideNumber';
                window.open(url, '_blank');
            }
        }

    }
</script>


<style lang="scss" scoped>
    @import "./numPoolManage";
</style>
