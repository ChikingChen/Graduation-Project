<template>
	<div :class='backgroundClass'>
		<li v-for='(nickname, index) in nicknameList' :key="index">
			<div :class="nicknameDisplayClass">
				<div :class="nicknameClass">
					<input v-model="nicknameList[index]" 
					@focus="getOldNickName(nicknameList[index])" 
					@blur="getNewNickName(nicknameList[index], index)">
				</div>
				<image :src="arrowList[index]" :class="arrowClass" @click='select(index)'></image>
			</div>
			<div :class="informationDisplayClass">
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div>昵称：</div>
					<input v-model="nicknameShow"
					@focus="getOldNickName(nicknameShow)" 
					@blur="getNewNickName(nicknameShow, index)">
				</div>
				<div v-if="index == accountShowIndex" :class="informationClass">
					{{ "邮箱：" + emailShow }}
				</div>
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div>密码：</div>
					<input v-model="pswordShow" :class='pswordClass'
					@focus="getOldPsword(pswordShow)"
					@blur="getNewPsword(pswordShow, index)">
				</div>
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div>权限：</div>
					<input v-model="powerShow"
					@focus="getOldPower(powerShow)"
					@blur="getNewPower(powerShow, index)">
					<div>{{ power }}</div>
				</div>
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div :class="doctorBelongClass">所属诊所</div>
					<image :src="doctorBelongArrow" :class="arrowClass" @click='doctorBelong(index)'></image>
				</div>
				<li v-if="index == accountShowIndex && moreIndex == 1"
					v-for="(clinic , index) in doctorBelongList" :key="index">
					
				</li>
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div :class="clinicBelongClass">管辖诊所</div>
					<image :src="clinicBelongArrow" :class="arrowClass" @click='clinicBelong(index)'></image>
				</div>
				<li v-if="index == accountShowIndex && moreIndex == 2" 
					v-for="(manage, index) in clinicBelongList" :key="index">
					
				</li>
				<div v-if="index == accountShowIndex" :class="informationClass">
					<div :class='appointmentClass'>预约记录</div>
					<image :src="appointmentArrow" :class="arrowClass" @click='appointment(index)'></image>
				</div>
				<li v-if="index == accountShowIndex && moreIndex == 3"
					v-for="(appointment, index) in appointmentList" :key="index">
					
				</li>
			</div>
		</li>
	</div>
	<!--
	账号权限：
		批量生成账号（批量生成的账号只有用户名没有邮箱且以%开头指定英文前缀以及后续数字）
		删除账号
		删除批量账号
		设定指定用户权限
	账号信息：
		邮箱
		用户名
		密码
		权限
		医生所属的诊所
		管辖的诊所
		预约记录
	-->
</template>

