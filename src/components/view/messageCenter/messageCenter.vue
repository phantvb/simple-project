<template>
  <div id="messageInform">
    <header>消息中心</header>
    <div style="position: relative;margin-top: 20px">
      <el-tabs v-model="active" type="border-card">
        <el-tab-pane label="系统公告" name="1">
          <systemNotice ref="sysNotice"></systemNotice>
        </el-tab-pane>

        <el-tab-pane label="审核信息" name="2">
          <allMessages ref="auditInfo"></allMessages>
        </el-tab-pane>
      </el-tabs>
      <div class="searchMessage">
        <el-input v-model="form.mess" placeholder="请输入信息" size="small" style="width:200px;"></el-input>
        <el-button
          type="primary"
          size="mini"
          style="width:80px;margin-left: 10px"
          @click="search"
        >搜索</el-button>
        <el-button type="primary" plain size="mini" style="width:80px;" @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import allMessages from "./messageCenterElement/auditInfor";
import systemNotice from "./messageCenterElement/systemNotice";

export default {
  components: {
    allMessages,
    systemNotice
  },
  data() {
    return {
      form: {
        mess: ""
      },
      active: "1"
    };
  },
  methods: {
    reset() {
      this.form.mess = "";
    },

    search() {
      if (this.active == "2") {
        this.$refs.auditInfo.search(this.form.mess);
      }
      if (this.active == "1") {
        this.$refs.sysNotice.search(this.form.mess);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./messageCenter.scss";
</style>
