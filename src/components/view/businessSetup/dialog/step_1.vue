<template>
    <div id="step_1" class="step">
        <el-form ref="form" :model="form" label-width="80px">
            <div class="title">
                企业基本信息
            </div>
            <div class="block">
                <el-form-item label="企业名称">
                    <el-input v-model="form.companyName" size="mini" placeholder="营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
                </el-form-item>
                <el-form-item label="证件编号">
                    <el-select v-model="form.companyCardType" placeholder="请选择" size="mini">
                        <el-option v-for="item in companyCardOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-input v-model="form.companyCardNo" size="mini" placeholder=" 根据证件类型，填写相应的证件号码"></el-input>
                </el-form-item>
                <ul>
                    <li class="l3">
                        <el-form-item label="企业性质">
                            <el-select v-model="form.companyCharacter" placeholder="请选择" size="mini">
                                <el-option v-for="item in companyCharacterOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                    <li class="l3">
                        <el-form-item label="企业等级">
                            <el-select v-model="form.companyRank" placeholder="请选择" size="mini">
                                <el-option v-for="item in companyRankOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                    <li class="l3">
                        <el-form-item label="行业类型">
                            <el-select v-model="form.industryType" placeholder="请选择" size="mini">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </li>
                </ul>
                <el-form-item label="注册地址">
                    <ul>
                        <li class="l3">
                            <el-select v-model="form.registProvince" filterable placeholder="请选择省份" size="mini" @change="getCity" value-key="id">
                                <el-option v-for="item in registProvinceOptions" :key="item.id" :label="item.province" :value="item"></el-option>
                            </el-select>
                        </li>
                        <li class="l3">
                            <el-select v-model="form.registCity" filterable placeholder="请选择城市" size="mini" @change="getArea" value-key="id">
                                <el-option v-for="item in registCityOptions" :key="item.id" :label="item.city" :value="item"></el-option>
                            </el-select>
                        </li>
                        <li class="l3">
                            <el-select v-model="form.registArea" filterable placeholder="请选择区" size="mini" value-key="id">
                                <el-option v-for="item in registAreaOptions" :key="item.id" :label="item.area" :value="item"></el-option>
                            </el-select>
                        </li>
                    </ul>
                    <el-input v-model="form.name" size="mini" placeholder="填入企业营业执照上的详细地址"></el-input>
                </el-form-item>
                <el-form-item label="办公地址">
                    <ul>
                        <li class="l3">
                            <el-select v-model="form.region" placeholder="请选择" size="mini">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </li>
                        <li class="l3">
                            <el-select v-model="form.region" placeholder="请选择" size="mini">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </li>
                        <li class="l3">
                            <el-select v-model="form.region" placeholder="请选择" size="mini">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </li>
                    </ul>
                    <el-input v-model="form.name" size="mini" placeholder="填入企业办公所在地址"></el-input>
                </el-form-item>
                <el-form-item label="企业电话">
                    <el-input v-model="form.name" size="mini" placeholder="填入企业联系电话（固话或手机）"></el-input>
                </el-form-item>
            </div>
            <div class="title">
                法人基本信息
            </div>
            <div class="block">
                <ul>
                    <li>
                        <el-form-item label="法人姓名">
                            <el-input v-model="form.name" size="mini" placeholder="填入法人真实姓名"></el-input>
                        </el-form-item>
                    </li>
                    <li>
                        <el-form-item label="法人电话">
                            <el-input v-model="form.name" size="mini" placeholder="填入法人联系电话（固话或手机）"></el-input>
                        </el-form-item>
                    </li>
                </ul>
                <el-form-item label="法人证件">
                    <ul>
                        <li class="l3">
                            <el-select v-model="form.region" placeholder="请选择" size="mini">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </li>
                        <li style="width:66%;">
                            <el-input v-model="form.name" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
                        </li>
                    </ul>
                </el-form-item>
            </div>
        </el-form>
        <footer class="right">
            <el-button type="primary" size="mini" @click="next">下一步</el-button>
        </footer>
    </div>
</template>
<style lang="scss" scoped>
    @import './company.scss';
</style>
<script>
    export default {
        name: 'baseMes',
        data() {
            return {
                form: {
                    companyName: '',
                    companyCardType: '',
                    companyCardNo: '',
                    companyCharacter: '',
                    companyRank: '',
                    industryType: '',
                    registProvince: '',
                    registProvinceId: '',
                    registCity: '',
                    registCityId: '',
                    registArea: '',
                    registaAreaId: '',
                    registAddress: '',
                    officeCity: '',
                    officeCityId: '',
                    officeProvince: '',
                    officeProvinceId: '',
                    officeArea: '',
                    officeAreaId: '',
                    officeAddress: '',
                    phone: '',
                    legalPerson: '',
                    legalPhone: '',
                    legalCard: '',
                    cardNum: '',
                    idCardAddress: '',
                    cardStartDate: '',
                    cardEndDate: '',
                    companyProofPic: '',
                    legalCardFrontPic: '',
                    legalCardBackPic: '',
                    legalCardHandPic: ''
                },
                companyCardOptions: [{
                    value: 'business_license',
                    label: '营业执照'
                }, {
                    value: 'org_code_certificate',
                    label: '组织机构代码证'
                }, {
                    value: 'three_licence',
                    label: '三证合一'
                }, {
                    value: 'five_licence',
                    label: '五证合一'
                }],
                companyCharacterOptions: [{
                    value: 'state-owned',
                    label: '国有'
                }, {
                    value: 'cooperation',
                    label: '合作'
                }, {
                    value: 'joint_venture',
                    label: '合资'
                }, {
                    value: 'sole_proprietorship',
                    label: '独资'
                }, {
                    value: 'collective',
                    label: '集体'
                }, {
                    value: 'private',
                    label: '私营'
                }, {
                    value: 'individual_business',
                    label: '个体工商户'
                }],
                companyRankOptions: [{
                    value: 'DK_A',
                    label: '大客A'
                }, {
                    value: 'DK_B',
                    label: '大客B'
                }, {
                    value: 'DK_C',
                    label: '大客C'
                }, {
                    value: 'DK_D',
                    label: '大客D'
                }, {
                    value: 'DK_E',
                    label: '大客E'
                }, {
                    value: 'SK_A',
                    label: '商客A'
                }, {
                    value: 'SK_B',
                    label: '商客B'
                }],
                registProvinceOptions: [],
                registCityOptions: [],
                registAreaOptions: []
            }
        },
        mounted() {
            this.$ajax.get('/vos/address/getAllProvince').then(res => {
                if (res.code == 200) {
                    this.registProvinceOptions = res.data;
                }
            });
        },
        methods: {
            next() {
                this.$emit('next', 2);
            },
            getCity(val) {
                this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + val.provinceId).then(res => {
                    if (res.code == 200) {
                        this.registCityOptions = res.data;
                    }
                })
            },
            getArea(val) {
                this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + val.cityId).then(res => {
                    if (res.code == 200) {
                        this.registAreaOptions = res.data;
                    }
                })
            }
        },

    }
</script>