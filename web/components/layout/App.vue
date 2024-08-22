<script lang="ts" setup>
import { ElMain, ElContainer, ElFooter, ID_INJECTION_KEY, ZINDEX_INJECTION_KEY } from 'element-plus'
import LayoutHeader from './header/index.vue'
import LayoutFooter from './footer/index.vue'
import initI18n from '@/core/plugins/i18n'
// Register global plugins/components here
// Read document get more details http://doc.ssr-fc.com/docs/features$communication#props%20%E7%9B%B4%E5%87%BA%E6%95%B0%E6%8D%AE
import { App, provide } from 'vue'

const props = defineProps<{
	ssrApp: App
	asyncData: { value: any }
}>()

// 当使用 Element Plus 在 SSR 场景下开发时，您需要在 SSR 期间进行特殊处理，以避免水合错误。
// 注释：水合是指在服务端渲染（SSR）的过程中，客户端接收到服务端渲染的 HTML 片段后，重新创建组件树并将动态数据注入其中，使得组件树能够响应用户交互的过程
// 注释：水合错误是指在服务端渲染（SSR）的过程中，服务端渲染的 DOM 结构和浏览器端渲染的 DOM 结构不一致，导致两者无法正确地融合（水合）的错误
// 提供的值用于生成 ElementPlus 中的唯一ID。 因为不同的 IDs 容易发生SSR中的水合错误， 为了确保服务器端和客户端生成相同的ID， 我们需要将 ID_injection_key 注入到 Vue。
// 注释：如果没有提供ID_INJECTION_KEY，那么在客户端进行水合的时候，可能会出现两个相同的组件无法区分的问题
props.ssrApp
	.provide(ID_INJECTION_KEY, {
		prefix: 100,
		current: 0
	})
	.provide(ZINDEX_INJECTION_KEY, {
		current: 1
	})
// 向所有子组件提供数据 asyncData 内容
provide('asyncData', props.asyncData)

console.log(props.asyncData)
initI18n(props.ssrApp, props.asyncData.value)
</script>
<template>
	<el-container>
		<layout-header />
		<el-main class="main-wrap">
			<div class="main-content">
				<router-view :asyncData="asyncData" />
			</div>
		</el-main>
		<el-footer>
			<layout-footer />
		</el-footer>
	</el-container>
</template>

<style lang="scss">
@import '@/assets/styles/common.scss';
@import '@/assets/styles/reset.scss';
@import '@/assets/styles/iconfont.scss';
@import 'swiper/css';
@import 'swiper/css/autoplay';
@import 'swiper/css/pagination';
@import 'swiper/css/effect-fade';
.el-main {
	padding: 0;
	margin: 0;
}
.el-footer {
	height: auto;
	padding: 0;
}
.main-wrap {
	// @media #{$lg-layout} {
	// 	min-height: 100vh;
	// }
	overflow: hidden;
	min-height: calc(100vh - 595px - 189px);
	padding: 0px;
}
</style>
