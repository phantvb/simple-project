<template>
    <div id="addAcceptDialog">
        <!--新增/编辑受理弹窗-->
        <div class="addAcceptDialog">
            <el-dialog
                    :title="businessIn==1?'新增受理':'编辑受理'"
                    :visible.sync="dialogVisible"
                    width="80%"
                    :before-close="handleClose">
                <div>
                    <div class="steps">
                        <el-steps  :active="1" align-center>
                            <el-step title="选择/新增企业基本信息"></el-step>
                            <el-step title="上传企业资料"></el-step>
                            <el-step title="填写业务资料"></el-step>
                            <el-step title="上传相关文件"></el-step>
                        </el-steps>
                    </div>
                    <step-one v-if="active==1" @next="step"></step-one>
                    <step-two v-if="active==2" @next="step"></step-two>
                    <step-three v-if="active==3" @next="step"></step-three>
                    <step-four v-if="active==4" @next="step"></step-four>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import stepOne from './stepOne';
    import stepTwo from './stepTwo';
    import stepThree from './stepThree';
    import stepFour from './stepFour';
    export default {
        name: 'addAcceptDialog',
        data() {
            return {
                dialogVisible:false,
                businessIn:1,
                active:1,
            };
        },
        components: {
            stepOne,
            stepTwo,
            stepThree,
            stepFour
        },
        methods: {},
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
