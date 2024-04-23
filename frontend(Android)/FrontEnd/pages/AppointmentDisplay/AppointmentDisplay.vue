<template>
	<view :class="backgroundClass">
		<view :class="informationDisplayClass">
			<image :class="pictureClass"></image>
			<view :class="introductionDisplayClass">
				<view :class="nameClass">
					{{ name }}
				</view>
				<view :class="ageClass">
					{{ age + '岁' }}
				</view>
				<view :class="eduClass">
					{{ edu }}
				</view>
				<view :class="introductionClass">
					{{ "简介：" + introduction }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				backgroundClass: 'background',
				screenHeightRpx: '0rpx',
				
				informationDisplayClass: 'informationDisplay',
				pictureClass: 'picture',
				introductionDisplayClass: 'introductionDisplay',
				
				nameClass: 'name',
				ageClass: 'age',
				eduClass: 'edu',
				introductionClass: 'introduction',
				
				name: null,
				age: null,
				edu: null,
				introduction: null
			}
		},
		methods: {
			
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + 'appointment/display/initial',
				methods: 'GET',
				data: {
					clinic: self.$store.state.clinicId,
					doctor: self.$store.state.doctorId
				},
				success(res) {
					self.name = res.data.name
					self.age = res.data.age
					self.edu = res.data.edu
					self.introduction = res.data.introduction
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + 'rpx'
				}
			})
		}
	}
</script>

<style>
	.informationDisplay{
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
		margin-left: 50rpx;
	}
	.picture{
		width: 250rpx;
		height: 350rpx;
		background-color: gray;
	}
	.introductionDisplay{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.background{
		position: fixed;
		width: 750rpx;
		height: v-bind('screenHeightRpx');
		background-color: #fafafa;
	}
	.name{
		font-size: 100rpx;
		color: #303030;
	}
	.age{
		font-size: 30rpx;
		color: #303030;
	}
	.edu{
		font-size: 40rpx;
		color: #303030;
	}
	.introduction{
		font-size: 20rpx;
		color: #a0a0a0;
	}
</style>
