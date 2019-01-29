<template>
	<div class="menu">
		<div v-for="(item,i) in data" :key="i">
			<template v-if="item.type=='h'&&item.children">
				<sidebar-item :data="item.children" :key="item.path" :base-path="resolvePath(item.path)" />
			</template>
			<div v-else-if="item.type=='h'&&!item.children"></div>
			<el-submenu v-else-if="item.children&&item.children.length>0&&item.children[0].type!='b'" :index="resolvePath(item.url)">
				<template slot="title">
					<!-- <i class="el-icon-menu"></i> -->
					<span slot="title">{{item.name}}</span>
				</template>
				<template v-if="item.children">
					<sidebar-item :data="item.children" :key="item.url" :base-path="resolvePath(item.url)" />
				</template>
			</el-submenu>
			<app-link v-else-if="!item.children||item.children.length==0||item.children[0].type=='b'" :to="resolvePath(item.url)" @click.native="getPermission(item)">
				<el-menu-item :index="resolvePath(item.url)">
					<!-- <i class="el-icon-location"></i> -->
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
					return this.basePath + routePath;
				}
				return routePath;
			},
			getPermission(data) {
				this.$store.commit('changePermission', data);
				//this.$store.getters.getPermission;
			}
		}
	};
</script>