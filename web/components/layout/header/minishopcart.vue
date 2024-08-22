<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/store/cart'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const { t } = useI18n()
const cartStore = useCartStore()
const { cartInfo } = storeToRefs(cartStore)
onMounted(() => {
	cartStore.getMiniCartInfo()
})
</script>

<template>
	<div class="shopping-cart-content">
		<ul>
			<li class="single-shopping-cart p" v-for="item in cartInfo.list" :key="item.id">
				<div class="shopping-cart-img">
					<el-image :src="item.images" style="width: 60px; height: 60px"></el-image>
				</div>
				<div class="shopping-cart-title">
					<h4>
						<router-link :to="`/product/detail/${item.goods_id}`"> {{ item.name }} </router-link>
					</h4>
					<h6>{{ t('quantity') }}:{{ item.num }}</h6>
					<span>{{ item.price }}</span>
				</div>
				<div class="shopping-cart-delete d-flex">
					<span class="iconfont icon-delete pointer hover-text" @click="cartStore.deleteCartGoodsItem(item.id)"></span>
				</div>
			</li>
		</ul>
		<div class="d-flex justify-content-end mt-10">
			<router-link to="/order/shopcart" class="el-button is-round gradient-btn">{{ t('go_to_the_shopping_cart') }}</router-link>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.shopping-cart-content {
	padding: 30px;
	ul {
		overflow-y: auto;
		max-height: 375px;
		margin-right: -15px;
		padding-right: 15px;
		li {
			display: flex;
			margin-bottom: 20px;
			padding-bottom: 15px;
			border-bottom: $border-color solid 1px;

			.shopping-cart-img {
				margin-right: 15px;
			}
			.shopping-cart-title {
				flex-basis: calc(100% - 80px);
				h4 {
					font-size: 15px;
					line-height: 1.2;
					padding-right: 10px;
					a {
					}
				}
				h6 {
					font-size: 13px;
					margin: 5px 0 8px;
				}
				span {
					font-size: 14px;
				}
			}
		}
	}
	.gradient-btn {
		font-size: 14px;
		padding: 20px !important;
	}
}
</style>
