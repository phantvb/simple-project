<template>
	<div id="step_1">
		<el-form ref="form" :model="form" label-width="80px">
			<div class="title">
				企业基本信息
			</div>
			<div class="block">
				<el-form-item label="企业名称">
					<el-input v-model="form.name" size="mini" placeholder="营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
				</el-form-item>
				<el-form-item label="证件编号">
					<el-select v-model="form.region" placeholder="请选择" size="mini">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="beijing"></el-option>
					</el-select>
					<el-input v-model="form.name" size="mini" placeholder=" 根据证件类型，填写相应的证件号码"></el-input>
				</el-form-item>
				<ul>
					<li class="l3">
						<el-form-item label="企业性质">
							<el-select v-model="form.region" placeholder="请选择" size="mini">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</li>
					<li class="l3">
						<el-form-item label="企业等级">
							<el-select v-model="form.region" placeholder="请选择" size="mini">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</li>
					<li class="l3">
						<el-form-item label="行业类型">
							<el-select v-model="form.region" placeholder="请选择" size="mini">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</li>
				</ul>
				<el-form-item label="注册地址">
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
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			next() {
				this.$emit('next', 2);
			}
		},

	}
</script>