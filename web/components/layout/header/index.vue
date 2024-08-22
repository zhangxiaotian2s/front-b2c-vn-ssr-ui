<script lang="ts" setup>
import { ElHeader } from 'element-plus'
import Topbar from './topbar.vue'
import Nav from './nav.vue'
</script>

<template>
	<el-header>
		<Topbar />
		<Nav />
	</el-header>
	<!-- <el-header class="page-header hidden-sm-and-up">
		<MobileHeader />
	</el-header> -->
</template>
<style lang="scss">
.el-header {
	padding: 0;
	height: auto;
	background: #fff;
}
.page-header {
	height: 50px;
	padding: 0;
	width: 100%;
	background: linear-gradient(90deg, #02eec5, #2aa6fd, #999efd);
}
.el-affix {
	background: #fff;
}
</style>
