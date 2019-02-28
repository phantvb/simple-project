<template>
    <div id="voiceDetial">
        <div id="base">
            <header class="left">
                业务受理> 400业务> 语音详情
                <div style="float:right;color:#FF6600">【待审核】</div>
            </header>
            <section>
                <div class="detailMsg">
                    <p>
                        企业基本信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">企业名称：{{voiceDetails.companyName}} </p>
                    <p class="fmini">证件编号：{{voiceDetails.companyCardNo}} </p>
                    <p class="fmini"><span>企业性质：{{voiceDetails.companyCharacter}}</span></p>
                    <p class="fmini"><span>企业等级：{{voiceDetails.companyRank}}</span></p>
                    <p class="fmini"><span>行业类型：{{voiceDetails.industryType}}</span></p>
                    <p class="fmini">
                        注册地址：{{voiceDetails.registProvince+voiceDetails.registCity+voiceDetails.registArea+voiceDetails.registAddress}}</p>
                    <p class="fmini">
                        办公地址：{{voiceDetails.officeProvince+voiceDetails.officeCity+voiceDetails.officeArea+voiceDetails.officeAddress}}</p>
                    <p class="fmini">企业电话：{{voiceDetails.phone}}</p>
                    <div>
                        <div style="float:left;">
                            <span class="fmini">企业资质证明文件：</span>
                        </div>
                        <ul>
                            <li class="l2">
                                <img class="examplew" :src="voiceDetails.companyProofPic" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div class="detailMsg">
                    <p>
                        语音文件信息
                    </p>
                </div>
                <div class="block left">
                    <p class="fmini">400号码：</p>

                    <div>
                        <ul style="margin-lefe:-40px">
                            <li class="l2">
                                <el-table :data="voiceInfoList"
                                          border
                                          style="width: 100%">

                                    <el-table-column
                                            prop="voiceType"
                                            label="语音类型">
                                    </el-table-column>

                                    <el-table-column
                                            prop="voiceName"
                                            label="语音名称">
                                    </el-table-column>

                                    <el-table-column
                                            prop="voiceFile"
                                            label='语音文件'
                                            width="320px">
                                        <template slot-scope="scope">
                                            <Aplayer name="Aplayer"
                                                     :music_url="scope.row.voiceFile" v-if="toPlay"></Aplayer>
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
            <div class="block underline">
                <div class="step">
                    <el-steps direction="vertical" :active="1">
                        <el-step :title="item.orole+'('+item.operator+')'"
                                 :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime"
                                 v-for="item in flowRecordList" :key="item.operateTime"></el-step>
                        <el-step v-if="item.message" :title="item.orole+'('+item.operator+')'"
                                 :description="item.opeation+'-'+item.arole+'('+item.assginee+')-'+item.operateTime+'-'+item.message"
                                 v-for="item in flowRecordList" :key="item.operateTime"></el-step>
                    </el-steps>
                </div>
                <button class="pass" v-if="passShow"><i class="el-icon-circle-check"
                                                        style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i>
                    审核通过
                </button>
            </div>

            <div class="block">
                <button class="pass passback" @click="getBack">返回</button>
                <div>
                    <!--<button class="fleft passgo" style="width:100%" v-if="this.$route.query.status=='Wait_To_Audit'" @click="submit()">送审</button>-->
                    <button class="fleft passgo" v-if="this.$route.query.status=='Voice_Auditing'"
                            @click="voiceAuditPass()">通过审核
                    </button>
                    <button class="fright passback" v-if="this.$route.query.status=='Voice_Auditing'">驳回</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Aplayer from '../component/Aplayer/a_player.vue'

    export default {
        name: 'voiceDetial',
        data() {
            return {
                objCodeTable: [{
                    number: '234567',
                    objCode: '',
                }],
                voiceInfoList: [{}],
                voiceFlowId: '',     //语音表格flowId
                voiceDetails: {
                    companyName: '',
                    number400: '',
                    companyCardNo: '',
                    companyCharacter: '',
                    companyRank: '',
                    industryType: '',
                    registProvince: '',
                    registCity: '',
                    registArea: '',
                    registAddress: '',
                    officeProvince: '',
                    officeCity: '',
                    officeArea: '',
                    officeAddress: '',
                    phone: '',

                },
                passShow: false,
                flowRecordList: [],
                toPlay: false,
            };
        },
        created() {
            console.log(this.$route.query.flowId);
            this.voiceFlowId = this.$route.query.flowId;
            this.voiceDetail();
        },
        components: {
            Aplayer
        },
        methods: {
            an(val) {
                console.log(val);
            },
            //语音详情
            voiceDetail() {
                console.log(this.voiceFlowId);
                this.$ajax.get('/vos/voice/getCacheData?flowId=' + this.voiceFlowId).then((res) => {
                    console.log(res.data);
                    this.voiceDetails = res.data.company;
                    this.voiceDetails.number400 = res.data.number400;

                    this.voiceInfoList = res.data.voice;
                    this.voiceInfoList.map((item) => {
                        if (item.voiceType == "IVR") {
                            item.voiceType = "IVR导航"
                        } else if (item.voiceType == "ring") {
                            item.voiceType = "彩铃"
                        }
                        item.voiceFile = this.$global.serverSrc + item.voiceFile;
                    });
                    this.toPlay = true;

                    this.flowRecordList = res.data.flowRecord;
                    this.flowRecordList.map((item) => {
                        if (item.operatorRole == 'ROLE_admin') {
                            item.orole = '超级管理员'
                        } else if (item.operatorRole == 'ROLE_salesman') {
                            item.oole = '业务员'
                        } else if (item.operatorRole == 'ROLE_auditor') {
                            item.orole = '审核员'
                        }

                        if (item.assginessRole == 'ROLE_admin') {
                            item.arole = '超级管理员'
                        } else if (item.assginessRole == 'ROLE_salesman') {
                            item.arole = '业务员'
                        } else if (item.assginessRole == 'ROLE_auditor') {
                            item.arole = '审核员'
                        }

                        switch (item.currentStatus) {
                            case 'Wait_To_Audit':
                                item.status = '等待送审';
                                break;
                            case 'Voice_Auditing':
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
                })
            },
            // 通过审核
            voiceAuditPass() {
                this.$ajax.post('/vos/voice/auditPass', {
                    "companyFlow": {
                        "flowId": this.entireFlowId,
                        "assigneeRole": this.$route.query.assigneeRole,
                        "creator": this.$route.query.creators,
                    },
                    "message": this.desc   //输入框信息
                }).then((res) => {
                    if (res.code == 200) {
                        this.passShow = true;
                        console.log(res);
                    } else {
                        this.$message.error(res.message);
                    }
                })
            },
            // 返回
            getBack() {
                this.$router.push({path: "/BusinessAccepted/400businessManage"});
            },
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
