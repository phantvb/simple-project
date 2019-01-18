<template>
    <!--新增/编辑语音弹窗-->
    <div class="voiceDialog">
        <el-dialog
                :title="voiceIn==1?'新增语音文件':'编辑语音文件'"
                :visible.sync="visibleVoice"
                width="40%"
                :before-close="handleClose">
            <div>
                <el-form ref="voiceForm" :model="voiceForm" label-width="90px" class="voiceForm">
                    <div class="objCodeMsg">
                        <el-form-item label="企业名称：" class="input">
                            <el-input v-model="voiceForm.firmName" size="mini"></el-input>
                        </el-form-item>

                        <el-form-item label="400号码：" class="type">
                            <el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">
                                <el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>
                            </el-select>
                            <el-button type="primary" size="mini">搜索</el-button>
                        </el-form-item>

                        <!--<el-form-item label="语音类型：" class="type">-->
                            <!--<el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">-->
                                <!--<el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>-->
                            <!--</el-select>-->
                        <!--</el-form-item>-->

                        <!--<el-form-item label="语音文件：">-->
                            <!--<div class="voiceUpload">-->
                                <!--<el-upload-->
                                        <!--class="upload-demo"-->
                                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                                        <!--:on-change="handleChange"-->
                                        <!--:headers="{}"-->
                                        <!--:file-list="fileList3">-->
                                    <!--<el-button size="small" type="primary">点击上传</el-button>-->
                                    <!--<p class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</p>-->
                                <!--</el-upload>-->
                            <!--</div>-->

                        <!--</el-form-item>-->

                        <!--<el-form-item label="语音名称：" class="input">-->
                            <!--<el-input v-model="voiceForm.voiceName" size="mini"></el-input>-->
                        <!--</el-form-item>-->



                        <el-form-item label="增值资费：">
                            <div class="addValueSelect">
                                <el-select v-model="voiceForm.voiceType" placeholder="请选择"  size="mini">
                                    <el-option :label="item.title" :value="item.value" v-for="(item,index) in voiceList" :key="index"></el-option>
                                </el-select>
                            </div>
                                <div class="objCodeBox">
                                    <div class="valAddSer">
                                        <p>功能资费：{{tariffFee}}</p>
                                        <p>是否赠送：{{presents}}</p>
                                        <p>功能备注：{{remarks}}</p>
                                    </div>
                                </div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="voiveAudit()">暂存信息</el-button>
            <el-button type="primary" @click="visibleVoice = false" size="mini">送 审</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'dialogVoice',
        props:[
        ],
        data() {
            return{
                visibleVoice:false,
                voiceIn:1,
                voiceForm:{
                    firmName:'',
                    fourNum:'',
                    voiceType:'',
                    voiceFile:'',
                    voiceName:'',
                },
                voiceList:[{
                    value:'1',
                    title:'彩铃',
                },{
                    value:'2',
                    title:'导航音',
                }],
                textarea2:'',
                fileList3: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
                tariffFee:0, //功能资费
                presents:'1',  //是否赠送;1 赠送；2 付费
                remarks:'',  //功能描述
            }
        },
        created(){
            this.$root.eventHub.$on('dialog1VisibleVoice', (res)=>{
                this.visibleVoice=res.visibleVoice;
                if(res.voiceIn){
                    this.voiceIn = res.voiceIn;
                }
            } );
        },
        components: {},
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
            handleChange(file, fileList) {
                this.fileList3 = fileList.slice(-3);
            },
            // 语音送审
            voiveAudit(){
                this.visibleVoice = false;
                this.$ajax.post('/vos/voice/sendToVoiceAudit',{
                    "number400":this.voiceForm.voiceType,
                    "voice":[{
                        "id":"",
                        "number400":"400142520888",
                        "voicetype":"ring",
                        "voicename":"天籁紫云",
                        "voicefile":"ddffdfff.xx",
                        "valueaddedid":"1",
                        "companyid":"66"
                    }],
                    "companyFlow":{
                        "flowId":""

                    },
                    "company": {
                        "id": 66,
                        "companyName": this.voiceForm.firmName,
                        "companyCardType": "business_license",
                        "companyCardNo": "12455123",
                        "companyCharacter": "cooperation",
                        "companyRank": "DK_E",
                        "industryType": "cooperation",
                        "registProvince": "浙江省",
                        "registProvinceId": null,
                        "registCity": null,
                        "registCityId": null,
                        "registArea": null,
                        "registaAreaId": null,
                        "registAddress": null,
                        "officeCity": "杭州市",
                        "officeCityId": "330100",
                        "officeProvince": null,
                        "officeProvinceId": null,
                        "officeArea": null,
                        "officeAreaId": null,
                        "officeAddress": null,
                        "phone": "15958134692",
                        "legalPerson": "蒋恩情",
                        "legalPhone": null,
                        "legalCard": null,
                        "cardNum": "330382199312287839",
                        "idCardAddress": null,
                        "cardStartDate": null,
                        "cardEndDate": null,
                        "companyProofPic": "967bdbd3-7846-4bf8-86fc-8234cba3ae0a.png",
                        "legalCardFrontPic": "967bdbd3-7846-4bf8-86fc-8234cba3ae0a.png",
                        "legalCardBackPic": null,
                        "legalCardHandPic": null,
                        "usable": "no",
                        "source": "self"
                    }
                }).then((res)=>{
                    console.log(res);
                })
            }
        },
        computed: {},
        watch:{},
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
