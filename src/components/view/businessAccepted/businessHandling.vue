<template>
  <div id="businessHandling">
    <!--新增/编辑受理弹窗-->
    <div class="addAcceptDialog">
      <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <div>
          <div class="steps">
          <el-steps  :active="1" align-center>
            <el-step title="选择/新增企业基本信息"></el-step>
            <el-step title="上传企业资料"></el-step>
            <el-step title="填写业务资料"></el-step>
            <el-step title="上传相关文件"></el-step>
          </el-steps>
          </div>
          <step-one v-if="active==1" @next="step"></step-one>
          <step-two v-if="active==2" @next="step"></step-two>
          <step-three v-if="active==3" @next="step"></step-three>
          <step-four v-if="active==4" @next="step"></step-four>

        </div>
        <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button @click="dialogVisible = false" size="mini">取 消</el-button>-->
            <!--<el-button type="primary" @click="addBusinessSave()" size="mini">确 定</el-button>-->
        <!--</span>-->
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
          <el-select v-model="accountStatus" placeholder="请选择" size="mini">
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
          prop="firmName"
          label="企业名称"
          width="300">
        </el-table-column>

        <el-table-column
          prop="fourPhone"
          label="400电话">
        </el-table-column>

        <el-table-column
          prop="date"
          label="日期">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>

        <el-table-column
          prop="status"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text">详情</el-button>
            <!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
            <el-button size="mini" type="text">撤回</el-button>
            <el-button size="mini" type="text">变更</el-button>
            <el-button size="mini" type="text">注销</el-button>
            <el-button size="mini" type="text">通过审核</el-button>
            <el-button size="mini" type="text">驳回</el-button>
            <el-button size="mini" type="text">编辑</el-button>
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
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
<script>

  import stepOne from './stepOne';
  import stepTwo from './stepTwo';
  import stepThree from './stepThree';
  import stepFour from './stepFour';

  export default {
    name: 'businessHandling',
      components: {
          stepOne,
          stepTwo,
          stepThree,
          stepFour
      },
    data() {
      return {
        dialogVisible:false,
        active:3,
        form:{
          firmName:'',
          phoneNum:'',
          time:'',
          receiver:'',
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
        tableData: [{
          type: '业务受理',
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          date:'2018-11-28',
          status:'等待送核'
        }, {
          type: '业务受理',
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          date:'2018-11-28',
          status:'等待送核'
        }, {
          type: '业务受理',
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          date:'2018-11-28',
          status:'等待送核'
        }, {
          type: '业务受理',
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          date:'2018-11-28',
          status:'等待送核'
        }],
        statusOptions: [
          {
            value: '1',
            label: '等待审核'
          }, {
            value: '2',
            label: '待审核'
          }, {
            value: '3',
            label: '审核通过'
          },
          {
            value: '4',
            label: '被驳回'
          }
        ],

        accountStatus:'',
        currentPage: 4,   //分页
      };
    },
    created(){

    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
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
