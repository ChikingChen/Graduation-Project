<template>
	<div :class='backgroundClass'>
		<li v-for='(nickname, index) in nicknameList' :key="index">
			<div :class="nicknameDisplayClass">
				<div :class="nicknameClass">
					<input v-model="nicknameList[index]" @focus="getOldNickName(nicknameList[index])" @blur="getNewNickName(nicknameList[index], index)">
				</div>
				<image :src="arrowList[index]" :class="arrowClass" @click='select(index)'></image>
			</div>
			<div v-if="index == accountShowIndex">
				{{ emailShow }}
			</div>
			<div v-if="index == accountShowIndex">
				{{ pswordShow }}
			</div>
			<div v-if="index == accountShowIndex">
				{{ powerShow }}
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
				
				nicknameList: [],
				emailList: [],
				arrowList: [],
				nicknameClass: 'nickname',
				nicknameDisplayClass: 'nicknameDisplay',
				arrowClass: 'arrow',
				
				oldNickname: null,
				newNickname: null,
				accountShowIndex: -1,
				
				emailShow: null,
				pswordShow: null,
				powerShow: null
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
					url: self.BaseURL + 'account/modify/',
					method: 'GET',
					data: {
						email: email,
						nickname: self.newNickname
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
						url: self.BaseURL + 'account/get/',
						method: 'GET',
						data: {
							email: self.emailList[index]
						},
						success(res) {
							
						}
					})
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
</style>
