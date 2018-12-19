<template>
  <div id="selfHelp">
    <!--添加用户弹窗-->
    <div class="addUserDialog">
      <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">
        <div>
          <el-form ref="addTopForm" :model="addTopForm" label-width="100px">
            <div class="accountMessage">
              <p>账户信息</p>
              <el-form-item label="登陆账号：">
                <el-input v-model="addTopForm.loginId" size="mini"></el-input>
              </el-form-item>
              <el-form-item label="角色：">
                <el-select v-model="addTopForm.role" size="mini" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：">
                <el-radio v-model="addTopForm.status" label="1">启用</el-radio>
                <el-radio v-model="addTopForm.status" label="2">停用</el-radio>
              </el-form-item>
            </div>
            <div class="accountMessage">
              <p>用户资料</p>

              <div style="width: 100%;overflow: hidden">
                <el-form-item label="用户名称：">
                  <el-input v-model="addTopForm.userName" size="mini"></el-input>
                </el-form-item>
              </div>

              <el-form-item label="性别：">
                <el-radio v-model="addTopForm.sex" label="1">男</el-radio>
                <el-radio v-model="addTopForm.sex" label="2">女</el-radio>
              </el-form-item>

              <el-form-item label="手机号：">
                <el-input v-model="addTopForm.phoneNum" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="归属地区：" class="homeLocation">
                <el-select v-model="addTopForm.province" placeholder="请选择省份" size="mini">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in provinceList" :key="index"></el-option>
                </el-select>
                <el-select v-model="addTopForm.city" placeholder="请选择市" size="mini">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in cityList" :key="index"></el-option>
                </el-select>
                <el-select v-model="addTopForm.district" placeholder="请选择区/镇/县" size="mini">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in districtList" :key="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="身份证号：">
                <el-input v-model="addTopForm.IDNo" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="邮箱：">
                <el-input v-model="addTopForm.mailbox" size="mini"></el-input>
              </el-form-item>

              <el-form-item label="备注：" class="addUserRemark">
                <el-input type="textarea" v-model="addTopForm.remark"></el-input>
              </el-form-item>

            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>


    <!--搜索表单-->
    <div class="numForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="searchInput">
          <el-form-item label="账号搜索：">
            <el-input v-model="form.fourNumber" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input v-model="form.pilotNumber" size="mini"></el-input>
          </el-form-item>
          <el-form-item class="searchBtn">
            <el-button type="primary" size="mini">搜索</el-button>
            <el-button @click="resetForm('form')" size="mini">重置</el-button>
          </el-form-item>
        </div>
        <!--角色按钮-->
        <div>
          <el-form-item label="选择角色：">
            <el-button type="primary" size="mini">全部</el-button>
            <el-button size="mini">运营人员</el-button>
            <el-button size="mini">省级管理员</el-button>
            <el-button size="mini">代理/直销渠道</el-button>
            <el-button size="mini">前台用户</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--表格-->
    <div class="accountTable">
      <!--表格按钮和下拉框-->
      <div class="BtnSelect">
        <div class="accountBtn">
          <el-button type="primary" size="mini" @click="addUser()">+新增用户</el-button>
          <el-button size="mini">批量修改密码</el-button>
          <el-button size="mini">启用</el-button>
          <el-button size="mini">停用</el-button>
          <el-button size="mini">删除</el-button>
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
        </div>
      </div>
      <!--表格-->
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">

        <el-table-column
          type="selection">
        </el-table-column>

        <el-table-column
          prop="account"
          label="账号">
        </el-table-column>

        <el-table-column
          prop="role"
          label="角色">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="用户名称"
        >
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态"
        >
        </el-table-column>

        <el-table-column
          prop="recordDate"
          label="注册日期"
        >
        </el-table-column>

        <el-table-column
          prop="lastLog"
          label="最近登录"
        >
        </el-table-column>

        <el-table-column
          prop="address"
          label="操作"
        >
          <template slot-scope="scope">
            <!--<router-link :to="{path:'/addEvent/'+3+'/'+scope.row.contactEvtId}">-->
            <el-button size="mini" type="text">详情</el-button>
            <!--</router-link>-->
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
  export default {
    name: 'accountManage',
    data() {
      return {
        dialogVisible: false, //新增用户弹窗
        form: {
          fourNumber: '',
          pilotNumber: '',
          enterNumber: '',
        },
        addTopForm:{
          loginId:'',
          role:'',
          userName:'',
          phoneNum:'',
          sex:1,
          status:1,
          province:'', //省
          city:'',     //市
          district:'', //区
          IDNo:'',     //身份证号
          mailbox:'',  //邮箱
          remark:'',   //备注
        },
        provinceList:[
          {
            value:'1',
            label:'广东省'
          },
          {
            value:'1',
            label:'浙江省'
          }
        ], //省列表
        cityList:[
          {
            value:'1',
            label:'中山市'
          },
          {
            value:'1',
            label:'杭州市'
          }
        ],     //市列表
        districtList:[
          {
            value:'1',
            label:'小榄镇'
          },
          {
            value:'1',
            label:'滨江区'
          }
        ],     //区列表
        statusOptions: [
          {
            value: '1',
            label: '全部'
          }, {
            value: '2',
            label: '启用'
          }, {
            value: '3',
            label: '停用'
          }
        ],
        accountStatus: '',  //下拉框类型
        tableData3: [{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        },{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        },{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        },{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        },{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        },{
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        }, {
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        }, {
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        }, {
          account: '20160503',
          role: '管理员',
          userName: '王小虎',
          status: '启用',
          recordDate: '2018-11-28',
          lastLog: '前天'
        }],
        multipleSelection: [], //选择复选框的信息数组
        currentPage: 4,   //分页
        radio: '1',  //单选按钮
      }
    },
    methods: {
      //重置
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      //点击复选框调用的方法
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 新增用户
      addUser() {
        this.dialogVisible = true;
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
    }
  }
</script>

<style lang="scss" scoped>
  @import './accountManage.scss';
</style>
