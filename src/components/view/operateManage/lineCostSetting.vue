<template>
  <div id="lineCostSetting">
    <header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>线路成本设置</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <el-tabs>
      <div class="search">
        <span>线路：</span>
        <el-select v-model="value" placeholder="请选择" size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" style="width:80px;">搜索</el-button>
        <el-button type="primary" plain size="mini" style="width:80px;" @click="resetForm">重置</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="official" label="局端" width="180">
          </el-table-column>
          <el-table-column prop="remarks" label="备注" width="180">
          </el-table-column>
          <el-table-column prop="cost" label="成本">
          </el-table-column>
          <el-table-column prop="cost" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑
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
    </el-tabs>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '杭电'
        }, {
          value: '选项2',
          label: '西湖'
        }, {
          value: '选项3',
          label: '全部'
        }],
        value: '',
        tableData: [],
        page: {
          num: 1,
          size: 10,
          total: 1
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "./lineCostSetting.scss";
</style>
