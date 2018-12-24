<template>
    <div id="logoutDetail">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 注销审核详情
                <div style="float:right;color:#FF6600">【待审核】</div>
            </header>
            <div class="logoutDetailTab">
                <el-tabs type="border-card">
                    <el-tab-pane label="企业基本信息">
                        <firmBasicInfo></firmBasicInfo>
                    </el-tab-pane>
                    <el-tab-pane label="业务资料">
                        <businessData></businessData>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div id="progress">
            <header class="left">
                审核流程 > 目的码审核
            </header>
            <div class="block underline">
                <div class="step">
                    <el-steps direction="vertical" :active="1">
                        <el-step title="业务员(姚明)" description="递交 12月08日 16:59"></el-step>
                        <el-step title="管理员" description="审批 12月08日 16:59"></el-step>
                    </el-steps>
                </div>
                <button class="pass"><i class="el-icon-circle-check"
                                        style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过
                </button>
            </div>
            <div class="block">
                <button class="pass passback">撤回</button>
                <div>
                    <button class="fleft passgo">送审</button>
                    <button class="fright passback">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FirmBasicInfo from './firmBasicInfo';
    import BusinessData from './businessData';
    export default {
        name: 'logoutDetail',
        data() {
            return {
            };
        },
        components: {
            FirmBasicInfo,
            BusinessData
        },
        created(){

        },
        methods: {},
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
