<!-- 首页轮播图 -->
<script lang="ts" setup>
import { onlyCsr } from 'ssr-hoc-vue3'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'

import { commonJump } from '@/utils/util'
const fadeEffect: any = { crossFade: true }
const autoplay: any = {
	delay: 5000,
	disableOnInteraction: false
}
const pageination: any = { clickable: true }

/*获取父组件传入的数据*/
const props = withDefaults(defineProps<{ comData: any }>(), {
	comData: []
})
// let Swiper = null
// let SwiperSlide = null
// let EffectFade = null
// let Pagination = null
// let Autoplay = null
// onMounted(async () => {
// 	// import { Swiper, SwiperSlide } from 'swiper/vue'
// 	// import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
// 	const csrSwiper = await import('swiper/vue')
// 	Swiper = csrSwiper.Swiper
// 	SwiperSlide = csrSwiper.SwiperSlide

// 	const modules = await import('swiper/modules')
// 	EffectFade = modules.EffectFade
// 	Pagination = modules.Pagination
// 	Autoplay = modules.Autoplay
// })
</script>
<template>
	<!-- Swiper配置 -->
	<div class="slider-area">
		<onlyCsr>
			<swiper
				v-if="comData.length > 0"
				class="mb-100 content-wrapper"
				style="max-width: 100%; margin: auto"
				effect="fade"
				:loop="true"
				:speed="750"
				:slidesPerView="1"
				:spaceBetween="10"
				:fadeEffect="fadeEffect"
				:lazy="{
					loadPrevNext: true
				}"
				:preloadImages="true"
				:loadPrevNext="true"
				:autoplay="autoplay"
				:pagination="pageination"
				:modules="[EffectFade, Pagination, Autoplay]"
			>
				<swiper-slide
					class="single-slider"
					v-for="item in comData"
					:key="item.id"
					:style="{ 'background-color': item.background_color ? item.background_color : '#fff' }"
					@click="commonJump(item.jump_info, item.cmsitem_type, item.cmsitem_open)"
				>
					<div class="swiper-bg swiper-bg-left"></div>
					<!-- 轮播图片 -->
					<img :src="item.cmsitem_img_url" alt="image" class="swiper-imgs swiper-lazy" />
					<div class="swiper-bg swiper-bg-right"></div>
				</swiper-slide>
				<!-- 左右按钮 -->
				<!-- <div class="quickview-nav swiper-button-prev">
				<i class="pe-7s-angle-left"></i>
			</div>
			<div class="quickview-nav swiper-button-next">
				<i class="pe-7s-angle-right"></i>
			</div> -->
				<div class="swiper-pagination"></div>
			</swiper>
		</onlyCsr>
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
		background: url('@/assets/images/swiper-bg-round.png') right center repeat;
	}
	.swiper-bg-right {
		background: url('/assets/images/swiper-bg-round.png') left center repeat;
	}
}
</style>
