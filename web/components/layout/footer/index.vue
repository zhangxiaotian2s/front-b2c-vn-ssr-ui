<script lang="ts" setup>
// import Top from './top.vue'
// import MobileHeader from './mobileHeader.vue'
// import Nav from './nav.vue'
</script>

<template>
	<div>
		<div class="top-wrap">
			<div class="content-wrapper">
				<div class="top d-flex align-items-center justify-content-between">
					<div>
						<img src="@/assets/images/logo-black.png" class="d-block logo" />
						<p class="mt-20">© 2022 Flone. All Rights Reserved</p>
					</div>
					<div class="text-center">
						<p class="more-benefits">扫码探索更多福利</p>
						<img src="@/assets/images/logo-black.png" class="d-block qr-code mt-10" />
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-wrap">
			<div class="content-wrapper d-flex justify-content-between pt-40">
				<dl>
					<dt>
						<i class="icon">@@</i>
						<span>信息</span>
					</dt>
					<dd>事业机会</dd>
					<dd>Chinh sach va Quy dinh mua hang</dd>
					<dd>About TIENS</dd>
					<dd>联系我们</dd>
				</dl>
				<dl>
					<dt>
						<i class="icon">@@</i>
						<span>客户服务</span>
					</dt>
					<dd>搜索</dd>
				</dl>
				<dl>
					<dt>
						<i class="icon">@@</i>
						<span>信息</span>
					</dt>
					<dd>事业机会</dd>
					<dd>Chinh sach va Quy dinh mua hang</dd>
					<dd>About TIENS</dd>
					<dd>联系我们</dd>
				</dl>
				<dl>
					<dt>
						<i class="icon">@@</i>
						<span>跟随我们</span>
					</dt>
					<dd>Get E-mail updates about our latest shop and special offers.</dd>
				</dl>
			</div>
		</div>
	</div>
	<!-- <el-header class="page-header hidden-sm-and-up">
		<MobileHeader />
	</el-header> -->
</template>
<style lang="scss" scoped>
.top-wrap {
	background: #eff0f3;
	.top {
		height: 200px;
		padding: 0 150px;
		.logo {
			width: 130px;
			height: 37px;
		}
		p {
			font-weight: 600;
			font-size: 18px;
			color: #999999;
			&.more-benefits {
				font-weight: 400;
				font-size: 16px;
				color: #333333;
			}
		}
		.qr-code {
			width: 118px;
			height: 118px;
		}
	}
}
.bottom-wrap {
	height: 395px;
	background: #414141;
	dl {
		padding: 0 70px 20px 30px;
		border-left: 2px solid #666666;
		width: 170px;
		dt {
			font-weight: 600;
			font-size: 18px;
			color: #ffffff;
			line-height: 28px;
			margin-bottom: 30px;
			.icon {
				margin-right: 20px;
			}
		}
		dd {
			font-weight: 400;
			font-size: 14px;
			color: #999999;
			line-height: 18px;
			margin-bottom: 5px;
		}
	}
	dl:first-child {
		border-left: none;
		padding-left: 70px;
	}
}
</style>
