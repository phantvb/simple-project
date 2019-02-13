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
                    <!--<p class="fmini">VSMS客户编码：</p>-->
                    <!--<p class="fmini">集团CRM客户编码： </p>-->
                    <!--<p class="fmini">省CRM客户编码：</p>-->
                    <p class="fmini">企业名称：{{voiceDetails.companyName}} </p>
                    <p class="fmini">证件编号：{{voiceDetails.companyCardNo}} </p>
                    <p class="fmini"><span>企业性质：{{voiceDetails.companyCharacter}}</span></p>
                    <p class="fmini"><span>企业等级：{{voiceDetails.companyRank}}</span></p>
                    <p class="fmini"><span>行业类型：{{voiceDetails.industryType}}</span></p>
                    <p class="fmini">注册地址：{{voiceDetails.registProvince+voiceDetails.registCity+voiceDetails.registArea+voiceDetails.registAddress}}</p>
                    <p class="fmini">办公地址：{{voiceDetails.officeProvince+voiceDetails.officeCity+voiceDetails.officeArea+voiceDetails.officeAddress}}</p>
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
                                            prop="type"
                                            label="语音类型">
                                    </el-table-column>

                                    <el-table-column
                                            prop="voicename"
                                            label="语音名称">
                                    </el-table-column>

                                    <el-table-column
                                            prop="number400"
                                            label="是否制作计费">
                                    </el-table-column>

                                    <el-table-column
                                            prop="destnumber"
                                            label='语音文件'
                                            width="320px">
                                        <template slot-scope="scope">
                                            <!--<el-button @click="an(scope.row)">an</el-button>-->
                                            <!--<audio controls>-->
                                                <!--<source-->
                                                     <!--src="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3"-->
                                                     <!--type="audio/ogg">-->
                                            <!--</audio>-->
                                            <!--<Aplayer name="Aplayer" :music_url="'http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&pin=6cd414115fdb9a950d827487b16b5f97#.mp3'"></Aplayer>-->
                                            <Aplayer name="Aplayer" :music_url="$global.serverSrc+scope.row.voiceflie"></Aplayer>
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
                        <el-step title="业务员(姚明)" description="递交 12月08日 16:59"></el-step>
                        <el-step title="管理员" description="审批 12月08日 16:59"></el-step>
                    </el-steps>
                </div>
                <button class="pass"><i class="el-icon-circle-check" style="color:#67C23A;font-size:16px;transform: translateY(1px);"></i> 审核通过</button>
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
    import Aplayer from '../component/Aplayer/a_player.vue'
    export default {
        name: 'voiceDetial',
        data() {
            return {
                objCodeTable: [{
                    number: '234567',
                    objCode: '',
                }],
                voiceInfoList:[{

                }],
                voiceFlowId:'',     //语音表格flowId
                voiceDetails:{
                    companyName:'',
                    number400:'',
                    companyCardNo:'',
                    companyCharacter:'',
                    companyRank:'',
                    industryType:'',
                    registProvince:'',
                    registCity:'',
                    registArea:'',
                    registAddress:'',
                    officeProvince:'',
                    officeCity:'',
                    officeArea:'',
                    officeAddress:'',
                    phone:'',
                },
            };
        },
        created(){
            console.log(this.$route.query.flowId);
            this.voiceFlowId = this.$route.query.flowId;
            this.voiceDetail();
        },
        components: {
            Aplayer
        },
        methods: {
            an(val){
                console.log(val);
            },
            //语音详情
            voiceDetail(){
                console.log(this.voiceFlowId);
                this.$ajax.get('/vos/voice/getCacheData?flowId='+this.voiceFlowId).then((res)=>{
                    console.log(res.data);
                    this.voiceDetails = res.data.company;
                    this.voiceDetails.number400 = res.data.number400;
                    this.voiceInfoList = res.data.voice;
                    this.voiceInfoList.map((item)=>{
                        if(item.voicetype=="IVR"){
                            item.type = "IVR导航"
                        }else if(item.voicetype=="ring"){
                            item.type = "彩铃"
                        }
                    })
                })
            }
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
