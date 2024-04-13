<template>
	<div :class='backgroundClass'>
		<div :class='addLocationBarClass' @click="location">
			地点
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				backgroundClass: 'background',
				screenHeightRpx: '',
				
				addLocationBarClass: 'powerBar1'
			}
		},
		methods: {
			location(){
				uni.navigateTo({
					url: "/pages/locationManage/locationManage"
				})
			}
		},
		mounted(){
			const self = this
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + 'rpx'
				}
			})
			
		}
	}
</script>

<style>
	.background{
		position: fixed;
		width: 750rpx;
		height: v-bind('screenHeightRpx');
		background-color: #fafafa;
	}
	.powerBar1{
		width: 750rpx;
		height: 75rpx;
		background-color: #ffffff;
		display: inline-flex;
		padding-left: 20rpx;
		align-items: center;
	}
	.powerBar2{
		width: 750rpx;
		height: 50rpx;
		background-color: #ffffff;
		margin-top: 20rpx;
		background-clip: content-box;
	}
</style>
