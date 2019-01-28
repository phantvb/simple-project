<template>
    <!--新增/编辑受理弹窗-->
    <div class="addAcceptDialog">
        <el-dialog
                :title="businessIn==1?'新增受理':'编辑受理'"
                :visible.sync="visibleBusiness"
                v-if="visibleBusiness"
                width="80%"
                :before-close="handleClose">
            <div>
                <div class="steps">
                    <el-steps  :active="actives" align-center>
                        <el-step title="选择/新增企业基本信息"></el-step>
                        <el-step title="上传企业资料"></el-step>
                        <el-step title="填写业务资料"></el-step>
                        <el-step title="上传相关文件"></el-step>
                    </el-steps>
                </div>
                <step-one v-show="active==1" @childNext="step"></step-one>
                <step-two v-show="active==2" @childNext="step"></step-two>
                <step-three v-show="active==3" @childNext="step"></step-three>
                <step-four v-show="active==4" @childNext="step"></step-four>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import stepOne from './stepOne';
    import stepTwo from './stepTwo';
    import stepThree from './stepThree';
    import stepFour from './stepFour';
    export default {
        name: 'dialogBusiness',
        props:[

        ],
        data() {
            return{
                dialogVisibleBusiness:false,
                visibleBusiness:false,
                businessIn:1,
                active:1,
                actives:1,
                form:{
                    firmName:'',
                    phoneNum:'',
                    time:'',
                },
                acceptForm:{
                    firmName:'',
                    identityType:'',
                    firmNature:'',
                    firmGrade:'',
                    tradeType:'',
                    province:'',
                    city:'',
                    region:'',
                    detailedAddress:'',
                    businessPro:'',
                    businessCity:'',
                    businessRegion:'',
                    businessDetailAddr:'',
                    firmPhone:'',
                    legalName:'',
                    legalPhone:'',
                    legalIdentity:'',
                    legalIdentityNo:'',
                },
                loginResp:{},     //登录接口返回值
            }
        },
        created(){
            this.$root.eventHub.$on('dialogVisibleBusiness', (res)=>{
                this.visibleBusiness=res.visibleBusiness;
                console.log("asdasdas");
                this.actives = 1;
                this.active = 1;
                if(res.businessIn){
                    this.businessIn = res.businessIn;
                }
            } );
            this.$root.eventHub.$on('addAcceptSave', (resp)=>{
                this.visibleBusiness=false;
            });

        },
        components: {
            stepOne,
            stepTwo,
            stepThree,
            stepFour,
        },
        methods: {
            //弹窗关闭按钮
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            step(val){
                console.log(val);
                this.active = val;
                this.actives = val;
            },
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
