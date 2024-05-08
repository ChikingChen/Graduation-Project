<template>
	<div :class='backgroundClass'>
		<div :class='nameBarClass' @click="personClick">
			<div :class='avatarClass'></div>
			<div :class='nameClass'>
				{{ name }}
			</div>
		</div>
		<div :class='optionDisplayClass'>
			<div :class='optionClass' v-if='power >= 2' @click='manage'>
				管理
			</div>
			<div :class="optionClass" @click="appointment">
				预约
			</div>
			<div :class="optionClass" @click="evaluation">
				评价
			</div>
			<div :class="optionClass" @click="star">
				收藏
			</div>
			<div :class="optionClass" @click="message">
				信息
			</div>
		</div>
	</div>
</template>

<script>
import { inject } from 'vue';
	export default {
		data() {
			return {
				name: '游客',
				loginAccount: '',
				backgroundClass: 'background',
				BaseURL: inject('BaseURL'),
				power: 0,
				
				screenHeightRpx: '',
				
				nameBarClass: 'nameBar',
				nameClass: 'name',
				avatarClass: 'avatar',
				
				optionClass: 'option',
				optionDisplayClass: 'optionDisplay'
			}
		},
		methods: {
			changeMessage() {
				this.test = 'this is another test'
			},
			manage(){
				uni.navigateTo({
					url: '/pages/manage/manage'
				})
			},
			appointment(){
				uni.navigateTo({
					url: '/pages/PersonAppointment/PersonAppointment'
				})
			},
			evaluation(){
				uni.navigateTo({
					url: "/pages/evaluationDisplay/evaluationDisplay"
				})
			},
			star(){
				uni.navigateTo({
					url: "/pages/personEvaluation/personEvaluation"
				})
			},
			personClick(){
				this.$store.commit("getAccount", this.$store.state.loginAccount)
				uni.navigateTo({
					url: "/pages/personPage/personPage"
				})
			},
			message(){
				uni.navigateTo({
					url: "/pages/message/message"
				})
			}
		},
		mounted() {
			const self = this
			self.loginAccount = self.$store.state.loginAccount
			uni.request({
				url: self.BaseURL + 'personality/name/',
				method: 'GET',
				data: {
					email: self.loginAccount
				},
				success: function(res){
					self.name = res.data.nickname
					self.$store.state.power = self.power = res.data.power
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + 'rpx'
				}
			})
		},
		created() {
			if(this.$store.state.loginAccount == null){
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.nameBar{
		height: 200rpx;
		width: 750rpx;
		border-bottom: 2px #ff56c0 solid;
		border-top: 2px #ff56c0 solid;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffffff content-box;
		margin-top: 100rpx;
	}
	.name{
		font-size: 50rpx;
		margin-left: 200rpx;
	}
	.avatar{
		background-color: #707070;
		height: 100rpx;
		width: 100rpx;
		border-radius: 50rpx;
	}
	.background{
		position: fixed;
		width: 750rpx;
		height: v-bind('screenHeightRpx');
		background-color: #fafafa;
	}
	.option{
		background-color: #ffffff;
		width: 750rpx;
		height: 75rpx;
		display: inline-flex;
		align-items: center;
		padding-left: 20rpx;
		border-top: 1px #f0f0f0 solid;
		border-bottom: 1px #f0f0f0 solid;
		margin: -1rpx;
	}
	.optionDisplay{
		display: flex;
		margin-top: 50rpx;
		flex-direction: column;
	}
</style>