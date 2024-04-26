<template>
	<view :class="backgroundClass">
		<view :class="barClass">
			<view :class="titleClass">
				{{ "预约" }}
			</view>
		</view>
		<view v-if="doctorId != -1">
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
		<view v-for="(date, index1) in datelist" 
		:class="appointmentDisplayClass" 
		:key="index1">
			<view :class="dateClass">
				{{ date }}
				<view :class="appointmentChooseDisplayClass">
					<view v-for="(appointment, index2) in appointmentlist[index1]"
					:class="appointmentClassList[index1][index2]"
					@click="getAppointment(index1, index2)">
						{{ appointment }}
					</view>
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
				doctorId: null,
				
				barClass: 'bar',
				informationDisplayClass: 'informationDisplay',
				pictureClass: 'picture',
				introductionDisplayClass: 'introductionDisplay',
				
				titleClass: 'title',
				nameClass: 'name',
				ageClass: 'age',
				eduClass: 'edu',
				introductionClass: 'introduction',
				dateClass: 'date',
				appointmentChooseDisplayClass: 'appointmentChooseDisplay',
				
				name: null,
				age: null,
				edu: null,
				introduction: null,
				datelist: null,
				appointmentlist: null,
				appointmentClassList: null,
				usedList: null
			}
		},
		methods: {
			getAppointment(index1, index2){
				if(this.usedList[index1][index2] == true) return
				const self = this
				console.log(self.appointmentlist[index1][index2].slice(7))
				if(self.$store.state.doctorId != -1){
					uni.request({
						url: self.BaseURL + 'appointment/make1/',
						method: 'GET',
						data: {
							clinic: self.$store.state.clinicId,
							doctor: self.$store.state.doctorId,
							date: self.datelist[index1],
							starttime: self.appointmentlist[index1][index2].slice(0, 5),
							endtime: self.appointmentlist[index1][index2].slice(7),
							account: self.$store.state.loginAccount
						},
						success(res) {
							self.$store.commit('getLastPage', 'AppointmentDisplay')
							uni.reLaunch({
								url: "/pages/main/main"
							})
						}
					})
				}else{
					uni.request({
						url: self.BaseURL + 'appointment/make2/',
						method: 'GET',
						data: {
							clinic: self.$store.state.clinicId,
							date: self.datelist[index1],
							starttime: self.appointmentlist[index1][index2].slice(0, 5),
							endtime: self.appointmentlist[index1][index2].slice(7),
							account: self.$store.state.loginAccount
						},
						success(res) {
							self.$store.commit('getLastPage', 'AppointmentDisplay')
							uni.reLaunch({
								url: "/pages/main/main"
							})
						}
					})
				}
			}
		},
		mounted() {
			const self = this
			self.doctorId = self.$store.state.doctorId
			if(self.$store.state.doctorId != -1){
				uni.request({
					url: self.BaseURL + 'appointment/display/initial1/',
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
						self.datelist = []
						self.appointmentlist = []
						self.appointmentClassList = []
						self.usedList = []
						const datelist = res.data.datelist
						const appointmentlist = res.data.appointmentlist
						const usedlist = res.data.usedlist
						const len = datelist.length
						for(let i = 0;i < len;i ++){
							self.datelist.push(datelist[i])
							let appointment = []
							let appointmentClass = []
							let used = []
							const len1 = appointmentlist[i].length
							for(let j = 0;j < len1;j ++){
								appointment.push(appointmentlist[i][j][0].slice(0, 5) 
								+ '--' + appointmentlist[i][j][1].slice(0, 5))
								appointmentClass.push(usedlist[i][j] ? 'appointmentClassB' : 'appointmentClassA')
								used.push(usedlist[i][j])
							}
							self.appointmentlist.push(appointment)
							self.appointmentClassList.push(appointmentClass)
							self.usedList.push(used)
						}
					}
				})
			}else{
				uni.request({
					url: self.BaseURL + 'appointment/display/initial2/',
					methods: 'GET',
					data: {
						clinic: self.$store.state.clinicId,
						service: self.$store.state.service
					},
					success(res) {
						self.datelist = []
						self.appointmentlist = []
						self.appointmentClassList = []
						self.usedList = []
						const datelist = res.data.datelist
						const appointmentlist = res.data.appointmentlist
						const len = datelist.length
						for(let i = 0;i < len;i ++){
							self.datelist.push(datelist[i])
							let appointment = []
							let appointmentClass = []
							let used = []
							const len1 = appointmentlist[i].length
							for(let j = 0;j < len1;j ++){
								appointment.push(appointmentlist[i][j][0].slice(0, 5) 
								+ '--' + appointmentlist[i][j][1].slice(0, 5))
								appointmentClass.push('appointmentClassA')
								used.push(false)
							}
							self.appointmentlist.push(appointment)
							self.appointmentClassList.push(appointmentClass)
							self.usedList.push(used)
						}
					}
				})
			}
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
	.appointmentDisplay{
		margin-top: 50rpx;
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
	.bar{
		width: 750rpx;
		height: 120rpx;
		background-color: #ff56c0;
		color: white;
		display: flex;
		flex-direction: column;
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
	.title{
		font-size: 80rpx;
	}
	.date{
		margin-left: 50rpx;
	}
	.appointmentChooseDisplay{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.appointmentClassA{
		display: inline-flex;
		justify-content: center;
		align-self: center;
		width: 130px;
		height: 26px;
		background-color: white;
		border: 1px #fafafa solid;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.appointmentClassB{
		display: inline-flex;
		justify-content: center;
		align-self: center;
		width: 250rpx;
		height: 50rpx;
		color: #a0a0a0;
		background-color: white;
		border: 1px #fafafa solid;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
</style>
