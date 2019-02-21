<template>
	<div id="step_1" class="step">
		<el-form ref="form" :model="form" label-width="80px" :rules="rules">
			<div class="title">
				企业基本信息
			</div>
			<div class="block">
				<el-form-item label="企业名称" prop="companyName">
					<el-input v-model="form.companyName" size="mini" placeholder="营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
				</el-form-item>
				<el-form-item label="证件编号" prop="companyCardType">
					<el-select v-model="form.companyCardType" placeholder="请选择" size="mini">
						<el-option v-for="item in companyCardOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
					<el-input v-model="form.companyCardNo" size="mini" placeholder=" 根据证件类型，填写相应的证件号码"></el-input>
				</el-form-item>
				<ul>
					<li class="l3">
						<el-form-item label="企业性质" prop="companyCharacter">
							<el-select v-model="form.companyCharacter" placeholder="请选择" size="mini">
								<el-option v-for="item in companyCharacterOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</li>
					<li class="l3">
						<el-form-item label="企业等级" prop="companyRank">
							<el-select v-model="form.companyRank" placeholder="请选择" size="mini">
								<el-option v-for="item in companyRankOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-form-item>
					</li>
					<li class="l3">
						<el-form-item label="行业类型" prop="industryType">
							<el-select v-model="form.industryType" placeholder="请选择" size="mini">
								<el-option v-for="item in industryTypeOptions" :key="item.id" :label="item.dicValue" :value="item.dicValue"></el-option>
							</el-select>
						</el-form-item>
					</li>
				</ul>
				<el-form-item label="注册地址" prop="registAddress">
					<ul>
						<li class="l3">
							<el-select v-model="form.registProvince" filterable placeholder="请选择省份" size="mini" @change="clear('regist',0)">
								<el-option v-for="item in ProvinceOptions" :key="item.id" :label="item.province" :value="item.province"></el-option>
							</el-select>
						</li>
						<li class="l3">
							<el-select v-model="form.registCity" filterable placeholder="请选择城市" size="mini" @focus="getCity" @change="clear('regist',1)">
								<el-option v-for="item in registCityOptions" :key="item.id" :label="item.city" :value="item.city"></el-option>
							</el-select>
						</li>
						<li class="l3">
							<el-select v-model="form.registArea" filterable placeholder="请选择区" size="mini" @focus="getArea">
								<el-option v-for="item in registAreaOptions" :key="item.id" :label="item.area" :value="item.area"></el-option>
							</el-select>
						</li>
					</ul>
					<el-input v-model="form.registAddress" size="mini" placeholder="填入企业营业执照上的详细地址"></el-input>
				</el-form-item>
				<el-form-item label="办公地址" prop="officeAddress">
					<ul>
						<li class="l3">
							<el-select v-model="form.officeProvince" filterable placeholder="请选择省份" size="mini" @change="clear('office',0)">
								<el-option v-for="item in ProvinceOptions" :key="item.id" :label="item.province" :value="item.province"></el-option>
							</el-select>
						</li>
						<li class="l3">
							<el-select v-model="form.officeCity" filterable placeholder="请选择城市" size="mini" @focus="getOfficeCity" @change="clear('office',1)">
								<el-option v-for="item in officeCityOptions" :key="item.id" :label="item.city" :value="item.city"></el-option>
							</el-select>
						</li>
						<li class="l3">
							<el-select v-model="form.officeArea" filterable placeholder="请选择区" size="mini" @focus="getOfficeArea">
								<el-option v-for="item in officeAreaOptions" :key="item.id" :label="item.area" :value="item.area"></el-option>
							</el-select>
						</li>
					</ul>
					<el-input v-model="form.officeAddress" size="mini" placeholder="填入企业办公所在地址"></el-input>
				</el-form-item>
				<el-form-item label="企业电话" prop="phone">
					<el-input v-model="form.phone" size="mini" placeholder="填入企业联系电话（固话或手机）"></el-input>
				</el-form-item>
			</div>
			<div class="title">
				法人基本信息
			</div>
			<div class="block">
				<ul>
					<li>
						<el-form-item label="法人姓名" prop="legalPerson">
							<el-input v-model="form.legalPerson" size="mini" placeholder="填入法人真实姓名"></el-input>
						</el-form-item>
					</li>
					<li>
						<el-form-item label="法人电话" prop="legalPhone">
							<el-input v-model="form.legalPhone" size="mini" placeholder="填入法人联系电话（固话或手机）"></el-input>
						</el-form-item>
					</li>
				</ul>
				<el-form-item label="法人证件" prop="legalCard">
					<ul>
						<li class="l3">
							<el-select v-model="form.legalCard" placeholder="请选择" size="mini">
								<el-option v-for="item in legalCardOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</li>
						<li style="width:66%;">
							<el-input v-model="form.cardNum" size="mini" placeholder="根据证件类型，填写相应的证件号码"></el-input>
						</li>
					</ul>
				</el-form-item>
				<el-form-item label="身份证住址" v-if="form.legalCard=='id_card'" prop="idCardAddress">
					<el-input v-model="form.idCardAddress" size="mini" placeholder="填入身份证上的住址"></el-input>
				</el-form-item>
				<el-form-item label="身份证有效期" v-if="form.legalCard=='id_card'" prop="cardDate">
					<el-date-picker v-model="form.cardDate" size="mini" placeholder="选择身份证起止日期" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
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
					registCity: '',
					registArea: '',
					registProvinceId: '',
					registCityId: '',
					registAreaId: '',
					registAddress: '',
					officeCity: '',
					officeProvince: '',
					officeAreaId: '',
					officeCityId: '',
					officeProvinceId: '',
					officeArea: '',
					officeAddress: '',
					source: 'self',
					phone: '',
					legalPerson: '',
					legalPhone: '',
					legalCard: '',
					cardNum: '',
					idCardAddress: '',
					cardDate: [],
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
				ProvinceOptions: [],
				registCityOptions: [],
				registAreaOptions: [],
				officeCityOptions: [],
				officeAreaOptions: [],
				industryTypeOptions: [],
				legalCardOptions: [{
					value: 'id_card',
					label: '身份证'
				}, {
					value: 'officer_card',
					label: '军官证'
				}, {
					value: 'passport',
					label: '护照'
				}],
				rules: {}
			}
		},
		props: ['oldData'],
		watch: {
			oldData(newV, oldV) {
				for (let key in newV) {
					if (key in this.form) {
						this.form[key] = newV[key];
					}
				};
				this.form.cardDate = [newV.cardStartDate || '', newV.cardEndDate || ''];
			}
		},
		created() {
			for (let key in this.form) {
				this.$set(this.rules, key, [{ required: true, message: '请输入正确信息', trigger: 'blur' }]);
			};
		},
		mounted() {
			this.$ajax.get('/vos/address/getAllProvince').then(res => {
				if (res.code == 200) {
					this.ProvinceOptions = res.data;
				}
			});
			this.$ajax.post('/vos/dic/getDicsByType', { dicType: 'industry_category', status: '' }).then(res => {
				if (res.code == 200) {
					this.industryTypeOptions = res.data.dicList;
				}
			});
		},
		methods: {
			clear(type, num) {
				if (type == 'office') {
					this.form.officeArea = '';
					if (num == 0) {
						this.form.officeCity = '';
					}
				} else {
					this.form.registArea = '';
					if (num == 0) {
						this.form.registCity = '';
					}
				}
			},
			next() {
				var data = {};
				data = Object.assign(data, this.form);
				data.registProvinceId = this.form.registProvinceId = this.checkValue(data.registProvince, this.ProvinceOptions, this.form.registProvinceId);
				data.registCityId = this.form.registCityId = this.checkValue(data.registCity, this.registCityOptions, this.form.registCityId);
				data.registAreaId = this.form.registAreaId = this.checkValue(data.registArea, this.registAreaOptions, this.form.registAreaId);
				data.officeProvinceId = this.form.officeProvinceId = this.checkValue(data.officeProvince, this.ProvinceOptions, this.form.officeProvinceId);
				data.officeCityId = this.form.officeCityId = this.checkValue(data.officeCity, this.officeCityOptions, this.form.officeCityId);
				data.officeAreaId = this.form.officeAreaId = this.checkValue(data.officeArea, this.officeAreaOptions, this.form.officeAreaId);
				data.cardStartDate = this.form.cardDate[0];
				data.cardEndDate = this.form.cardDate[1];
				delete data.cardDate;
				this.$refs.form.validate((valid) => {
					if (valid) {
						this.$emit('next', 2, data);
					} else {
						this.$message.error('请先完善信息再进行下一步操作');
					}
				});
			},
			checkValue(value, options, oldId) {
				if (options.length > 0) {
					for (let item of options) {
						let v = item.province || item.city || item.area;
						if (v == value) {
							let id = item.areaId || item.cityId || item.provinceId;
							return id;
						}
					};
				} else {
					return oldId;
				}
			},
			getCity(e) {
				var id = this.checkValue(this.form.registProvince, this.ProvinceOptions);
				this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + id).then(res => {
					if (res.code == 200) {

						this.registCityOptions = res.data;
					}
				});
			},
			getArea(val) {
				var id = this.checkValue(this.form.registCity, this.registCityOptions);
				this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + id).then(res => {
					if (res.code == 200) {
						this.form.registArea = '';
						this.registAreaOptions = res.data;
					}
				});
			},
			getOfficeCity(val) {
				var id = this.checkValue(this.form.officeProvince, this.ProvinceOptions);
				this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + id).then(res => {
					if (res.code == 200) {
						this.form.officeCity = '';
						this.form.officeArea = '';
						this.officeCityOptions = res.data;
					}
				});
			},
			getOfficeArea(val) {
				var id = this.checkValue(this.form.officeCity, this.officeCityOptions);
				this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + id).then(res => {
					if (res.code == 200) {
						this.form.officeArea = '';
						this.officeAreaOptions = res.data;
					}
				});
			}
		},

	}
</script>