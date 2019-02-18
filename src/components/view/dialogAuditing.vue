<template>
    <!--新增/编辑语音弹窗-->
    <div class="voiceDialog">
        <el-dialog
                :title="voiceIn==1?'新增语音文件':'编辑语音文件'"
                :visible.sync="visibleVoice"
                width="55%"
                :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="voiceSave()">暂存信息</el-button>
            <el-button type="primary" @click="voiveAudit()" size="mini">送 审</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'dialogAuditing',
        props:[
        ],
        data() {
            return{
                visibleVoice:false,
                firmNameShow:false,
                numShow:false,
                firmNameList:[],
                num400List:[],
                voiceIn:1,
                voiceForm:{
                    firmName:'',
                    voiceNum:'',
                    voiceFile:'',
                    voiceName:'',
                    voiceNumAndFile:'',
                    addValueType:'',
                },
                voiceInfo:{
                    voiType:'',
                    voiName:'',
                },
                voiceList:[],
                tableData:[{
                    voiceType:'',
                    voiceName:'',
                    voiceFile:'',
                }],
                voiceTypeList:[],
                businessType:'', //登录信息
                file: '',
                voicefile:'',    //语音文件
                addValueId:'',
                valueAddedList:'', //资费增值信息数组
                num400Unit:'',
                companyId:'',      //公司id
                companyInfo:'',    //公司信息
                busIdentity:'',    //登录信息channel
            }
        },
        created(){
            console.log(sessionStorage.getItem('businessType'));
            console.log("entireFlowId",sessionStorage.getItem('entireFlowId'));
            this.busIdentity = sessionStorage.getItem('businessType');
            this.getValueAdded(this.busIdentity);
            this.addValueChange(this.busIdentity);
            this.voiceType();
            this.$root.eventHub.$on('dialog1VisibleVoice', (res)=>{
                this.visibleVoice=res.visibleVoice;
                this.voiceForm.firmName='';
                this.voiceForm.voiceNum='';
                this.voiceInfo.voiType='';
                this.voiceInfo.voiName='';
                this.voiceForm.addValueType='';
                if(res.voiceIn){
                    this.voiceIn = res.voiceIn;
                }
            } );
            this.getDetail();
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
            handleChange(file) {
                this.file = file.raw
                console.log(file);
            },
            rowInfo(val,event){
                console.log("rowInfo",val);
                console.log("event",event);
            },
            // 企业模糊搜索
            searchFirm(val){
                console.log(val);
                this.$ajax.get('/vos/company/fuzzySearch?company='+this.voiceForm.firmName).then((res)=>{
                    console.log(res.data);
                    this.firmNameList = res.data;
                    if(this.voiceForm.firmName!='' && this.firmNameList.length!=0){
                        this.firmNameShow = true;
                    }
                })
            },
            //企业名称li
            firmNameLi(val){
                console.log(val);
                this.voiceForm.firmName = val.companyName;
                this.firmNameShow = false;
                this.companyInfo = val;
                this.companyId = val.id;
            },
            searchNum400(){
                this.$ajax.post('/vos/num400config/search',{
                    "page":{
                        "pageNo":"1",
                        "pageSize":"50"
                    },
                    "number400":{
                        "number400":this.voiceForm.voiceNum,
                    }
                }).then((res)=>{
                    console.log(res.data.number400s);
                    this.num400List = res.data.number400s;
                    if(this.voiceForm.voiceNum!='' && this.voiceForm.length!=0){
                        this.numShow = true;
                    }
                })
            },
            //400号码li
            num400Lists(val){
                console.log(val);
                this.voiceForm.voiceNum = val.number400;
                this.numShow = false;
            },

            add(scope){
                console.log(scope);
                console.log(this.tableData.length);
                this.tableData.push({
                    voiceType:'',
                    voiceName:'',
                    voiceFile:'',
                })
            },
            // 文件上传限制
            beforeAvatarUpload(file){
                console.log(file.type);
                const isVoiceType = file.type === 'audio/flv'|| file.type ==='audio/mp3' || file.type ==='audio/wma' || file.type ==='audio/swf'|| file.type ==='audio/wmv' || file.type ==='audio/mid' || file.type ==='audio/avi' || file.type ==='audio/mpg' || file.type ==='audio/asf' || file.type ==='audio/rm' || file.type ==='audio/rmvb';
                const isVoiceSize = file.size / 1024 / 1024 < 10;

                if (!isVoiceType) {
                    this.$message.error('上传的语音文件只能是 flv、mp3、wma、swf、wmv、mid、avi、mpg、asf、rm、rmvb 格式!');
                }
                if (!isVoiceSize) {
                    this.$message.error('上传的语音文件大小不能超过 10MB!');
                }
                return isVoiceType && isVoiceSize;
            },
            // 自定义上传
            uploadFile() {
                let form=new FormData();
                form.append('voice',this.file);
                this.$ajax.post('/vos/common/uploadVoice',form).then((res)=>{
                    console.log(res);
                    this.voicefile = res;
                })

            },
            // 增值资费列表
            getValueAdded(val){
                console.log(val);
                this.businessType = val;
                this.$ajax.post('/vos/tariffPackage/getValueAdded',{
                    "valueAdded":{
                        "id":"",
                        "channel":this.businessType
                    }
                }).then((res)=>{
                    if(res.code==200){
                        console.log(res.data.valueAddedList);
                        this.voiceList =res.data.valueAddedList;
                    }
                })
            },
            // 增值资费切换
            addValueChange(val){
                console.log(val);
                this.businessType=val;
                console.log(this.businessType);
                this.$ajax.post('/vos/tariffPackage/getValueAdded',{
                    "valueAdded":{
                        "channel":this.businessType,
                        "id":this.businessType=="self"?43:44,
                    }
                }).then((res)=>{
                    if(res.code==200){
                        console.log(res.data.valueAddedList);
                        this.valueAddedList =res.data.valueAddedList;
                        console.log(this.valueAddedList[0].id);
                    }
                })
            },
            // 语音类型
            voiceType(){
                this.$ajax.post('/vos/dic/getDicsByType',{
                    "dicType":"voiceType",
                    "status":"1"
                }).then((res)=>{
                    console.log(res);
                    console.log(res.data);
                    if(res.code==200){
                        this.voiceTypeList = res.data.dicList;
                    }
                })
            },
            // 暂存
            voiceSave(){
                console.log(this.voicefile);
                this.$ajax.post('/vos/voice/startAndSave',{
                    "number400":this.voiceForm.voiceNum,
                    "voice":[{
                        "id":"",
                        "number400":this.voiceForm.voiceNum,
                        "voicetype":this.voiceInfo.voiType,
                        "voicename":this.voiceInfo.voiName,
                        "voicefile":this.voicefile,
                        "valueaddedid":this.valueAddedList[0].id,
                        "companyid":this.companyId,
                    }],
                    "companyFlow":{
                        "flowId":""

                    },
                    "company": this.companyInfo,
                }).then((res)=>{
                    console.log(res);
                    if(res.code==200){
                        this.visibleVoice = false;
                        this.$root.eventHub.$emit('voiceList');
                    }else{
                        if(res.message){
                            this.$message.warning(res.message);
                        }else{
                            this.$message.warning("message为空null")
                        }
                    }
                })
            },
            // 语音送审
            voiveAudit(){
                this.$ajax.post('/vos/voice/startAndSave',{
                    "number400":this.voiceForm.voiceNum,
                    "voice":[{
                        "id":"",
                        "number400":this.voiceForm.voiceNum,
                        "voicetype":this.voiceInfo.voiType,
                        "voicename":this.voiceInfo.voiName,
                        "voicefile":this.voicefile,
                        "valueaddedid":this.valueAddedList[0].id,
                        "companyid":this.companyId,
                    }],
                    "companyFlow":{
                        "flowId":""

                    },
                    "company": this.companyInfo,
                }).then((res)=>{
                    console.log(res);
                    if(res.code==200){
                        this.visibleVoice = false;
                    }else{
                        this.$message.warning(res.message);
                    }
                })
            },
            // 语音详情
            getDetail(){
                this.$ajax.post('/vos/voice/getDetail',{
                    "companyFlow":{
                        "assigneeRole":"ROLE_city_admin"
                    },
                    "voiceId":19
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
