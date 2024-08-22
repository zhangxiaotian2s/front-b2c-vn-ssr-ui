<!-- 首页轮播图 -->
<script lang="ts" setup>
import { commonJump } from '@/utils/util'
import { nextTick, onMounted } from 'vue'
const fadeEffect: any = { crossFade: true }
const autoplay: any = {
	delay: 5000,
	disableOnInteraction: false
}

/*获取父组件传入的数据*/
const props = withDefaults(defineProps<{ comData: any }>(), {
	comData: []
})
onMounted(async () => {
	nextTick(async () => {
		const Swiper = await import('swiper')
		const { Pagination, EffectFade, Autoplay } = await import('swiper/modules')
		new Swiper.default('#bannerSwiper', {
			effect: 'fade',
			autoplay,
			fadeEffect,
			lazyPreloadPrevNext: 2,
			speed: 750,
			loop: true,
			modules: [Pagination, EffectFade, Autoplay],
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			}
		})
	})
})
</script>
<template>
	<!-- Swiper配置 -->
	<div class="slider-area">
		<div class="swiper-container mb-100 swiper" id="bannerSwiper">
			<div class="swiper-wrapper">
				<div
					class="swiper-slide single-slider"
					v-for="item in comData"
					:key="item.id"
					:style="{ 'background-color': item.background_color ? item.background_color : '#fff' }"
					@click="commonJump(item.jump_info, item.cmsitem_type, item.cmsitem_open)"
				>
					<!-- <div class="swiper-bg swiper-bg-left"></div> -->
					<!-- 轮播图片 -->
					<img :src="item.cmsitem_img_url" alt="image" class="swiper-imgs swiper-lazy" />
					<!-- <div class="swiper-bg swiper-bg-right"></div> -->
				</div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.slider-area {
	margin-bottom: 50px !important;
	@media screen and (max-width: 767px) {
		margin-bottom: 25px !important;
	}
}
.swiper-imgs {
	object-fit: contain;
	margin: auto;
	height: 450px;
	padding: 0 10px;
}
.single-slider {
	position: relative;
	cursor: pointer;
}
// 按钮样式
.quickview-nav {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	color: $white;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	cursor: pointer;
	z-index: 1;
	transition: 0.3s;
	font-size: 40px;
	color: #000;
}
/** swiper 左右背景 */
.single-slider {
	background-color: #fff;
	display: flex;
	.swiper-bg {
		display: flex;
		flex-grow: 1;
		opacity: 0.12;
	}
	.swiper-bg-left {
		// background: url('@/assets/images/swiper-bg-round.png') right center repeat;
	}
	.swiper-bg-right {
		// background: url('/assets/images/swiper-bg-round.png') left center repeat;
	}
}
</style>
