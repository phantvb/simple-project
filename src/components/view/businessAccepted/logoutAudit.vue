<template>
  <div id="logoutAudit">
    <!--搜索-->
    <div class="handlingForm">
      <el-form ref="form" :model="form" label-width="115px">
        <div class="searchInput">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="法人：">
            <el-input v-model="form.legal" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="企业联系电话：">
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
          prop="firmName"
          label="企业名称"
          width="300">
        </el-table-column>

        <el-table-column
          prop="fourPhone"
          label="企业联系电话">
        </el-table-column>

        <el-table-column
          prop="legal"
          label="法人">
        </el-table-column>

        <el-table-column
          prop="responsible"
          label="经办人">
        </el-table-column>

        <el-table-column
          prop="data"
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
            <el-button size="mini" type="text" entrance="1" @click="details(scope.row),$router.push('/logoutDetail/')">详情</el-button>
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
      :page-sizes="[10, 20, 50, 100]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageObj.total">
    </el-pagination>
  </div>
</template>
<script>

  export default {
    name: 'logoutAudit',
    data() {
      return {
        form:{
          firmName:'',
          phoneNum:'',
          time:'',
          legal:'',
        },
        acceptForm:{
          firmName:'',
          identityType:'',
        },
        tableData: [{
          responsible: '谢辉',
          legal:'华勇',
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          date:'2018-11-28',
          status:'等待送核',
          data:'2018-11-28',
        }, {
            responsible: '谢辉',
            legal:'华勇',
            firmName: '杭州顺网科技股份有限公司',
            fourPhone: '5876552',
            date:'2018-11-28',
            status:'等待送核',
            data:'2018-11-28',
        }, {
            responsible: '谢辉',
            legal:'华勇',
            firmName: '杭州顺网科技股份有限公司',
            fourPhone: '5876552',
            date:'2018-11-28',
            status:'等待送核',
            data:'2018-11-28',
        }, {
            responsible: '谢辉',
            legal:'华勇',
            firmName: '杭州顺网科技股份有限公司',
            fourPhone: '5876552',
            date:'2018-11-28',
            status:'等待送核',
            data:'2018-11-28',
        }],
        statusOptions: [
          {
            value: '1',
            label: '变更审核'
          }, {
            value: '2',
            label: '变更审核驳回'
          }, {
            value: '3',
            label: '受理终止'
          }
        ],
        identityTypeList:[   //证件类型
          {
            value: '1',
            label: '营业执照'
          }, {
            value: '2',
            label: '组织机构代码证'
          }, {
            value: '3',
            label: '三证合一'
          }
        ],
        accountStatus:'',
          pageObj:{
              total:0,
              page:1,
              pageSize:10,
          },
        currentPage: 4,   //分页
      };
    },
    created(){
      this.acceptForm.identityType=this.identityTypeList[0].value
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // rankType(item){
      //   console.log("12343",item)
      //   // this.identityTypeList.map((items)=> {
      //   //   if (item.identityType == items.value) {
      //   //     item.identityType = items.label;
      //   //   }
      //   // })
      // },
        //点击详情
        details(scope){
            console.log(scope);
        }
    },
    components: {},
    computed: {
    }
  }
</script>
<style lang="scss" scoped>
  @import './400businessManage.scss';
</style>
