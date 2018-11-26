<template>
    <div class="menu">
        <el-submenu v-if="item.children&&!item.hidden" v-for="(item,index) in data" :key="index" :index="index+''">
            {{1}}
            <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.name}}</span>
            </template>
            <template v-for="child in item.children" v-if="!child.hidden">
                <sidebar-item
                :data="child.children"
                :key="child.path"
                :base-path="resolvePath(child.path)"/>
            </template>
        </el-submenu>
        <app-link v-if="!item.children&&!item.hidden" v-for="(item,index) in data" :key="index" :index="index+''" :to="resolvePath(item.path)">
            {{2}}
            <el-menu-item>
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.name}}</span>
            </el-menu-item>
        </app-link>
    </div>
</template>
<script>
import AppLink from './link'
export default {
    name:'SidebarItem',
    props:['data','basePath'],
    mounted(){
        console.log(this.data);
    },
    components: { AppLink },
    methods:{
        resolvePath(routePath) {
            if (this.basePath) {
                return this.basePath+routePath;
            }
            return routePath
        },
    }
}
</script>

