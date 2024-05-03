<template>
	<div :class="overallDisplayClass">
		<image :src='searchUrl' :class='searchClass'></image>
		<input :class='chooseClass' :placeholder='choosePlaceholder' v-model="input">
		<div :class="searchButtonClass" @click="search">
			确定
		</div>
	</div>
	<div :class='nowLocationDisplayClass'>
		<div :class='nowLocationClass'>
			当前地点：
		</div>
		<div :class='LocationClass' @click="chooseCity(Location)">
			{{ Location }}
		</div>
		<image :src='refreshURL' :class='refreshClass' @click='refresh'></image>
	</div>
	<div :class='LocationDisplayClass'>
		<li v-for="city in cityList">
			<div :class="cityClass" @click="chooseCity(city)">
				{{ city }}
			</div>
		</li>
	</div>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				
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
				
				LocationDisplayClass: 'LocationDisplay',
				
				cityList: [],
				cityClass: 'class',
				
				searchButtonClass: 'searchButton',
				input: ''
			}
		},
		methods: {
			refresh(){
				
			},
			chooseCity(city){
				this.$store.state.location = city
				this.$store.state.lastPage = 1
				uni.redirectTo({
					url: '/pages/main/main'
				})
			},
			search(){
				if(this.cityList.indexOf(this.input) != -1){
					this.chooseCity(this.input)
				}
			}
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + "location/city/get/",
				method: "GET",
				success(res) {
					const cityList = res.data.cityList
					const len = cityList.length
					for(let i = 0;i < len;i ++){
						self.cityList.push(cityList[i])
					}
				}
			})
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
		width: 550rpx;
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
	.class{
		display: inline-flex;
		width: 75px;
		height: 30px;
		margin-top: 40rpx;
		margin-left: 30rpx;
		background-color: #f0f0f0;
		justify-content: center;
		align-items: center;
	}
	.searchButton{
		margin-top: 10rpx;
		margin-left: 20rpx;
		color: white;
	}
</style>
