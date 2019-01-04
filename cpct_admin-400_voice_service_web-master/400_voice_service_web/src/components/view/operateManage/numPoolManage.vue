<template>
    <div id="numPoolManage">
        <header>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
                <el-breadcrumb-item>号码池管理</el-breadcrumb-item>
            </el-breadcrumb>
        </header>
        <div style="margin-top: 15px">
            <el-tabs type="border-card" v-model="status">
                <el-tab-pane label="可用的号码" name="CanUse">
                    <usableNum :status="status"></usableNum>
                </el-tab-pane>
                <el-tab-pane label="审核中的号码" name="Auditing">
                    <auditNum></auditNum>
                </el-tab-pane>
                <el-tab-pane label="使用中的号码" name="Used">
                    <usingNum></usingNum>
                </el-tab-pane>
                <el-tab-pane label="引示号管理" name="Citation">
                    <citationNum></citationNum>
                </el-tab-pane>
                <el-tab-pane label="冷冻期号码" name="Freeze">
                    <freezingNum></freezingNum>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import usableNum from './numPoolManageElement/usableNum';
    import auditNum from './numPoolManageElement/auditNum';
    import usingNum from './numPoolManageElement/usingNum';
    import citationNum from './numPoolManageElement/citationNum';
    import freezingNum from './numPoolManageElement/freezingNum';

    export default {
        name: 'numPoolManage',
        components: {
            usableNum,
            auditNum,
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
        }

    }
</script>


<style lang="scss" scoped>
    @import "./numPoolManage";
</style>
