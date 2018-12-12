<template>
  <div id="messageInform">
    <header>
      消息中心
    </header>
    <div style="position: relative;margin-top: 20px">
      <el-tabs v-model="active" type="card">
        <el-tab-pane label="全部消息" name="1">
          <el-table
            :data="messageData"
            style="width: 100%;margin-bottom:15px;">
            <el-table-column
              type="selection"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="describe"
              label="描述"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="time"
              label="日期"
              min-width="80">
            </el-table-column>
            <el-table-column
              prop="address"
              label="邮件来源"
              min-width="80">
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px">
            <div class="batch-work">
              <el-button type="primary" plain size="mini" style="margin-left: 14px;">批量删除</el-button>
            </div>
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
        </el-tab-pane>
        <el-tab-pane label="系统公告" name="2"></el-tab-pane>
        <el-tab-pane label="审核信息" name="3"></el-tab-pane>
      </el-tabs>
      <div class="searchMessage">
        <el-input v-model="form.mess" placeholder="请输入信息" size="small" style="width:200px;"></el-input>
        <el-button type="primary" size="mini" style="width:80px;margin-left: 10px">搜索</el-button>
        <el-button type="primary" plain size="mini" style="width:80px;">重置</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import './messageCenter.scss';
</style>
<script>
  export default {
    data() {
      return {
        active: '1',
        form: {
          mess: ''
        },
        messageData: [
          {
            describe: '[ 公告 ] 2017年12月13日业务受理系统升级影响通告',
            time: '2017-12-08 13:08:12',
            address: '站内信'
          }
        ],
        page: {
          num: 1,
          size: 10,
          total: 1
        }
      }
    },
    methods: {
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    }
  }
</script>