<script>
	import { inject } from 'vue'
	
	export default {
		data() {
			return {
				screenHeightRpx: null,
				backgroundClass: "background",
				BaseURL: inject("BaseURL"),
				power: null,
				
				nicknameList: [],
				emailList: [],
				arrowList: [],
				doctorBelongList: [],
				clinicBelongList: [],
				appointmentList: [],
				
				nicknameClass: 'nickname',
				nicknameDisplayClass: 'nicknameDisplay',
				arrowClass: 'arrow',
				informationClass: 'information',
				informationDisplayClass: 'informationDisplay',
				pswordClass: 'psword',
				doctorBelongClass: 'more',
				clinicBelongClass: 'more',
				appointmentClass: 'more',
				
				doctorBelongArrow: '/static/left.png',
				clinicBelongArrow: '/static/left.png',
				appointmentArrow: '/static/left.png',
				
				oldNickname: null,
				newNickname: null,
				oldPsword: null,
				newPsword: null,
				oldPower: null,
				newPower: null,
				accountShowIndex: -1,
				moreIndex: -1,
				
				nicknameShow: null,
				emailShow: null,
				pswordShow: null,
				powerShow: null,
				
			}
		},
		methods: {
			getOldNickName(nickname){
				this.oldNickname = nickname
			},
			getNewNickName(nickname, index){
				this.newNickname = nickname
				if(this.oldNickname == this.newNickname) return
				const email = this.emailList[index]
				const self = this
				uni.request({
					url: self.BaseURL + 'account/modify/nickname/',
					method: 'GET',
					data: {
						email: email,
						nickname: self.newNickname
					}
				})
			},
			getOldPsword(pswordShow){
				this.oldPsword = pswordShow
			},
			getNewPsword(pswordShow, index){
				this.newPsword = pswordShow
				if(this.oldPsword == this.newPsword) return
				const email = this.emailList[index]
				const self = this
				uni.request({
					url: self.BaseURL + 'account/modify/psword/',
					method: 'GET',
					data: {
						email: email,
						psword: self.newPsword
					}
				})
			},
			getOldPower(powerShow){
				this.oldPower = powerShow
			},
			getNewPower(powerShow, index){
				this.newPower = powerShow
				if(this.oldPower == this.newPower) return
				if(this.newPower == 1 || this.newPower == 2){
					this.powerShow = this.oldPower
					return
				}
				const email = this.emailList[index]
				const self = this
				uni.request({
					url: self.BaseURL + 'account/modify/power',
					method: 'GET',
					data: {
						email: email,
						power: self.newPower
					}
				})
			},
			select(index){
				if(index == this.accountShowIndex){ // 关闭当前页面
					this.accountShowIndex = -1
					this.arrowList[index] = '/static/left.png'
				}else{ // 开启当前页面
					if(this.accountShowIndex == -1){ // 在此之前没有被开启的页面
						this.accountShowIndex = index
						this.arrowList[index] = '/static/down.png'
					}else{ // 在此之前有被开启的页面
						this.arrowList[this.accountShowIndex] = '/static/left.png'
						this.accountShowIndex = index
						this.arrowList[index] = '/static/down.png'
					}
					const self = this
					uni.request({
						url: self.BaseURL + 'account/information/',
						method: 'GET',
						data: {
							email: self.emailList[index]
						},
						success(res) {
							self.emailShow = res.data.email
							self.pswordShow = res.data.psword
							self.nicknameShow = res.data.nickname
							self.powerShow = res.data.power
						}
					})
				}
				this.moreIndex = -1
				this.doctorBelongArrow = this.clinicBelongArrow = this.appointmentArrow = '/static/left.png'
			},
			doctorBelong(index){ // moreIndex = 1
				if(this.moreIndex == 1){
					this.moreIndex = -1
					this.doctorBelongArrow = '/static/left.png'
				}else{
					if(this.moreIndex == 2){
						this.clinicBelongArrow = '/static/left.png'
					}else if(this.moreIndex == 3){
						this.appointmentArrow = '/static/left.png'
					}
					this.moreIndex = 1
					this.doctorBelongArrow = '/static/down.png'
				}
			},
			clinicBelong(index){ // moreIndex = 2
				if(this.moreIndex == 2){
					this.moreIndex = -1
					this.clinicBelongArrow = '/static/left.png'
				}else{
					if(this.moreIndex == 1){
						this.doctorBelongArrow = '/static/left.png'
					}else if(this.moreIndex == 3){
						this.appointmentArrow = '/static/left.png'
					}
					this.moreIndex = 2
					this.clinicBelongArrow = '/static/down.png'
				}
			},
			appointment(index){ // moreIndex = 3
				if(this.moreIndex == 3){
					this.moreIndex = -1
					this.appointmentArrow = '/static/left.png'
				}else{
					if(this.moreIndex == 1){
						this.doctorBelongArrow = '/static/left.png'
					}else if(this.moreIndex == 2){
						this.clinicBelongArrow = '/static/left.png'
					}
					this.moreIndex = 3
					this.appointmentArrow = '/static/down.png'
				}
			}
		},
		mounted(){
			const self = this
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + 'rpx'
				}
			})
			uni.request({
				url: self.BaseURL + 'account/get/',
				method: "GET",
				success(res) {
					const nicknameList = res.data.nicknameList
					const emailList = res.data.emailList
					const len = nicknameList.length
					for(let i = 0;i < len;i ++){
						self.nicknameList.push(nicknameList[i])
						self.emailList.push(emailList[i])
						self.arrowList.push('/static/left.png')
					}
				}
			})
		},
		computed: {
			power(){
				if(this.powerShow == 0){
					return "普通用户"
				}else if(this.powerShow == 1){
					return "医生"
				}else if(this.powerShow == 2){
					return "诊所"
				}else if(this.powerShow == 3){
					return "管理员"
				}else if(this.powerShow == 4){
					return "高级管理员"
				}else{
					return "权限错误"
				}
			}
		}
	}
</script>

<style>
	.background{
		position: fixed;
		width: 750rpx;
		height: v-bind('screenHeightRpx');
		background-color: #fafafa;
		display: flex;
		flex-direction: column;
	}
	.nickname{
		width: 750rpx;
		height: 75rpx;
		background-color: #ffffff;
		display: inline-flex;
		padding-left: 20rpx;
		align-items: center;
	}
	.nicknameDisplay{
		display: flex;
		flex-direction: row;
	}
	.arrow{
		width: 75rpx;
		height: 75rpx;
		background-color: #ffffff;
	}
	.information{
		margin-top: 2rpx;
		height: 75rpx;
		width: 650rpx;
		background-color: #ffffff;
		display: inline-flex;
		align-items: center;
		padding-left: 20rpx;
		font-size: 30rpx;
	}
	.informationDisplay{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.psword{
		width: 500rpx;
	}
	.more{
		width: 600rpx;
	}
</style>
