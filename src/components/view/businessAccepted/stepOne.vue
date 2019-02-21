<template>
    <div id="stepOne" @click="nameListHidden">
        <el-form ref="acceptForm" :rules="rules" :model="acceptForm" label-width="140px">
            <div class="acceptMsg" >
                <p>企业基本信息</p>
                <el-form-item label="企业名称：" class="identity" prop="companyName">
                    <el-input v-model="acceptForm.companyName"
                              size="mini"
                              @input="searchFirm"
                              placeholder=" 营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
                    <div id="firmNameList" v-if="firmNameShow" style="margin-top:40px">
                        <ul>
                            <li v-for="(item,index) in firmNameList" :key="index" @click="firmNameLi(item)">
                                {{item.companyName}}
                            </li>
                        </ul>
                    </div>
                </el-form-item>

                <el-form-item label="证件编号：" class="identity" prop="companyCardNo">
                    <el-select v-model="acceptForm.companyCardType" @change="change123" :disabled="msgDisabled" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in companyCardNoList"
                                :label="item.dicValue"
                                :value="item.dicKey"
                                :key="item.dicKey"></el-option>
                    </el-select>
                    <el-input v-model="acceptForm.companyCardNo" size="mini" placeholder="根据证件类型，填写相应的证件号码"  :disabled="msgDisabled"></el-input>
                </el-form-item>

                <div class="threeSelect">
                    <el-form-item label="企业性质：" class="identity" prop="companyCharacter">
                        <el-select v-model="acceptForm.companyCharacter" placeholder="请选择" size="mini" :disabled="msgDisabled">
                            <el-option v-for="item in companyCharacterList"
                                       :label="item.dicValue"
                                       :value="item.dicValue"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业等级：" class="identity" prop="companyRank">
                        <el-select v-model="acceptForm.companyRank" placeholder="请选择" size="mini" :disabled="msgDisabled">
                            <el-option :label="item.dicValue" :value="item.dicValue" v-for="item in companyRankList"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="行业类型：" class="identity" prop="industryType">
                        <el-select v-model="acceptForm.industryType" @change="change123" placeholder="请选择" size="mini" :disabled="msgDisabled">
                            <el-option :label="item.dicValue" :value="item.dicValue" v-for="item in industryTypeList"
                                       :key="item.dicKey"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="regUrl">
                    <el-form-item label="注册地址：" class="identity" prop="registProvince">
                        <el-select v-model="acceptForm.registProvince" placeholder="请选择" size="mini"
                                   @change="proChange" :disabled="msgDisabled">
                            <el-option
                                    v-for="item in registProvinceList"
                                    :key="item.provinceId"
                                    :label="item.province"
                                    :value="item.provinceId">
                            </el-option>
                        </el-select>
                        <el-select v-model="acceptForm.registCity" placeholder="请选择" size="mini"  :disabled="msgDisabled" @change="cityChange">
                            <el-option
                                    v-for="item in registCityList"
                                    :key="item.cityId"
                                    :label="item.city"
                                    :value="item.cityId">
                            </el-option>
                        </el-select>
                        <el-select v-model="acceptForm.registArea" placeholder="请选择" :disabled="msgDisabled" size="mini" @change="areasChange">
                            <el-option
                                    v-for="item in registAreaList"
                                    :key="item.areaId"
                                    :label="item.area"
                                    :value="item.areaId">
                            </el-option>
                        </el-select>
                        <div class="onlyInput">
                            <el-input v-model="acceptForm.registAddress" size="mini" :disabled="msgDisabled"
                                      placeholder="填入企业营业执照上的详细地址"></el-input>
                        </div>
                    </el-form-item>

                </div>

                <div class="businessAddress">
                    <el-form-item label="办公地址：" class="identity" prop="officeProvince">
                        <el-select v-model="acceptForm.officeProvince" placeholder="请选择" size="mini"
                                   @change="busProChange" :disabled="msgDisabled">
                            <el-option :label="item.province" :value="item.provinceId" v-for="item in busProvinceList"
                                       :key="item.provinceId"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.officeCity" placeholder="请选择" size="mini" prop="officeCity"
                                   @change="busCityChange" :disabled="msgDisabled">
                            <el-option :label="item.city" :value="item.cityId" v-for="item in busCityList"
                                       :key="item.cityId"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.officeArea" placeholder="请选择" size="mini" prop="officeArea"
                                   @change="busAreasChange" :disabled="msgDisabled">
                            <el-option :label="item.area" :value="item.areaId" v-for="item in busAreaList"
                                       :key="item.areaId"></el-option>
                        </el-select>
                        <div class="onlyInput" prop="officeAddress">
                            <el-input v-model="acceptForm.officeAddress" :disabled="msgDisabled" size="mini" placeholder="填入企业办公所在地址"></el-input>
                        </div>
                    </el-form-item>

                </div>

                <el-form-item label="企业电话：" class="identity" prop="phone">
                    <el-input v-model="acceptForm.phone" size="mini"  :disabled="msgDisabled" placeholder="填入企业电话"></el-input>
                </el-form-item>

            </div>
            <div class="acceptMsg">
                <p>法人基本信息</p>
                <div class="legalInfo">
                    <el-form-item label="法人姓名：" class="legalPerson" prop="legalPerson">
                        <el-input v-model="acceptForm.legalPerson" size="mini" placeholder="填入法人真实姓名" :disabled="msgDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="法人电话：" class="legalPhone" prop="legalPhone">
                        <el-input v-model="acceptForm.legalPhone" size="mini" placeholder="填入法人联系电话（固话或手机）" :disabled="msgDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="法人证件：" class="legalCard" prop="legalCard">
                        <el-select v-model="acceptForm.legalCard" @change="change123" placeholder="请选择" size="mini" :disabled="msgDisabled">
                            <el-option
                                    v-for="item in legalCardTypeList"
                                    :label="item.dicValue"
                                    :value="item.dicKey"
                                    :key="item.dicValue"></el-option>
                        </el-select>
                        <el-input v-model="acceptForm.cardNum" size="mini" placeholder="根据证件类型，填写相应的证件号码"
                                  prop="cardNum" :disabled="msgDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证住址：" class="companyName" v-if="acceptForm.legalCard=='ID_card'"
                                  prop="idCardAddress">
                        <el-input v-model="acceptForm.idCardAddress" size="mini" placeholder="填入身份证上的住址" :disabled="msgDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证有效期：" class="indate" v-if="acceptForm.legalCard=='ID_card'" prop="idIndate">
                        <el-date-picker
                                v-model="acceptForm.idIndate"
                                type="daterange"
                                :disabled="msgDisabled"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="护照有效期：" class="indate" v-if="acceptForm.legalCard=='Passport'" prop="idIndate">
                        <el-date-picker
                                v-model="acceptForm.idIndate"
                                :disabled="msgDisabled"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="军官证有效期：" class="indate" v-if="acceptForm.legalCard=='OfficerCard'"
                                  prop="idIndate">
                        <el-date-picker
                                v-model="acceptForm.idIndate"
                                :disabled="msgDisabled"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <div class="stepBtn">
            <el-button type="primary" size="mini" @click="next('acceptForm')">下一步</el-button>

        </div>
    </div>
