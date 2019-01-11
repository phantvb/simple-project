<template>
  <div class="menu">
    <div v-for="(item,i) in data" :key="i">
      <template v-if="item.hidden&&item.children">
        <sidebar-item :data="item.children" :key="item.path" :base-path="resolvePath(item.path)"/>
      </template>
      <div v-else-if="item.hidden&&!item.children"></div>
      <el-submenu v-else-if="item.children&&item.children.length>0" :index="resolvePath(item.url)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <template v-if="item.children">
          <sidebar-item :data="item.children" :key="item.url" :base-path="resolvePath(item.url)"/>
        </template>
      </el-submenu>
      <app-link v-else-if="!item.children||item.children.length==0" :to="resolvePath(item.url)">
        <el-menu-item :index="resolvePath(item.url)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </app-link>
    </div>
  </div>
</template>
<script>
import AppLink from "./link";
export default {
  name: "SidebarItem",
  props: ["data", "basePath"],
  components: { AppLink },
  methods: {
    resolvePath(routePath) {
      if (this.basePath) {
        return this.basePath + "/" + routePath;
      }
      return routePath;
    }
  }
};
</script>