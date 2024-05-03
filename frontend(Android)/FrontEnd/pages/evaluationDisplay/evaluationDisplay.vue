<template>
	<scroll-view :class='backgroundClass' scroll-y="true">
		<li v-for="(id, index) in idList" :class="AppointmentBlockClass" :key="index">
			<div :class="titleClass">
				{{ "就诊人：  " + name }}
				<image :src="arrowList[index]" :class="arrowClass1"
					@click="arrowClick(index)"></image>
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
			<div :class="markDisplayClass" v-if="showIndex == index">
				<div :class="markClass">
					{{ "分数：" + noEvaluation }}
				</div>
				<li v-for="(star, index) in starList" :key="index">
					<image :src="starList[index]" :class="starClass"></image>
				</li>
			</div>
			<div :class="commentClass" v-if="showIndex == index">
				{{ "评价：" + noEvaluation }}
				<div :class="contentClass">
					{{ content }}
				</div>
			</div>
			<button :class="evalClass" v-if="stageList[index] == 2 
				&& showIndex == index" @click="clickEval(index)">
				{{ "评价" }}
				<image src="/static/right.png" :class="arrowClass2"></image>
			</button>
			<button :class="evalClass" v-if="stageList[index] == 3
				&& showIndex == index" @click="clickModi(index)">
				{{ "修改" }}
				<image src="/static/right.png" :class="arrowClass2"></image>
			</button>
		</li>
	</scroll-view>
</template>

<script>
	import { inject } from 'vue'
	import { useStore } from 'vuex'
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
				serviceClass: 'service',
				evalClass: 'eval',
				arrowClass1: 'arrow1',
				arrowClass2: 'arrow2',
				markClass: 'mark',
				markDisplayClass: 'markDisplay',
				starClass: 'star',
				commentClass: 'comment',
				contentClass: 'content',
				
				idList: [],
				dateList: [],
				startList: [],
				endList: [],
				doctorIdList: [],
				clinicList: [],
				doctorNameList: [],
				serviceList: [],
				arrowList: [],
				starList: [],
				stageList: [],
				
				name: null,
				content: null,
				showIndex: -1,
				noEvaluation: ""
			}
		},
		methods: {
			clickEval(index){
				this.$store.commit("getAppointment", this.idList[index])
				this.$store.commit("getEvaluationMode", "submmit")
				uni.redirectTo({
					url: '/pages/evaluation/evaluation'
				})
			},
			clickModi(index){
				this.$store.commit("getAppointment", this.idList[index])
				this.$store.commit("getEvaluationMode", "modify")
				uni.redirectTo({
					url: '/pages/evaluation/evaluation'
				})
			},
			arrowClick(index){
				const self = this
				if(self.showIndex == index){
					self.arrowList[index] = '/static/left.png'
					self.showIndex = -1
					return
				}
				if(self.stageList[index] == 2){
					self.noEvaluation = '未评价'
					self.content = ''
					self.starList = []
					self.arrowList[self.showIndex] = '/static/left.png'
					self.showIndex = index
					self.arrowList[index] = '/static/down.png'
				}else{
					self.noEvaluation = ''
					uni.request({
						url: self.BaseURL + 'comment/get/',
						method: "GET",
						data: {
							appointmentId: self.idList[index]
						},
						success(res) {
							self.content = res.data.content
							self.starList = []
							const mark = res.data.mark
							for(let i = 0;i < mark;i ++) self.starList.push('/static/star1.png')
							for(let i = mark;i < 5;i ++) self.starList.push('/static/star0.png')
						}
					})
					self.arrowList[self.showIndex] = '/static/left.png'
					self.showIndex = index
					self.arrowList[index] = '/static/down.png'
				}
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
				url: self.BaseURL + 'comment/appointment/',
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
						self.arrowList.push('/static/left.png')
						self.stageList.push(stageList[i])
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
		margin-bottom: 30rpx;
	}
	.service{
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.eval{
		margin-left: 10rpx;
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
	.arrow1{
		height: 50rpx;
		width: 50rpx;
		margin-left: 430rpx;
	}
	.arrow2{
		height: 75rpx;
		width: 75rpx;
	}
	.mark{
		margin-left: 10rpx;
	}
	.markDisplay{
		display: flex;
		flex-direction: row;
	}
	.star{
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}
	.comment{
		margin-left: 10rpx;
		margin-top: 30rpx;
	}
	.content{
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}
</style>