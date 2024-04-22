<template>
	<view :class="barClass">
		<view :class="nameClass">
			{{ name }}
		</view>
		<view :class="locationClass">
			{{ "地址：" + location }}
		</view>
	</view>
	<view>
		
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				barClass: 'bar',
				
				BaseURL: inject("BaseURL"),
				
				name: "",
				time: "",
				location: "",
				
				locationClass: "location",
				nameClass: "name"
			}
		},
		methods: {
			
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + 'clinic/initial/',
				method: 'GET',
				data: {
					index: self.$store.state.clinicId
				},
				success(res) {
					self.name = res.data.name
					self.time = res.data.time
					self.location = res.data.location
					console.log(self.name)
				}
			})
		}
	}
</script>

<style>
.bar{
	width: 750rpx;
	height: 150rpx;
	background-color: #ff56c0;
	color: white;
	display: flex;
	flex-direction: column;
}
.name{
	font-size: 50rpx;
}
.location{
	font-size: 20rpx;
	color: #a0a0a0;
}
</style>
