<template>
  <div id="systemLog">
    <!--搜索-->
    <div class="logForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="searchInput">
          <el-form-item label="描述信息：">
            <el-input v-model="form.descMsg" size="mini"></el-input>
          </el-form-item>

          <el-form-item label="操作账号：">
            <el-input v-model="form.operAccount" size="mini"></el-input>
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
    <div class="LogTable">
      <div class="LogSelect">
        <div style="float:right">
          <el-form ref="LogSelectForm" :model="LogSelectForm" label-width="100px">
            <el-form-item label="操作类型：">
              <el-select v-model="accountStatus" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in operateTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="操作角色：">
              <el-select v-model="accountStatus" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in operateRoleList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div style="overflow: hidden;margin-bottom:20px;">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="operateRole"
            label="操作角色">
          </el-table-column>

          <el-table-column
            prop="operateAccount"
            label="操作账号">
          </el-table-column>

          <el-table-column
            prop="IPAddress"
            label="IP地址">
          </el-table-column>

          <el-table-column
            prop="operateTime"
            label="操作时间">
          </el-table-column>

          <el-table-column
            prop="remark"
            label="描述">
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
  </div>
</template>

<script>
  export default {
    name:'systemLog',
    data(){
      return{
        form:{
          descMsg:'',
          operAccount:'',
          time:'',
        },
        LogSelectForm:{
          operateType:'',
          operateRole:'',
        },
        operateTypeList:[   //操作类型
          {
            value:'1',
            label:'全部'
          },
          {
            value:'2',
            label:'新增'
          },
          {
            value:'3',
            label:'编辑'
          },
          {
            value:'4',
            label:'删除'
          }
        ],
        operateRoleList:[   //操作角色
          {
            value:'1',
            label:'超级管理员'
          },
          {
            value:'2',
            label:'省级管理员'
          },
          {
            value:'3',
            label:'地市管理员'
          },
          {
            value:'4',
            label:'业务员'
          },
        ],
        tableData: [{
          operateRole: '业务员',
          operateAccount: 'EV1009',
          IPAddress: '192.168.1.137',
          operateTime:'2018-11-28',
          remark:'账号hz.hanj审核企业的资料'
        }, {
          operateRole: '业务员',
          operateAccount: 'EV1009',
          IPAddress: '192.168.1.137',
          operateTime:'2018-11-28',
          remark:'账号hz.hanj审核企业的资料'
        }, {
          operateRole: '业务员',
          operateAccount: 'EV1009',
          IPAddress: '192.168.1.137',
          operateTime:'2018-11-28',
          remark:'账号hz.hanj审核企业的资料'
        }, {
          operateRole: '业务员',
          operateAccount: 'EV1009',
          IPAddress: '192.168.1.137',
          operateTime:'2018-11-28',
          remark:'账号hz.hanj审核企业的资料'
        }],
        currentPage:4,
      }
    },
    methods:{
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import './systemLog.scss';
</style>
