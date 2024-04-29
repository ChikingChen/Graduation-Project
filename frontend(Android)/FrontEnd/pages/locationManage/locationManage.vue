<template>
	<div :class='backgroundClass'>
		<li v-for="(city, index) in cityList" :class='countyDisplayClass' :key="index">
			<div :class='chooseClass'>
				<div :class='cityClass'>
					<input v-model='cityList[index]' 
					@focus="getCityOldName(city)" 
					@blur="getCityNewName(city, index)">
				</div>
				<image :src="triangleStyle(index)" :class='imgClass' @click="img(index, city)">
				</image>
			</div>
			<li v-for="(county, index) in countyList" 
			v-if="index == cityShowIndex" :key="index">
				<div :class='countyClass'>
					<input v-model='countyList[index]' 
					@focus="getCountyOldName(county)" 
					@blur="getCountyNewName(city, county, index)">
				</div>
			</li>
			<div :class='countyClass' v-if="index == cityShowIndex">
				<input v-model='newCounty' 
				@focus="getCountyOldName(newCounty)" 
				@blur="getCountyNewName(city, newCounty)">
			</div>
		</li>
		<div :class='cityClass' v-if='cityShowIndex == -1'>
			<input v-model='newCity' 
			@focus="getCityOldName(newCity)" 
			@blur="getCityNewName(newCity)">
		</div>
	</div>
</template>

<script>
	import { computed, inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				cityList: null,
				countyList: null,
				cityShowIndex: -1,
				screenHeightRpx: "0rpx",
				
				backgroundClass: 'background',
				cityClass: 'city',
				countyClass: 'county',
				imgClass: 'img',
				chooseClass: 'choose',
				countyDisplayClass: 'countyDisplay',
				
				srcUrl: [],
				newCounty: '',
				newCity: '',
				oldCountyName: '',
				oldCityName: ''
			}
		},
		methods: {
			img(index, city){
				const self = this
				if(this.srcUrl[index] == '/static/left.png'){
					this.srcUrl[index] = '/static/down.png'
					uni.request({ // 获取县名
						url: self.BaseURL + 'location/county/get/',
						method: 'GET',
						data:{
							city: city
						},
						success(res) {
							self.countyList = res.data.countyList
						}
					})
					self.cityShowIndex = index
				}else{
					this.srcUrl[index] = '/static/left.png'
					self.cityShowIndex = -1
				}
			},
			getCountyOldName(county){
				this.oldCountyName = county
			},
			getCountyNewName(city, county, index){
				const self = this
				if(self.oldCountyName == county) return
				else{
					if(self.newCounty != ''){ // 添加新的县
						uni.request({
							url: self.BaseURL + 'location/county/add/',
							method: 'GET',
							data: {
								city: city,
								county: county
							},
							success(res) {
								self.countyList.push(county)
							}
						})
						self.newCounty = ''
					}else if(self.oldCountyName != self.countyList[index]){ // 修改县名
						uni.request({
							url: self.BaseURL + 'location/county/modify/',
							method: 'GET',
							data: {
								city: city,
								oldName: self.oldCountyName,
								newName: self.countyList[index]
							}
						})
					}else if(self.countyList[index] == ''){ // 删除当前县
						uni.request({
							url: self.BaseURL + 'location/county/delete/',
							method: 'GET',
							data: {
								city: city,
								county: self.oldCountyName
							},
							success(res) {
								self.countyList.splice(index, 1)
							}
						})
					}
				}
			},
			getCityOldName(city){
				const self = this
				self.oldCityName = city
			},
			getCityNewName(city, index){
				const self = this
				if(self.oldCityName == city) return
				if(self.newCity != ''){
					uni.request({
						url: self.BaseURL + 'location/city/add/',
						method: 'GET',
						data: {
							city: city
						},
						success(res) {
							self.cityList.push(city)
						}
					})
					self.newCity = ''
				}else if(self.oldCityName != self.cityList[index]){
					uni.request({
						url: self.BaseURL + 'location/city/modify/',
						method: 'GET',
						data: {
							oldName: self.oldCityName,
							newName: self.cityList[index]
						}
					})
				}else if(self.cityList[index] == ''){
					uni.request({
						url: self.BaseURL + 'location/city/delete/',
						method: 'GET',
						data: {
							city: self.oldCityName
						},
						success(res) {
							self.cityList.splice(index, 1)
						}
					})
				}
			}
		},
		computed:{
			triangleStyle() {
				return (index) => {
					return index == this.cityShowIndex ? "/static/down.png" : "/static/left.png"
				}
			}
		},
		mounted() {
			const self = this
			uni.request({ // 获取城市名
				url: this.BaseURL + "location/city/get/",
				method: "GET",
				success: function(res) {
					self.cityList = res.data.cityList
					const city = self.cityList.length
					for(let i = 0; i < city; i++){
						self.srcUrl.push('/static/left.png')
					}
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + 'rpx'
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
	.city{
		margin-top: 2rpx;
		height: 75rpx;
		width: 750rpx;
		background-color: #ffffff;
		display: inline-flex;
		align-items: center;
		padding-left: 20rpx;
		font-size: 30rpx;
	}
	.county{
		margin-top: 2rpx;
		height: 75rpx;
		width: 650rpx;
		background-color: #ffffff;
		display: inline-flex;
		align-items: center;
		padding-left: 20rpx;
		font-size: 30rpx;
	}
	.countyDisplay{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.img{
		position: absolute;
		margin-left: 650rpx;
		width: 75rpx;
		height: 75rpx;
	}
	.choose{
		display: flex;
		flex-direction: row;
	}
</style>
