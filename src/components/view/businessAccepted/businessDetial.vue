<template>
    <div id="businessDetial">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 业务详情
                <div style="float:right;color:#FF6600">{{"【"+this.$route.query.status+"】"}}</div>
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
                审核流程 > 业务审核
            </header>
            <div class="block underline">
                <div class="step">
                    <el-steps direction="vertical" :active="1">
                        <el-step :title="item.assginee" :description="'递交'+item.operateTime" v-for="item in flowRecordList"></el-step>
                    </el-steps>
                </div>
                <button class="pass" v-if="passShow"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
            </div>
            <!--v-if="($route.query.status=='Company_Auditing'||$route.query.status=='Canceling_Auditing'||$route.query.status=='Modify_Auditing')&&baseData.roleName=='ROLE_admin'"-->
            <el-input v-model="desc"
                      v-if="($route.query.status=='审核中'||$route.query.status=='变更审核中'||$route.query.status=='注销审核')&&baseData.roleName=='ROLE_admin'"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入审核意见"
                      >

            </el-input>
            <div class="block">
                <router-link :to="{path:'/businessAccepted/400businessManage'}">
                    <button class="pass passback">返回</button>
                </router-link>
                <div>
                    <button class="fleft passgo" style="width:100%" v-if="this.$route.query.status=='等待送审'" @click="submit()">送审</button>
                    <button class="fleft passgo" v-if="this.$route.query.status=='审核中'" @click="businessAuditPass()">通过审核</button>
                    <button class="fright passback" v-if="this.$route.query.status=='审核中'">驳回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import FirmBasicInfo from './firmBasicInfo';
    import BusinessData from './businessData';
    import {mapState} from "vuex";
    export default {
        name: 'businessDetial',
        data() {
            return {
                passShow:false,
                entireFlowId:'',
                flowRecordList:[],
                desc:'',
                baseData:{
                    roleName:'',
                    username:'',
                },
            };
        },
        components: {
            FirmBasicInfo,
            BusinessData
        },
        created(){
            this.baseData.roleName = sessionStorage.getItem("roleName");
            this.baseData.username = sessionStorage.getItem("username");
            console.log("roleName",this.baseData.roleName);
            console.log("username",this.baseData.username);
            console.log(sessionStorage.getItem('entireFlowId'));
            console.log("this.$route.query",this.$route.query);
            console.log(this.$route.query.status);

            console.log(this.$route.query.type);

            console.log(this.$route.query.creators);

            this.entireFlowId = sessionStorage.getItem('entireFlowId');
            console.log(this.entireFlowId);
            this.getCacheData()
        },
        methods: {
            getCacheData(){
                this.$ajax.get('/vos/business/getCacheData?flowId='+this.entireFlowId).then((res)=>{
                    console.log("详情",res);
                    if(res.data!=null){
                        console.log("flowRecord",res.data.flowRecord);
                        this.flowRecordList = res.data.flowRecord;
                    }
                })
            },
            //通过审核
            businessAuditPass(){
                this.$ajax.post('/vos/business/businessAuditPass',{
                    "companyFlow":{
                        "flowId":this.entireFlowId,
                        "assigneeRole": this.$route.query.assigneeRole,
                        "creator":this.$route.query.creators,
                    },
                    "message":this.desc   //输入框信息
                }).then((res)=>{
                    if(res.code == 200){
                        this.passShow = true;
                        console.log(res);
                    }
                })
            },
            // 各种送审
            submit(){
                if(this.$route.query.type=='业务'){

                }else if(this.$route.query.type=='目的码'){

                }else if(this.$route.query.type=='目的码'){

                }
            }
        },
        computed: {
            ...mapState({
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
