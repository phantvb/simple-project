<template>
	<!-- eslint-disable vue/require-component-is-->
	<component v-bind="linkProps(to)" :is="linkProps(to).is">
		<slot />
	</component>
</template>
<style scoped>
	a {
		text-decoration: unset;
	}
</style>

<script>
	export default {
		props: {
			to: {
				type: String,
				required: true
			}
		},
		methods: {
			linkProps(url) {
				return {
					is: 'router-link',
					to: url
				}
			}
		}
	}
</script>