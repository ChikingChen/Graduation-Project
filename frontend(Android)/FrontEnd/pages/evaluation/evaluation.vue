<template>
	<view :class="overallClass">
		<div :class="clinicClass">
			{{ "诊所：  " + clinic }}
		</div>
		<div :class="doctorClass">
			{{ "医生：  " + doctor }}
		</div>
		<div :class="serviceClass">
			{{ "服务：  " + service }}
		</div>
		<div :class="markClass">
			{{ "分数：" }}
			<li v-for="(star, index) in starList" :key="index">
				<image :src="starList[index]" :class="starClass"
					@click="starClick(index)"></image>
			</li>
		</div>
		<div :class="contentClass">
			<textarea placeholder="请输入你的评价" :class="textClass" 
				@input="typein" v-model="input">
			</textarea>
			<div :class="inputClass">
				{{ input.length + "/140" }}
			</div>
		</div>
	</view>
	<button :class="loginButtonClass" @click="submmit">
		评价
	</button>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				
				clinicId: null,
				clinic: null,
				doctorId: null,
				doctor: null,
				service: null,
				mark: 0,
				input: "",
				
				overallClass: 'overall',
				clinicClass: 'clinic',
				doctorClass: 'doctor',
				serviceClass: 'service',
				markClass: 'mark',
				starClass: 'star',
				contentClass: 'content',
				textClass: 'text',
				inputClass: 'input',
				loginButtonClass: 'loginButton',
				
				starList: []
			}
		},
		methods: {
			starClick(index){
				this.mark = index
				for(let i = 4;i > index;i --) this.starList[i] = '/static/star0.png'
				for(let i = index;i >= 0;i --) this.starList[i] = '/static/star1.png'
			},
			submmit(){
				const self = this
				uni.request({
					url: self.BaseURL + 'comment/submmit/',
					method: 'GET',
					data: {
						id: self.$store.state.appointmentId,
						account: self.$store.state.loginAccount,
						comment: self.input,
						mark: self.mark + 1
					}
				})
				uni.showToast({
					title: "评价成功"
				})
				uni.redirectTo({
					url: '/pages/evaluationDisplay/evaluationDisplay'
				})
			}
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + 'comment/information/',
				method: 'GET',
				data: {
					appointmentId: self.$store.state.appointmentId
				},
				success(res) {
					self.clinicId = res.data.clinicId
					self.clinic = res.data.clinic
					self.doctorId = res.data.doctorId
					self.doctor = res.data.doctor
					self.service = res.data.service
				}
			})
			for(let i = 0;i < 5;i ++) self.starList.push('/static/star0.png')
		}
	}
</script>

<style>
	.clinic{
		width: 700rpx;
		padding-left: 10rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #f0f0f0;
	}
	.doctor{
		width: 700rpx;
		padding-left: 10rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #f0f0f0;
	}
	.service{
		width: 700rpx;
		padding-left: 10rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #f0f0f0;
	}
	.mark{
		display: flex;
		flex-direction: row;
		width: 700rpx;
		padding-left: 10rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		border-bottom: 1px solid #f0f0f0;
	}
	.overall{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.star{
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}
	.content{
		width: 700rpx;
		border: 1px solid #f0f0f0;
		border-radius: 20rpx;
		margin-top: 50rpx;
	}
	.text{
		margin-top: 10rpx;
		margin-left: 25rpx;
		width: 650rpx;
		height: 340rpx;
	}
	.input{
		color: #a0a0a0;
		margin-left: 600rpx;
		margin-bottom: 10rpx;
	}
	.loginButton{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #ff56c0;
		width: 550rpx;
		height: 75rpx;
		margin-top: 50rpx;
		border-radius: 50rpx;
	}
</style>
