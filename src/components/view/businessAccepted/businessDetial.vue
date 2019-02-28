<template>
    <div id="businessDetial">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 业务详情
                <div style="float:right;color:#FF6600">{{"【"+queryStatus+"】"}}</div>
            </header>
            <div class="logoutDetailTab">
                <el-tabs type="border-card">
                    <el-tab-pane label="企业基本信息">
                        <firmBasicInfo :companyInfos = companyInfo></firmBasicInfo>
                    </el-tab-pane>
                    <el-tab-pane label="业务资料">
                        <businessData :companyInfos = companyInfo></businessData>
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
						<el-step :title="item.orole+'('+item.operator+')'" :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime" v-for="item in flowRecordList" :key="item.operateTime"></el-step>
						<el-step v-if="item.message" :title="item.orole+'('+item.operator+')'" :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime+'-'+item.message" v-for="item in flowRecordList" :key="item.operateTime"></el-step>
					</el-steps>
                </div>
                <button class="pass" v-if="passShow"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
            </div>
            <!--v-if="($route.query.status=='Company_Auditing'||$route.query.status=='Canceling_Auditing'||$route.query.status=='Modify_Auditing')&&baseData.roleName=='ROLE_admin'"-->
            <el-input v-model="desc"
                      v-if="($route.query.status=='Business_Auditing'||$route.query.status=='Modify_Auditing'||$route.query.status=='Canceling_Auditing')&&baseData.roleName=='ROLE_admin'"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入审核意见"
                      >

            </el-input>
            <div class="block">
                    <button class="pass passback" @click="getBack">返回</button>
                <div>
                    <!--<button class="fleft passgo" style="width:100%" v-if="this.$route.query.status=='Wait_To_Audit'" @click="submit()">送审</button>-->
                    <button class="fleft passgo" v-if="this.$route.query.status=='Business_Auditing'" @click="businessAuditPass()">通过审核</button>
                    <button class="fright passback" v-if="this.$route.query.status=='Business_Auditing'" @click="businessAuditReject()">驳回</button>
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
                detialInfo:{},  //详情信息对象
                queryStatus:'',
                companyInfo:[],
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
            console.log("$route.query.flowId",this.$route.query.flowId);
            this.getCacheData(this.$route.query.flowId);
            switch(this.$route.query.status){
                case 'Wait_To_Audit':
                    this.queryStatus='等待送审';
                    break;
                case '等待送审':
                    this.queryStatus='等待送审';
                    break;
                case 'Business_Auditing':
                    this.queryStatus='审核中';
                    break;
                case '审核中':
                    this.queryStatus='审核中';
                    break;
                case 'Audit_Success':
                    this.queryStatus='审核通过';
                    break;
                case '审核通过':
                    this.queryStatus='审核通过';
                    break;
                case 'Modify_Auditing':
                    this.queryStatus='变更审核中';
                    break;
                case '变更审核中':
                    this.queryStatus='变更审核中';
                    break;
                case 'Modify_Rejected':
                    this.queryStatus='变更审核驳回';
                    break;
                case '变更审核驳回':
                    this.queryStatus='变更审核驳回';
                    break;
                case 'Cancelled':
                    this.queryStatus='已注销';
                    break;
                case '已注销':
                    this.queryStatus='已注销';
                    break;
                case 'Canceling_Auditing':
                    this.queryStatus='注销审核';
                    break;
                case '注销审核':
                    this.queryStatus='注销审核';
                    break;
                case 'Terminate_Flow':
                    this.queryStatus='受理终止';
                    break;
                case '受理终止':
                    this.queryStatus='受理终止';
                    break;
            }

			console.log(this.$route.query.type);

			console.log(this.$route.query.creators);

            this.entireFlowId = sessionStorage.getItem('entireFlowId');
            console.log(this.entireFlowId);
        },
        methods: {
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
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            // 驳回
            businessAuditReject(){
                this.$ajax.post('/vos/business/businessAuditReject',{
                    "companyFlow" :{
                        "flowId": this.entireFlowId,
                        "creator": this.$route.query.creators,
                        "assigneeRole": this.$route.query.assigneeRole
                    },
                    "message":this.desc   //输入框信息
                }).then((res)=>{
                    if(res.code == 200){
                        this.passShow = true;
                        console.log(res);
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            // 返回
            getBack(){
                this.$router.push({ path: "/BusinessAccepted/400businessManage" });
            },
            // 详情
            getCacheData(data){
                console.log("data",data);
                this.$ajax.get('/vos/business/getCacheData?flowId='+data).then((res)=>{
                    console.log(res);
                    console.log(res.data.flowRecord);
                    this.flowRecordList = res.data.flowRecord;
                    this.flowRecordList.map((item)=>{
                        if(item.operatorRole=='ROLE_admin'){
                            item.orole = '管理员'
                        }else if(item.operatorRole=='ROLE_salesman'){
                            item.oole = '业务员'
                        }else if(item.operatorRole=='ROLE_auditor'){
                            item.orole = '审核员'
                        }

                        if(item.assginessRole=='ROLE_admin'){
                            item.arole = '管理员'
                        }else if(item.assginessRole=='ROLE_salesman'){
                            item.arole = '业务员'
                        }else if(item.assginessRole=='ROLE_auditor'){
                            item.arole = '审核员'
                        }

                        switch(item.currentStatus){
                            case 'Wait_To_Audit':
                                item.status='等待送审';
                                break;
                            case 'Business_Auditing':
                                item.status='审核中';
                                break;
                            case 'Audit_Success':
                                item.status='审核通过';
                                break;
                            case 'Modify_Auditing':
                                item.status='变更审核中';
                                break;
                            case 'Modify_Rejected':
                                item.status='变更审核驳回';
                                break;
                            case 'Cancelled':
                                item.status='已注销';
                                break;
                            case 'Canceling_Auditing':
                                item.status='注销审核';
                                break;
                            case 'Terminate_Flow':
                                item.status='受理终止';
                                break;
                        }
                    });
                    this.companyInfo = res;
                    console.log(this.companyInfo);
                })
            },
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
