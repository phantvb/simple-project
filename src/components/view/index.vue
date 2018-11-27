<template>
    <el-container>
        <el-header style="padding:0px;">
            <div class="header"></div>
        </el-header>
        <el-container>
            <el-aside width="200px">
            <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <SidebarItem :data='router' :base-path="router.path"></SidebarItem>
            </el-menu>
            </el-aside>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100vh;
  }
</style>
<style scoped>
    .header{
        height: 100%;
        background-color: #111A2B;
        background-image: url('../../assets/logo.png');
        background-repeat: no-repeat;
    }
</style>
<script>
import SidebarItem from './component/Sidebar/SidebarItem.vue'
export default {
    name:'layout',
    data() {
      return {
        isCollapse: false
      };
    },
    components:{SidebarItem},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    computed:{
        router(){
            return this.$router.options.routes;
        }
    }
}
</script>

