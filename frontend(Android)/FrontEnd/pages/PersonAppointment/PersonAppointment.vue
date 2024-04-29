<template>
	<scroll-view :class='backgroundClass' scroll-y="true">
		<li v-for="(id, index) in idList" :class="AppointmentBlockClass" :key="index">
			<div :class="titleClass">
				{{ "就诊人：  " + name }}
				<div :class="stageClass">
					{{ stageList[index] }}
				</div>
			</div>
			<div :class="clinicClass">
				{{ "诊所：  " + clinicList[index] }}
			</div>
			<div :class="doctorClass">
				{{ "医生：  " + doctorNameList[index] }}
			</div>
			<div :class="serviceClass">
				{{ "服务：  " + serviceList[index] }}
			</div>
			<div :class="timeClass">
				{{ "时间：  " + dateList[index] + "  " 
					+ startList[index] + ' -- ' + endList[index] }}
			</div>
			<button :class="evalClass" v-if="stageList[index] == '未评价'"
			@click="clickEval(index)">
				{{ "评价" }}
				<image src="../../static/right.png" :class="arrowClass"></image>
			</button>
		</li>
	</scroll-view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				backgroundClass: 'background',
				screenHeightRpx: '',
				BaseURL: inject('BaseURL'),
				
				AppointmentBlockClass: "AppointmentBlock",
				titleClass: "title",
				doctorClass: "doctor",
				clinicClass: "clinic",
				timeClass: 'time',
				stageClass: 'stage',
				serviceClass: 'service',
				evalClass: 'eval',
				arrowClass: 'arrow',
				
				idList: [],
				dateList: [],
				startList: [],
				endList: [],
				doctorIdList: [],
				clinicList: [],
				doctorNameList: [],
				serviceList: [],
				stageList: [],
				
				name: null
			}
		},
		methods: {
			clickEval(index){
				this.$store.commit("getAppointment", this.idList[index])
				uni.redirectTo({
					url: '/pages/evaluation/evaluation'
				})
			}
		},
		mounted() {
			const self = this
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight 
						/ res.screenWidth * 750) - 180 + 'rpx'
				}
			})
			uni.request({
				url: self.BaseURL + 'appointment/get/',
				method: 'GET',
				data: {
					patient: self.$store.state.loginAccount
				},
				success(res) {
					const idList = res.data.idList
					const dateList = res.data.dateList
					const startList = res.data.startList
					const endList = res.data.endList
					const doctorIdList = res.data.doctorIdList
					const clinicList = res.data.clinicList
					const doctorNameList = res.data.doctorNameList
					const serviceList = res.data.serviceList
					const stageList = res.data.stageList
					const len = idList.length
					for(let i = 0;i < len;i ++){
						self.idList.push(idList[i])
						self.dateList.push(dateList[i].slice(dateList[i][5] == '0' ? 6 : 5, 7)
							+ '月' + dateList[i].slice(8) + '日')
						self.startList.push(startList[i].slice(0, 5))
						self.endList.push(endList[i].slice(0, 5))
						self.doctorIdList.push(doctorIdList[i])
						self.clinicList.push(clinicList[i])
						self.doctorNameList.push(doctorNameList[i])
						self.serviceList.push(serviceList[i])
						self.stageList.push(stageList[i])
						self.serviceList.push(serviceList[i])
					}
				}
			})
			uni.request({
				url: self.BaseURL + 'name/get/',
				method: 'GET',
				data: {
					email: self.$store.state.loginAccount
				},
				success(res) {
					self.name = res.data.name
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
	.AppointmentBlock{
		width: 700rpx;
		background-color: white;
		border-radius: 30rpx;
		margin-left: 25rpx;
		margin-top: 50rpx;
		border: 1px solid #f0f0f0;
	}
	.title{
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-bottom: 1px solid #f0f0f0;
		padding-bottom: 10rpx;
	}
	.stage{
		margin-left: 380rpx;
	}
	.doctor{
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.clinic{
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.time{
		margin-left: 10rpx;
		margin-top: 30rpx;
		margin-bottom: 50rpx;
	}
	.service{
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.eval{
		margin-left: 10rpx;
		margin-top: -20rpx;
		margin-bottom: 30rpx;
		width: 200rpx;
		height: 75rpx;
		display: flex;
		flex-direction: row;
		border-radius: 30rpx;
		background-color: #dbba35;
		border: none;
		justify-content: center;
		align-items: center;
	}
	.arrow{
		height: 75rpx;
		width: 75rpx;
	}
</style>
