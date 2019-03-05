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
                                    <ul class="abc">
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
                                                        prop="basicFunctionFeeCopy"
                                                        label="基本功能费">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="durationPresentationCopy"
                                                        label="预存话费">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="unitsCopy"
                                                        label="单位">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="packageContent"
                                                        label="套餐详细">
                                                </el-table-column>

                                                <el-table-column
                                                        label="操作">
                                                    <template slot-scope="scope">
                                                        <el-button size="mini" type="text"
                                                                   @click="delNum(scope.$index)">删除
                                                        </el-button>
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

                                <el-tabs type="border-card" @tab-click="parentMethod">
                                    <el-tab-pane v-for="(item,index) in mealList" :label="item.tariffName"
                                                 :name="index+''" :key="index+''">
                                        <set-meal
                                                ref="child1"
                                                :unitMeal="item"
                                                :unitIndex="index"
                                                :getAllByPackages="getAllByPackage"></set-meal>
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
                                        prop="basicFunctionFee"
                                        label="基本功能费">
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
                                        <el-button size="mini" type="text" @click="getAllByPackage(scope.row);searchNumdialogVisible=false">选择
                                        </el-button>
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


        <el-form ref="stepThreeForm" :model="stepThreeForm" :rules="rules" label-width="120px">
            <div class="title left">
                经办人基本信息
            </div>
            <div class="handleInfo">
                <el-form-item label="经办人姓名：" class="firmName" prop="agentName">
                    <el-input v-model="stepThreeForm.agentName" size="mini" placeholder="填入法人真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="经办人电话：" class="firmName" prop="agentMobilePhone">
                    <el-input v-model="stepThreeForm.agentMobilePhone" size="mini"
                              placeholder="填入法人联系电话（固话或手机）"></el-input>
                </el-form-item>
                <el-form-item label="经办人证件：" class="identity" prop="agentDocumentType">
                    <el-select v-model="stepThreeForm.agentDocumentType" @change="change123" placeholder="请选择"
                               size="mini">
                        <el-option :label="item.dicValue" :value="item.dicKey" v-for="(item,index) in identityTypeList"
                                   :key="item.dicValue"></el-option>
                    </el-select>
                    <el-input class="agentDocumentNum" v-model="stepThreeForm.agentDocumentNum" size="mini"
                              placeholder="根据证件类型，填写相应的证件号码"></el-input>
                </el-form-item>
            </div>
            <div class="block person_data">
                <div>
                    <div style="float:left;">
                        <span class="grey fmini">经办人身份证：</span>
                    </div>
                    <ul class="abc">
                        <li class="l2">
                            <ul class="abc">
                                <li class="l2">
                                    <el-upload class="avatar-uploader exampleh" :action="$global.uploadUrl"
                                               :show-file-list="false" :on-success="handleAvatarSuccess"
                                               :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                                               accept=".png,.jpeg,.jpg">
                                        <img v-if="stepThreeForm.agentCardFront"
                                             :src="$global.serverSrc+stepThreeForm.agentCardFront" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </li>
                                <li class="l2">
                                    <el-upload class="avatar-uploader exampleh" :action="$global.uploadUrl"
                                               :show-file-list="false" :on-success="handleBackSuccess"
                                               :on-error="handleBackSuccess" :before-upload="beforeAvatarUpload"
                                               accept=".png,.jpeg,.jpg">
                                        <img v-if="stepThreeForm.agentCardBack"
                                             :src="$global.serverSrc+stepThreeForm.agentCardBack" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </li>
                            </ul>
                            <ul class="abc">
                                <li class="l2">
                                    <el-upload class="avatar-uploader exampleh" :action="$global.uploadUrl"
                                               :show-file-list="false" :on-success="handleHandSuccess"
                                               :on-error="handleHandSuccess" :before-upload="beforeAvatarUpload"
                                               accept=".png,.jpeg,.jpg">
                                        <img v-if="stepThreeForm.agentCardWIthHand"
                                             :src="$global.serverSrc+stepThreeForm.agentCardWIthHand" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </li>
                            </ul>
                        </li>
                        <li class="l2">
                            <ul class="abc">
                                <li class="l2 example">
                                    <img class="exampleh" src="../../../assets/example_2.png" alt="">
                                </li>
                                <li class="l2 example">
                                    <img class="exampleh" src="../../../assets/example_3.png" alt="">
                                </li>
                            </ul>
                            <ul class="abc">
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
                    <ul class="abc">
                        <li style="float:unset;margin-left:70px">
                            <p style="text-align: right">业务身份：{{businessStanding}}</p>
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
                                        prop="basicFunctionFeeCopy"
                                        label='基本功能费'>
                                </el-table-column>

                                <el-table-column
                                        prop="durationPresentationCopy"
                                        label='预存话费'>
                                </el-table-column>

                                <el-table-column
                                        prop="unitsCopy"
                                        label='单位'>
                                </el-table-column>

                            </el-table>
                        </li>
                    </ul>
                </div>

                <div class="num400">
                    <span>目的码：</span>
                    <div>
                        <div class="objCodeBox">
                            <el-button type="primary" size="mini" @click="addObjCodes()" style="margin-bottom: 20px">
                                +新增目的码
                            </el-button>
                            <div v-for="(item,index) in objCodeList" :key="index">
                                <div class="addObjCode">
                                    <el-input v-model="item.destNumber" size="mini"></el-input>
                                    <el-button type="primary" icon="el-icon-minus" size="mini"
                                               @click="delObjCodes(index)"></el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="num400">

                    <!--<span>归属地区：</span>-->
                    <div class="QCellCore">
                        <el-form-item label="归属地区：" prop="provinceBelong">
                            <el-select v-model="stepThreeForm.provinceBelong" placeholder="请选择" size="mini"
                                       @change="proChange">
                                <el-option
                                        v-for="item in provinceList"
                                        :key="item.provinceId"
                                        :label="item.province"
                                        :value="item.provinceId">
                                </el-option>
                            </el-select>
                            <el-select v-model="stepThreeForm.cityBelong" placeholder="请选择" size="mini"
                                       @change="cityChange">
                                <el-option
                                        v-for="item in cityList"
                                        :key="item.cityId"
                                        :label="item.city"
                                        :value="item.cityId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="QCellCore">
                        <el-form-item label="优惠套餐：" prop="discounts">
                            <!--<span>优惠：</span>-->
                            <el-select v-model="stepThreeForm.discounts" placeholder="请选择" size="mini"
                                       @change="discountChange">
                                <el-option
                                        v-for="(item,index) in discountsList"
                                        :key="index"
                                        :label="item.concessionName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                </div>

                <div style="float:left;">
                    <span class="fmini">增值服务：</span>
                </div>
                <div style="overflow: hidden" class="addValueTable">
                    <ul class="abc">
                        <li style="float:unset">
                            <el-table ref="addValueTable"
                                      :data="objCodeTable"
                                      border
                                      @selection-change="lalalal"
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
                                        label='数量'
                                        width="270">
                                    <template slot-scope="scope">
                                        <el-input-number
                                                v-if="scope.row.units=='perMonthOne' || scope.row.units=='perMonth'"
                                                size="mini"
                                                v-model="scope.row.numOfMonth"
                                                @change="handleChange(scope.row,scope.$index)"
                                                :min="1"
                                                label="描述文字">
                                        </el-input-number>
                                        <span v-if="scope.row.units=='perMonthOne' || scope.row.units=='perMonth'">{{scope.row.cost}}</span>
                                        <el-input-number
                                                v-if="scope.row.units=='perMonthOne'|| scope.row.units=='perOne'"
                                                size="mini"
                                                v-model="scope.row.numOfone"
                                                @change="handleChange(scope.row,scope.$index)"
                                                :min="1"
                                                label="描述文字">
                                        </el-input-number>
                                        <span v-if="scope.row.units=='perMonthOne'||scope.row.units=='perOne'">{{scope.row.cost2}}</span>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        prop="unitsName"
                                        label='资费/单位'>
                                </el-table-column>

                                <el-table-column
                                        prop="remarks"
                                        label='备注'>
                                </el-table-column>

                                <!--<el-table-column-->
                                        <!--prop="tariffFeeCopy"-->
                                        <!--label='费用'>-->
                                <!--</el-table-column>-->

                                <el-table-column
                                        prop="remarks"
                                        label='套餐详情'>
                                </el-table-column>

                                <el-table-column
                                        prop="presentsName"
                                        label='是否赠送'>
                                </el-table-column>

                            </el-table>
                        </li>
                    </ul>
                </div>

            </div>
        </el-form>

        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next(2)">上一步</el-button>
            <el-button type="primary" size="mini" @click="addBusinessSave()" v-if="saveBtnHidden">暂存信息</el-button>
            <el-tooltip content="请先暂存信息" placement="top" effect="light">
                <div class="saveTips" @click="next(4,'stepThreeForm')"></div>
            </el-tooltip>
            <el-button type="primary" size="mini" :disabled="nextDisabled">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    import setMeal from './setMeal';

    export default {
        name: 'stepThree',
        props: [],
        data() {
            return {
                addNumdialogVisible: false,
                searchNumdialogVisible: false,
                addNumform: {
                    activeName: '',
                },
                stepThreeForm: {
                    source: "self",
                    //是否需要保存公司到后台
                    needCompanySave: false,
                    //公司信息
                    companyId: '',
                    companyName: '',
                    // 经办人信息入参
                    agentName: '',             //经办人姓名
                    agentMobilePhone: '',      //经办人电话
                    agentDocumentType: '',     //经办人证件
                    agentDocumentNum: '',      //经办人证件号码
                    agentCardFront: '',        //正面照
                    agentCardBack: '',        //反面照
                    agentCardWIthHand: '',     //本人手持证件照

                    // 400号码入参
                    number400: '',             //400号码
                    tariffName: '',            //套餐
                    bottomFee: '',             //低消
                    basicFunctionFee: '',      //低消
                    durationPresentation: '',  //预存话费
                    units: '',                 //单位
                    packageContent: '',        //套餐详情
                    type: '',                  //1是月，2是年
                    amount: 1,                 //数量

                    // 归属地入参
                    provinceBelong: '',        //归属地(省)
                    cityBelong: '',            //归属地(市)

                    // 优惠活动
                    discounts: '',

                    //套餐id
                    tariffPackageId: '',
                    excessTariff: '',
                    unitPriceType: '',
                    unitPrice: '',
                    excessPriceType: '',

                    //登录信息
                    channel: '',

                    //业务id
                    id: '',
                },
                rules: {
                    agentName: [
                        {required: true, message: '请输入经办人姓名', trigger: 'blur'},
                    ],
                    agentMobilePhone: [
                        {required: true, message: '请填写经办人电话', trigger: 'change'}
                    ],
                    agentDocumentType: [
                        {type: 'string', required: true, message: '请选择经办人证件', trigger: 'change'}
                    ]
                },
                valueAdd: [],       // 选中的增值业务数组
                discountsList: [],  //优惠数组
                disList: [],
                objCodeList: [{     //目的码数组
                    id: "",
                    destNumber: "",
                    number400: "",
                    destnumProofPic: "",
                    destnumUsage: "",
                    companyid: "",
                    valueAddedId: "",
                    status: "",
                    connectType: "",
                    connectId: "",
                    flowId: "",
                }],
                stepThreeFlowId: "",
                companyIdInfo: {},
                selectedNum: [],    //已选号码列表
                searchNumList: [],  //400号码模糊搜索列表
                objCodeTable: [],  //增值表格
                identityTypeList: [],   //证件类型
                provinceId: '', //省id
                cityId: '',  //城市id
                provinceList: [],
                cityList: [],
                addObjCode: '',  //添加目的码
                delObjCode: '',  //删减目的码
                busIdentity: '', //业务身份
                businessStanding: '',//业务身份中文
                mealList: [],    //套餐数组
                firstPackageId: '', //第一个套餐id
                searchNumPage: {
                    pageSize: 10,
                    page: 1,
                    total: 0,
                },
                pageObj: {
                    total: 0,
                    page: 1,
                    pageSize: 10
                },
                currentPage: 1,   //分页
                titleNum: '',
                tabId: '',
                tabNum400: '',
                sealInfo: '',      //套餐信息
                businessIn: '',
                saveBtnHidden: true,
                nextDisabled: true,
                packgeId: '',
                businessObj:{},
            };

        },
        components: {
            setMeal
        },

        mounted() {
            if (sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3) {
                //详情
                console.log(this.business);
                // console.log(this.destNumber);
                // console.log(this.number400ValueAdded);
                // console.log(this.number400Concession);
                this.stepThreeForm = this.business;
                this.objCodeList = this.destNumber;
                // console.log(this.valueAdd);
                // console.log(this.this.number400ValueAdded);
                this.valueAdd = this.number400ValueAdded;
                console.log("this.valueAdd", this.valueAdd);
                this.disList = this.number400Concession;
                // 优惠回显
                if(this.number400Concession!=null){

                    this.number400Concession.map((item) => {
                        this.stepThreeForm.discounts = item.concessionName;
                    });
                }

                //400号码表格回显
                console.log("this.selectedNum",this.selectedNum);
                if(this.business.units){
                    let selectedNumCopy = {};
                    selectedNumCopy.units = this.business.units;
                    selectedNumCopy.unitsCopy = this.business.units + '月';
                    selectedNumCopy.number400 = this.business.number400;
                    selectedNumCopy.tariffName = this.business.tariffName;
                    selectedNumCopy.basicFunctionFee = this.business.basicFunctionFee;
                    selectedNumCopy.basicFunctionFeeCopy = this.business.basicFunctionFee + '元';
                    selectedNumCopy.packageContent = this.business.packageContent;
                    selectedNumCopy.durationPresentation = this.business.durationPresentation;
                    selectedNumCopy.durationPresentationCopy = this.business.durationPresentation + '元';
                    selectedNumCopy.durationPresentation = this.business.durationPresentation;
                    this.selectedNum.push(selectedNumCopy);
                }
                this.getAllProvince();
            } else {
                this.getAllProvince();
            }
            // console.log(this.number400ValueAdded);
            // console.log(this.valueAdd);
            this.getValueAdded(this.busIdentity);
        },
        created() {
            // console.log(sessionStorage.getItem('businessType'));
            // console.log("saveBtnHidden", this.saveBtnHidden);
            // console.log("nextDisabled", this.nextDisabled);
            this.busIdentity = sessionStorage.getItem('businessType');
            if (this.busIdentity == "self") {
                this.businessStanding = '自营'
            } else {
                this.businessStanding = '阿里'
            }
            this.stepThreeForm.channel = this.busIdentity;
            this.getConcessionScheme(this.busIdentity);

            this.$root.eventHub.$on('needCompanySave', (resp) => {
                console.log("needCompanySave", resp);
                this.stepThreeForm.needCompanySave = resp;
            });

            this.$root.eventHub.$on('dialogVisibleBusiness', (res) => {
                this.visibleBusiness = res.visibleBusiness;
                if (res.businessIn) {
                    this.businessIn = res.businessIn;
                }
            });

            // console.log(sessionStorage.getItem('businessIn'));
            this.businessIn = sessionStorage.getItem('businessIn');

            //新增受理
            if (sessionStorage.getItem('businessIn') == 1) {
                this.$root.eventHub.$on('flowId', (resp) => {
                    // console.log("flowId", resp);
                    this.flowId = resp;
                });
            } else if (sessionStorage.getItem('businessIn') == 3) {
                this.saveBtnHidden = false;
                this.nextDisabled = false;
                // console.log("saveBtnHidden", this.saveBtnHidden);
            }
            if (sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3 || sessionStorage.getItem('businessIn') == 4) {
                this.stepFourDetail();
            }
            this.agentDocumentTypeList();

        },
        methods: {
            // 详情
            stepFourDetail() {
                console.log("this.business", this.business);
                this.stepThreeForm = this.business;
                // this.selectedNum[0].basicFunctionFeeCopy = this.business.basicFunctionFee;
                // this.selectedNum[0].durationPresentationCopy = this.business.durationPresentation;
                // this.selectedNum[0].unitsCopy = this.business.units;
            },
            // 分页
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
                // console.log(`当前页: ${val}`);
            },
            // 数量变化
            handleChange(value, index1) {
                console.log(value);
                console.log(this.objCodeTable);
                console.log(this.valueAdd);
                this.$set(this.objCodeTable, index1, value);
                this.valueAdd.map((item, index) => {
                    if (item.valueAddedId == value.id) {
                        this.valueAdd[index] = this.objCodeTable[index1];
                        console.log("item",item);
                        // item.tariffFeeCopy = item.numOfMonth * item.tariffFee;
                    }
                });
                // this.stepThreeForm.amount = value;
            },
            //增值服务点击数值输入框添加删除回调事件
            lalalal(val) {
                console.log(val);
                console.log(this.selectedNum);
                let newValueAdd = [];
                val.map((item) => {
                    let obj = {};
                    obj.number400 = this.selectedNum && this.selectedNum.length != 0 ? this.selectedNum[0].number400 : null;
                    obj.valueAddedName = item.tariffName;
                    obj.tariffName = item.tariffName;
                    obj.tariffFee = item.tariffFee;
                    obj.valueAddedId = item.id;
                    obj.presents = item.presents;
                    obj.remarks = item.remarks;
                    obj.valueAddedFee = item.tariffFee;
                    obj.units = item.units;
                    if (item.units != 'perOne') {
                        obj.numOfMonth = item.numOfMonth;
                    }
                    obj.unitsName = item.unitsName;
                    obj.presentsName = item.presentsName;
                    if (item.units == 'perMonthOne' || item.units == 'perOne') {
                        obj.numOfone = item.numOfone;
                    }
                    newValueAdd.push(obj);
                });
                this.valueAdd = newValueAdd;
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardFront = res;
                }
            },
            handleBackSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardBack = res;
                }
            },
            handleHandSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardWIthHand = res;
                }
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            change123(event) {
                // console.log("event", event);
            },

            //新增目的码
            addObjCodes() {
                console.log(this.objCodeList);
                let unit = {};
                this.objCodeList.push(unit);
                this.objCodeTable.map((item, index) => {
                    if (item.tariffName == '新增目的码') {
                        item.numOfone++;
                        this.$set(this.objCodeTable, index, item);
                    }
                })
            },
            // 删除目的码
            delObjCodes(index) {
                // console.log(index);
                this.objCodeList.splice(index, 1);
                this.objCodeTable.map((item, index) => {
                    if (item.tariffName == '新增目的码') {
                        item.numOfone--;
                        this.$set(this.objCodeTable, index, item);
                    }
                })
            },
            // 选号
            addNumSave() {
                this.addNumdialogVisible = false;
            },
            // 新增号码按钮
            addNum() {
                this.addNumdialogVisible = true;
                this.getTariff(this.busIdentity);
                setTimeout(() => {
                    // console.log("this.$refs.child1", this.$refs.child1);
                    this.$refs.child1[0].getAllByPackage2(this.firstPackageId);
                }, 1000);
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
            // 优惠列表
            getConcessionScheme(val) {
                console.log(val);
                this.$ajax.post('/vos/tariffPackage/getConcessionScheme', {
                    "concessionScheme": {
                        "channel": val,
                        "concessionWay": 2,
                    }
                }).then((res) => {
                    // console.log(val);
                    console.log("concessionSchemeList", res.data.concessionSchemeList);
                    this.discountsList = res.data.concessionSchemeList;
                })
            },
            // 增值业务
            getValueAdded(val) {
                this.$ajax.post('/vos/tariffPackage/getValueAdded', {
                    "valueAdded": {
                        "channel": val,
                        "id": '',
                    }
                }).then((res) => {
                    console.log("增值业务表格",res.data.valueAddedList);
                    this.objCodeTable = res.data.valueAddedList;
                    this.objCodeTable.map((item) => {
                        console.log(item);
                        if (item.units != 'perOne') {
                            item.numOfMonth = 1;
                        }
                        item.numOfone = 1;
                        if (item.units == 'perMonth') {
                            // console.log("数量是月单位的");
                            item.cost = "月";
                            item.unitsName = (item.tariffFee / item.numOfMonth) + '元/月';
                            item.tariffFeeCopy = item.numOfMonth * item.tariffFee;
                            item.valueAddedFee = item.tariffFeeCopy;
                        } else if (item.units == 'perOne') {
                            // console.log("数量是个单位的");
                            item.cost = "个";
                            item.cost2 = "个";
                            item.unitsName = (item.tariffFee / item.numOfone) + '元/个';
                            item.tariffFeeCopy = item.numOfone * item.tariffFee;
                            item.valueAddedFee = item.tariffFeeCopy;
                            // console.log();
                        } else if (item.units == 'perMonthOne') {
                            // console.log("数量是月/个单位的");
                            item.cost = "月";
                            item.cost2 = "个";
                            item.unitsName = (item.tariffFee / item.numOfMonth) + '元/月/个';
                            item.tariffFeeCopy = item.numOfMonth * item.numOfone * item.tariffFee;
                            item.valueAddedFee = item.tariffFeeCopy;
                        }
                        item.valueAddedName = item.tariffName;
                        item.valueAddedId = item.id;
                        item.valueAddedFee = item.tariffFeeCopy;
                        if (item.units == 'perMonthOne' || item.units == 'perOne') {
                            item.numOfone = item.numOfone;
                        }
                        if (item.presents == '1') {
                            item.presentsName = "赠送";
                        } else {
                            item.presentsName = "付费";
                        }
                    });
                    let newValueAdd = [];
                    this.$nextTick(() => {
                        // console.log(this.selectedNum);
                        // console.log('ccc', this.number400ValueAdded);
                        this.objCodeTable.map((item, index) => {   //表格数据
                            if (this.number400ValueAdded && this.number400ValueAdded.length > 0) {
                                this.number400ValueAdded.map((item1) => {  //选中数据数组
                                    if (item1.valueAddedId == item.id) {
                                        console.log("111111111111111111111111111111111111111111");
                                        if (item.units == 'perMonth') {
                                            item.tariffFeeCopy = item1.numOfMonth * item1.tariffFee;
                                            item.valueAddedFee = item1.tariffFeeCopy;
                                        } else if (item.units == 'perOne') {
                                            item.tariffFeeCopy = item1.numOfone * item1.tariffFee;
                                            item.valueAddedFee = item1.tariffFeeCopy;
                                            // console.log();
                                        } else if (item.units == 'perMonthOne') {
                                            item.tariffFeeCopy = item1.numOfMonth * item1.numOfone * item1.tariffFee;
                                            item.valueAddedFee = item1.tariffFeeCopy;
                                        }else{

                                        }

                                        //把选中的复选框信息赋值给原数组勾选的选项
                                        item1.tariffFee = item.valueAddedFee;
                                        item1.tariffFeeCopy = item.tariffFeeCopy;
                                        if (item.units != 'perOne') {
                                            item.numOfMonth = item1.numOfMonth;
                                        }
                                        item.numOfone = item1.numOfone;
                                        this.$set(this.objCodeTable, index, item1);
                                        //回显勾选的
                                        console.log("回显勾选的");
                                        this.$refs.addValueTable.toggleRowSelection(this.objCodeTable[index], true);
                                        let obj = {};
                                        if (this.selectedNum && this.selectedNum.length != 0) {
                                            obj.number400 = this.selectedNum[0].number400;
                                        }
                                        obj.valueAddedName = item.tariffName;
                                        obj.valueAddedId = item.id;
                                        obj.presents = item.presents;
                                        obj.remarks = item.remarks;
                                        obj.tariffFeeCopy = item.tariffFeeCopy;
                                        obj.valueAddedFee = item.tariffFee;
                                        obj.tariffFee = item.tariffFee;
                                        obj.units = item.units;
                                        if (item.units != 'perOne') {
                                            obj.numOfMonth = item.numOfMonth;
                                        }
                                        if (item.units == 'perMonthOne' || item.units == 'perOne') {
                                            obj.numOfone = item.numOfone;
                                        }
                                        newValueAdd.push(obj);
                                        // console.log(newValueAdd);
                                    }
                                    if(item.tariffName=='新增目的码'){
                                        if(item1.tariffName != '新增目的码') {
                                            //如果新增目的码选项没打勾，回显个数依然和目的码个数一样
                                            console.log("新增目的码没有打勾");
                                            item.numOfone=this.objCodeList.length;
                                        }
                                    }

                                });
                            } else {
                                if (item.presents == 1) {
                                    //赠送勾选
                                    console.log("赠送勾选");
                                    this.$refs.addValueTable.toggleRowSelection(item, true);
                                    let obj = {};
                                    if (this.selectedNum && this.selectedNum.length != 0) {
                                        obj.number400 = this.selectedNum[0].number400;
                                    }
                                    obj.valueAddedName = item.tariffName;
                                    obj.valueAddedId = item.id;
                                    obj.presents = item.presents;
                                    obj.remarks = item.remarks;
                                    obj.tariffFee = item.tariffFee;
                                    obj.tariffFeeCopy = item.tariffFeeCopy;
                                    obj.valueAddedFee = item.tariffFee;
                                    obj.units = item.units;
                                    obj.numOfMonth = item.numOfMonth;
                                    if (item.units == 'perMonthOne' || item.units == 'perOne') {
                                        obj.numOfone = item.numOfone;
                                    }
                                    newValueAdd.push(obj);
                                    // console.log(newValueAdd);
                                }
                            }
                        });
                    });
                    this.valueAdd = newValueAdd;
                    // console.log(this.valueAdd);
                    this.$set(this.objCodeTable);
                    return new Promise(resolve => {
                        resolve();
                    })

                })
            },
            //查询资费套餐
            getTariff(val) {
                this.$ajax.post('/vos/tariffPackage/getTariff', {
                    "tariff": {
                        "id": "",
                        "channel": val
                    }
                }).then((res) => {
                    // console.log(res.data);
                    // console.log(res.data.tariffPackageList);
                    // console.log(res.data.tariffPackageList[0].id);
                    this.firstPackageId = res.data.tariffPackageList[0].id;
                    this.mealList = res.data.tariffPackageList;
                })
            },
            // 省
            getAllProvince() {
                this.$ajax.get('/vos/address/getAllProvince').then((res) => {
                    console.log(res.data);
                    this.provinceList = res.data;
                    if (sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3) {
                        // console.log(this.stepThreeForm.provinceBelong);
                        this.getCitiesByProvinceId(this.stepThreeForm.provinceBelong);
                    }
                })
            },
            // 市
            getCitiesByProvinceId(provinceId) {
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + provinceId).then((res) => {
                    // console.log(res.data);
                    this.cityList = res.data;
                })
            },

            //以套餐分类搜索400号码
            searchByPackage() {
                this.$ajax.post('/vos/number400/searchByPackage', {
                    "num400Package": {
                        "number400": this.addNumform.activeName,
                        "packgeId": ""
                    },
                    "page": {
                        "pageNo": this.searchNumPage.page,
                        "pageSize": this.searchNumPage.pageSize,
                    }
                }).then((res) => {
                    console.log(res.data);
                })
            },
            //号码模糊搜索
            searchNum() {
                this.searchNumdialogVisible = true;
                this.$ajax.post('/vos/number400/searchByPackage', {
                    "num400Package": {
                        "number400": this.addNumform.activeName,
                        "packgeId": ""
                    },
                    "page": {
                        "pageNo": this.pageObj.page,
                        "pageSize": this.pageObj.pageSize
                    }

                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.number400s);
                    this.searchNumList = res.data.number400s;
                    this.pageObj.total = res.data.totalCount;
                })
            },
            // 优惠切换
            discountChange(val) {
                console.log(val);
                let ll = {};
                let dex;
                this.discountsList.map((item, index) => {
                    if (item.id == val) {
                        ll = item;
                        dex = index;
                    }
                });
                let disObj = ll;
                this.disList = [];
                disObj.amount = 1;
                disObj.number400 = this.selectedNum[0].number400;
                this.disList.push(disObj);
                this.$set(this.discountsList, dex, ll);
            },

            // 经办人证件类型
            agentDocumentTypeList() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "documentType",
                    "status": 1
                }).then((res) => {
                    // console.log("经办人证件类型",res.data.dicList);
                    this.identityTypeList = res.data.dicList;
                })
            },

            // 选择400号码，添加到已选号码
            getAllByPackage0(index) {
                console.log(index);
                console.log("this.mealList", this.mealList);
                this.tabId = this.mealList[index].id;
                console.log("this.tabId ", this.tabId);
                console.log("this.$refs.child1", this.$refs.child1);
                this.$refs.child1[index].getAllByPackage2(this.tabId);
            },

            // 删除已选400号码
            delNum(val) {
                console.log(val);
                this.selectedNum.splice(val, 1);
            },
            // 省份切换
            proChange(val) {
                console.log(val);
                this.provinceId = val;
                this.provinceList.map((item) => {
                    if (item.provinceId == val) {
                        this.stepThreeForm.provinceBelong = item.province;
                    }
                });
                this.getCitiesByProvinceId(this.provinceId);
            },
            cityChange(val) {
                console.log(val);
                this.cityId = val;
                this.cityList.map((item) => {
                    if (item.cityId == val) {
                        this.stepThreeForm.cityBelong = item.city;
                    }
                })
            },
            next(val, formName) {
                if (val == 2) {
                    this.$emit('childNext', val);
                } else {
                    this.$refs[formName].validate((valid) => {
                        let returnBoolean = false;
                        if (valid) {
                            if (this.stepThreeForm.agentCardFront == '' || this.stepThreeForm.agentCardBack == '' || this.stepThreeForm.agentCardWIthHand == '') {
                                this.$message.warning("请完善经办人图片信息");
                            } else if (this.objCodeList.length == 0) {
                                this.$message.warning("请新增目的码");
                            } else {
                                console.log("this.objCodeList", this.objCodeList);
                                this.objCodeList.map((item) => {
                                    if (!item.destNumber) {
                                        returnBoolean = true;
                                    }
                                });
                                if (returnBoolean) {
                                    this.$message.warning("请填写空白目的码");
                                    return
                                }
                            }
                            if(this.nextDisabled == false){
                                this.$emit('childNext', val);
                            }
                            console.log(this.disList);
                            this.businessObj = Object.assign(this.business, this.stepThreeForm);
                            this.ChangeBusinessStatus(this.businessObj);
                            this.ChangeDestNumberStatus(this.objCodeList);
                            this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                            this.ChangeNumber400ConcessionStatus(this.disList);
                            console.log("company", this.company);
                            console.log("business", this.business);
                            console.log("destNumber", this.destNumber);
                            console.log("number400Concession", this.number400Concession);
                            if (this.businessIn != 3) {
                                this.nextDisabled = true;
                            }
                        } else {
                            this.$message.warning("请完善信息");
                            return false;
                        }
                    });
                }

            },

            // 暂存
            addBusinessSave() {
                if (this.selectedNum.length == 0) {
                    this.$message.warning("请添加400号码");
                } else {
                    console.log("this.valueAdd", this.valueAdd);
                    console.log("this.business", this.business);
                    console.log("this.business.companyId", this.business.companyId);
                    console.log("第三步获取flowed", sessionStorage.getItem('entireFlowId'));
                    console.log("入口：", sessionStorage.getItem('businessIn'));
                    this.stepThreeForm.companyName = this.company.companyName;
                    this.stepThreeForm.companyId = this.business.companyId;
                    console.log("selectedNum", this.selectedNum);
                    this.stepThreeForm.number400 = this.selectedNum[0].number400;
                    this.stepThreeForm.tariffName = this.selectedNum[0].tariffName;
                    this.stepThreeForm.packageContent = this.selectedNum[0].packageContent;
                    this.stepThreeForm.units = this.selectedNum[0].units;
                    this.stepThreeForm.durationPresentation = this.selectedNum[0].durationPresentation;
                    this.stepThreeForm.basicFunctionFee = this.selectedNum[0].basicFunctionFee;
                    this.stepThreeForm.type = this.business.type==null?this.selectedNum[0].type:this.business.type;
                    this.stepThreeForm.tariffPackageId = this.selectedNum[0].packgeId;
                    this.stepThreeForm.excessTariff = this.selectedNum[0].excessTariff;
                    this.stepThreeForm.unitPrice = this.selectedNum[0].unitPrice;
                    // 优惠
                    this.disList.map((item)=>{
                        delete item.id;
                    });
                    //增值服务删除id
                    let valueAddDelId = [];
                    valueAddDelId = this.valueAdd;
                    valueAddDelId.map((zool)=>{
                        delete zool.id;
                    });
                    console.log("this.stepThreeForm.amount",this.stepThreeForm.amount);
                    console.log(this.stepThreeForm);
                    console.log(this.disList);
                    this.businessObj = Object.assign(this.business, this.stepThreeForm);
                    this.ChangeBusinessStatus(this.businessObj);
                    this.ChangeDestNumberStatus(this.objCodeList);
                    this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                    this.ChangeNumber400ConcessionStatus(this.disList);
                    console.log("company", this.company);
                    if (this.company.idIndate && this.company.idIndate.length != 0) {
                        this.company.cardStartDate = this.company.idIndate[0];
                        this.company.cardEndDate = this.company.idIndate[1];
                    }
                    console.log("company", this.company);
                    console.log("business", this.business);
                    console.log("destNumber", this.destNumber);
                    console.log("number400Concession", this.number400Concession);
                    var url;
                    if (this.businessIn == 1 || this.businessIn == 2) {       //新增和编辑的暂存
                        url = '/vos/business/startAndSave';
                    } else if (this.businessIn == 3) {                       //变更
                        url = '/vos/business/sendToModifyAudit';
                    }
                    this.$ajax.post(url, {
                        "company": this.company,
                        "business": this.stepThreeForm,
                        "destNumber": this.destNumber,
                        "number400ValueAdded": valueAddDelId,
                        "number400Concession": this.number400Concession,
                        "companyFlow": {
                            "flowId": sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3 ? sessionStorage.getItem('entireFlowId') : this.stepThreeFlowId
                        }
                    }).then((res) => {
                        if (res.code == '200') {
                            console.log(res);
                            this.$root.eventHub.$emit('flowId', res.data);
                            this.stepThreeFlowId = res.data.flowId;        //flowId
                            this.stepThreeForm.id = res.data.businessId;   //业务id
                            // console.log("vuex.company", this.company);
                            // 把第三步返回的companyId存到vuex的company
                            this.company.id = res.data.companyId;
                            this.business.companyId = res.data.companyId;
                            // console.log("vuex.company", this.company);
                            // console.log("vuex.business", this.business);
                            // console.log(this.stepThreeFlowId = res.data.flowId);
                            sessionStorage.setItem('stepThreeFlowId', this.stepThreeFlowId);
                            //第三步点击下一步之前检查number400是否绑定了引示号
                            this.$ajax.post('/vos/business/matchGuideNumber', {
                                "number400": this.stepThreeFlowId != null ? this.stepThreeForm.number400 : this.titleNum,
                            }).then((res) => {
                                if (res.code == 200) {
                                    console.log(res);
                                    this.nextDisabled = false;
                                    this.$message.success("保存成功");
                                } else {
                                    this.$message({type: 'warning', message: res.message});
                                }
                            })
                        } else {
                            this.$message.warning(res.message);
                        }
                    });
                }
            },
            getAllByPackage(data) {
                console.log("this.selectedNum.length",this.selectedNum.length);
                this.stepThreeForm.amount = 1;
                console.log("itemInfo", data);
                this.$ajax.post('/vos/number400/searchByPackage', {
                    "num400Package": {
                        "number400": data.number400,
                        "packgeId": ""
                    },
                    "page": {
                        "pageNo": this.pageObj.page,
                        "pageSize": this.pageObj.pageSize
                    }

                }).then((res) => {
                    console.log("itemInfo", res);
                    console.log("itemInfo", res.data.number400s);
                    this.selectedNum = res.data.number400s;
                    this.selectedNum[0].unitsCopy = res.data.number400s[0].units + '月';
                    this.selectedNum[0].durationPresentationCopy = res.data.number400s[0].durationPresentation + '元';
                    this.selectedNum[0].basicFunctionFeeCopy = res.data.number400s[0].basicFunctionFee + '元';
                })
            },
            // 点击tab获取相应信息
            parentMethod(val) {
                console.log(val);
                console.log("this.mealList", this.mealList);
                this.tabId = this.mealList[val.index].id;
                console.log("this.tabId ", this.tabId);
                console.log("this.$refs.child1", this.$refs.child1);
                this.$refs.child1[val.index].getAllByPackage2(this.tabId);
            },

            //控制企业信息的变化
            ChangeCompanyStatus(val) {
                return this.$store.dispatch("ChangeCompanyStatus", val);
            },
            // 存vuex更新业务信息模块入参
            ChangeBusinessStatus(val) {
                return this.$store.dispatch("ChangeBusinessStatus", val);
            },
            // 存vuex更新业务信息模块入参
            ChangeDestNumberStatus(val) {
                return this.$store.dispatch("ChangeDestNumberStatus", val);
            },
            // 存vuex更新增值业务模块入参
            ChangeNumber400ValueAddedStatus(val) {
                return this.$store.dispatch("ChangeNumber400ValueAddedStatus", val);
            },
            // 存vuex更新优惠模块入参
            ChangeNumber400ConcessionStatus(val) {
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
        watch: {}
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
