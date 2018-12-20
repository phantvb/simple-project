<template>
  <div id="numPoolManage">
    <header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">运营管理</el-breadcrumb-item>
        <el-breadcrumb-item>号码池管理</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <div style="margin-top: 15px">
      <el-tabs type="border-card">
        <el-tab-pane label="可用的号码">
          <usableNum></usableNum>
        </el-tab-pane>
        <el-tab-pane label="审核中的号码">
          <auditNum></auditNum>
        </el-tab-pane>
        <el-tab-pane label="使用中的号码">
          <usingNum></usingNum>
        </el-tab-pane>
        <el-tab-pane label="引示号管理">
          <citationNum></citationNum>
        </el-tab-pane>
        <el-tab-pane label="冷冻期号码">
          <freezingNum></freezingNum>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "./numPoolManage";
</style>
<script>
  import usableNum from './numPoolManageElement/usableNum';
  import auditNum from './numPoolManageElement/auditNum';
  import usingNum from './numPoolManageElement/usingNum';
  import citationNum from './numPoolManageElement/citationNum';
  import freezingNum from './numPoolManageElement/freezingNum';

  export default {
    name: 'numPoolManage',
    components: {
      usableNum,
      auditNum,
      usingNum,
      citationNum,
      freezingNum
    }
  }
</script>
