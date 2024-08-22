<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { ElAffix, ElMenu, ElMenuItem } from 'element-plus'
import { jump } from '@/utils/util'
import { useRoute } from 'vue-router'
const route = useRoute()

console.log(route)
const activeIndex = ref('1')
const search = () => {
	console.log('search')
}
const isVisible = ref(true)
const windowScroll = () => {
	window.addEventListener('scroll', () => {
		let scroll = window.scrollY
		if (scroll >= 50) {
			isVisible.value = false
		} else {
			isVisible.value = true
		}
	})
}
onMounted(() => {
	windowScroll()
})
</script>

<template>
	<el-affix :offset="50" z-index="90" style="z-index: 90">
		<div class="nav-wrapper w-100" :class="isVisible ? 'fade-enter' : 'fade-leave'">
			<div class="content-wrapper">
				<div class="d-flex justify-content-between align-items-center pt-30 pl-30 pr-30 pb-10">
					<div class="d-flex align-items-center nav-logo pl-20" @click="jump('/')">
						<img src="@/assets/images/logo-black.png" class="d-block" />
					</div>
					<div class="search d-flex align-items-center justify-content-center mr-20">
						<input type="text" placeholder="Search" @keydown.enter="search" />
						<button class="hover-text">搜索</button>
					</div>
				</div>
				<nav v-if="route.meta && route.meta.module != 'user'">
					<el-menu :default-active="activeIndex" class="header-menu" mode="horizontal" active-text-color="#2AA6FD">
						<el-menu-item index="1"> <router-link :to="`/`" class="news-title"> 首页 </router-link></el-menu-item>
						<el-menu-item index="2">分类</el-menu-item>
						<el-menu-item index="3">
							<router-link :to="`/user/center/info`" class="news-title"> 个人中心 </router-link>
						</el-menu-item>
						<el-menu-item index="4">
							<router-link :to="`/cms/news`" class="news-title"> 新闻 </router-link>
						</el-menu-item>
					</el-menu>
				</nav>
			</div>
		</div>
	</el-affix>
</template>
<style lang="scss" scoped>
.nav-wrapper {
	background: $bg-white;
	transition: all 0.3s ease-in-out;
	border-bottom: #dddddd solid 1px;
}

.nav-logo {
	width: 130px;
}
.search {
	width: 570px;
	border: $assist-color-2 solid 2px;
	height: 38px;
	border-radius: 20px;
	overflow: hidden;
	@media #{$pad-layout} {
		width: 470px;
	}
	input {
		width: 82%;
		height: 38px;
		line-height: 38px;
		border: none;
		text-indent: 20px;
	}
	button {
		background: $assist-color-2;
		width: 18%;
		height: 38px;
		text-align: center;
		font-size: $text-x-size;
		color: $white;
	}
}
.header-menu {
	border-bottom: none;
	height: 36px;
	margin-top: 20px;
	.el-menu-item {
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		margin-right: 40px;
		&:hover {
			background: none;
		}
		&.is-active {
			background: none;
		}
	}
	&.el-menu--horizontal > .el-menu-item.is-active {
		border-width: 4px;
	}
}
// 从底部渐变消失
.fade-enter {
	opacity: 1;
	z-index: 99;
}
.fade-leave {
	opacity: 0;
}
</style>
