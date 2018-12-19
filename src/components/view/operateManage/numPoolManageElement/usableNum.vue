<template>
  <div id="usableNum">
    <div class="search">
      <el-form ref="usableNumForm" :model="usableNumForm">
        <el-form-item style="float: left;margin-left: 10px;">
          <el-input v-model="usableNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
            <template slot="prepend" style="width:80px;">400号码：</template>
          </el-input>
        </el-form-item>

        <el-form-item label="可见渠道：" style=" clear: both;margin-left: 15px;">
          <el-checkbox-group v-model="checkList" style="float: left;margin-left: 15px">
            <el-checkbox label="自助直销"></el-checkbox>
            <el-checkbox label="渠道"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item style="margin-left: 15px;">
          <el-button type="primary" size="mini" class="searchButton" @click="search">搜索</el-button>
          <el-button type="primary" plain size="mini" class="resetButton" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="buttonDiv">
      <div style="float: left;">
        <el-button type="primary" size="mini" @click="addNum"><i class="el-icon-plus">&nbsp;新增400号码</i></el-button>
        <el-button type="primary" plain size="mini" @click="deleteInfo">删除</el-button>
      </div>
      <div style="float: right;">
        <el-button type="primary" plain size="mini" @click="importInfo">批量导入</el-button>
        <el-button type="primary" plain size="mini" @click="exportInfo">导出</el-button>
      </div>
    </div>

    <div>
      <el-table
        :data="messageData"
        style="width: 100%;margin-bottom:15px;">
        <el-table-column
          type="selection"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="number"
          label="400号码"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="channel"
          label="可见渠道"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="combo"
          label="关联套餐"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-pagination
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.num"
          :page-sizes="$global.pageSize"
          :page-size="page.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>

    <div>
      <el-dialog
        title="新增/编辑400号码"
        :visible.sync="addNumberFormDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form ref="addNumberForm" :model="addNumberForm" label-width="100px">
            <el-form-item label="400号码：">
              <el-input v-model="addNumberForm.number" size="mini" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="可见渠道：">
              <el-checkbox-group v-model="addNumberForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item label="关联套餐：">
              <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="本地网直销" name="first">
                  <el-radio-group v-model="radio1" style="float: left;margin-left: 15px;">
                    <el-radio :label="1">400商务热线1200套餐</el-radio>
                    <br/>
                    <el-radio :label="2">400商务热线3000套餐</el-radio>
                    <br/>
                    <el-radio :label="3">400商务热线6000套餐</el-radio>
                    <br/>
                    <el-radio :label="4">400商务热线9000套餐</el-radio>
                    <br/>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane label="自助直销" name="second">
                  <el-radio-group v-model="radio2" style="float: left;margin-left: 15px;">
                    <el-radio :label="1">400商务热线1200套餐</el-radio>
                    <br/>
                    <el-radio :label="2">400商务热线3000套餐</el-radio>
                    <br/>
                    <el-radio :label="3">400商务热线6000套餐</el-radio>
                    <br/>
                    <el-radio :label="4">400商务热线9000套餐</el-radio>
                    <br/>
                  </el-radio-group>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="addNumberFormDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addNumberFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>

    <div>
      <el-dialog
        title="400号码导入校验"
        :visible.sync="importNumberFormDialogVisible"
        width="40%"
        :before-close="handleClose">
        <div>
          <el-form ref="addNumberForm" :model="importNumberForm" label-width="150px">
            <el-form-item label="校验比对结果：">
              <span style="float: left;">可导入号码{{importNumberForm.totalNum}}个，有{{importNumberForm.errorNum}}个号码有误</span>
            </el-form-item>
            <el-form-item label="有误号码列表：">
              <el-table
                :data="importNumberForm.tableData"
                border
                style="width: 100%">
                <el-table-column
                  prop="number"
                  label="400号码"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="channel"
                  label="可见渠道"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="combo"
                  label="关联套餐"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="error"
                  label="错误">
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="importNumberFormDialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="importNumberFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        addNumberFormDialogVisible: false,
        importNumberFormDialogVisible: false,
        activeName: 'first',
        radio1: 1,
        radio2: 1,
        usableNumForm: {
          number: ''
        },
        messageData: [],
        page: {
          num: 1,
          size: 10,
          total: 1
        },
        checkList: ['自助直销', '渠道'],
        addNumberForm: {
          number: '',
          checkList: ['自助直销', '渠道']
        },
        importNumberForm: {
          totalNum: '2',
          errorNum: '1',
          tableData: [
            {
              number: '400123',
              channel: '自助直销',
              combo: '400商务热线6000套餐',
              error: '400号码有误'
            }
          ]
        }
      }
    },
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      search() {

      },
      reset() {

      },
      addNum() {
        this.addNumberFormDialogVisible = true;
      },
      deleteInfo() {

      },
      importInfo() {
        this.importNumberFormDialogVisible = true;
      },
      exportInfo() {

      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./usableNum";
</style>
