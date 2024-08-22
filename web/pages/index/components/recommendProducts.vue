<!-- 商品推荐 -->
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

/*打开方式*/
</script>
<template>
	<!-- Swiper配置 -->
	<div class="deal-area">
		<swiper
			v-if="comData.length > 0"
			class="slider-area mb-100 content-wrapper"
			style="margin: auto"
			:loop="true"
			:speed="750"
			:slidesPerView="1"
			:fadeEffect="{ crossFade: true }"
			:lazy="{
				loadPrevNext: true
			}"
			:preloadImages="true"
			:loadPrevNext="true"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false
			}"
			:pagination="{ clickable: true }"
			:modules="[Navigation, EffectFade, Pagination, Autoplay]"
			:navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }"
		>
			<!-- <swiper-slide class="single-slider" v-for="item in 7" :key="item"> {{ item }}--------- </swiper-slide> -->
			<swiper-slide
				class="single-slider"
				v-for="item in comData"
				:key="item.id"
				@click="commonJump(item.jump_info, item.cmsitem_type, item.cmsitem_open)"
			>
				<!-- 轮播图片 -->
				<!-- <img src="../banner.png" alt="image" class="swiper-imgs swiper-lazy" /> -->
				<img :src="item.cmsitem_img_url" alt="image" class="swiper-imgs swiper-lazy" />
				<div class="swiper-cont-str">
					<h3 class="title text-overflow-hide-2 hover-text">{{ item.cmsitem_title }}</h3>
					<p class="desc text-overflow-hide-2">{{ item.cmsitem_desc }}</p>
					<div v-if="item.goods_price_inc" class="product-price">
						<span class="price">{{ item.goods_price_inc }}</span>
						<span class="underlined-price">{{ item.underlined_price }}</span>
					</div>
					<el-button class="add-cart gradient-btn" round>加入购物车</el-button>
				</div>
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
	</div>
</template>

<style lang="scss" scoped>
.deal-area {
	background: #eaeff3;
	padding-top: 60px;
}
.slider-area {
	// width: 1140px;
	// padding: 5px;
	padding-bottom: 60px;
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
	color: #fff;
	background: linear-gradient(90deg, #02eec5, #2aa6fd);
	border-radius: 50%;
	width: 30px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	cursor: pointer;
	z-index: 1;
	transition: 0.3s;
}
.quickview-nav:hover {
	background: linear-gradient(90deg, #00b2de, #295fd9);
}
.swiper-button-prev:after,
.swiper-button-next:after {
	font-size: 14px;
}
.swiper-button-prev {
	right: 40px;
}
.single-slider {
	position: relative;
	cursor: pointer;
	display: flex;
	width: 100%;
	.swiper-imgs {
		background: #fff;
		width: 400px;
		height: 400px;
		object-fit: contain;
		margin-right: 10px;
		border-radius: 6px;
	}
	.swiper-cont-str {
		padding: 80px;
		flex-grow: 1;
		background: #fff;
		.title {
			font-weight: 600;
			font-size: 24px;
			color: #333333;
			line-height: 30px;
		}
		.desc {
			font-weight: 600;
			font-size: 18px;
			color: #666666;
			line-height: 40px;
			margin-top: 5px;
		}
		.product-price {
			line-height: 40px;
			.price {
				font-weight: bold;
				font-size: 30px;
				color: #c63b36;
			}
			.underlined-price {
				font-weight: 400;
				font-size: 20px;
				color: #999999;
				text-decoration-line: line-through;
				margin-left: 10px;
			}
		}
	}
	.gradient-btn {
		padding: 20px 54px;
		margin-top: 30px;
	}
}
</style>
<style lang="scss">
.deal-area {
	.swiper-pagination-bullet {
		width: 60px;
		height: 8px;
		border-radius: 4px;
	}
	.swiper-pagination {
		bottom: 25px;
	}
}
</style>
