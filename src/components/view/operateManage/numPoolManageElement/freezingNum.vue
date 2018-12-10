<template>
  <div id="freezingNum">
    <div class="search">
      <el-form ref="freezingNumForm" :model="freezingNumForm">
        <el-form-item style="float: left;margin-left: 10px;">
          <el-input v-model="freezingNumForm.number" placeholder="请输入内容" size="mini" style="width:300px;">
            <template slot="prepend" style="width:80px;">400号码：</template>
          </el-input>
          <el-input v-model="freezingNumForm.citationNumber" placeholder="请输入内容" size="mini" style="width:300px;">
            <template slot="prepend" style="width:80px;">引示号码：</template>
          </el-input>
          <el-input v-model="freezingNumForm.companyName" placeholder="请输入内容" size="mini" style="width:300px;">
            <template slot="prepend" style="width:80px;">企业名称：</template>
          </el-input>
          <div class="block" style="display: inline-block;padding: 0;">
            <span class="demonstration">解冻时间：</span>
            <el-date-picker
              size="mini"
              v-model="freezingNumForm.date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="可见渠道：" style="clear: both;margin-left: 15px;">
          <el-checkbox-group v-model="checkList" style=" float: left;margin-left: 15px">
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
        <el-button type="primary" size="mini" @click="thaw">解冻</el-button>
      </div>
      <div style="float: right;">
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
          prop="citation"
          label="引示号码"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="company"
          label="企业名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="channel"
          label="可见渠道"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="thaw"
          label="解冻时间"
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
              @click="handleEdit(scope.$index, scope.row)">解冻
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

  </div>
</template>

<script>
  export default {
    data() {
      return {
        freezingNumForm: {
          number: '',
          citationNumber: '',
          companyName: '',
          date: ''
        },
        messageData: [],
        page: {
          num: 1,
          size: 10,
          total: 1
        },
        checkList: ['自助直销', '渠道']
      }
    },
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      },
      search() {

      },
      reset(){

      },
      thaw(){

      },
      exportInfo(){

      },
      handleEdit(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./citationNum";
</style>
