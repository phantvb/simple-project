<template>
  <div id="citationNum">
    <div class="search">
      <el-form ref="citationNumForm" :model="citationNumForm">
        <el-form-item style="float: left;margin-left: 10px;">
          <el-input v-model="citationNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
            <template slot="prepend" style="width:80px;">400号码：</template>
          </el-input>
          <div style="display: inline-block; margin-left: 15px;">
            <span>状态：</span>
            <el-select v-model="value1" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div style="display: inline-block; margin-left: 15px;">
            <span>所在线路：</span>
            <el-select v-model="value2" placeholder="请选择" size="mini">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="使用渠道：" style="clear: both;margin-left: 15px;">
          <el-checkbox-group v-model="checkList" style=" float: left;margin-left: 15px">
            <el-checkbox label="本地网直销"></el-checkbox>
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
        <el-button type="primary" size="mini"><i class="el-icon-plus" @click="addCitationNum">&nbsp;新增引示号码</i>
        </el-button>
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
          label="使用渠道"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="citation"
          label="引示号码"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="line"
          label="所在线路"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
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
        title="新增/编辑引示号码"
        :visible.sync="addCitationNumberFormDialogVisible"
        width="30%"
        :before-close="handleClose">
        <div>
          <el-form ref="addCitationNumberForm" :model="addCitationNumberForm" label-width="100px">
            <el-form-item label="引示号码：">
              <el-input v-model="addCitationNumberForm.number" size="mini" class="el-input"></el-input>
            </el-form-item>

            <el-form-item label="所在线路：">
              <el-select v-model="addCitationNumberForm.value" placeholder="请选择" size="mini" style="float: left;">
                <el-option
                  v-for="item in addCitationNumberForm.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="使用渠道：">
              <el-checkbox-group v-model="addCitationNumberForm.checkList">
                <el-checkbox label="自助直销" class="el-checkbox"></el-checkbox>
                <el-checkbox label="渠道"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>

          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="addCitationNumberFormDialogVisible = false" size="mini">取 消</el-button>
      <el-button type="primary" @click="addCitationNumberFormDialogVisible = false" size="mini">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        addCitationNumberFormDialogVisible: false,
        citationNumForm: {
          number: ''
        },
        messageData: [],
        page: {
          num: 1,
          size: 10,
          total: 1
        },
        checkList: ['本地网直销', '自助直销', '渠道'],
        options1: [{
          value: '选项1',
          label: '已绑定'
        }, {
          value: '选项2',
          label: '未绑定'
        }],
        value1: '',
        options2: [{
          value: '选项1',
          label: '杭电'
        }, {
          value: '选项2',
          label: '西湖'
        }],
        value2: '',
        addCitationNumberForm: {
          number: '',
          options: [{
            value: '选项1',
            label: '杭电'
          }, {
            value: '选项2',
            label: '西湖'
          }],
          value: '',
          checkList: ['自助直销', '渠道']
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
      addCitationNum() {
        this.addCitationNumberFormDialogVisible = true;
      },
      deleteInfo() {

      },
      importInfo() {

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
  @import "./citationNum";
</style>
