<template>
    <div id="stepOne">
        <el-form ref="acceptForm" :model="acceptForm" label-width="140px">
            <div class="acceptMsg">
                <p>企业基本信息</p>
                <el-form-item label="企业名称：" class="identity">
                    <el-input v-model="acceptForm.firmName" size="mini" placeholder=" 营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
                </el-form-item>
                <el-form-item label="证件编号：" class="identity">
                    <el-select v-model="acceptForm.identityType" @change="change123" placeholder="请选择" size="mini">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                    </el-select>
                    <el-input v-model="acceptForm.identityNo" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
                </el-form-item>

                <div class="threeSelect">
                    <el-form-item label="企业性质：" class="identity">
                        <el-select v-model="acceptForm.firmNature" @change="change123" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="企业等级：" class="identity">
                        <el-select v-model="acceptForm.firmGrade" @change="change123" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="行业类型：" class="identity">
                        <el-select v-model="acceptForm.tradeType" @change="change123" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="regUrl">
                    <el-form-item label="注册地址：" class="identity">
                        <el-select v-model="acceptForm.province" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.city" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.region" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="onlyInput">
                        <el-input v-model="acceptForm.detailedAddress" size="mini" placeholder="填入企业营业执照上的详细地址"></el-input>
                    </div>
                </div>

                <div class="businessAddress">
                    <el-form-item label="办公地址：" class="identity">
                        <el-select v-model="acceptForm.businessPro" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.businessCity" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="acceptForm.businessRegion" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="onlyInput">
                        <el-input v-model="acceptForm.businessDetailAddr" size="mini" placeholder="填入企业办公所在地址"></el-input>
                    </div>
                </div>

                <el-form-item label="企业电话：" class="identity">
                    <el-input v-model="acceptForm.firmPhone" size="mini" placeholder="填入企业办公所在地址"></el-input>
                </el-form-item>

            </div>
            <div class="acceptMsg">
                <p>法人基本信息</p>
                <div class="legalInfo">
                    <el-form-item label="法人姓名：" class="firmName">
                        <el-input v-model="acceptForm.legalName" size="mini" placeholder="填入法人真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="法人电话：" class="firmName">
                        <el-input v-model="acceptForm.legalPhone" size="mini" placeholder="填入法人联系电话（固话或手机）"></el-input>
                    </el-form-item>
                    <el-form-item label="法人证件：" class="identity">
                        <el-select v-model="acceptForm.legalIdentity" @change="change123" placeholder="请选择" size="mini">
                            <el-option :label="item.label" :value="item.value" v-for="(item,index) in identityTypeList" :key="index"></el-option>
                        </el-select>
                        <el-input v-model="acceptForm.legalIdentityNo" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
                    </el-form-item>
                        <el-form-item label="身份证住址：" class="firmName"  v-if="acceptForm.legalIdentity==1">
                            <el-input v-model="acceptForm.idAddress" size="mini" placeholder="填入身份证上的住址"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证有效期：" class="indate" v-if="acceptForm.legalIdentity==1">
                            <el-date-picker
                                    v-model="acceptForm.idIndate"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="护照有效期：" class="indate"  v-if="acceptForm.legalIdentity==2">
                            <el-date-picker
                                v-model="acceptForm.passportIndate"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="军官证有效期：" class="indate"  v-if="acceptForm.legalIdentity==3">
                           <el-date-picker
                                v-model="acceptForm.officerCardIndate"
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
            <el-button type="primary" size="mini" @click="next">下一步</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'stepOne',
        components: {},
        props:[
            "actives"
        ],
        created(){
            console.log("actives",this.actives);
        },
        data() {
            return {
                acceptForm:{
                    firmName:'',
                    identityType:'',
                    firmNature:'',
                    firmGrade:'',
                    tradeType:'',
                    province:'',
                    city:'',
                    region:'',
                    detailedAddress:'',
                    businessPro:'',
                    businessCity:'',
                    businessRegion:'',
                    businessDetailAddr:'',
                    firmPhone:'',
                    legalName:'',
                    legalPhone:'',
                    legalIdentity:'',
                    legalIdentityNo:'',
                    idAddress:'',
                    idIndate:'',         //身份证有效期
                    passportIndate:'',   //护照有效期
                    officerCardIndate:'',//军官证有效期
                },
                identityTypeList:[   //证件类型
                    {
                        value: '1',
                        label: '身份证'
                    }, {
                        value: '2',
                        label: '护照'
                    }, {
                        value: '3',
                        label: '军官证'
                    }
                ],
            };
        },
        components: {},
        methods: {
            next(){
                this.$emit('childNext', 2);
            },
            change123(event) {
                console.log("event",event);
                console.log("acceptForm.legalIdentity",this.acceptForm.legalIdentity);
            },
        },
        computed: {}
    }
</script>
<style lang="scss" scoped>
    @import './400businessManage.scss';
</style>
