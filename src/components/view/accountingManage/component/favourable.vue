<template>
	<div id="favourable">
		<el-dialog title="添加优惠" class="left" :visible.sync="dialogVisible" @close="close">
			<div class="form_item">
				<div class="form_title right">400号码：</div>
				<div class="form_con">{{data.number400}}</div>
			</div>
			<div class="form_item">
				<div class="form_title right">优惠类型：</div>
				<div class="form_con">
					<span>系统优惠</span>
				</div>
			</div>
			<div class="form_item">
				<div class="form_con grey fmini">
					系统优惠为系统设置的标准优惠方案，修改后该号码的业务受理单记录也会做相应更改。特殊优惠为单独优惠方案，用于运营活动，不影响业务受理记录
				</div>
			</div>
			<div class="form_item">
				<div class="form_title right">系统优惠：</div>
				<div class="form_con">
					<el-select v-model="favourable" placeholder="请选择" size="mini" value-key="concessionName">
						<el-option v-for="item in options" :key="item.id" :label="item.concessionName" :value="item">
						</el-option>
					</el-select>
				</div>
			</div>
			<footer class="right">
				<el-button type="primary" size="mini" plain @click="close(false)">取消</el-button>
				<el-button type="primary" size="mini" @click="submit">确定</el-button>
			</footer>
		</el-dialog>
	</div>
</template>
<style lang="scss" scoped>
	@import './common.scss';
</style>

<script>
	export default {
		name: 'favourable',
		props: ['show', 'data', 'active'],
		watch: {
			show(newV, oldV) {
				this.dialogVisible = newV;
			},
			'data.id': function (n, o) {
				if (n) {
					this.get400Concession();
				}
			}
		},
		data() {
			return {
				dialogVisible: false,
				type: '1',
				favourable: '',
				favourableId: '',
				options: [],
			}
		},
		mounted() {
			this.getConcessionScheme();
		},
		methods: {
			close(bol) {
				this.$emit('close', bol);
			},
			submit() {
				var data = this.favourable;
				data.num400TimePacketId = this.data.num400TimePacketId || '';
				data.number400 = this.data.number400;
				data.id = this.favourableId;
				this.$ajax.post('/vos/accountsTotal/addOrUpdateConcession', { number400Concession: data }).then(res => {
					if (res.code == 200) {
						this.close(true);
					}
				})
			},
			getConcessionScheme() {
				this.$ajax.post('/vos/tariffPackage/getConcessionScheme', { concessionScheme: { channel: this.active } }).then(res => {
					if (res.code == 200) {
						this.options = res.data.concessionSchemeList;
					}
				})
			},
			get400Concession() {
				this.$ajax.post('/vos/accountsTotal/get400Concession', { accountsTotal: this.data }).then(res => {
					if (res.code == 200 && res.data.number400Concession) {
						this.favourable = res.data.number400Concession;
					};
					this.favourableId = res.data.number400Concession ? res.data.number400Concession.id : '';
				})
			}
		}
	}
</script>