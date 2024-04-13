<template>
	<div :class="overallDisplayClass">
		<image :src='searchUrl' :class='searchClass'></image>
		<input :class='chooseClass' :placeholder='choosePlaceholder'>
	</div>
	<div :class='nowLocationDisplayClass'>
		<div :class='nowLocationClass'>
			当前地点：
		</div>
		<div :class='LocationClass'>
			{{ Location }}
		</div>
		<image :src='refreshURL' :class='refreshClass' @click='refresh'></image>
	</div>
	<div :class='LocationDisplayClass'>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				titleClass: 'title',
				
				chooseClass: 'choose',
				choosePlaceholder: '请选择您的地点',
				
				searchUrl: '/static/search.jpeg',
				searchClass: 'img',
				
				overallDisplayClass: 'overallDisplay',
				
				nowLocationClass: 'nowLocation',
				nowLocationDisplayClass: 'nowLocationDisplay',
				LocationClass: 'Location',
				Location: '杭州',
				
				refreshURL: '/static/refresh.jpeg',
				refreshClass: 'refresh',
				
				LocationDisplayClass: 'LocationDisplay'
			}
		},
		methods: {
			refresh(){
				// 使用腾讯API获取当前地址
				
				
			}
		},
		mounted() {
			// 使用腾讯API获取当前地址
			
			
		}
	}
</script>

<style>
	.title{
		display: flex;
		justify-content: center;
		margin-top: 100rpx;
	}
	.choose{
		background-color: #f0f0f0;
		width: 600rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		border-radius: 10rpx;
		margin-left: 25rpx;
		height: 50rpx;
	}
	.overallDisplay{
		display: flex;
		flex-direction: row;
		justify-content: center;
		background-color: #ff56c0;
	}
	.img{
		height: 50rpx;
		width: 50rpx;
		margin-top: 10rpx;
	}
	.nowLocation{
		
	}
	.nowLocationDisplay{
		display: flex;
		flex-direction: row;
		margin-left: 20rpx;
		margin-top: 50rpx;
	}
	.Location{
		margin-left: 10rpx;
	}
	.refresh{
		height: 40rpx;
		width: 40rpx;
		margin-left: 20rpx;
	}
	.LocationDisplay{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
