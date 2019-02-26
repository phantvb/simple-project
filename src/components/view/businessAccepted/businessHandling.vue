<template>
  <div id="businessHandling">
    <!--搜索-->
    <div class="handlingForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="searchInput">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="400电话：">
            <el-input v-model="form.phoneNum" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="时间：">
            <!--<el-date-picker-->
                    <!--size="mini"-->
                    <!--v-model="form.time"-->
                    <!--type="daterange"-->
                    <!--range-separator="至"-->
                    <!--start-placeholder="开始日期"-->
                    <!--end-placeholder="结束日期">-->
            <!--</el-date-picker>-->

            <el-date-picker
                    v-model="form.time"
                    size="mini"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="searchBtn">
            <el-button type="primary" size="mini" @click="businessLists()">搜索</el-button>
            <el-button @click="resetForm('form')" size="mini">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--表格-->
    <div class="entireTable">
      <!--表格按钮和下拉框-->
      <div class="BtnSelect">
        <div class="accountBtn">
          <el-button type="primary" size="mini" @click="businessAdd()">+新增受理</el-button>
        </div>
        <div class="accountSelect">
          <el-select v-model="accountStatus" placeholder="请选择" size="mini" @change="statusChange">
            <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" plain size="mini">导出</el-button>
        </div>
      </div>

      <el-table
              :data="tableData"
              style="width: 100%">

        <el-table-column
                prop="business.companyName"
                label="企业名称"
                width="300">
        </el-table-column>

        <el-table-column
                prop="business.number400"
                label="400电话">
        </el-table-column>

        <el-table-column
                prop="createTime"
                label="日期">
        </el-table-column>

        <el-table-column
                prop="status"
                label="状态">
        </el-table-column>

        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-for="(item,index) in scope.row.btnList" :key="index" @click="details(item.label,scope.row)">{{item.label}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageObj.total">
    </el-pagination>
  </div>
</template>
<script>

  import DialogBusiness from './dialogBusiness';
  import {mapState} from "vuex";
  import {formatDate} from '../../../utils/screen';
  export default {
    name: 'businessHandling',
      components: {
          DialogBusiness
      },
    data() {
      return {
        dialogVisible:false,
        businessIn:1,
        // active:3,
        actives:3,
        form:{
          firmName:'',
          phoneNum:'',
          time:'',
        },
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
        },
        tableData: [],
        statusOptions: [
          {
            value: 'Wait_To_Audit',
            label: '等待送审'
          },{
                value: 'Business_Auditing',
                label: '审核中'
            },{
            value: 'Audit_Success',
            label: '通过审核'
          },
          {
            value: 'Modify_Auditing',
            label: '变更审核中'
          },
            {
                value: 'Modify_Rejected',
                label: '变更审核驳回'
            },
            {
                value: 'Canceling_Auditing',
                label: '注销审核'
            },
            {
                value: 'Cancelled',
                label: '已注销'
            },
            {
                value: 'Terminate_Flow',
                label: '受理终止'
            }
        ],

        accountStatus:'',
        pageObj:{
              total:0,
              page:1,
              pageSize:10,
          },
        currentPage: 1,   //当前页
        loginResp:{},     //登录接口返回值
        baseData:{
              roleName:'',
              username:'',
          },
          busFlowId:'',   //表格对象id
          busStatus:'',   //表格对象状态
          busCreator:'',  //表格对象creator
          busAssigneeRole:'',

      };
    },
    created(){
        this.baseData.roleName = sessionStorage.getItem("roleName");
        this.baseData.username = sessionStorage.getItem("username");
        console.log("roleName",this.baseData.roleName);
        console.log("username",this.baseData.username);
        this.businessLists();
        this.$root.eventHub.$on('getLoginInfo', (resp)=>{
            console.log(resp);
            this.loginResp = resp;
        })
        this.$root.eventHub.$on('addAcceptSave', (resp) => {
            this.businessLists();
        });
    },
    methods:{
        handleSizeChange(val) {
            this.pageObj.pageSize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.pageObj.page = val;
            console.log(`当前页: ${val}`);
        },
      //弹窗关闭按钮
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
        //点击详情
        details(val,objData){
            console.log(val);
            console.log(objData);
            let busMsg = objData;
            this.busFlowId = busMsg.flowId;
            this.busStatus = busMsg.status;
            this.busCreator = busMsg.creator;
            this.busAssigneeRole = busMsg.assigneeRole;
            console.log(this.busFlowId);
            sessionStorage.setItem('busFlowId',this.busFlowId);
            if(val=='送审'){
                sessionStorage.setItem("businessIn",2);
                this.getCacheData(val);
            }else if(val=='详情'){
                console.log('详情入口');
                sessionStorage.setItem("businessIn",4);
                console.log(this.busStatus);
                // 详情接口
                this.getCacheData(val);

            }else if(val=='通过审核'){
                console.log("11111");
                this.passCompany(val,objData);
            }else if(val=='驳回'){
                console.log("22222");
                this.backCompany(val,objData);
            }else if(val=='变更'){
                sessionStorage.setItem("businessIn",3);
                this.getCacheData(val);
            }else if(val=='删除'){
                this.$ajax.post('/vos/business/deleteFlow',{
                    "companyFlow": objData
                }).then((res)=>{
                    console.log(res);
                    this.businessLists();
                })
            }
        },
        getCacheData(val){
            this.$ajax.get('/vos/business/getCacheData?flowId='+this.busFlowId).then((res)=>{
                console.log("详情",res);
                if(res.data!=null){
                    this.ChangeCompanyStatus(res.data.company);
                    console.log(this.company);
                    this.ChangeBusinessStatus(res.data.business);
                    this.ChangeDestNumber(res.data.destNumber);
                    this.ChangeNumber400ValueAdded(res.data.number400ValueAdded);
                    this.ChangeNumber400Concession(res.data.number400Concession);
                    if(val=='送审'){
                            this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:2});
                    }else if(val=='详情'){
                            this.$router.push({
                                path:'/BusinessAccepted/businessDetial',
                                query: {
                                    flowId: this.busFlowId,
                                    status:this.busStatus,
                                    assigneeRole:this.busAssigneeRole,
                                    creators:this.busCreator,
                                }
                            });
                    }else if(val=='变更'){
                        console.log("业务tab变更入口1111111111");
                        this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:3});
                    }
                }else{
                    this.$message.warning("data为空null");
                }
            })
        },
        //新增业务受理
        businessAdd(){
            this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:1});
        },

        // 业务受理表格
        businessLists(){
            // console.log(this.form.time[0]);
            // console.log(this.form.time[1]);
            let dateStart = new Date(this.form.time[0]);
            let dateEnd = new Date(this.form.time[1]);
            // let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate()+dateStart.getHours()+':'+dateStart.getMinutes()+':'+dateStart.getSeconds();
            // let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate()+dateStart.getHours()+':'+dateStart.getMinutes()+':'+dateStart.getSeconds();
            let dateStart_value = formatDate(dateStart,"yyyy-MM-dd hh:mm:ss");
            let dateEnd_value = formatDate(dateEnd,"yyyy-MM-dd hh:mm:ss");
            // console.log(dateStart_value);
            // console.log(dateEnd_value);
            this.$ajax.post('/vos/business/getBusinessFlowList',{
                "type":"Business",
                "dateStart":this.form.time[0]==undefined?'':dateStart_value,
                "dateEnd":this.form.time[1]==undefined?'':dateEnd_value,
                "companyName":this.form.firmName,
                "status":this.accountStatus,
                "source":'',
                "number400":this.form.phoneNum,
                "page":{
                    "pageNo":this.pageObj.page,
                    "pageSize":this.pageObj.pageSize,
                }
            }).then((res)=>{
                // console.log(res.data.businessFlows);
                this.tableData = res.data.businessFlows;
                this.pageObj.total = res.data.totalCount;
                this.tableData.map((item)=>{

                    //判断操作
                    if(item.status=='Wait_To_Audit'){
                        item.status='等待送审';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                            item.btnList.push({label:'送审'},{label:'详情'},{label:'删除'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                        // console.log("btnList",item.btnList);
                    }else if(item.status=='Audit_Success'){
                        item.status='通过审核';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                            item.btnList.push({label:'变更'},{label:'注销'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Business_Auditing'){
                        item.status='审核中';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assigneeRole==this.baseData.roleName){
                            item.btnList.push({label:'通过审核'},{label:'驳回'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Modify_Auditing'){
                        item.status='变更审核中';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assigneeRole==this.baseData.roleName){
                            item.btnList.push({label:'变更通过审核'},{label:'驳回'},{label:'终止'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Modify_Rejected'){
                        item.status='变更审核驳回';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                            item.btnList.push({label:'变更'},{label:'注销'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Canceling_Auditing'){
                        item.status='注销审核';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                            item.btnList.push({label:'通过审核'},{label:'终止'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Cancelled'){
                        item.status='已注销';
                        item.btnList=[];
                        item.btnList.push({label:'详情'});
                    }else if(item.status=='Terminate_Flow'){
                        item.status='受理终止';
                        item.btnList=[];
                        item.btnList.push({label:'详情'});
                    }

                })
            })
        },
        statusChange(){
            this.businessLists();
        },
        async passCompany(val,data) {
            console.log("状态：",data.status);
            var obj = {};
            var url;
            if (data.status == 'Business_Auditing') {
                url = '/vos/business/businessAuditPass';
            }
            obj.companyFlow = {
                flowId: data.flowId,
                creator: data.creator,
                assigneeRole: data.assigneeRole
            };
            obj.message = await this.prompt(val);
            if (obj.message === false) {
                return;
            }
            this.$ajax.post('/vos/business/businessAuditPass', obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('操作成功');
                    this.fetchData(this.pageObj.page);
                }
            });
        },
        async backCompany(val,data) {
            console.log(val);
            console.log(data);
            var obj = {};
            var url;
                //业务受理驳回
                url = '/vos/business/businessAuditReject';
            obj.companyFlow = {
                flowId: data.flowId,
                creator: data.creator,
                assigneeRole: data.assigneeRole
            };
            obj.message = await this.prompt(val);
            if (obj.message === false) {
                return;
            }
            this.$ajax.post(url, obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('操作成功');
                    this.fetchData(this.pageObj.page);
                }
            });
        },
        //通过审核和驳回弹窗
        prompt(data) {
            return this.$prompt('请输入审核意见', data, {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                return value || '';
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
                return false;
            });
        },
        fetchData(pageNum) {
            this.loading = true;
            this.pageObj.page = pageNum || 1;
            var data = {};
            data.page = {
                pageNo: this.pageObj.page,
                pageSize: this.pageObj.pageSize
            };
            data.blacklist = Object.assign({}, this.form);
            data.blacklist.blackType = this.active;
            delete data.blacklist["time"];
            data.beforeTime = this.form.time[0] || '';
            data.afterTime = this.form.time[1] || '';
            this.$ajax.post("/vos/blacklist/search", data).then(res => {
                if (res.code == 200) {
                    this.loading = false;
                    this.tableData = res.data.blacklists;
                    this.pageObj.total = res.data.totalCount;
                }
            });
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
    },

    computed: {
        ...mapState({
            company: state => state.createActivities.company,
            business: state => state.createActivities.business,
            destNumber: state => state.createActivities.destNumber,
            number400ValueAdded: state => state.createActivities.number400ValueAdded,
            number400Concession: state => state.createActivities.number400Concession,
        })
    }
  }
</script>
<style lang="scss" scoped>
  @import './400businessManage.scss';
</style>
