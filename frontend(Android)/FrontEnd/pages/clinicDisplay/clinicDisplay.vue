<template>
	<view :class="backgroundClass">
		<view :class="barClass">
			<view :class="nameClass">
				{{ name }}
			</view>
			<view :class="locationClass">
				{{ "地址：" + location }}
			</view>
		</view>
		<view :class="displayClass">
			<scroll-view scroll-y=true :class="serviceDisplayClass">
				<li v-for="(service, index) in serviceList" :key="index">
					<view :class="serviceClassList[index]" 
					@click="serviceChoose(index)">
						{{ service }}
					</view>
				</li>
			</scroll-view>
			<scroll-view scroll-y=true :class="doctorDisplayClass">
				<view :class="doctorBarClass">
					<view :class="doctorClass"
					@click="doctorChoose(-1)">
						{{ "普通号" }}
					</view>
					<image src="/static/right.png" :class='arrowClass'></image>
				</view>
				<li v-for="(doctor, index) in doctorList" :key="index">
					<view :class="doctorBarClass">
						<view :class="doctorClass"
						@click="doctorChoose(index)">
							{{ doctor }}
						</view>
						<image src="/static/right.png" :class='arrowClass'></image>
					</view>
				</li>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				barClass: 'bar',
				
				BaseURL: inject("BaseURL"),
				screenHeightRpx: '',
				
				name: "",
				location: "",
				
				locationClass: "location",
				nameClass: "name",
				displayClass: 'display',
				serviceDisplayClass: 'serviceDisplay',
				doctorDisplayClass: 'doctorDisplay',
				backgroundClass: 'background',
				doctorClass: 'doctor',
				doctorBarClass: 'doctorBar',
				arrowClass: 'arrow',
				
				serviceList: [],
				doctorList: [],
				serviceClassList: [],
				idList: [],
				
				serviceIndex: 0
			}
		},
		methods: {
			serviceChoose(index){
				this.serviceClassList[this.serviceIndex] = 'serviceNotChoose'
				this.serviceIndex = index
				this.serviceClassList[this.serviceIndex] = 'serviceChoose'
				const self = this
				uni.request({
					url: self.BaseURL + 'clinic/getdoctor/',
					method: 'GET',
					data: {
						clinic: self.$store.state.clinicId,
						service: self.serviceList[index]
					},
					success(res) {
						const doctorList = res.data.nameList
						const idList = res.data.idList
						const len = doctorList.length
						self.doctorList = []
						self.idList = []
						for(let i = 0;i < len;i ++){
							self.doctorList.push(doctorList[i])
							self.idList.push(idList[i])
						}
					}
				})
				this.$store.commit("getService", this.serviceList[index])
			},
			doctorChoose(index){
				if(index == -1){
					this.$store.commit("getDoctorID", "-1")
				}else{
					this.$store.commit("getDoctorID", this.idList[index])
				}
				uni.navigateTo({
					url: '/pages/AppointmentDisplay/AppointmentDisplay'
				})
			}
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
					self.location = res.data.location
					const serviceList = res.data.serviceList
					let len = serviceList.length
					for(let i = 0;i < len;i ++){
						self.serviceList.push(serviceList[i])
						self.serviceClassList.push('serviceNotChoose')
					}
					self.serviceClassList[self.serviceIndex] = 'serviceChoose'
					const doctorList = res.data.nameList
					const idList = res.data.idList
					len = doctorList.length
					self.doctorList = []
					for(let i = 0;i < len;i ++){
						self.doctorList.push(doctorList[i])
						self.idList.push(idList[i])
					}
					self.$store.commit("getService", self.serviceList[0])
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750)
				}
			})
		}
	}
</script>

<style>
	.bar{
		width: 750rpx;
		height: 120rpx;
		background-color: #ff56c0;
		color: white;
		display: flex;
		flex-direction: column;
	}
	.name{
		font-size: 50rpx;
	}
	.location{
		font-size: 30rpx;
		color: #a0a0a0;
	}
	.display{
		display: flex;
		flex-direction: row;
	}
	.serviceChoose{
		display: flex;
		height: 100rpx;
		width: 200rpx;
		align-items: center;
		justify-content: center;
		background-color: #fafafa;
		border-bottom: 1px #f0f0f0 solid;
		border-top: 1px #f0f0f0 solid;
		margin: -1rpx;
	}
	.serviceNotChoose{
		display: flex;
		height: 100rpx;
		width: 200rpx;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-bottom: 1px #f0f0f0 solid;
		border-top: 1px #f0f0f0 solid;
		border-right: 1px #f0f0f0 solid;
		margin: -1rpx;
	}
	.serviceDisplay{
		width: 200rpx;
		height: v-bind("screenHeightRpx + 'rpx'");
		border-right: 1rpx #f0f0f0 solid;
		background-color: white;
	}
	.doctorDisplay{
		
	}
	.background{
		position: fixed;
		width: 750rpx;
		height: v-bind('screenHeightRpx');
		background-color: #fafafa;
	}
	.doctor{
		display: flex;
		align-items: center;
		height: 70rpx;
		width: 480rpx;
		border-bottom: 1px #f0f0f0 solid;
		border-top: 1px #f0f0f0 solid;
		margin: -1rpx;
		background-color: white;
		background-clip: content-box;
	}
	.doctorBar{
		display: flex;
		border-bottom: 1px #f0f0f0 solid;
		flex-direction: row;
	}
	.arrow{
		height: 70rpx;
		width: 70rpx;
		background-color: white;
	}
</style>
