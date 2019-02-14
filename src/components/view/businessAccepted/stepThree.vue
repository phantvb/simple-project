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
                                                        prop="bottomFee"
                                                        label="最低年消费">
                                                </el-table-column>

                                                <el-table-column
                                                        prop="durationPresentation"
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

                                <el-tabs type="border-card">
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
                                        <el-button size="mini" type="text" @click="searchNumdialogVisible=false">选择
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


        <el-form ref="stepThreeForm" :model="stepThreeForm" label-width="100px">
            <div class="title left">
                经办人基本信息
            </div>
            <div class="handleInfo">
                <el-form-item label="经办人姓名：" class="firmName">
                    <el-input v-model="stepThreeForm.agentName" size="mini" placeholder="填入法人真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="经办人电话：" class="firmName">
                    <el-input v-model="stepThreeForm.agentMobilePhone" size="mini"
                              placeholder="填入法人联系电话（固话或手机）"></el-input>
                </el-form-item>
                <el-form-item label="经办人证件：" class="identity">
                    <el-select v-model="stepThreeForm.agentDocumentType" @change="change123" placeholder="请选择"
                               size="mini">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList"
                                   :key="index"></el-option>
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
                                               :on-error="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="stepThreeForm.agentCardFront" :src="stepThreeForm.agentCardFront"
                                             class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </li>
                                <li class="l2">
                                    <el-upload class="avatar-uploader exampleh" :action="$global.uploadUrl"
                                               :show-file-list="false" :on-success="handleBackSuccess"
                                               :on-error="handleBackSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="stepThreeForm.agentCardBack" :src="stepThreeForm.agentCardBack"
                                             class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </li>
                            </ul>
                            <ul class="abc">
                                <li class="l2">
                                    <el-upload class="avatar-uploader exampleh" :action="$global.uploadUrl"
                                               :show-file-list="false" :on-success="handleHandSuccess"
                                               :on-error="handleHandSuccess" :before-upload="beforeAvatarUpload">
                                        <img v-if="stepThreeForm.agentCardWIthHand"
                                             :src="stepThreeForm.agentCardWIthHand" class="avatar">
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
                                        prop="bottomFeeCopy"
                                        label='最低年消费'>
                                </el-table-column>

                                <el-table-column
                                        prop="durationPresentationCopy"
                                        label='预存话费'>
                                </el-table-column>

                                <el-table-column
                                        prop="unitsCopy"
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
                            <el-button type="primary" size="mini" @click="addObjCodes()" style="margin-bottom: 20px">
                                +新增目的码
                            </el-button>
                            <div v-for="(item,index) in objCodeList" :key="index">
                                <div class="addObjCode">
                                    <el-input v-model="item.destnumber" size="mini"></el-input>
                                    <el-button type="primary" icon="el-icon-minus" size="mini"
                                               @click="delObjCodes(index)"></el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="num400" style="margin-bottom:30px;">
                    <span>归属地区：</span>
                    <div class="QCellCore">
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
                    </div>
                    <div class="QCellCore">
                        <span>优惠：</span>
                        <el-select v-model="stepThreeForm.discounts" placeholder="请选择" size="mini"
                                   @change="discountChange">
                            <el-option
                                    v-for="(item,index) in discountsList"
                                    :key="index"
                                    :label="item.concessionName"
                                    :value="item">
                            </el-option>
                        </el-select>
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
                                        width="250">
                                        <template slot-scope="scope">
                                            <el-input-number
                                                    size="mini"
                                                    v-model="scope.row.numOfMonth"
                                                    @change="handleChange(scope.row,scope.$index)"
                                                    :min="1"
                                                    label="描述文字">
                                            </el-input-number>
                                            <span>{{scope.row.cost}}</span>
                                            <el-input-number
                                                    v-if="scope.row.units=='perMonthOne'"
                                                    size="mini"
                                                    v-model="scope.row.numOfone"
                                                    @change="handleChange(scope.row,scope.$index)"
                                                    :min="1"
                                                    label="描述文字">
                                            </el-input-number>
                                            <span v-if="scope.row.units=='perMonthOne'">{{scope.row.cost2}}</span>
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

                                <el-table-column
                                        prop="tariffFee"
                                        label='费用'>
                                </el-table-column>

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
        props: [],
        data() {
            return {
                addNumdialogVisible: false,
                searchNumdialogVisible: false,
                addNumform: {
                    activeName: '',
                },
                stepThreeForm: {
                    source:"self",
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
                    amount:1,                  //数量

                    // 归属地入参
                    provinceBelong: '',        //归属地(省)
                    cityBelong: '',            //归属地(市)

                    // 优惠活动
                    discounts: '',

                    //套餐id
                    tariffPackageId: '',
                    excessTariff: '',
                    unitPriceType: '',
                    excessPriceType: '',

                    //登录信息
                    channel: '',
                },
                valueAdd: [],       // 选中的增值业务数组
                discountsList: [],  //优惠数组
                disList: [],
                objCodeList: [{     //目的码数组
                    id: "",
                    destnumber: "",
                    number400: "",
                    destnumproofpic: "",
                    destnumUsage: "",
                    companyid: "",
                    valueAddedId: "",
                    status: "",
                    connectType: "",
                    connectId: "",
                    flowId: "",
                    stepThreeFlowId: "",
                }],
                selectedNum: [],    //已选号码列表
                searchNumList: [],  //400号码模糊搜索列表
                objCodeTable: [],  //增值表格
                identityTypeList: [   //证件类型
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
                provinceId: '', //省id
                cityId: '',  //城市id
                provinceList: [],
                cityList: [],
                addObjCode: '',  //添加目的码
                delObjCode: '',  //删减目的码
                busIdentity: '', //业务身份
                mealList: [],    //套餐数组
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
                sealInfo: '',      //套餐信息
            };

        },
        components: {
            setMeal
        },
        beforeUpdate(){
            //复选框回显
            // if (sessionStorage.getItem('businessIn') == 2) {
            //     console.log('asdasdasdasddasd');
            //     this.objCodeTable.map((item)=>{
            //         console.log(1111,this.objCodeTable);
            //         if(this.number400ValueAdded.some((item1)=>{
            //             return item1.id==item.id;
            //         })){
            //             console.log(item);
            //             if(item.presents==1){
            //                 this.$refs.addValueTable.toggleRowSelection(item,true);
            //             }
            //             this.$refs.addValueTable.toggleRowSelection(item,true);
            //         }
            //     });
            // }
        },

         mounted(){
            if (sessionStorage.getItem('businessIn') == 2) {
                //详情
                console.log(this.business);
                console.log(this.destNumber);
                console.log(this.number400ValueAdded);
                console.log(this.number400Concession);
                this.stepThreeForm = this.business;
                this.objCodeList = this.destNumber;
                this.valueAdd = this.number400ValueAdded;
                console.log("this.valueAdd", this.valueAdd);
                this.disList = this.number400Concession;
                // 优惠回显
                this.number400Concession.map((item) => {
                    this.stepThreeForm.discounts = item.concessionName;
                });
                //400号码表格回显
                let selectedNumCopy={};
                selectedNumCopy.units = this.business.units;
                selectedNumCopy.number400 = this.business.number400;
                selectedNumCopy.tariffName = this.business.tariffName;
                selectedNumCopy.bottomFee = this.business.bottomFee;
                selectedNumCopy.packageContent = this.business.packageContent;
                selectedNumCopy.durationPresentation = this.business.durationPresentation;
                selectedNumCopy.durationPresentation = this.business.durationPresentation;
                this.selectedNum.push(selectedNumCopy);

                this.getAllProvince();
            }else{
                this.getAllProvince();
            }
            console.log(this.number400ValueAdded);
            console.log(this.valueAdd);
            this.getValueAdded(this.busIdentity);
        },
        created() {
            console.log(sessionStorage.getItem('businessType'));
            this.busIdentity = sessionStorage.getItem('businessType');
            this.stepThreeForm.channel = this.busIdentity;
            this.getConcessionScheme(this.busIdentity);

            this.$root.eventHub.$on('needCompanySave', (resp) => {
                console.log("needCompanySave", resp);
                this.stepThreeForm.needCompanySave = resp;
            });

        },
        methods: {
            // 分页
            handleSizeChange(val) {
                this.pageObj.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageObj.page = val;
                console.log(`当前页: ${val}`);
            },
            // 数量变化
            handleChange(value,index) {
                console.log(value);
                console.log(this.objCodeTable);
                console.log(this.valueAdd);
                this.$set(this.objCodeTable,index,value);
                this.valueAdd.map((item,index)=>{
                    if(item.valueAddedId==value.id){
                        this.valueAdd[index]=value;
                    }
                });
                // this.stepThreeForm.amount = value;
            },
            lalalal(val) {
                console.log(val);
                console.log(this.selectedNum);
                let newValueAdd=[];
                val.map((item)=>{
                    let obj ={};
                    obj.number400 = this.selectedNum && this.selectedNum.length!=0?this.selectedNum[0].number400:null;
                    obj.valueAddedName = item.tariffName;
                    obj.valueAddedId = item.id;
                    obj.presents = item.presents;
                    obj.remarks = item.remarks;
                    obj.valueAddedFee = item.tariffFee;
                    obj.units = item.units;
                    obj.numOfMonth = item.numOfMonth;
                    // obj.numOfone = item.numOfone;
                    if(item.units=='perMonthOne'){
                        obj.numOfone = item.numOfone;
                    }
                    newValueAdd.push(obj);
                });
                this.valueAdd=newValueAdd;
            },
            // 图片上传
            handleAvatarSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardFront = this.$global.serverSrc + res;
                }
                // this.stepThreeForm.agentCardFront = URL.createObjectURL(file.raw);
            },
            handleBackSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardBack = this.$global.serverSrc + res;
                }
                // this.stepThreeForm.agentCardBack = URL.createObjectURL(file.raw);
            },
            handleHandSuccess(res, file) {
                if (res.indexOf('png') != -1 || res.indexOf('jpg') != -1 || res.indexOf('jpeg') != -1) {
                    this.stepThreeForm.agentCardWIthHand = this.$global.serverSrc + res;
                }
                // this.stepThreeForm.agentCardWIthHand = URL.createObjectURL(file.raw);
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
                console.log("event", event);
            },

            //新增目的码
            addObjCodes() {
                let unit = {};
                this.objCodeList.push(unit);
            },
            // 删除目的码
            delObjCodes(index) {
                console.log(index);
                this.objCodeList.splice(index, 1);
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
                    console.log("this.$refs.child1", this.$refs.child1);
                    this.$refs.child1[0].getAllByPackage2();
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
                        "id": "",
                    }
                }).then((res) => {
                    console.log(val);
                    console.log(res.data.concessionSchemeList);
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
                    console.log(res.data.valueAddedList);
                    this.objCodeTable = res.data.valueAddedList;
                    this.objCodeTable.map((item) => {
                        item.numOfMonth=1;
                        item.numOfone=1;
                        if(item.units=='perMonth'){
                            item.cost = "月";
                            item.unitsName = (item.tariffFee/item.numOfMonth)+'元/月'
                        }else if(item.units=='perOne'){
                            item.cost = "个";
                            item.unitsName = (item.tariffFee/item.numOfMonth)+'元/个'
                        }else if(item.units=='perMonthOne'){
                            item.cost = "月";
                            item.cost2 = "个";
                            item.unitsName = (item.tariffFee/item.numOfMonth)+'元/月/个'
                        }
                        if (item.presents == '1') {
                            item.presentsName = "赠送";
                            this.valueAdd.push(item);
                        } else {
                            item.presentsName = "付费"
                        }
                    });
                    console.log('aaa',this.objCodeTable);
                    console.log('bbb',this.number400ValueAdded);
                    let newValueAdd=[];
                    this.$nextTick(()=>{
                        console.log(this.selectedNum);
                        this.objCodeTable.map((item,index)=>{
                            console.log(1111,this.objCodeTable);
                            if(this.number400ValueAdded&&this.number400ValueAdded.length!=0){
                                this.number400ValueAdded.map((item1)=>{
                                    if(item1.id==item.id){
                                        //把选中的复选框信息赋值给原数组勾选的选项
                                        this.$set(this.objCodeTable,index,item1);
                                        //回西安勾选的
                                        this.$refs.addValueTable.toggleRowSelection(this.objCodeTable[index], true);
                                        let obj = {};
                                        if (this.selectedNum && this.selectedNum.length != 0) {
                                            obj.number400 = this.selectedNum[0].number400
                                        }
                                        obj.valueAddedName = item.tariffName;
                                        obj.valueAddedId = item.id;
                                        obj.presents = item.presents;
                                        obj.remarks = item.remarks;
                                        obj.valueAddedFee = item.tariffFee;
                                        obj.units = item.units;
                                        obj.numOfMonth = item.numOfMonth;
                                        // obj.numOfone = item.numOfone;
                                        if(item.units=='perMonthOne'){
                                            obj.numOfone = item.numOfone;
                                        }
                                        newValueAdd.push(obj);
                                        console.log(newValueAdd);
                                    }
                                });
                            }else{
                                if(item.presents==1){
                                    //赠送勾选
                                    this.$refs.addValueTable.toggleRowSelection(item,true);
                                    let obj ={};
                                    if (this.selectedNum && this.selectedNum.length != 0) {
                                        obj.number400 = this.selectedNum[0].number400;
                                    }
                                    obj.valueAddedName = item.tariffName;
                                    obj.valueAddedId = item.id;
                                    obj.presents = item.presents;
                                    obj.remarks = item.remarks;
                                    obj.valueAddedFee = item.tariffFee;
                                    obj.units = item.units;
                                    obj.numOfMonth = item.numOfMonth;
                                    // obj.numOfone = item.numOfone;
                                    if(item.units=='perMonthOne'){
                                        obj.numOfone = item.numOfone;
                                    }
                                    newValueAdd.push(obj);
                                    console.log(newValueAdd);
                                }
                            }
                        });
                    });
                    this.valueAdd=newValueAdd;
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
                    console.log(res.data);
                    console.log(res.data.tariffPackageList);
                    this.mealList = res.data.tariffPackageList;
                })
            },
            // 省
            getAllProvince() {
                this.$ajax.get('/vos/address/getAllProvince').then((res) => {
                    console.log(res.data);
                    this.provinceList = res.data;
                    if(sessionStorage.getItem('businessIn') == 2){
                        console.log(this.stepThreeForm.provinceBelong);
                        this.getCitiesByProvinceId(this.stepThreeForm.provinceBelong);
                    }
                })
            },
            // 市
            getCitiesByProvinceId(provinceId) {
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + provinceId).then((res) => {
                    console.log(res.data);
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
                let disObj = val;
                delete disObj.id;
                this.disList = [];
                disObj.amount=1;
                this.disList.push(disObj);
                console.log(this.disList);
            },

            // 选择400号码，添加到已选号码
            getAllByPackage(val) {
                console.log(val);
                this.titleNum = val;
                this.stepThreeForm.number400 = this.titleNum;
                this.$ajax.post('/vos/number400/searchByPackage', {
                    "num400Package": {
                        "number400": this.titleNum,
                        "packgeId": ""
                    },
                    "page": {
                        "pageNo": this.pageObj.page,
                        "pageSize": this.pageObj.pageSize
                    }

                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.number400s);
                    console.log(res.data.number400s[0]);
                    this.selectedNum = res.data.number400s;
                    this.selectedNum.map((item)=>{
                        item.bottomFeeCopy=item.bottomFee+'元';
                        item.durationPresentationCopy=item.durationPresentation+'元';
                        if(item.type==1){
                            item.unitsCopy=item.units+"月"
                        }else if(item.type==2){
                            item.unitsCopy=item.units+"年"
                        }
                    })
                    this.pageObj.total = res.data.totalCount;
                    this.sealInfo = res.data.number400s[0];

                    //套餐返回值
                    this.stepThreeForm.packgeId = this.sealInfo.packgeId;
                    this.stepThreeForm.basicFunctionFee = this.sealInfo.basicFunctionFee;
                    this.stepThreeForm.bottomFee = this.sealInfo.bottomFee;
                    this.stepThreeForm.durationPresentation = this.sealInfo.durationPresentation;
                    this.stepThreeForm.excessPriceType = this.sealInfo.excessPriceType;
                    this.stepThreeForm.excessTariff = this.sealInfo.excessTariff;
                    this.stepThreeForm.unitPrice = this.sealInfo.unitPrice;
                    this.stepThreeForm.unitPriceType = this.sealInfo.unitPriceType;
                    this.stepThreeForm.units = this.sealInfo.units;
                })
            },

            // 删除已选400号码
            delNum(val) {
                console.log(val);
                this.selectedNum.splice(val, 1)
            },
            // 省份切换
            proChange(val) {
                console.log(val);
                this.provinceId = val;
                this.getCitiesByProvinceId(this.provinceId);
            },
            cityChange(val) {
                console.log(val);
                this.cityId = val;
                // this.getAreasByCityId();
            },
            next(val) {
                this.$emit('childNext', val);
                if (val == 4) {
                    console.log(this.disList);
                    this.ChangeBusinessStatus(this.stepThreeForm);
                    this.ChangeDestNumberStatus(this.objCodeList);
                    this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                    this.ChangeNumber400ConcessionStatus(this.disList);
                    console.log("company", this.company);
                    console.log("business", this.business);
                    console.log("destNumber", this.destNumber);
                    console.log("number400Concession", this.number400Concession);
                }
            },
            // 暂存
            addBusinessSave() {
                console.log("第三步获取flowed",sessionStorage.getItem('entireFlowId'));
                console.log("入口：",sessionStorage.getItem('businessIn'));
                this.stepThreeForm.companyName = this.company.companyName;
                this.stepThreeForm.companyId = this.company.companyId;
                console.log("selectedNum",this.selectedNum);
                this.stepThreeForm.number400 = this.selectedNum[0].number400;
                this.stepThreeForm.tariffName = this.selectedNum[0].tariffName;
                this.stepThreeForm.packageContent = this.selectedNum[0].packageContent;
                this.stepThreeForm.type = this.selectedNum[0].type;
                this.stepThreeForm.tariffPackageId = this.selectedNum[0].packgeId;
                console.log(this.stepThreeForm);
                console.log(this.disList);
                this.ChangeBusinessStatus(this.stepThreeForm);
                this.ChangeDestNumberStatus(this.objCodeList);
                this.ChangeNumber400ValueAddedStatus(this.valueAdd);
                this.ChangeNumber400ConcessionStatus(this.disList);
                console.log("company", this.company);
                console.log("business", this.business);
                console.log("destNumber", this.destNumber);
                console.log("number400Concession", this.number400Concession);
                this.$ajax.post('/vos/business/startAndSave', {
                    "company": this.company,
                    "business": this.stepThreeForm,
                    "destNumber": this.destNumber,
                    "number400ValueAdded": this.valueAdd,
                    "number400Concession": this.number400Concession,
                    "companyFlow": {
                        "flowId": sessionStorage.getItem('businessIn')==2?sessionStorage.getItem('entireFlowId'):this.stepThreeFlowId
                    }
                }).then((res) => {
                    if (res.code == '200') {
                        console.log(res);
                        this.$root.eventHub.$emit('flowId', res.data);
                        this.stepThreeFlowId = res.data;
                        console.log(this.stepThreeFlowId = res.data);
                        //第三步点击下一步之前检查number400是否绑定了引示号
                        this.$ajax.post('/vos/business/matchGuideNumber', {
                            "number400": this.titleNum,
                        }).then((res) => {
                            if (res.code == 200) {
                                console.log(res);
                            } else {
                                this.$message({type: 'warning', message: res.message});
                            }
                        })
                    } else {
                        this.$message.warning(res.message);
                    }
                });
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