</template>
<script>
    import {mapState} from "vuex";
    export default {
        name: 'stepOne',
        components: {},
        props: [
            "actives"
        ],
        data() {
            return {
                needCompanySave: false,
                acceptForm: {
                    id:'',
                    company:'',
                    companyName: '',
                    companyCardType: '',
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
                    legalPerson: '',
                    legalPhone: '',
                    legalCard: '',
                    cardNum: '',
                    idCardAddress: '',
                    idIndate: '',         //身份证有效期
                    // passportIndate:'',   //护照有效期
                    // officerCardIndate:'',//军官证有效期

                    // cardStartDate:this.acceptForm.idIndate[0],  //证件有限开始时间
                    // cardEndDate:this.acceptForm.idIndate[1],    //证件有限結束时间
                },
                rules: {
                    companyName: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                    ],
                    companyCardNo: [
                        {required: true, message: '请填写证件编号', trigger: 'change'}
                    ],
                    companyCharacter: [
                        {type: 'string', required: true, message: '请选择企业性质', trigger: 'change'}
                    ],
                    companyRank: [
                        {type: 'string', required: true, message: '请选择企业等级', trigger: 'change'}
                    ],
                    industryType: [
                        {type: 'string', required: true, message: '请选择行业类型', trigger: 'change'}
                    ],
                    registProvince: [
                        {required: true, message: '请填写注册地址', trigger: 'change'}
                    ],
                    registAddress: [
                        {required: true, message: '请填入企业营业执照上的详细地址', trigger: 'blur'}
                    ],
                    officeProvince: [
                        {required: true, message: '请选择办公地址', trigger: 'blur'}
                    ],
                    officeAddress: [
                        {required: true, message: '请填写企业办公所在想详细地址', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请填写企业电话', trigger: 'blur'}
                    ],
                    legalPerson: [
                        {required: true, message: '请填写法人姓名', trigger: 'blur'}
                    ],
                    legalPhone: [
                        {required: true, message: '请填写法人姓名电话', trigger: 'blur'}
                    ],
                    legalCard: [
                        {required: true, message: '请选择法人证件类型', trigger: 'blur'}
                    ],
                    cardNum: [
                        {required: true, message: '请填写证件号', trigger: 'blur'}
                    ],
                    idCardAddress: [
                        {required: true, message: '请填写身份证住址', trigger: 'blur'}
                    ],
                    idIndate: [
                        {required: true, message: '请选择身份证有效期', trigger: 'blur'}
                    ],
                },
                companyCharacterList: [],  //企业性质
                companyCardNoList: [],     //证件类型
                companyRankList: [],       //企业等级
                industryTypeList: [],      //行业类型
                registProvinceList: [],    //省列表
                registCityList: [],        //市列表
                registAreaList: [],        //区列表
                busProvinceList: [],       //办公地址 --省
                busCityList: [],           //办公地址 --市
                busAreaList: [],           //办公地址 --区
                legalCardTypeList: [],     //法人证件类型
                provinceId: '',    //省id
                busProvinceId: '', //省id
                cityId: '',        //城市id
                busCityId: '',     //城市id
                areasId: '',       //区id
                busAreasId: '',    //区id
                companyInfo: '',
                firmNameShow: false, //企业名称列表
                firmNameList: [],  //公司名称数组
                flowId: '',
            };
        },
        created() {
            this.$root.eventHub.$on('clearData', (resp) => {
                this.acceptForm = {};
            });
            console.log(sessionStorage.getItem('entireFlowId'));
            console.log(sessionStorage.getItem('businessIn'));
            this.companyCardTypeList();
            this.companyRankLists();
            this.industryTypeLists();
            this.companyCardTypeLists();
            this.legalCardTypeLists();
            this.getAllProvince();
            this.getCitiesByProvinceId();
            this.getAreasByCityId();
            if (sessionStorage.getItem('businessIn') == 2 || sessionStorage.getItem('businessIn') == 3 ||sessionStorage.getItem('businessIn') == 4) {
                console.log("qqqqqqqqqqqqqqqqq");
                this.stepTwoDetail();
                this.searchFirm(this.acceptForm.companyName);
                console.log("firmNameList",this.firmNameList);
                this.firmNameList.map((zool, index) => {
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    if (zool.companyName == this.acceptForm.companyName) {
                        this.acceptForm = this.firmNameList[index];
                        this.changeMsgDisabled(true);
                    }else{
                        this.changeMsgDisabled(false);
                    }
                });

            }

        },
        methods: {
            // 详情
            stepTwoDetail() {
                console.log("this.company",this.company);
                this.acceptForm = this.company;
            },
            // 下一步
            // next() {
            //     // 保存companyId到vuex
            //     if(this.business!=null){
            //         console.log("this.business",this.business);
            //     }else{
            //         let companyIdInfo ={};
            //         companyIdInfo.companyId=null;
            //         this.ChangeBusinessStatus(companyIdInfo);
            //         console.log("this.business",this.business);
            //     }
            //     this.$emit('childNext', 2);
            //     // 改变vuex的值
            //     this.ChangeCompanyStatus(this.acceptForm);
            //     console.log(this.company);
            //     // this.business.companyName = this.acceptForm.companyName;
            //     console.log(this.business);
            //     if (this.firmNameList.some((item) => {
            //         return this.acceptForm.companyName == item.companyName;
            //     })) {
            //         this.$root.eventHub.$emit('needCompanySave', false);
            //     } else {
            //         this.$root.eventHub.$emit('needCompanySave', true);
            //     }
            // },
            next(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 保存companyId到vuex
                        if(this.business!=null){
                            console.log("this.business",this.business);
                        }else{
                            let companyIdInfo ={};
                            companyIdInfo.companyId=null;
                            this.ChangeBusinessStatus(companyIdInfo);
                            console.log("this.business",this.business);
                        }
                        this.$emit('childNext', 2);
                        // 改变vuex的值
                        this.ChangeCompanyStatus(this.acceptForm);
                        console.log(this.company);
                        // this.business.companyName = this.acceptForm.companyName;
                        console.log(this.business);
                        if (this.firmNameList.some((item) => {
                            return this.acceptForm.companyName == item.companyName;
                        })) {
                            this.$root.eventHub.$emit('needCompanySave', false);
                        } else {
                            this.$root.eventHub.$emit('needCompanySave', true);
                        }
                    } else {
                        this.$message.warning('请把信息填写完整');
                        return false;
                    }
                });

            },
            change123(event) {
                console.log("event", event);
                console.log("acceptForm.legalCard", this.acceptForm.legalCard);
            },

            // 企业模糊搜索
            searchFirm(val) {
                console.log(val);
                this.$ajax.get('/vos/company/fuzzySearch?company=' + this.acceptForm.companyName).then((res) => {
                    console.log(res.data);
                    this.firmNameList = res.data;
                    if (this.acceptForm.companyName != '' && this.firmNameList.length != 0) {
                        this.firmNameShow = true;
                    }else{
                        this.acceptForm={
                            companyName:val,
                        };
                        this.firmNameShow = false;
                    }
                    this.firmNameList.map((zool, index) => {
                        if (zool.companyName == this.acceptForm.companyName) {
                            console.log("zool",zool);
                            // sessionStorage.setItem("firmNameListItem",JSON.stringify(zool));
                            this.acceptForm = this.firmNameList[index];
                            this.$root.eventHub.$emit('firmNameListItem',zool);
                            // sessionStorage.setItem("firmNameList",JSON.stringify(this.firmNameList[index]));
                            this.changeMsgDisabled(true);
                        }else{
                            this.changeMsgDisabled(false);
                        }
                    })
                })
            },
            nameListHidden(){
                console.log('asdasdasdasdas');
                this.firmNameShow = false;
            },
            //企业名称li
            firmNameLi(val) {
                let companyIdInfo ={};
                if(val.id!=null){
                    console.log('企业信息',val);
                    console.log(val.id);
                    companyIdInfo.companyId = val.id;
                }
                this.ChangeBusinessStatus(companyIdInfo);
                console.log("this.business",this.business);
                this.$root.eventHub.$emit('companyMsg', val);
                this.acceptForm.companyName = val.companyName;
                this.acceptForm = val;
                this.firmNameShow = false;
                this.firmNameList.map((zool)=>{
                    if(this.acceptForm.companyName==zool.companyName){
                     this.changeMsgDisabled(true);
                    }
                })
            },
            // 证件类型
            companyCardTypeList() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "companyDocumentType",
                    "status": "1"
                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.dicList);
                    this.companyCardNoList = res.data.dicList;
                })
            },
            //企业性质
            companyCardTypeLists() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "enterprise_nature",
                    "status": "1"
                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.dicList);
                    this.companyCharacterList = res.data.dicList;
                })
            },
            //企业等级
            companyRankLists() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "enterprise_grade",
                    "status": "1"
                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.dicList);
                    this.companyRankList = res.data.dicList;
                })
            },
            //行业类型
            industryTypeLists() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "industry_category",
                    "status": "1"
                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.dicList);
                    this.industryTypeList = res.data.dicList;
                })
            },
            //证件类型
            legalCardTypeLists() {
                this.$ajax.post('/vos/dic/getDicsByType', {
                    "dicType": "documentType",
                    "status": "1"
                }).then((res) => {
                    console.log(res.data);
                    console.log(res.data.dicList);
                    this.legalCardTypeList = res.data.dicList;
                })
            },

            // 省
            getAllProvince() {
                this.$ajax.get('/vos/address/getAllProvince').then((res) => {
                    console.log(res.data);
                    if (res.code == 200) {
                        this.registProvinceList = res.data;
                        this.busProvinceList = res.data;
                        this.provinceId=this.registProvinceList[0].cityId;
                        this.getCitiesByProvinceId();
                    }
                })
            },
            // 市
            getCitiesByProvinceId() {
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + this.provinceId).then((res) => {
                    console.log(res.data);
                    if (res.code == 200) {
                        this.registCityList = res.data;
                        this.busCityList = res.data;
                        this.getAreasByCityId();
                    }
                })
            },
            // 区
            getAreasByCityId() {
                this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + this.cityId).then((res) => {
                    console.log(res.data);
                    this.registAreaList = res.data;
                    this.busAreaList = res.data;
                })
            },

            // 省份切换
            proChange(val) {
                console.log(val);
                this.provinceId = val;
                this.getCitiesByProvinceId();
            },
            busProChange(val) {
                console.log(val);
                this.provinceId = val;
                this.getCitiesByProvinceId();
            },
            //市切换
            cityChange(val) {
                console.log(val);
                this.cityId = val;
                this.getAreasByCityId();
            },
            busCityChange(val) {
                console.log(val);
                this.cityId = val;
                this.getAreasByCityId();
            },
            //区切换
            areasChange(val) {
                console.log(val);
                this.areasId = val;
            },
            busAreasChange(val) {
                console.log(val);
                this.areasId = val;
            },


            // 存vuex更新企业信息模块入参
            ChangeCompanyStatus(val) {
                return this.$store.dispatch("ChangeCompanyStatus", val);
            },
            ChangeBusinessStatus(val) {
                return this.$store.dispatch("ChangeBusinessStatus", val);
            },
            ChangeDestNumber(val) {
                return this.$store.dispatch("ChangeDestNumberStatus", val);
            },
            ChangeNumber400ValueAdded(val) {
                return this.$store.dispatch("ChangeNumber400ValueAddedStatus", val);
            },
            ChangeNumber400Concession(val) {
                return this.$store.dispatch("ChangeNumber400ConcessionStatus", val);
            },
            changeMsgDisabled(val) {
                return this.$store.dispatch("changeMsgDisabledStatus", val);
            },
        },
        computed: {
            ...mapState({
                company: state => state.createActivities.company,
                business: state => state.createActivities.business,
                destNumber: state => state.createActivities.destNumber,
                number400ValueAdded: state => state.createActivities.number400ValueAdded,
                number400Concession: state => state.createActivities.number400Concession,
                msgDisabled: state => state.createActivities.msgDisabled,
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
