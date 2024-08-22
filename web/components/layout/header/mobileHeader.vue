<script lang="ts" setup>
const drawer = ref(false)
const options = [
	{
		value: 'zh-CN',
		label: '中文'
	},
	{
		value: 'en-US',
		label: 'English'
	}
]
const currentLang = ref('zh-CN')
const changeLang = (val: string) => {
	console.log(val)
	// currentLang.value = currentLang.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}

const search = () => {}
</script>

<template>
	<div class="mobile-header h-100 d-flex align-items-center justify-content-between">
		<div class="d-flex align-items-center mobile-header-left">
			<div class="mobile-header-logo pl-30">
				<img src="@/assets/images/logo-black.png" alt="logo" class="d-block" />
			</div>
			<div class="mobile-header-search ml-30">
				<input type="text" @keydown.enter="search" />
			</div>
		</div>

		<div class="mobile-header-menu pr-30 d-flex align-items-center">
			<el-badge :value="1" class="d-flex mr-40" :offset="[5, 6]" color="#C63B36">
				<div class="shop-cart-icon d-flex align-items-center pointer">
					<SvgIcon name="shopcart" size="20px" color="#000" class="hover-svg" />
				</div>
			</el-badge>

			<el-icon @click="drawer = true" size="20px" :class="drawer ? 'rotate-y color-white' : ''">
				<Operation />
			</el-icon>
		</div>
	</div>

	<el-drawer v-model="drawer" :direction="'ltr'" size="80%" :with-header="false" class="mobile-header-drawer">
		<div class="d-flex justify-content-end pb-30" @click="drawer = false">
			<el-icon size="20px"><Close /></el-icon>
		</div>
		<h4 class="mb-30">选择语言</h4>
		<el-select v-model="currentLang" style="width: 100%">
			<el-option class="px-20" v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
		<div class="nav pt-30">
			<el-scrollbar height="60vh" style="overflow: hidden" always>
				<ul class="py-20">
					<li class="py-20">
						<router-link to="/" class="hover-text">首页</router-link>
					</li>
					<li class="py-20">
						<router-link to="/" class="hover-text">商品</router-link>
					</li>
					<li class="py-20">
						<router-link to="/" class="hover-text">个人中心</router-link>
					</li>
					<li class="py-20">
						<router-link to="/" class="hover-text">新闻</router-link>
					</li>
				</ul>
			</el-scrollbar>
		</div>
		<template #footer>
			<p class="d-flex align-items-center">
				<el-space>
					<SvgIcon name="user" size="16px" color="#ccc" />
					<span>哎呦我去</span>
				</el-space>
			</p>
		</template>
	</el-drawer>
</template>
<style lang="scss" scoped>
.mobile-header-logo {
	img {
		width: 80px;
	}
}
.mobile-header-left {
	width: 70%;
}
.mobile-header-search {
	width: 60%;
	border-radius: 15px;
	overflow: hidden;

	input {
		width: 100%;
		height: 30px;
		line-height: 30px;
		border: none;
		text-indent: 15px;
	}
}
.nav {
	height: 60vh;
	overflow: hidden;
}
.el-drawer {
	background: #ebebeb;
	:deep(.el-drawer__footer) {
		border-top: #ebebeb solid 1px;
	}
}
</style>
<style lang="scss">
.el-drawer__footer {
	display: flex;
	align-items: center;
	padding-top: 0;
	border-top: #ebebeb solid 1px;
}
</style>
