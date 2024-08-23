<template>
	<!-- Swiper配置 -->
	<div class="slider-area">
		<div class="mb-100 swiper" id="bannerSwiper">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="item in comData" :key="item.id">
					<!-- <div class="swiper-bg swiper-bg-left"></div> -->
					<!-- 轮播图片 -->
					<img :src="item.cmsitem_img_url" alt="image" class="swiper-imgs swiper-lazy" />
					<!-- <div class="swiper-bg swiper-bg-right"></div> -->
				</div>
			</div>
			<!-- Add Pagination -->
		</div>
	</div>
</template>

<script lang="ts" setup>
interface IBannerItem {
	cmsitem_img_url: string
	cmsitem_open: string
	cmsitem_type: string
	id: string
	jump_info: string
}
import { nextTick, onMounted } from 'vue'
// const fadeEffect: any = { crossFade: true }
// sableOnInteraction: false
// }
/*获取父组件传入的数据*/
defineProps<{ comData: IBannerItem[] }>()
onMounted(async () => {
	const Swiper = await import('swiper')
	new Swiper.default('#bannerSwiper', {})
})
</script>

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
.swiper-slide {
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
