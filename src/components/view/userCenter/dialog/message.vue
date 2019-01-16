<template>
	<div>
		<el-dialog title="编辑资料" :visible.sync="dialogFormVisible" @close="close" width="50%">
			<el-form :model="form">
				<section>
					<div class="title">
						账号信息
					</div>
					<div class="part message">
						<p>登录账号 ：<span class="grey">{{form.username}}</span></p>
						<ul>
							<li class="l2">
								<p>角&#12288;&#12288;色：{{form.roleName}}</p>
							</li>
							<li class="l2">
								<p>状态：{{form.enabled?'启用':'关闭'}}</p>
							</li>
						</ul>
					</div>
				</section>
				<div class="title">
					用户资料
				</div>
				<ul>
					<li class="l2">
						<el-form-item label="用户名称" :label-width="formLabelWidth">
							<el-input v-model="form.name" autocomplete="off" size="mini"></el-input>
						</el-form-item>
					</li>
				</ul>
				<ul>
					<li class="l2">
						<el-form-item label="性别" :label-width="formLabelWidth">
							<el-radio v-model="form.sex" label="man">男</el-radio>
							<el-radio v-model="form.sex" label="woman">女</el-radio>
						</el-form-item>
					</li>
					<li class="l2">
						<el-form-item label="手机" :label-width="formLabelWidth">
							<el-input v-model="form.phone" autocomplete="off" size="mini"></el-input>
						</el-form-item>
					</li>
				</ul>
				<el-form-item label="地区" :label-width="formLabelWidth" style="width: 100%">
					<el-select v-model="form.province" placeholder="请选择" size="mini" @focus="loadProvince">
						<el-option v-for="item in options.province" :key="item.id" :label="item.province" :value="item.province">
						</el-option>
					</el-select>
					<el-select v-model="form.city" placeholder="请选择" size="mini" @focus="loadCity">
						<el-option v-for="item in options.city" :key="item.id" :label="item.city" :value="item.city">
						</el-option>
					</el-select>
					<el-select v-model="form.area" placeholder="请选择" size="mini" @focus="loadArea">
						<el-option v-for="item in options.area" :key="item.id" :label="item.area" :value="item.area">
						</el-option>
					</el-select>

				</el-form-item>
				<ul>
					<li>
						<el-form-item label="身份证" :label-width="formLabelWidth">
							<el-input v-model="form.idNo" autocomplete="off" size="mini"></el-input>
						</el-form-item>
					</li>
					<li>
						<el-form-item label="邮箱" :label-width="formLabelWidth">
							<el-input v-model="form.email" autocomplete="off" size="mini"></el-input>
						</el-form-item>
					</li>
				</ul>
				<el-form-item label="备注" :label-width="formLabelWidth">
					<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.remark">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
				<el-button type="primary" @click="submit" size="mini">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped>
	@import './dialog.scss';
</style>
<script>
	export default {
		name: 'message',
		data() {
			return {
				form: {
					id: '',
					username: '',
					password: '',
					roleName: '',
					roleId: '',
					enabled: '',
					name: '',
					phone: '',
					sex: '',
					remark: '',
					province: '',
					provinceId: '',
					city: '',
					cityId: '',
					area: '',
					areaId: '',
					email: '',
					idNo: '',
					headPicture: '',
					businessType: '',
					remark: ''
				},
				options: {
					province: [],
					city: [],
					area: []
				},
				dialogFormVisible: false,
				formLabelWidth: '100px'
			}
		},
		props: ['show', 'data'],
		watch: {
			show(newV, oldV) {
				this.dialogFormVisible = newV;
			},
			data(n, o) {
				for (let key in n) {
					if (key in this.form) {
						this.form[key] = n[key];
					}
				};
				console.log(this.form);
			}
		},
		methods: {
			close() {
				this.$emit('close');
			},
			loadProvince() {
				this.$ajax.get('/vos/address/getAllProvince').then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.options.province = res.data;
						}
					}
				});
			},
			loadCity() {
				var id = this.checkValue(this.form.province, this.options.province, this.form.provinceId);
				this.$ajax.get('/vos/address/getCitiesByProvinceId?provinceId=' + id).then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.options.city = res.data;
						}
					}
				});
			},
			loadArea() {
				var id = this.checkValue(this.form.city, this.options.city, this.form.cityId);
				this.$ajax.get('/vos/address/getAreasByCityId?cityId=' + id).then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.options.area = res.data;
						}
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
			submit() {
				this.form.provinceId = this.checkValue(this.form.province, this.options.province, this.form.provinceId);
				this.form.cityId = this.checkValue(this.form.city, this.options.city, this.form.cityId);
				this.form.areaId = this.checkValue(this.form.area, this.options.area, this.form.areaId);
				this.$ajax.post('/vos/user/saveUser', { user: this.form }).then(res => {
					if (res.code == 200) {
						this.$message({
							message: '编辑成功!',
							type: 'success'
						});
						this.close();
					}
				});
			}
		}
	}
</script>