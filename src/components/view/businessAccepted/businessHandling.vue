<template>
  <div id="businessHandling">
    <!--搜索-->
    <div class="handlingForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="searchInput">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="受理人：">
            <el-input v-model="form.receiver" size="mini"></el-input>
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
            <el-button size="mini" type="text">详情</el-button>
            <!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
            <el-button size="mini" type="text">撤回</el-button>
            <el-button size="mini" type="text">变更</el-button>
            <el-button size="mini" type="text">注销</el-button>
            <el-button size="mini" type="text">通过审核</el-button>
            <el-button size="mini" type="text">驳回</el-button>
            <el-button size="mini" type="text" @click="businessIn=2,acceptSave()">编辑</el-button>
            <!--</router-link>-->
            <el-button size="mini" type="text">送审</el-button>
            <el-button size="mini" type="text">删除</el-button>
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

  // import stepOne from './stepOne';
  // import stepTwo from './stepTwo';
  // import stepThree from './stepThree';
  // import stepFour from './stepFour';
  import addAcceptDialog from './addAcceptDialog';

  export default {
    name: 'businessHandling',
      components: {
          // stepOne,
          // stepTwo,
          // stepThree,
          // stepFour,
          addAcceptDialog
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
      };
    },
    created(){
        this.businessLists();
        this.$root.eventHub.$on('getLoginInfo', (resp)=>{
            console.log(resp);
            this.loginResp = resp;
        })
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
        //新增业务受理
        businessAdd(){
            this.$root.eventHub.$emit('dialogVisibleBusiness',{visibleBusiness:true,businessIn:1});
        },

        // step(val){
        //   console.log(val);
        //   this.active = val;
        //   this.actives = val;
        // },
      // rankType(item){
      //   console.log("12343",item)
      //   // this.identityTypeList.map((items)=> {
      //   //   if (item.identityType == items.value) {
      //   //     item.identityType = items.label;
      //   //   }
      //   // })
      // },
      //新增/编辑受理
      // acceptSave(){
      //   this.dialogVisible = true;
      // },

        // 业务受理表格
        businessLists(){
            // console.log(this.form.time[0]);
            // console.log(this.form.time[1]);
            let dateStart = new Date(this.form.time[0]);
            let dateEnd = new Date(this.form.time[1]);
            let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate();
            let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate();
            // console.log(dateStart_value);
            // console.log(dateEnd_value);
            this.$ajax.post('/vos/business/getBusinessFlowList',{
                "type":"Business",
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
                console.log(res.data.businessFlows);
                this.tableData = res.data.businessFlows;
                this.pageObj.total = res.data.totalCount;
                this.tableData.map((item)=>{
                    if(item.status=='Wait_To_Audit'){
                        item.status='等待送审'
                    }else if(item.status=='Audit_Success'){
                        item.status='审核通过'
                    }else if(item.status=='Business_Auditing'){
                        item.status='审核中'
                    }else if(item.status=='Modify_Auditing'){
                        item.status='变更审核中'
                    }else if(item.status=='Modify_Rejected'){
                        item.status='变更审核驳回'
                    }else if(item.status=='Canceling_Auditing'){
                        item.status='注销审核'
                    }else if(item.status=='Cancelled'){
                        item.status='已注销'
                    }else if(item.status=='Terminate_Flow'){
                        item.status='受理终止'
                    }
                })
            })
        },
        statusChange(){
            this.businessLists();
        },
    },

    computed: {
    }
  }
</script>
<style lang="scss" scoped>
  @import './400businessManage.scss';
</style>
