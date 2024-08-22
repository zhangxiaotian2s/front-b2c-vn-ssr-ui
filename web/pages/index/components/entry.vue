<!-- 快速入口 -->
<script lang="ts" setup>
import { t } from '@/i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectFade, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { commonJump } from '@/utils/util'

/*获取父组件传入的数据*/
const props = withDefaults(defineProps<{ comData: any }>(), {
	comData: []
})
</script>
<template>
	<!-- Swiper配置 -->
	<div class="support-area content-wrapper">
		<swiper
			v-if="comData.length > 0"
			class="slider-area mb-100"
			style="margin: auto"
			:loop="true"
			:speed="750"
			:spaceBetween="7"
			:slidesPerView="4"
			:fadeEffect="{ crossFade: true }"
			:lazy="{
				loadPrevNext: true
			}"
			:preloadImages="true"
			:loadPrevNext="true"
			:autoplay="false"
			:modules="[Navigation, EffectFade, Pagination, Autoplay]"
			:navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
		>
			<swiper-slide
				class="single-slider"
				v-for="item in comData"
				:key="item.id"
				@click="commonJump(item.jump_info, item.cmsitem_type, item.cmsitem_open)"
			>
				<div class="swiper-cont">
					<img :src="item.cmsitem_img_url" alt="image" class="swiper-imgs swiper-lazy" />
					<h3 class="title">{{ item.cmsitem_title }}</h3>
					<p class="desc">{{ item.cmsitem_desc }}</p>
				</div>
			</swiper-slide>
			<!-- 左右按钮 -->
			<div class="quickview-nav swiper-button-prev">
				<i class="pe-7s-angle-left"></i>
			</div>
			<div class="quickview-nav swiper-button-next">
				<i class="pe-7s-angle-right"></i>
			</div>
			<!-- <div class="swiper-pagination"></div> -->
		</swiper>
	</div>
</template>

<style lang="scss" scoped>
.slider-area {
	width: 1140px;
	padding: 5px;
	padding-bottom: 50px;
	margin-bottom: 50px !important;
	@media screen and (max-width: 767px) {
		margin-bottom: 25px !important;
	}
}
// 按钮样式
.quickview-nav {
	position: absolute;
	top: auto;
	bottom: -10px;
	left: auto;
	right: 0;
	transform: translateY(-50%);
	border-radius: 50%;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	cursor: pointer;
	z-index: 1;
	transition: 0.3s;
	background: linear-gradient(90deg, #02eec5, #2aa6fd);
	&:hover {
		background: linear-gradient(90deg, #00b2de, #295fd9);
	}
}
.swiper-button-prev:after,
.swiper-button-next:after {
	font-size: 14px;
	color: #fff;
}
.swiper-button-prev {
	right: 40px;
}
.single-slider {
	position: relative;
	cursor: pointer;
	// display: flex;
	text-align: center;
	padding: 3px 0;
	.swiper-cont:hover {
		border-radius: 6px;
		background: #fffbef;
		box-shadow: 1px 2px 7px 0px rgba(0, 0, 0, 0.2);
	}
	.swiper-imgs {
		width: 280px;
		object-fit: contain;
		// aspect-ratio: 2200/750;
		margin: auto;
		height: 280px;
		border-radius: 6px;
		background: #fff;
	}
	.title {
		font-weight: 600;
		font-size: 20px;
		color: #333333;
		line-height: 26px;
		padding-top: 15px;
	}
	.desc {
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		line-height: 24px;
		padding-bottom: 15px;
	}
}
</style>
<style lang="scss">
.support-area .swiper-wrapper {
	margin: auto;
}
</style>
