<template>
	<div class="menu">
		<el-submenu v-if="item.children&&item.children.length>0&&!item.hidden" v-for="(item,i) in data" :key="i" :index="resolvePath(item.path)">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span slot="title">{{item.name}}</span>
			</template>
			<template v-if="!item.hidden&&item.children">
				<sidebar-item :data="item.children" :key="item.path" :base-path="resolvePath(item.path)" />
			</template>
		</el-submenu>
		<app-link v-if="!item.children&&!item.hidden" v-for="(item,i) in data" :key="i" :to="resolvePath(item.path)">
			<el-menu-item :index="resolvePath(item.path)">
				<i class="el-icon-menu"></i>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</app-link>
		<div v-if="item.hidden" v-for="(item,i) in data" :key="i">
			<template v-if="item.hidden&&item.children">
				<sidebar-item :data="item.children" :key="item.path" :base-path="resolvePath(item.path)" />
			</template>
		</div>
	</div>
</template>
<script>
	import AppLink from './link'
	export default {
		name: 'SidebarItem',
		props: ['data', 'basePath'],
		components: { AppLink },
		methods: {
			resolvePath(routePath) {
				if (this.basePath) {
					return this.basePath + '/' + routePath;
				}
				return routePath
			},
		}
	}
</script>