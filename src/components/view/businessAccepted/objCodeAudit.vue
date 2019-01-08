<template>
  <div id="objCodeAudit">
    <!--新增/编辑目的码弹窗-->
    <div class="objCodeDialog">
      <el-dialog
        :title="objCodeIn==1?'新增目的码':'编辑目的码'"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <div>
          <el-form ref="acceptForm" :rules="rules" :model="acceptForm" label-width="140px">
            <div class="objCodeMsg">

              <el-form-item label="企业名称：" class="firmName" id="firmName" prop="firmName">
                <el-input
                        v-model="acceptForm.firmName"
                        size="mini"
                        placeholder=" 营业执照上公司全称，个体工商户填写字号全称，组织机构上的机构全称" @input="searchFirm">
                </el-input>
                <div id="firmNameList" v-if="acceptForm.firmName!='' && firmNameList.length!=0 && firmNameShow">
                  <ul>
                    <li v-for="(item,index) in firmNameList" :key="index">{{item.companyName}}</li>
                  </ul>
                </div>
              </el-form-item>

              <el-form-item label="使用用途：" class="identity" prop="usage">
                <el-select v-model="acceptForm.usage" @change="change123" placeholder="请选择" size="mini">
                  <el-option :label="item.label" :value="item.value" v-for="(item,index) in usage" :key="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="目的码证明材料：" class="materials" prop="imageUrl">
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

              <el-form-item label="400号码：" class="firmName" prop="fourNum">
                <el-input
                        v-model="acceptForm.fourNum"
                        size="mini"
                        placeholder=" 请搜索400号码" @input="searchFourNum"></el-input>
                <div id="fourNumList" v-if="numShow">
                  <ul>
                    <li v-for="(item,index) in fourNumList" :key="index" @click="num400li(item)">{{item.number400}}</li>
                  </ul>
                </div>
              </el-form-item>

              <el-form-item label="目的码：">
                <div>
                  <div class="objCodeBox">
                    <el-button type="primary" size="mini" @click="addObjCodes()">+新增目的码</el-button>
                    <div v-for="(item,index) in objCodeList" :key="index">
                      <div class="addObjCode">
                        <el-input v-model="item.destnumber" size="mini"></el-input>
                        <el-button type="primary" icon="el-icon-minus" size="mini" @click="delObjCodes(index)"></el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="增值资费：">
                <div>
                  <div class="objCodeBox">
                    <span>增加目的码</span>
                    <div class="valAddSer">
                      <p>功能资费：</p>
                      <p>是否赠送：</p>
                      <p>功能备注：</p>
                    </div>
                  </div>
                </div>
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
            <el-button type="primary" size="mini" @click="objCodeLists()">搜索</el-button>
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
          <el-select v-model="accountStatus" placeholder="请选择" size="mini" @change="statusChange">
            <el-option
              v-for="item in statusOptions"
              :key="item.dicKey"
              :label="item.dicValue"
              :value="item.dicKey">
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
          width="200">
        </el-table-column>

        <el-table-column
          prop="business.number400"
          label="400电话">
        </el-table-column>

        <el-table-column
          prop="assignee"
          label="受理人">
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
            <el-button size="mini" type="text" @click="objCodeIn=2,addObjCodeSave()">编辑</el-button>
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

  export default {
    name: 'objCodeAudit',
    data() {
      return {
        firmNameShow:false,
        numShow:false,
        dialogVisible:false, //新增、编辑目的码弹窗显示状态
        objCodeIn:1,
        form:{
          firmName:'',
          time:'',
        },
        acceptForm:{
          firmName:'',
          usage:'',
          imageUrl: '',    //上传图片
          fourNum:'',
          desc:'',
          objCount:1,     //目的码数量
          delObjCode:'',  //删减目的码
        },
          rules:{
              firmName: [
                  { required: true, message: '请输入企业名称', trigger: 'change' }
              ],
          },
        tableData: [],
        statusOptions: [],
        usage:[   //证件类型
          {
            value: 'DestNum_Auditing',
            label: '审核中'
          }, {
            value: 'Audit_Success',
            label: '审核通过'
          }, {
            value: 'Wait_To_Audit',
            label: '等待送审'
          }
        ],
        objCodeList:[{}], //目的码数组
        firmNameList:[],  //公司名称数组
        fourNumList:[],   //400号码列表
        currentPage: 1,   //当前页
        accountStatus:'',
        addObjCode:'',  //添加目的码
        pageObj:{
            total:0,
            page:1,
            pageSize:10,
          }
      };
    },
    components: {},
      created(){
        this.objCodeLists();
        this.statusList();
      },
    methods: {
      // 分页
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
        //新增目的码

        s(){
          let unit = {};
          this.objCodeList.push(unit);
        },
        // 删除目的码
        delObjCodes(index){
          console.log(index);
          this.objCodeList.splice(index,1);
        },
      //点击详情
      details(scope){
        console.log(scope);
      },
        // 企业模糊搜索
        searchFirm(val){
          console.log(val);
          this.$ajax.get('/vos/company/fuzzySearch?company='+this.acceptForm.firmName).then((res)=>{
              console.log(res.data);
              this.firmNameList = res.data;
          })
        },
        //400号码搜索
        searchFourNum(){
            this.$ajax.post('/vos/num400config/search',{
                "page":{
                "pageNo":"1",
                    "pageSize":"50"
            },
                "number400":{
                "number400":this.acceptForm.fourNum,
            }
            }).then((res)=>{
                console.log(res.data.number400s);
                this.fourNumList = res.data.number400s;
                if(this.acceptForm.fourNum!='' && this.fourNumList.length!=0){
                    this.numShow = true;
                }
            })
        },
        //400号码li
        num400li(val){
          console.log(val);
            this.numShow = false;
            this.acceptForm.fourNum = val.number400;
            if(this.acceptForm.fourNum!=''){
                this.searchObjCode();
            }

        },
        //目的码
        searchObjCode(){
          this.$ajax.get('/vos/destnum/getDestNumbersToModify?number400='+this.acceptForm.fourNum).then((res)=>{
              console.log(res.data.destNumber);
              this.objCodeList = res.data.destNumber;
          })
        },
        // 目的码列表
        objCodeLists(){
            console.log(this.form.time[0]);
            console.log(this.form.time[1]);
          let dateStart = new Date(this.form.time[0]);
          let dateEnd = new Date(this.form.time[1]);
            let dateStart_value=dateStart.getFullYear() + '-' + (dateStart.getMonth() + 1) + '-' + dateStart.getDate();
            let dateEnd_value=dateEnd.getFullYear() + '-' + (dateEnd.getMonth() + 1) + '-' + dateEnd.getDate();
            console.log(dateStart_value);
            console.log(dateEnd_value);
            this.$ajax.post('/vos/business/getBusinessFlowList',{
              "type":"Destnum",
              "dateStart":this.form.time[0]==undefined?'':dateStart_value,
              "dateEnd":this.form.time[1]==undefined?'':dateEnd_value,
              "companyName":this.form.firmName,
              "status":this.accountStatus,
              "number400":this.acceptForm.fourNum,
              "page":{
                  "pageNo":this.pageObj.page,
                  "pageSize":this.pageObj.pageSize,
              }
          }).then((res)=>{
              console.log(res.data.businessFlows);
              this.tableData = res.data.businessFlows;
              this.tableData.map((item)=>{
                  if(item.status=='Wait_To_Audit'){
                      item.status='等待送审'
                  }else if(item.status=='Audit_Success'){
                      item.status='审核通过'
                  }else if(item.status=='DestNum_Auditing'){
                      item.status='审核中'
                  }
              })
          })
        },
        statusList(){
          this.$ajax.post('/vos/dic/getDicsByType',{
              "dicType":"flowType",
              "status":this.accountStatus,
          }).then((res)=>{
              console.log(res.data);
              console.log(res.data.dicList);
              console.log(res.data.totalCount);
              this.statusOptions = res.data.dicList;
              this.pageObj.total = res.data.totalCount;
              console.log(this.pageObj.total);
          })
        },
        statusChange(val){
          this.statusList();
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
    width:128px;
    font-size: 28px;
    color: #8c939d;
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
