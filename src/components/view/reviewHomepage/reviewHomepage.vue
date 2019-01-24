<template>
	<div>
		<div style="width: 68%;float: left;">
			<el-card class="left_card">
				<div class="card">
					<section>
						<div class="title">基本资料
							<p class="edit">
								<i class="el-icon-edit-outline"></i>
								<el-button type="text" @click="gotoUserCenter">编辑</el-button>
							</p>
						</div>
						<div class="part center portrait">
							<img src="../../../assets/portrait_1.png">
							<el-button type="text" class="button" @click="gotoUserCenter">修改头像</el-button>
						</div>
						<div class="part message">
							<p>
								登录账号 ：
								<span class="grey">{{tableData.username}}</span>
							</p>
							<p>用户名称：{{tableData.name}}</p>
							<p>性别：{{sex}}</p>
							<p>身份证号：{{tableData.idNo}}</p>
							<p>邮箱：{{tableData.email}}</p>
							<p>手机：{{tableData.phone}}</p>
						</div>
						<div class="part message">
							<p>角色：{{tableData.nameZh}}</p>
							<p>地区：{{tableData.province}}{{tableData.city}}{{tableData.area}}</p>
							<p>状态：{{tableData.enabled}}</p>
							<p>备注：{{tableData.remark}}</p>
						</div>
					</section>
				</div>
			</el-card>
			<el-card class="left_card">
				<div class="card">
					<section>
						<div class="title">企业信息管理</div>
						<div class="part center picture">
							<img src="../../../assets/rh1.png">
							<el-button type="primary" size="mini" class="button" @click="gotoBusinessInform">
								<i class="el-icon-plus">&nbsp;新增企业</i>
							</el-button>
						</div>
						<div style="float:left;margin-top: 20px;margin-left: 20px;">
							<div class="mess">
								<div>企业信息新增审核</div>
								<div>15</div>
							</div>
							<div class="mess">
								<div>企业信息变更审核</div>
								<div>4</div>
							</div>
							<div class="mess">
								<div>企业信息注销审核</div>
								<div>0</div>
							</div>
						</div>
					</section>
				</div>
			</el-card>
			<el-card class="left_card">
				<div class="card">
					<section>
						<div class="title">业务受理</div>
						<div class="part center picture">
							<img src="../../../assets/rh2.png">
							<el-button type="primary" size="mini" class="button">
								<i class="el-icon-plus">&nbsp;新增预受理</i>
							</el-button>
						</div>
						<div style="float: left;">
							<div>
								<div class="mess">
									<div>预受理审核</div>
									<div>15</div>
								</div>
								<div class="mess">
									<div>正式受理审核</div>
									<div>4</div>
								</div>
								<div class="mess">
									<div>注销审核</div>
									<div>0</div>
								</div>
								<div class="mess">
									<div>变更审核</div>
									<div>0</div>
								</div>
							</div>

							<div>
								<div class="mess">
									<div>过户审核</div>
									<div>15</div>
								</div>
								<div class="mess">
									<div>语音文件审核</div>
									<div>4</div>
								</div>
								<div class="mess">
									<div>业务目的码审核</div>
									<div>0</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</el-card>
		</div>
		<el-aside style="width: 30%; float: right; height:832px;">
			<el-card class="right_card">
				<div class="right_card_title">系统公告</div>
				<div v-for="(item,index) in systemNotice.tableData" :key="index" class="noticeItem">
					<div style="float: left;">
						<div class="radio"></div>
					</div>
					<div class="text" style="float: left;">
						<div class="content">{{item.title}}</div>
						<div class="content grey publishTime">{{item.publishTime}}</div>
						<div class="content grey text_overflow" v-html="item.content"></div>
						<el-button type="text" style="padding: 0;" @click="gotoMessCenter">了解详情</el-button>
					</div>
					<div style="clear: both;"></div>
				</div>
			</el-card>
		</el-aside>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				sex: "", // 存放翻译之后的性别

				systemNotice: {
					tableData: []
				}
			};
		},
		methods: {
			gotoUserCenter() {
				this.$router.push("/layout/userCenter");
			},
			gotoMessCenter() {
				this.$router.push("/layout/messageCenter");
			},
			gotoBusinessInform() {
				this.$router.push("/layout/businessInform");
				// this.$router.push({path:'/layout/businessInform',query:{addCompanys:true}});
			}
		},
		created() {
			this.$ajax.get("/vos/user/getDetail").then(res => {
				if (res.code == 200) {
					this.tableData = res.data;
					if (this.tableData.sex == "man") {
						this.sex = "男";
					}
					if (this.tableData.sex == "woman") {
						this.sex = "女";
					}
					if (this.tableData.enabled == true) {
						this.tableData.enabled = "启用";
					}
					if (this.tableData.enabled == false) {
						this.tableData.enabled = "关闭";
					}
				}
			});

			this.$ajax.post("/vos/announcement/getAll", {
				ann: {
					title: "",
					publishMan: ""
				},
				page: {
					pageNo: "1",
					pageSize: "10"
				}
			}).then(res => {
				if (res.code == 200) {
					this.systemNotice.tableData = res.data.announcements;
				}

				let rows = this.systemNotice.tableData;
				rows.sort(function (a, b) {
					return (
						Date.parse(b.publishTime) - Date.parse(a.publishTime)
					); //时间正序
				});
            });
            
            this.$ajax.post("/vos/announcement/getAll", {
				ann: {
					title: "",
					publishMan: ""
				},
				page: {
					pageNo: "1",
					pageSize: "10"
				}
			}).then(res => {
				if (res.code == 200) {
					this.systemNotice.tableData = res.data.announcements;
				}

				let rows = this.systemNotice.tableData;
				rows.sort(function (a, b) {
					return (
						Date.parse(b.publishTime) - Date.parse(a.publishTime)
					); //时间正序
				});
			});
		}
	};
</script>

<style lang="scss" scoped>
	@import "./reviewHomepage";
</style>

<style scoped>
	.text_overflow>>>p {
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
		overflow: hidden;
		/** 隐藏超出的内容 **/
	}
</style>