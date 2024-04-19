<template>
	<scroll-view scroll-y="true">
		<view :class="countyDisplayClass">
			<li v-for="(county, index) in countyList" :key="index">
				<view :class="countyClass(index)" @click="countyClick(index)">
					{{ county }}
				</view>
			</li>
		</view>
	</scroll-view>
	<view v-for="(name, index) in nameList" :key='index'>
		<div :class="clinicClass">
			<div :class="picClass"></div>
			<div :class="informationClass">
				<div :class="nameClass">
					{{ name }}
				</div>
				<div :class="locationClass">
					{{ locationList[index] }}
				</div>
				<div :class="timeClass">
					{{ timeList[index] }}
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default{
		data(){
			return{
				loginAccount: '',
				location: '',
				BaseURL: inject('BaseURL'),
				
				countyList: [],
				locationList: [],
				timeList: [],
				nameList: [],
				
				countyIndex: 0,
				
				countyDisplayClass: 'countyDisplay',
				clinicClass: 'clinic',
				picClass: 'pic',
				informationClass: 'information',
				locationClass: 'location',
				nameClass: 'name',
				timeClass: 'time',
				
				scrollX: 'false'
			}
		},
		methods: {
			countyClass(index){
				return index == this.countyIndex ? 'countyChoose' : 'countyNoChoose'
			},
			countyClick(index){
				this.countyIndex = index
				const self = this
				uni.request({
					url: self.BaseURL + 'appointment/clinic/get/',
					method: 'GET',
					data: {
						city: self.location,
						county: self.countyList[index]
					},
					success(res) {
						self.locationList = []
						self.nameList = []
						self.timeList = []
						const locationList = res.data.locationList
						const timeList = res.data.timeList
						const nameList = res.data.nameList
						const len = nameList.length
						for(let i = 0;i < len;i ++){
							self.locationList.push(locationList[i])
							self.timeList.push(timeList[i])
							self.nameList.push(nameList[i])
						}
					}
				})
			}
		},
		mounted() {
			const self = this
			this.loginAccount = this.$store.state.loginAccount
			if(this.$store.state.location != ""){
				this.location = this.$store.state.location
			}else{
				uni.redirectTo({
					url: '/pages/locationChoose/locationChoose'
				})
				return
			}
			console.log(123)
			uni.request({
				url: self.BaseURL + 'appointment/initial/',
				method: 'GET',
				data: {
					city: self.location
				},
				success(res) {
					const countyList = res.data.countyList
					const countyLen = countyList.length
					for(let i = 0;i < countyLen;i ++){
						self.countyList.push(countyList[i])
					}
					const locationList = res.data.locationList
					const timeList = res.data.timeList
					const nameList = res.data.nameList
					const len = locationList.length
					for(let i = 0;i < len;i ++){
						self.locationList.push(locationList[i])
						self.timeList.push(timeList[i])
						self.nameList.push(nameList[i])
					}
				}
			})
		}
	}
</script>

<style>
	.countyDisplay{
		display: flex;
		flex-direction: row;
		width: 750rpx;
	}
	.countyNoChoose{
		border: 2px #f0f0f0 solid;
		width: 150rpx;
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.countyChoose{
		border-top: 2px #f0f0f0 solid;
		border-left: 2px #f0f0f0 solid;
		border-right: 2px #f0f0f0 solid;
		width: 150rpx;
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.clinic{
		width: 750rpx;
		height: 200rpx;
		border-bottom: 2px #f0f0f0 solid;
		border-top: 2px #f0f0f0 solid;
		display: flex;
		flex-direction: row;
	}
	.pic{
		width: 200rpx;
		height: 200rpx;
		background-color: #707070;
	}
	.information{
		display: flex;
		flex-direction: column;
	}
	.name{
		margin-left: 20rpx;
	}
	.location{
		margin-left: 20rpx;
		font-size: 30rpx;
		color: #707070;
	}
	.time{
		margin-left: 20rpx;
		font-size: 20rpx;
		color: #a0a0a0;
	}
</style>
