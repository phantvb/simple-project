<template>
  <div id="noticeManage">
    <header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <el-tabs>
      <div class="search" style="margin-top: 15px">
        <ul>
          <li>
            <el-input v-model="form.content" placeholder="请输入内容" size="mini">
              <template slot="prepend" style="width:80px;">标题内容：</template>
            </el-input>
          </li>
          <li>
            <el-input v-model="form.person" placeholder="请输入内容" size="mini">
              <template slot="prepend">发布人：</template>
            </el-input>
          </li>
        </ul>
        <div class="block left">
          <span class="demonstration">提交日期：</span>
          <el-date-picker
            style="margin-right:15px;"
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini">
          </el-date-picker>
          <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
          <el-button type="primary" plain size="mini" style="width:80px;" @click="resetForm">重置</el-button>
        </div>
      </div>
      <section class="title left">
        <el-button type="primary" size="mini" @click="dialogVisible = true">新增公告</el-button>
        <el-button type="primary" plain size="mini" @click="deleteNotice">删除</el-button>
      </section>
      <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="title"
            label="公告标题"
            width="600">
          </el-table-column>
          <el-table-column
            prop="person"
            label="发布人"
            width="400">
          </el-table-column>
          <el-table-column
            prop="date"
            label="发布时间"
            width="300">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDetails(scope.$index, scope.row)">详情
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleStick(scope.$index, scope.row)">置顶
              </el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <div>
        <el-dialog
          title="新增/编辑公告"
          :visible.sync="dialogVisible"
          width="40%">
          <el-form>
            <el-form-item label="公告标题">
              <el-input v-model="title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容">
            </el-form-item>
            <wangEditor></wangEditor>
          </el-form>

          <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false;submit;">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
      </div>
    </el-tabs>

  </div>
</template>
<style lang="scss" scoped>
  @import "./noticeManage.scss";
</style>
<script>
  import wangEditor from './wangEditor/wangEditor'

  export default {
    components: {
      wangEditor
    },
    data() {
      return {
        dialogVisible: false,
        form: {
          content: '',
          person: '',
          date: null
        },
        tableData: [],
        page: {
          num: 1,
          size: 10,
          total: 1
        },
        title: '',
        content: ''
      }
    },
    methods: {
      resetForm() {
        this.form.content = '';
        this.form.person = '';
        this.form.date = null;
      },
      deleteNotice() {

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      submit() {
        console.log(1111)
      },
      handleEdit() {

      },
      handleDetails() {

      },
      handleDelete() {

      },
      handleStick() {

      }
    }
  }
</script>
