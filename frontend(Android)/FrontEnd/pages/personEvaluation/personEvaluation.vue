<template>
	<view :class="backgroundClass">
		<div v-for="(star, index) in starList" :key="index"
			:class="starBlockClass" @click="clickStar(index)">
			<div :class="contentClass">
				{{ starList[index].content }}
			</div>
			<div :class="informationDisplayClass">
				<image :class="avatarClass"></image>
				<div :class="nicknameClass">
					{{ starList[index].name }}
				</div>
				<image :class="likeClass" :src="likeImg(index)"
				@click.stop="likeClick(index)"></image>
				<div :class="likeCountClass">
					{{ starList[index].likeCount }}
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				backgroundClass: 'background',
				screenHeightRpx: '',
				BaseURL: inject('BaseURL'),
				
				starBlockClass: 'starBlock',
				contentClass: 'content',
				informationDisplayClass: 'informationDisplay',
				avatarClass: 'avatar',
				nicknameClass: 'nickname',
				likeClass: 'like',
				likeCountClass: 'likeCount',
				
				starList: null
			}
		},
		methods: {
			likeImg(index){
				return this.starList[index].havelike ? '/static/like1.png' : '/static/like0.png'
			},
			likeClick(index){
				const self = this
				this.starList[index].havelike = !this.starList[index].havelike
				if(this.starList[index].havelike){
					this.starList[index].likeCount += 1
					uni.request({
						url: self.BaseURL + 'comment/makelike/',
						method: 'GET',
						data: {
							commentId: self.starList[index].commentId,
							account: self.$store.state.loginAccount
						}
					})
				}else{
					this.starList[index].likeCount -= 1
					uni.request({
						url: self.BaseURL + 'comment/dislike/',
						method: 'GET',
						data: {
							commentId: self.starList[index].commentId,
							account: self.$store.state.loginAccount
						}
					})
				}
			},
			clickStar(index){
				console.log(123)
				this.$store.commit("getComment", this.starList[index].commentId)
				uni.navigateTo({
					url: '/pages/comment/comment'
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
				url: self.BaseURL + 'star/get/',
				method: 'GET',
				data: {
					account: self.$store.state.loginAccount
				},
				success(res) {
					self.starList = res.data.starList
					console.log(self.starList)
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
		flex-direction: row;
		flex-wrap: wrap;
	}
	.starBlock{
		margin-top: 10rpx;
		margin-left: 10rpx;
		border-radius: 10rpx;
		width: 350rpx;
		height: 140rpx;
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.content{
		margin-left: 10rpx;
		margin-top: 10rpx;
		font-size: 35rpx;
	}
	.informationDisplay{
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
		margin-left: 10rpx;
		align-items: center;
	}
	.avatar{
		width: 50rpx;
		height: 50rpx;
		background-color: gray;
		border-radius: 25rpx;
	}
	.nickname{
		font-size: 25rpx;
		margin-left: 10rpx;
		color: #a0a0a0;
	}
	.like{
		width: 50rpx;
		height: 50rpx;
		margin-left: 120rpx;
	}
	.likeCount{
		margin-left: 10rpx;
		font-size: 40rpx;
		color: #a0a0a0;
	}
</style>
