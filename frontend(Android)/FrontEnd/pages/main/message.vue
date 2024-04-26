<template>
	<view :class='backgroundClass'>
		<view v-for="(title, index) in titleList" :key="index">
			<view :class="classList[index]" @click="clickMessage(index)">
				<view :class="textClass">
					<view :class="titleClass">
						{{ titleList[index] }}
					</view>
					<view :class="timeClass">
						{{ timeList[index] }}
					</view>
					<view :class="contentClass">
						{{ contentList[index] }}
					</view>
					<button :class="evaluateClass" v-if="typeList[index] == 2"
					@click="evalClick(index)">
						{{ "评价" }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default{
		data(){
			return{
				loginAccount: '',
				BaseURL: inject('BaseURL'),
				
				idList: null,
				titleList: null,
				timeList: null,
				classList: null,
				contentList: null,
				typeList: null,
				
				titleClass: 'title',
				timeClass: 'time',
				contentClass: 'content',
				backgroundClass: 'background',
				evaluateClass: 'evaluate',
				textClass: 'text'
			}
		},
		methods: {
			clickMessage(index){
				this.classList[index] = 'haveread'
				const self = this
				uni.request({
					url: self.BaseURL + 'message/read/',
					method: 'GET',
					data: {
						id: self.idList[index]
					}
				})
			},
			evalClick(index){
				console.log(123)
			}
		},
		mounted(){
			this.loginAccount = this.$store.state.loginAccount
			const self = this
			uni.request({
				url: self.BaseURL + 'message/get/',
				method: 'GET',
				data: {
					account: self.loginAccount
				},
				success(res) {
					const messageList = res.data.messageList
					const len = messageList.length
					self.idList = []
					self.titleList = []
					self.timeList = []
					self.classList = []
					self.contentList = []
					self.typeList = []
					for(let i = 0;i < len;i ++){
						self.idList.push(messageList[i].id)
						self.titleList.push(messageList[i].title)
						self.timeList.push(messageList[i].time.slice(0, 10))
						self.classList.push(messageList[i].read ? 
						'haveread' : 'noread')
						self.contentList.push(messageList[i].content)
						self.typeList.push(messageList[i].type)
					}
					console.log(self.typeList)
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) + 'rpx'
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
	.noread{
		width: 700rpx;
		height: 300rpx;
		border: 1px #000000 solid;
		border-radius: 30rpx;
		margin-top: 50rpx;
		margin-left: 25rpx;
		background-color: white;
	}
	.haveread{
		width: 700rpx;
		height: 300rpx;
		border: 1px #a0a0a0 solid;
		border-radius: 30rpx;
		margin-top: 50rpx;
		margin-left: 25rpx;
		background-color: white;
	}
	.title{
		font-size: 50rpx;
	}
	.time{
		font-size: 30rpx;
	}
	.content{
		font-size: 20rpx;
	}
	.evaluate{
		width: 300rpx;
		height: 120rpx;
		height: 75rpx;
		width: 300rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 30rpx;
		background-color: #ff56c0;
		color: #ffffff;
	}
	.text{
		margin-left: 30rpx;
	}
</style>
