<template>
    <div id="stepThree">
        <!--新增号码弹窗-->
        <div class="addNumDialog">
            <el-dialog
                    title="新增号码"
                    :visible.sync="addNumdialogVisible"
                    width="80%"
                    append-to-body
                    :before-close="handleClose">
                <div>
                    <div class="numMessage">
                        <p>选择号码</p>
                        <p style="border-color:rgba(255,255,255,1)">已选号码：</p>
                        <div class="block left">
                            <el-form ref="addNumform" :model="addNumform" class="addNumform" label-width="120px">
                            <div class="selectNumTable">
                                <ul  class="abc">
                                    <li style="float: unset">
                                        <el-table :data="selectedNum"
                                                  border
                                                  style="width: 100%">

                                            <el-table-column
                                                    prop="number400"
                                                    label="400号码">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="tariffName"
                                                    label="套餐">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="bottomFee"
                                                    label="最低年消费">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="durationPresentation"
                                                    label="预存话费">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="unit"
                                                    label="单位">
                                            </el-table-column>

                                            <el-table-column
                                                    prop="packageContent"
                                                    label="套餐详细">
                                            </el-table-column>

                                            <el-table-column
                                                    label="操作">
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="text" @click="delNum(scope.$index)">删除</el-button>
                                                    </template>
                                            </el-table-column>
                                        </el-table>
                                    </li>
                                </ul>
                            </div>
                                <el-form-item label="号码模糊搜索：">
                                    <el-input v-model="addNumform.activeName" size="mini"></el-input>
                                    <el-button type="primary" size="mini" @click="searchNum()">搜索</el-button>
                                </el-form-item>

                                <el-tabs type="border-card">
                                    <el-tab-pane v-for="(item,index) in mealList" :label="item.tariffName"  :name="index+''" :key="index+''">
                                        <set-meal
                                                ref="child1"
                                                :unitMeal = "item"
                                                :unitIndex ="index"
                                                :getAllByPackages = "getAllByPackage"></set-meal>
                                    </el-tab-pane>
                                </el-tabs>

                            </el-form>

                        </div>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addNumdialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addNumSave()" size="mini">确 定</el-button>
                </span>
                <!--搜索号码弹窗-->
                <div class="searchNumDialog">
                    <el-dialog
                            :title="titleNum+'的搜索结果'"
                            :visible.sync="searchNumdialogVisible"
                            width="80%"
                            append-to-body
                            :before-close="handleClose">
                        <div>
                            <el-table :data="searchNumList"
                                      border
                                      style="width: 100%">

                                <el-table-column
                                        prop="number400"
                                        label="400号码">
                                </el-table-column>

                                <el-table-column
                                        prop="tariffName"
                                        label="套餐">
                                </el-table-column>

                                <el-table-column
                                        prop="bottomFee"
                                        label="最低年消费">
                                </el-table-column>

                                <el-table-column
                                        prop="durationPresentation"
                                        label="预存话费">
                                </el-table-column>

                                <!--<el-table-column-->
                                <!--prop="unit"-->
                                <!--label="单位">-->
                                <!--</el-table-column>-->

                                <el-table-column
                                        prop="packageContent"
                                        label="套餐详细">
                                </el-table-column>

                                <el-table-column
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button size="mini" type="text" @click="searchNumdialogVisible=false">选择</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <span slot="footer" class="dialog-footer">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageObj.total">
                </el-pagination>
                </span>
                    </el-dialog>
                </div>
            </el-dialog>
        </div>



        <el-form ref="stepThreeForm" :model="stepThreeForm" label-width="100px">
            <div class="title left">
                经办人基本信息
            </div>
            <div class="handleInfo">
                <el-form-item label="经办人姓名：" class="firmName">
                    <el-input v-model="stepThreeForm.agentName" size="mini" placeholder="填入法人真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="经办人电话：" class="firmName">
                    <el-input v-model="stepThreeForm.agentMobilePhone" size="mini" placeholder="填入法人联系电话（固话或手机）"></el-input>
                </el-form-item>
                <el-form-item label="经办人证件：" class="identity">
                    <el-select v-model="stepThreeForm.agentDocumentType" @change="change123" placeholder="请选择" size="mini">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                    </el-select>
                    <el-input class="agentDocumentNum" v-model="stepThreeForm.agentDocumentNum" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
                </el-form-item>
            </div>
            <div class="block person_data">
            <div>
                <div style="float:left;">
                    <span class="grey fmini">经办人身份证：</span>
                </div>
                <ul  class="abc">
                    <li class="l2">
                        <ul  class="abc">
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepThreeForm.agentCardFront" :src="stepThreeForm.agentCardFront" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleBackSuccess" :on-error="handleBackSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepThreeForm.agentCardBack" :src="stepThreeForm.agentCardBack" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                        <ul  class="abc">
                            <li class="l2">
                                <el-upload class="avatar-uploader exampleh" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleHandSuccess" :on-error="handleHandSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepThreeForm.agentCardWIthHand" :src="stepThreeForm.agentCardWIthHand" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </li>
                        </ul>
                    </li>
                    <li class="l2">
                        <ul  class="abc">
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_2.png" alt="">
                            </li>
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_3.png" alt="">
                            </li>
                        </ul>
                        <ul  class="abc">
                            <li class="l2 example">
                                <img class="exampleh" src="../../../assets/example_4.png" alt="">
                            </li>
                        </ul>
                    </li>
                </ul>
                <div class="stepTwotips">
                    <p class="grey">◆ 请提供身份证的原件照片或者彩色扫描件文字清晰可辨认，如正反面复印件在一页上只需上传一张。</p>
                    <p class="grey">◆ 法人持身份证照片法人外貌必须和证件文字必须清晰可辨认</p>
                    <p class="grey">◆ 格式根据要求jpg、jpeg、png,不能超过10MB</p>
                </div>

            </div>
        </div>
            <div class="title left">
                业务信息
            </div>
            <div style="margin-left:32px">
                <div class="num400">
                    <span>400号码：</span>
                    <el-button type="primary" size="mini" @click="addNum()">+新增号码</el-button>
                </div>
                <div style="overflow: hidden;margin-bottom:30px">
                    <ul  class="abc">
                        <li style="float:unset;margin-left:70px">
                            <p style="text-align: right">业务身份：{{busIdentity}}</p>
                            <el-table :data="selectedNum"
                                      border
                                      style="width: 100%">

                                <el-table-column
                                        prop="number400"
                                        label="400号码">
                                </el-table-column>

                                <el-table-column
                                        prop="tariffName"
                                        label='套餐'>
                                </el-table-column>

                                <el-table-column
                                        prop="bottomFee"
                                        label='最低年消费'>
                                </el-table-column>

                                <el-table-column
                                        prop="durationPresentation"
                                        label='预存话费'>
                                </el-table-column>

                                <el-table-column
                                        prop="units"
                                        label='单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="packageContent"
                                        label='套餐详情'>
                                </el-table-column>

                            </el-table>
                        </li>
                    </ul>
                </div>

                <div class="num400">
                    <span>目的码：</span>
                    <div>
                        <div class="objCodeBox">
                            <el-button type="primary" size="mini" @click="addObjCodes()" style="margin-bottom: 20px">+新增目的码</el-button>
                            <div v-for="(item,index) in objCodeList" :key="index">
                                <div class="addObjCode">
                                    <el-input v-model="item.destnumber" size="mini"></el-input>
                                    <el-button type="primary" icon="el-icon-minus" size="mini" @click="delObjCodes(index)"></el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="num400" style="margin-bottom:30px;">
                    <span>归属地区：</span>
                    <div class="QCellCore">
                        <el-select v-model="stepThreeForm.provinceBelong" placeholder="请选择" size="mini" @change="proChange">
                            <el-option
                                    v-for="item in provinceList"
                                    :key="item.provinceId"
                                    :label="item.province"
                                    :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <el-select v-model="stepThreeForm.cityBelong" placeholder="请选择" size="mini" @change="cityChange">
                            <el-option
                                    v-for="item in cityList"
                                    :key="item.cityId"
                                    :label="item.city"
                                    :value="item.cityId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="QCellCore">
                        <span>优惠：</span>
                        <el-select v-model="stepThreeForm.discounts" placeholder="请选择" size="mini" @change="discountChange">
                            <el-option
                                    v-for="item in discountsList"
                                    :key="item.id"
                                    :label="item.concessionName"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div style="float:left;">
                    <span class="fmini">增值服务：</span>
                </div>
                <div style="overflow: hidden">
                    <ul  class="abc">
                        <li style="float:unset">
                            <el-table @selection-change="lalalal" :data="objCodeTable"
                                      border
                                      style="width: 100%">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="tariffName"
                                        label="增值服务名称">
                                </el-table-column>

                                <el-table-column
                                        prop="presents"
                                        label='数量'>
                                </el-table-column>

                                <el-table-column
                                        prop="units"
                                        label='资费/单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="remarks"
                                        label='备注'>
                                </el-table-column>

                                <el-table-column
                                        prop="tariffFee"
                                        label='费用'>
                                </el-table-column>

                                <el-table-column
                                        prop="remarks"
                                        label='套餐详情'>
                                </el-table-column>

                            </el-table>
                        </li>
                    </ul>
                </div>

            </div>
        </el-form>

        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(2)">上一步</el-button>
            <el-button type="primary" size="mini" @click="addBusinessSave()">暂存信息</el-button>
            <el-button type="primary" size="mini" @click="next(4)">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import setMeal from './setMeal';
    export default {
        name: 'stepThree',
        props:[

        ],
        data() {
            return {
                addNumdialogVisible:false,
                searchNumdialogVisible:false,
                addNumform:{
                    activeName:'',
                },
                stepThreeForm:{
                    //是否需要保存公司到后台
                    needCompanySave:false,
                    //公司信息
                    companyId:'',
                    companyName:'',
                   // 经办人信息入参
                    agentName:'',             //经办人姓名
                    agentMobilePhone:'',      //经办人电话
                    agentDocumentType:'',     //经办人证件
                    agentDocumentNum:'',      //经办人证件号码
                    agentCardFront:'',        //正面照
                    agentCardBack: '',        //反面照
                    agentCardWIthHand:'',     //本人手持证件照

                    // 400号码入参
                    number400:'',             //400号码
                    tariffName:'',            //套餐
                    bottomFee:'',             //低消
                    basicFunctionFee:'',      //低消
                    durationPresentation:'',  //预存话费
                    units:'',                 //单位
                    amount:'',                //数量
                    packageContent:'',        //套餐详情

                    // 归属地入参
                    provinceBelong:'',        //归属地(省)
                    cityBelong:'',            //归属地(市)

                    // 优惠活动
                    discounts:'',
                    //套餐id
                    tariffPackageId:'',
                    packageRules:'',
                    excessTariff:'',
                    unitPriceType:'',
                    excessPriceType:'',

                    //登录信息
                    channel:'',

                },
                valueAdd:[],       // 选中的增值业务数组
                discountsList:[],  //优惠数组
                disList:[],
                objCodeList:[{     //目的码数组
                    id:"",
                    destnumber:"6666",
                    number400:"400142520888",

                    destnumproofpic:"",
                    destnumUsage:"",
                    companyid:"",
                    valueAddedId:"",
                    status:"",
                    connectType:"",
                    connectId:"",
                    flowId:""
                }],
                selectedNum:[],    //已选号码列表
                searchNumList:[],  //400号码模糊搜索列表
                objCodeTable: [],  //增值表格
                identityTypeList:[   //证件类型
                    {
                        value: '1',
                        label: '营业执照'
                    }, {
                        value: '2',
                        label: '组织机构代码证'
                    }, {
                        value: '3',
                        label: '三证合一'
                    }
                ],
                provinceId:'', //省id
                cityId:'',  //城市id
                provinceList:[],
                cityList:[],
                addObjCode:'',  //添加目的码
                delObjCode:'',  //删减目的码
                busIdentity:'', //业务身份
                mealList:[],    //套餐数组
                searchNumPage:{
                    pageSize:10,
                    page:1,
                    total:0,
                },
                pageObj:{
                    total:0,
                    page:1,
                    pageSize:10
                },
                currentPage: 1,   //分页
                titleNum:'',
                sealInfo:'',      //套餐信息
            };

        },
        components: {
            setMeal
        },
        created(){
            console.log(sessionStorage.getItem('businessType'));
            this.busIdentity = sessionStorage.getItem('businessType');
            this.stepThreeForm.channel = this.busIdentity;
            this.getConcessionScheme(this.busIdentity);
            this.getAllProvince();

            this.$root.eventHub.$on('needCompanySave',(resp)=>{
                console.log("needCompanySave",resp);
                this.needCompanySave = resp;
            });
            this.$root.eventHub.$on('getLoginInfo', (resp)=>{
                console.log('getLoginInfo',resp);
                this.getValueAdded(resp);
                this.stepThreeForm.channel = resp.businessType;
            });
            this.$root.eventHub.$on('companyMsg', (resp)=>{
                console.log(resp);
                this.stepThreeForm.companyName = resp.companyName;
                this.stepThreeForm.companyId = resp.id;
            });
            //详情
            console.log(sessionStorage.getItem('entrance'));
            console.log(this.number400Concession);
            if(sessionStorage.getItem('entrance')==2){
                if(this.number400Concession.length!=0){

                    this.disList = this.number400Concession;
                }
                this.stepThreeForm = this.business;
                this.objCodeList = this.destNumber;
                this.valueAdd = this.number400ValueAdded;
                this.stepThreeForm.discounts = this.number400Concession[0].concessionName;
                this.stepThreeForm.id = this.number400Concession[0].id;
            }
        },
        methods: {
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
                console.log(`当前页: ${val}`);
            },
            lalalal(val){
                console.log(val);
                this.valueAdd = val;
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                this.stepThreeForm.agentCardFront = URL.createObjectURL(file.raw);
            },
            handleBackSuccess(res, file) {
                this.stepThreeForm.agentCardBack = URL.createObjectURL(file.raw);
            },
            handleHandSuccess(res, file) {
                this.stepThreeForm.agentCardWIthHand = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            change123(event) {
                console.log("event",event);
            },

            //新增目的码
            addObjCodes(){
                let unit = {};
                this.objCodeList.push(unit);
            },
            // 删除目的码
            delObjCodes(index){
                console.log(index);
                this.objCodeList.splice(index,1);
            },
            // 选号
            addNumSave(){
                this.addNumdialogVisible=false;
            },
            // 新增号码按钮
            addNum(){
                this.addNumdialogVisible = true;
                this.$nextTick(()=>{
                    console.log("this.$refs.child1",this.$refs.child1);
                });
                this.getTariff(this.busIdentity);
                // setTimeout(()=>{
                //     console.log("this.$refs.child1",this.$refs.child1);
                //     this.$refs.child1[0].getAllByPackage2();
                // },1000);


            },
            // 弹窗关闭
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            // 优惠
            getConcessionScheme(val){
                console.log(val);
                this.$ajax.post('/vos/tariffPackage/getConcessionScheme',{
                    "concessionScheme":{
                        "channel":val,
                        "id":"",
                    }
                }).then((res)=>{
                    console.log(val);
                    console.log(res.data.concessionSchemeList);
                    this.discountsList =res.data.concessionSchemeList;
                })
            },
            // 增值业务
            getValueAdded(val){
                console.log("111111111",val);
                this.$ajax.post('/vos/tariffPackage/getValueAdded',{
                    "valueAdded":{
                        "channel":val.businessType,
                        "id":'',
                    }
                }).then((res)=>{
                    console.log(res.data.valueAddedList);
                    this.objCodeTable = res.data.valueAddedList;
                })
            },
            //查询资费套餐
            getTariff(val){
                this.$ajax.post('/vos/tariffPackage/getTariff',{
                    "tariff":{
                        "id":"",
                        "channel":val.businessType
                    }
                }).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.tariffPackageList);
                    this.mealList = res.data.tariffPackageList;
                })
            },
            // 省
           getAllProvince(){
                this.$ajax.get('/vos/address/getAllProvince').then((res)=>{
                    console.log(res.data);
                    this.provinceList = res.data;
                })
            },
            // 市
            getCitiesByProvinceId(){
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId='+this.provinceId).then((res)=>{
                    console.log(res.data);
                    this.cityList = res.data;
                })
            },
            //以套餐分类搜索400号码
            searchByPackage(){
                this.$ajax.post('/vos/number400/searchByPackage',{
                    "num400Package":{
                        "number400":this.addNumform.activeName,
                        "packgeId":""
                    },
                    "page":{
                        "pageNo":this.searchNumPage.page,
                        "pageSize":this.searchNumPage.pageSize,
                    }
                }).then((res)=>{
                    console.log(res.data);
                })
            },
            //号码模糊搜索
            searchNum(){
                this.searchNumdialogVisible = true;
                this.$ajax.post('/vos/number400/searchByPackage',{
                    "num400Package":{
                        "number400":this.addNumform.activeName,
                        "packgeId":""
                    },
                    "page":{
                        "pageNo":this.pageObj.page,
                        "pageSize":this.pageObj.pageSize
                    }

                }).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.number400s);
                    this.searchNumList = res.data.number400s;
                    this.pageObj.total = res.data.totalCount;
                })
            },
            // 优惠切换
            discountChange(val){
                console.log(val);
                this.disList=[];
                this.disList.push(val);
                console.log(this.disList);
            },
            // 选择400号码，添加到已选号码
            getAllByPackage(val){
                console.log(val);
                this.titleNum = val;
                this.stepThreeForm.number400=this.titleNum;
                this.$ajax.post('/vos/number400/searchByPackage',{
                    "num400Package":{
                        "number400":this.titleNum,
                        "packgeId":""
                    },
                    "page":{
                        "pageNo":this.pageObj.page,
                        "pageSize":this.pageObj.pageSize
                    }

                }).then((res)=>{
                    console.log(res.data);
                    console.log(res.data.number400s);
                    console.log(res.data.number400s[0]);
                    this.selectedNum = res.data.number400s;
                    this.pageObj.total = res.data.totalCount;
                    this.sealInfo = res.data.number400s[0];

                    //套餐返回值
                    this.stepThreeForm.packgeId = this.sealInfo.packgeId;
                    this.stepThreeForm.basicFunctionFee = this.sealInfo.basicFunctionFee;
                    this.stepThreeForm.bottomFee = this.sealInfo.bottomFee ;
                    this.stepThreeForm.durationPresentation = this.sealInfo.durationPresentation;
                    this.stepThreeForm.excessPriceType = this.sealInfo.excessPriceType;
                    this.stepThreeForm.excessTariff = this.sealInfo.excessTariff;
                    this.stepThreeForm.unitPrice = this.sealInfo.unitPrice;
                    this.stepThreeForm.unitPriceType = this.sealInfo.unitPriceType;
                    this.stepThreeForm.units = this.sealInfo.units;

                })
            },

            // 删除已选400号码
            delNum(val){
                console.log(val);
                this.selectedNum.splice(val,1)
            },
            // 省份切换
            proChange(val){
                console.log(val);
                this.provinceId = val;
                this.getCitiesByProvinceId();
            },
            cityChange(val){
                console.log(val);
                this.cityId = val;
                // this.getAreasByCityId();
            },
            next(val){
                this.$emit('childNext', val);
                if(val==4){
                    console.log(this.disList);
                    this.ChangeBusinessStatus(this.stepThreeForm);
                    this.ChangeDestNumberStatus(this.objCodeList);
                    this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                    this.ChangeNumber400ConcessionStatus(this.disList);
                    console.log("company",this.company);
                    console.log("business",this.business);
                    console.log("destNumber",this.destNumber);
                    console.log("number400Concession",this.number400Concession);
                    //第三步点击下一步之前检查number400是否绑定了引示号
                    this.$ajax.post('/vos/business/matchGuideNumber',{
                        "number400":this.titleNum,
                    }).then((res)=>{
                        if(res.code==200){
                            console.log(res);
                        }else{
                            this.$message({type:'warning',message:res.message});
                        }
                    })
                }
            },
            addBusinessSave(){
                console.log(this.stepThreeForm);
                console.log(this.disList);
                this.ChangeBusinessStatus(this.stepThreeForm);
                this.ChangeDestNumberStatus(this.objCodeList);
                this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                this.ChangeNumber400ConcessionStatus(this.disList);
                console.log("company",this.company);
                console.log("business",this.business);
                console.log("destNumber",this.destNumber);
                console.log("number400Concession",this.number400Concession);
                this.$ajax.post('/vos/business/startAndSave', {
                    "company":this.company,
                    "business":this.stepThreeForm,
                    "number400ValueAdded":this.valueAdd,
                    "number400Concession":this.number400Concession,
                    "companyFlow":{
                        "flowId":""
                    }
                }).then((res)=>{
                    if(res.code=='200'){
                        console.log(res);
                        this.$root.eventHub.$emit('flowId',res.data);
                    }else{
                        this.$message.warning(res.message);
                    }
                });
            },
            // 存vuex更新业务信息模块入参
            ChangeBusinessStatus(val){
                return this.$store.dispatch("ChangeBusinessStatus", val);
            },
            // 存vuex更新业务信息模块入参
            ChangeDestNumberStatus(val){
                return this.$store.dispatch("ChangeDestNumberStatus", val);
            },
            // 存vuex更新增值业务模块入参
            ChangeNumber400ValueAddedStatus(val){
                return this.$store.dispatch("ChangeNumber400ValueAddedStatus", val);
            },
            // 存vuex更新优惠模块入参
            ChangeNumber400ConcessionStatus(val){
                return this.$store.dispatch("ChangeNumber400ConcessionStatus", val);
            },

        },
        computed: {
            ...mapState({
                company: state => state.createActivities.company,
                business: state => state.createActivities.business,
                destNumber: state => state.createActivities.destNumber,
                number400ValueAdded: state => state.createActivities.number400ValueAdded,
                number400Concession: state => state.createActivities.number400Concession,
            })
        },
        watch:{

        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background-color: #ecf5ff;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .examplew .avatar-uploader-icon {
        width: 120px;
        height: 148px;
        line-height: 148px;
    }

    .examplew .avatar {
        width: 120px;
        height: 148px;
    }

    .exampleh .avatar-uploader-icon {
        width: 148px;
        height: 120px;
        line-height: 120px;
    }

    .exampleh .avatar {
        width: 148px;
        height: 120px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
    }
    .avatar {
        display: block;
    }
</style>
<style lang="scss" scoped>
    @import './stepTwo.scss';
</style>
