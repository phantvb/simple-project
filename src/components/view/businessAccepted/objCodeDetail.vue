<template>
    <div id="objCodeDetail">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 目的码审核详情
                <div style="float:right;color:#FF6600">【待审核】</div>
            </header>
            <section>
                <div class="detailMsg">
                    <p>
                        企业基本信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">企业名称：{{companyInfo.companyName}} </p>
                    <p class="fmini">证件编号： {{companyInfo.companyCardNo}}</p>
                    <p class="fmini"><span>企业性质：{{companyInfo.companyCharacter}}</span></p>
                    <p class="fmini"><span>企业等级：{{companyInfo.companyRank}}</span></p>
                    <p class="fmini"><span>行业类型：{{companyInfo.industryType}}</span></p>
                    <p class="fmini">注册地址：{{companyInfo.registProvince+companyInfo.registCity+companyInfo.registArea}}</p>
                    <p class="fmini">企业电话：{{companyInfo.phone}}</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" :src="companyInfo.companyProofPic" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div class="detailMsg">
                    <p>
                        目的码审核信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">使用用途：{{destNumInfo.destnumUsage}}</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">目的码证明材料：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" :src="destNumInfo.destnumproofpic" alt="">
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">目的码：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <el-table :data="objCodeTable"
                                          border
                                          style="width: 100%">

                                    <el-table-column
                                            prop="number400"
                                            label="400号码">
                                    </el-table-column>

                                    <el-table-column
                                            prop="destnumber"
                                            label='目的码 (填入目的码，多个请用","隔开)'>
                                        <template slot-scope="scope">
                                            <span v-for="(item,index) in destNumInfo" :key="index">{{item.destNumber}}<span v-if="index!=destNumInfo.length-1">,</span></span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </li>
                        </ul>
                    </div>
                    <div>
                    </div>
                </div>
            </section>
        </div>
        <div id="progress">
            <header class="left">
                审核流程 > 目的码审核
            </header>
            <!--<div class="block underline">-->
                <!--<div class="step">-->
                    <!--<el-steps direction="vertical" :active="1">-->
                        <!--<el-step title="业务员(姚明)" description="递交 12月08日 16:59"></el-step>-->
                        <!--<el-step title="管理员" description="审批 12月08日 16:59"></el-step>-->
                    <!--</el-steps>-->
                <!--</div>-->
                <!--<button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>-->
            <!--</div>-->
            <div class="block underline">
                <div class="step">
                    <el-steps direction="vertical" :active="1">
                        <el-step :title="item.orole+'('+item.operator+')'" :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime" v-for="item in flowRecordList" :key="item.operateTime"></el-step>
                        <el-step v-if="item.message" :title="item.orole+'('+item.operator+')'" :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime+'-'+item.message" v-for="item in flowRecordList" :key="item.operateTime"></el-step>
                    </el-steps>
                </div>
                <button class="pass" v-if="passShow"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
            </div>
            <div class="block">
                    <button class="pass passback" @click="getBack">返回</button>
                <div>
                    <!--<button class="fleft passgo" style="width:100%" v-if="this.$route.query.status=='Wait_To_Audit'" @click="submit()">送审</button>-->
                    <button class="fleft passgo" v-if="this.$route.query.status=='DestNum_Auditing'" @click="destNumAuditPass()">通过审核</button>
                    <button class="fright passback" v-if="this.$route.query.status=='DestNum_Auditing'">驳回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'objCodeDetail',
        data() {
            return {
                companyInfo:{},
                destNumInfo:[],
                objCodeTable: [],
                baseData:{
                    roleName:'',
                    username:'',
                },
                flowRecordList:[],
                passShow:false,
            };
        },
        components: {},
        created(){
            console.log(this.$route.query.flowId);
            // console.log(this.$route.query.companyId);
            this.getDetail();
        },
        methods: {
            getDetail(){
                this.$ajax.get('/vos/destnum/getCacheData?flowId='+this.$route.query.flowId).then((res)=>{
                    console.log(res.data);
                    if(res.code==200){
                        this.companyInfo = res.data.company;
                        this.destNumInfo = res.data.destNumber;
                        let objCodeTableObj = {};
                        if(this.destNumInfo.length!=0){
                            objCodeTableObj.number400 = this.destNumInfo[0].number400;
                            this.destNumInfo.destnumUsage = this.destNumInfo[0].destnumUsage;
                            this.destnumproofpic = this.destNumInfo[0].destnumproofpic;
                            this.destNumInfo.destnumproofpic = this.destNumInfo[0].destnumproofpic;
                        }
                        this.objCodeTable.push(objCodeTableObj);

                        this.flowRecordList = res.data.flowRecord;
                        this.flowRecordList.map((item) => {
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

                            switch (item.currentStatus) {
                                case 'Wait_To_Audit':
                                    item.status = '等待送审';
                                    break;
                                case 'DestNum_Auditing':
                                    item.status = '审核中';
                                    break;
                                case 'Audit_Success':
                                    item.status = '审核通过';
                                    break;
                                case 'Terminate_Flow':
                                    item.status = '受理终止';
                                    break;
                            }
                        })

                    }else{
                        this.$message.warning(res.message);
                    }
                })
            },
            //通过审核
            destNumAuditPass(){
                this.$ajax.post('/vos/destnum/auditPass',{
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
            // 返回
            getBack(){
                this.$router.push({ path: "/BusinessAccepted/400businessManage" });
            },
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
