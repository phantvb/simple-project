<template>
    <!--新增/编辑语音弹窗-->
    <div class="voiceDialog">
        <el-dialog
                :title="voiceIn==1?'新增语音文件':'编辑语音文件'"
                :visible.sync="visibleVoice"
                width="55%"
                :before-close="handleClose">
            <div>
                <el-form ref="voiceForm" :model="voiceForm" label-width="90px" class="voiceForm">
                    <div class="voiceMsg">
                        <el-form-item label="企业名称：" class="input">
                            <el-input v-model="voiceForm.firmName" size="mini" @input="searchFirm"></el-input>
                            <div id="firmNameList" v-if="firmNameShow">
                                <ul>
                                    <li v-for="(item,index) in firmNameList" :key="index" @click="firmNameLi(item)">{{item.companyName}}</li>
                                </ul>
                            </div>
                        </el-form-item>

                        <el-form-item label="400号码：" class="type">
                            <el-input v-model="voiceForm.voiceNum" size="mini" @input="searchNum400"></el-input>
                            <div id="numList" v-if="numShow">
                                <ul>
                                    <li v-for="(item,index) in num400List" :key="index" @click="num400Lists(item)">{{item.number400 +"("+item.companyName+")"}}</li>
                                </ul>
                            </div>
                        </el-form-item>

                        <el-table
                                :data="tableData"
                                border
                                @row-click="rowInfo"
                                style="width: 100%;margin-bottom:30px;">

                            <el-table-column
                                    prop="voiceType"
                                    label="语音类型"
                                    width="180">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-select v-model="voiceInfo.voiType" placeholder="请选择" size="mini">
                                                    <el-option
                                                            v-for="item in voiceTypeList"
                                                            :key="item.dicKey"
                                                            :label="item.dicValue"
                                                            :value="item.dicKey">
                                                    </el-option>
                                                </el-select>
                                                <!--<el-input v-model="scope.row.evtItemCode" placeholder="请输入内容" v-if="scope.row.isAdd"-->
                                                          <!--v-on:blur="inputOnBlur(scope.row,scope.$index)"></el-input>-->
                                                <!--<span v-if="!scope.row.isAdd">{{scope.row.evtItemCode}}</span>-->
                                            </div>
                                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="voiceName"
                                    label="语音名称"
                                    width="180">
                                        <template slot-scope="scope">
                                            <div>
                                                <el-input v-model="voiceInfo.voiName" placeholder="请输入内容" size="mini"></el-input>
                                                <!--<el-input v-model="scope.row.evtItemCode" placeholder="请输入内容" v-if="scope.row.isAdd"-->
                                                          <!--v-on:blur="inputOnBlur(scope.row,scope.$index)" size="mini"></el-input>-->
                                                <!--<span v-if="!scope.row.isAdd">{{scope.row.evtItemCode}}</span>-->
                                            </div>
                                        </template>
                            </el-table-column>
                            <el-table-column
                                    prop="voiceFile"
                                    label="语音文件">
                                        <template slot-scope="scope">
                                            <el-upload action=""
                                                       size="mini"
                                                       :on-change="handleChange"
                                                       :http-request="uploadFile"
                                                       :limit="1">
                                                <el-button size="small" type="primary">点击上传</el-button>

                                            </el-upload>
                                        </template>
                            </el-table-column>

                            <el-table-column
                                    prop="operation"
                                    label="操作">
                                <template slot-scope="scope">
                                    <!--<div v-if="scope.row.isMainParam=='1' && $route.params.eventIn!=2">-->
                                        <!--<el-button size="mini" type="text" @click="editParams(scope.row,scope.$index)">编辑</el-button>-->
                                        <!--<el-button size="mini" type="text" @click="deleteParams(scope.$index)">删除</el-button>-->
                                    <!--</div>-->
                                    <div>
                                        <el-button size="mini" type="text">删除</el-button>
                                        <el-button size="mini" type="text"></el-button>
                                        <el-button size="mini" type="text" @click="add(scope)" v-if="tableData.length-1 == scope.$index">添加</el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
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
                                <!--<el-select v-model="voiceForm.addValueType" placeholder="请选择"  size="mini" @change="addValueChange">-->
                                    <!--<el-option :label="item.tariffName" :value="item.id" v-for="item in voiceList" :key="item.id"></el-option>-->
                                <!--</el-select>-->
                                <span>彩铃制作</span>
                            </div>
                                <div class="objCodeBox">
                                    <div class="valAddSer">
                                        <div v-for="item in valueAddedList">
                                            <p>功能资费：{{item.tariffFee}}</p>
                                            <p v-if="item.presents==1">是否赠送：赠送</p>
                                            <p v-if="item.presents==2">是否赠送：付费</p>
                                            <p>功能备注：{{item.remarks}}</p>
                                        </div>
                                    </div>
                                </div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="voiceSave()">暂存信息</el-button>
            <el-button type="primary" @click="voiveAudit()" size="mini">送 审</el-button>
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
                firmNameShow:false,
                numShow:false,
                firmNameList:[],
                num400List:[],
                voiceIn:1,
                voiceForm:{
                    firmName:'',
                    fourNum:'',
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
                textarea2:'',
                fileList3: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                    name: 'food2.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }],
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
            }
        },
        created(){
            this.$root.eventHub.$on('dialog1VisibleVoice', (res)=>{
                this.visibleVoice=res.visibleVoice;
                if(res.voiceIn){
                    this.voiceIn = res.voiceIn;
                }
            } );
            this.$root.eventHub.$on('getLoginInfo', (resp)=>{
                this.getValueAdded(resp);
                this.addValueChange(resp);
            } );
            this.voiceType();
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
                this.businessType = val.businessType;
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
                this.businessType=val.businessType;
                console.log(val);
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

                    }else{
                        this.$message.warning(res.message);
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
        },
        computed: {},
        watch:{},
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
