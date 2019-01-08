<template>
  <div id="businessHandling">
    <!--新增/编辑受理弹窗-->
    <div class="addAcceptDialog">
      <el-dialog
        :title="businessIn==1?'新增受理':'编辑受理'"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <div>
          <div class="steps">
          <el-steps  :active="actives" align-center>
            <el-step title="选择/新增企业基本信息"></el-step>
            <el-step title="上传企业资料"></el-step>
            <el-step title="填写业务资料"></el-step>
            <el-step title="上传相关文件"></el-step>
          </el-steps>
          </div>
          <step-one v-if="active==1" @childNext="step"></step-one>
          <step-two v-if="active==2" @childNext="step"></step-two>
          <step-three v-if="active==3" @childNext="step"></step-three>
          <step-four v-if="active==4" @childNext="step"></step-four>
        </div>
      </el-dialog>
    </div>
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
          <el-button type="primary" size="mini" @click="acceptSave()">+新增受理</el-button>
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

  import stepOne from './stepOne';
  import stepTwo from './stepTwo';
  import stepThree from './stepThree';
  import stepFour from './stepFour';
  import addAcceptDialog from './addAcceptDialog';

  export default {
    name: 'businessHandling',
      components: {
          stepOne,
          stepTwo,
          stepThree,
          stepFour,
          addAcceptDialog
      },
    data() {
      return {
        dialogVisible:false,
        businessIn:1,
        active:1,
        actives:1,
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
      };
    },
    created(){
        this.businessLists();
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

        step(val){
          console.log(val);
          this.active = val;
          this.actives = val;
        },
      // rankType(item){
      //   console.log("12343",item)
      //   // this.identityTypeList.map((items)=> {
      //   //   if (item.identityType == items.value) {
      //   //     item.identityType = items.label;
      //   //   }
      //   // })
      // },
      //新增/编辑受理
      acceptSave(){
        this.dialogVisible = true;
      },

        // 业务受理表格
        businessLists(){
            console.log(this.form.time[0]);
            console.log(this.form.time[1]);
            let dateStart = new Date(this.form.time[0]);
            let dateEnd = new Date(this.form.time[1]);
            let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate();
            let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate();
            console.log(dateStart_value);
            console.log(dateEnd_value);
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

        // 新增业务保存
        addBusinessSave(){
          this.dialogVisible = false;
            this.$ajax.post('/vos/business/startAndSave', {
                "company":{
                    "id":64,
                    "companyCardType":"business_license",   //企业类型
                    "companyName":"高通"                    //企业名字
                },
                "business":{
                    "number400":"400142520651",
                    "companyId":64,
                    "needCompanySave":false,
                    "tariffPackageId":1,
                    "authorizationPic":"xxxaadff.png",
                    "tariffName":"400商务热线300套餐",
                    "type":1,
                    "packageRules":"1200元套餐",
                    "basicFunctionFee":0,
                    "units":12,
                    "amount":2,
                    "bottomFee":1200,
                    "durationPresentation":9000,
                    "excessTariff":0,
                    "packageContent":"套餐内免费通话95000分钟，超出部分按照0.1元/分钟收费",
                    "channel":"channel"

                },
                "number400ValueAdded":[{
                    "number400":"100009",
                    "valueAddedName":"来电显示1",
                    "amount":2,
                    "valueAddedId":1,
                    "presents":1,
                    "remarks":"查看详情",
                    "valueAddedFee":10,
                    "units":"元/月"

                },{
                    "number400":"100009",
                    "valueAddedName":"彩铃制作",
                    "amount":3,
                    "valueAddedId":4,
                    "presents":2,
                    "remarks":"客户拨打400电话，听到一段语音”您好，欢迎致电话我公司，我们将竭诚为您服务，电话接通中，请稍后",
                    "valueAddedFee":10,
                    "units":"首"

                }],
                "number400Concession":[{
                    "number400":"100009",
                    "concessionName":"套餐价格优惠222",
                    "concessionWay":2,
                    "packageDeals":100,
                    "availableTime":1000,
                    "channel":"channel",
                    "amount":1,
                    "units":"year"

                }
                ],
                "companyFlow":{
                    "flowId":""
                }
            }).then((res)=>{

            })
        }


    },

    computed: {
    }
  }
</script>
<style lang="scss" scoped>
  @import './400businessManage.scss';
</style>
