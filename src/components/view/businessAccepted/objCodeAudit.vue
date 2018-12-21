<template>
  <div id="objCodeAudit">
    <!--新增/编辑目的码弹窗-->
    <div class="objCodeDialog">
      <el-dialog
        title="新增用户"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <div>
          <el-form ref="acceptForm" :model="acceptForm" label-width="140px">
            <div class="objCodeMsg">

              <el-form-item label="企业名称：" class="firmName">
                <el-input v-model="acceptForm.firmName" size="mini" placeholder=" 营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称"></el-input>
              </el-form-item>

              <el-form-item label="使用用途：" class="identity">
                <el-select v-model="acceptForm.usage" @change="change123" placeholder="请选择" size="mini">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in usage" :key="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="目的码证明材料：" class="materials">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="acceptForm.imageUrl" :src="acceptForm.imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div class="uploadTips"><p>说明：目的码证明材料可以是缴费材料，也可以是自助平台相关截图</p></div>
              </el-form-item>

              <el-form-item label="目的码：">
                <el-table :cell-placeholder="cellStyle"
                  :data="objCodeTable"
                  border
                  style="width: 100%">

                  <el-table-column
                    prop="number"
                    label="400号码">
                  </el-table-column>

                  <el-table-column
                    prop="objCode"
                    label='目的码 (填入目的码，多个请用","隔开)'>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini">暂存信息</el-button>
            <el-button type="primary" @click="dialogVisible = false" size="mini">送 审</el-button>
        </span>
      </el-dialog>
    </div>
    <!--搜索-->
    <div class="handlingForm">
      <el-form ref="form" :model="form" label-width="100px">
        <div class="objCodeSearch">
          <el-form-item label="企业名称：">
            <el-input v-model="form.firmName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
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
          <el-button type="primary" size="mini" @click="addObjCodeSave()">+新增目的码</el-button>
        </div>
        <div class="accountSelect">
          <span style="font-size:12px">状态:</span>
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
          width="200">
        </el-table-column>

        <el-table-column
          prop="fourPhone"
          label="400电话">
        </el-table-column>

        <el-table-column
          prop="receiver"
          label="受理人">
        </el-table-column>

        <el-table-column
          prop="use"
          label="用途">
        </el-table-column>

        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>

        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="details(scope.row),$router.push('/objCodeDetail/')">详情</el-button>
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

  export default {
    name: 'objCodeAudit',
    data() {
      return {
        dialogVisible:false, //新增、编辑目的码弹窗显示状态
        form:{
          firmName:'',
          time:'',
        },
        acceptForm:{
          firmName:'',
          usage:'',
          imageUrl: '',    //上传图片
        },
        tableData: [{
          id:1,
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          receiver:'华勇',
          use:'办公',
          createTime:'2018-12-19',
          status:'等待送核',
        },{
          id:2,
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          receiver:'华勇',
          use:'办公',
          createTime:'2018-12-19',
          status:'等待送核',
        },{
          id:3,
          firmName: '杭州顺网科技股份有限公司',
          fourPhone: '5876552',
          receiver:'华勇',
          use:'办公',
          createTime:'2018-12-19',
          status:'等待送核',
        }],
        objCodeTable:[{
          number: '234567',
          objCode: '',
      }],
        statusOptions: [
          {
            value: '1',
            label: '全部'
          }, {
            value:'2',
            label:'等待审核'
          },{
            value: '3',
            label: '待审核'
          }, {
            value: '4',
            label: '审核通过'
          },
          {
            value: '5',
            label: '被驳回'
          }
        ],
        usage:[   //证件类型
          {
            value: '1',
            label: '办公'
          }, {
            value: '2',
            label: '外呼'
          }, {
            value: '3',
            label: '其他'
          }
        ],
        currentPage: 4,   //分页
        accountStatus:'',

      };
    },
    components: {},
    methods: {
      // 分页
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
      //新增目的码
      addObjCodeSave(){
        this.dialogVisible = true;
      },
      change123(event) {
        console.log("event",event);
      },
      // 给单元格加placeholder
      cellStyle(row, column, rowIndex, columnIndex){
        if(columnIndex==1 && rowIndex==1){
          return '填入目的码，多个请用","隔开'
        }else{
          return ''
        }
      },
      // 图片上传
      handleAvatarSuccess(res, file) {
        this.acceptForm.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //点击详情
      details(scope){
        console.log(scope);
      }
    },
    computed: {
    }
  }
</script>
<style>
  /*图片上传--start*/
  .avatar-uploader{
    text-align: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /*图片上传--end*/
</style>
<style lang="scss" scoped>
  @import './400businessManage.scss';
</style>
