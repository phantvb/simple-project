<template>
    <div class="menu">
        <el-submenu v-if="item.children&&!item.hidden" v-for="(item,index) in data" :key="index" :index="index+''">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <template v-if="!item.hidden&&item.children">
                <sidebar-item
                :data="item.children"
                :key="item.path"
                :base-path="resolvePath(item.path)"/>
            </template>
        </el-submenu>
        <app-link v-if="!item.children&&!item.hidden" v-for="(item,index) in data" :key="index" :index="index+''" :to="resolvePath(item.path)">
            <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </app-link>
        <div v-if="item.hidden" v-for="(item,index) in data" :key="index">
            <template v-if="item.hidden&&item.children">
                <sidebar-item
                :data="item.children"
                :key="item.path"
                :base-path="resolvePath(item.path)"/>
            </template>
        </div>
    </div>
</template>
<script>
import AppLink from './link'
export default {
    name:'SidebarItem',
    props:['data','basePath'],
    components: { AppLink },
    methods:{
        resolvePath(routePath) {
            if (this.basePath) {
                return this.basePath+'/'+routePath;
            }
            return routePath
        },
    }
}
</script>

