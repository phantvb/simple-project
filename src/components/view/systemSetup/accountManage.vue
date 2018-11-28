<template>
  <div id="accountManage">
    <el-tabs type="border-card">

      <el-tab-pane label="自助直销">
        <selfHelp></selfHelp>
      </el-tab-pane>

      <el-tab-pane label="渠道">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SelfHelp from './selfHelp';
  export default {
    name:'accountManage',
    props:[],
    components: {SelfHelp},
    methods:{
    }
  }
</script>

<style lang="scss" scoped>
  @import './accountManage.scss';
</style>
