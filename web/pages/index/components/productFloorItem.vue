<script lang="ts" setup>
import { t } from '@/i18n'

const props = withDefaults(defineProps<{ list: any }>(), { list: [] })
</script>
<template>
	<!-- 商品数据 -->
	<div class="product-wrap d-flex flex-wrap">
		<div class="product-cont" v-for="product in list" :key="product.id">
			<router-link :to="`/product/detail/${product.id}`">
				<!-- 商品图片 -->
				<img class="product-first-pic" :src="product.goods_first_pic" alt="product.title" />
			</router-link>

			<div class="product-content text-center">
				<router-link class="text-overflow-hide-2 hover-text goods-name" :to="`/product/detail/${product.jump_info}`">{{
					product.goods_name
				}}</router-link>
				<div class="product-price">
					<!-- 商品价格(会员价) -->
					<span>{{ product.member_price }}</span>
					<!-- 划线价 -->
					<span class="underlined-price" v-if="product.underlined_price">{{ product.underlined_price }}</span>
				</div>
				<p class="desc text-overflow-hide-1">{{ product.cmsitem_desc }}</p>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.product-wrap {
	padding: 0 40px;
}
.product-cont {
	background: #fff;
	border-radius: 6px;
	width: 280px;
	margin-bottom: 30px;
	margin: 0 8px 30px;
	&:hover {
		background: #fffbef;
		box-shadow: 1px 2px 7px -1px rgba(0, 0, 0, 0.2);
	}
}
.product-first-pic {
	width: 280px;
	height: 280px;
	background: #fff;
	border-radius: 6px 6px 0px 0px;
}
.product-content {
	padding: 20px;
	.goods-name {
		font-weight: 600;
		font-size: 14px;
		color: #333333;
		line-height: 20px;
		height: 40px;
		width: 170px;
		margin: 0 auto 10px;
	}
	.product-price {
		width: 160px;
		border-bottom: 1px solid #dddddd;
		margin: 0 auto;
		font-weight: bold;
		font-size: 14px;
		color: #c63b36;
		line-height: 22px;
		padding-bottom: 15px;
		.underlined-price {
			color: #999999;
			text-decoration-line: line-through;
			margin-left: 10px;
		}
	}
	.desc {
		margin-top: 20px;
		font-weight: 600;
		font-size: 14px;
		color: #999999;
		line-height: 16px;
		height: 16px;
	}
}
</style>
