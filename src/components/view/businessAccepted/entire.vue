<template>
  <div id="entire">
    <!--搜索-->
    <div class="entireForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="searchInput">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="400电话：">
            <el-input v-model="form.phoneNum" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="时间：">
            <el-date-picker
              size="mini"
              v-model="form.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="searchBtn">
            <el-button type="primary" size="mini">搜索</el-button>
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
          <el-button type="primary" size="mini" @click="voiceAdd()">+新增语音文件</el-button>
          <el-button type="primary" size="mini" @click="addObjCodeBtn()">+新增目的码</el-button>
        </div>
        <div class="accountSelect">
          <span style="font-size:12px">状态:</span>
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
          prop="type"
          label="类型">
        </el-table-column>

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
            <!--<router-link :to="{path:'businessData'}">-->
            <!--<router-link :to="{path:'/addEvent/'+scope.row.contactEvtId}">-->
              <el-button size="mini" type="text" v-for="(item,index) in scope.row.btnList" :key="index" @click="businessEdit(item.label,scope.row)">{{item.label}}</el-button>
            <!--</router-link>-->
            <!--<el-button size="mini" type="text">变更</el-button>-->
            <!--<el-button size="mini" type="text">注销</el-button>-->
            <!--<el-button size="mini" type="text">通过审核</el-button>-->
            <!--<el-button size="mini" type="text">驳回</el-button>-->
            <!--<el-button size="mini" type="text" @click="businessEdit(scope.row)">送审</el-button>-->
            <!--<el-button size="mini" type="text">删除</el-button>-->
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

  import Dialog1 from './dialog1';
  import DialogVoice from './dialogVoice';
  import {mapState} from "vuex";
  export default {
    name: 'entire',
    data() {
      return {
        dialog1Visible:false,
        dialog1VisibleVoice:false,
        dialogVisibleBusiness:false,
        objCodeIn:1,
        voiceIn:1,
        form:{
          firmName:'',
          phoneNum:'',
          time:'',
        },
        entrance:1,    //新增，详情入口区分
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
                label: '审核通过'
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
            },
        ],
          pageObj:{
              total:0,
              page:1,
              pageSize:10,
          },
          baseData:{
              roleName:'',
              username:'',
          },
        currentPage: 4,   //分页
        accountStatus:'',
        entireFlowId:'', //表格的flowId
      };
    },
    components: {
        Dialog1,
        DialogVoice,
    },
    created(){
        this.baseData.roleName = sessionStorage.getItem("roleName");
        this.baseData.username = sessionStorage.getItem("username");
        console.log("roleName",this.baseData.roleName);
        console.log("username",this.baseData.username);
        this.entireLists();
        this.$root.eventHub.$on('addAcceptSave', (resp)=>{
            this.entireLists();
        });

      },
    methods: {
      handleSizeChange(val) {
          this.pageObj.pageSize=val;
          this.entireLists();
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
          this.pageObj.page=val;
          this.entireLists();
        // console.log(`当前页: ${val}`);
      },
        // 全部表格
        entireLists(){
            // console.log(this.form.time[0]);
            // console.log(this.form.time[1]);
            let dateStart = new Date(this.form.time[0]);
            let dateEnd = new Date(this.form.time[1]);
            let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate();
            let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate();
            // console.log(dateStart_value);
            // console.log(dateEnd_value);
            this.$ajax.post('/vos/business/getBusinessFlowList',{
                "type":"",
                "dateStart":this.form.time[0]==undefined?'':dateStart_value,
                "dateEnd":this.form.time[1]==undefined?'':dateEnd_value,
                "companyName":this.form.firmName,
                "status":this.accountStatus,
                "number400":this.form.phoneNum,
                "page":{
                    "pageNo":this.pageObj.page,
                    "pageSize":this.pageObj.pageSize,
                }
            }).then((res)=>{
                // console.log(res.data);
                console.log(res.data.businessFlows);
                this.tableData = res.data.businessFlows;
                this.pageObj.total = res.data.totalCount;
                this.tableData.map((item)=>{
                    // console.log("每一条的信息",item);

                    //判断操作
                    if(item.status=='Wait_To_Audit'){
                        item.status='等待送审';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assignee==this.baseData.username){
                            item.btnList.push({label:'送审'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                        // console.log("btnList",item.btnList);
                    }else if(item.status=='Audit_Success'){
                        item.status='审核通过';
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
                            item.btnList.push({label:'审核通过'},{label:'驳回'},{label:'详情'});
                        }else{
                            item.btnList.push({label:'详情'});
                        }
                    }else if(item.status=='Modify_Auditing'){
                        item.status='变更审核中';
                        item.btnList=[];
                        if(this.baseData.roleName=='ROLE_admin' || item.assigneeRole==this.baseData.roleName){
                            item.btnList.push({label:'变更审核通过'},{label:'驳回'},{label:'终止'},{label:'详情'});
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
                            item.btnList.push({label:'审核通过'},{label:'终止'},{label:'详情'});
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

                    //判断类型
                    if(item.type=='Voice'){
                        item.type='语音'
                    }else if(item.type=='Business'){
                        item.type='业务'
                    }else if(item.type=='Destnum'){
                        item.type='目的码'
                    }
                })
            })
        },
        //新增业务受理
        businessAdd(){
            sessionStorage.setItem("entrance",1);
            this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:1});
            this.$root.eventHub.$emit('clearData');
            this.$root.eventHub.$on('active', (resp)=>{
                this.active=resp;
            })
        },
        // 编辑业务受理
        businessEdit(val,objData){
          console.log(val);
          console.log(objData);
          this.entireFlowId = objData.flowId;
          console.log(this.entireFlowId);
          if(val=='送审'){
              sessionStorage.setItem("entrance",2);
              sessionStorage.setItem('entireFlowId',this.entireFlowId);
              this.getCacheData();
          }else if(val=='详情'){
              console.log('详情入口');
              this.$router.push({path:'/businessDetial',query: { flowId: objData.flowId}});
              this.getCacheData();
          }
        },
        //新增目的码按钮
        addObjCodeBtn(){
            this.$root.eventHub.$emit('dialog1Visible',{visible:true,objCodeIn:1});
        },
        //新增语音
        voiceAdd(){
          this.$root.eventHub.$emit('dialog1VisibleVoice',{visibleVoice:true,voiceIn:1});
        },
        // 状态改变
        statusChange(){
          this.entireLists();
        },
        //“全部”表格详情
        getCacheData(){
            this.$ajax.get('/vos/business/getCacheData?flowId='+this.entireFlowId).then((res)=>{
                console.log("详情",res);
                if(res.data!=null){
                    this.ChangeCompanyStatus(res.data.company);
                    console.log(this.company);
                    this.ChangeBusinessStatus(res.data.business);
                    // this.ChangeDestNumber(res.data.destNumber);
                    this.ChangeNumber400ValueAdded(res.data.number400ValueAdded);
                    this.ChangeNumber400Concession(res.data.number400Concession);
                    this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:1});
                }
            })
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
