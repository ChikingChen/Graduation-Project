<template>
	<view>
		<view :class="commentClass">
			<view :class="namebarClass">
				<view :class="avatarClass"></view>
				<view :class="nicknameClass">
					{{ comment.nickname }}
				</view>
			</view>
			<view :class="markDisplayClass">
				{{ "评分：" }}
				<li v-for="(star, index) in starList" :key="index">
					<image :src="star" :class="starClass"></image>
				</li>
			</view>
			<view :class="doctorDisplayClass">
				{{ "医生：" + comment.doctor }}
			</view>
			<view :class="serviceDisplayClass">
				{{ "服务：" + comment.service }}
			</view>
			<view :class="contentClass">
				{{ comment.content }}
			</view>
			<view :class="clinicClass">
				<div :class="imgClass"></div>
				<div :class="clinicInformationDisplayClass">
					<div :class='clinicNameClass'>
						{{ comment.clinic.name }}
					</div>
					<div :class="clinicMarkClass">
						{{ "分数：" + comment.clinic.mark.toFixed(1) }}
					</div>
				</div>
				<image src='/static/right.png' :class="arrowClass"
				 @click="arrowClick"></image>
			</view>
			<view :class="informationDisplayClass">
				<view :class="dateClass">
					{{ "发布于：  " + comment.date }}
				</view>
				<view :class="commentDeleteClass" @click="commentDeleteClick"
					v-if="account == comment.account">
					删除
				</view>
			</view>
		</view>
		<view :class="followDisplayClass">
			<view :class='sumClass'>
				{{ '共' + followList.length + '条评论' }}
			</view>
			<view :class="typeinClass">
				<image :class="typeinAvatarClass"></image>
				<div :class="typeinInputClass">
					<input placeholder="分享一下你的看法吧" :class="typeinPlaceHolderClass"
						v-model="newFollow">
				</div>
				<button :class="sendClass" @click="send">
					发送
				</button>
			</view>
			<li v-for="(follow, index) in followList" :class="followClass" :key="index">
				<image :class="followAvatarClass"></image>
				<view :class="followInformationClass">
					<view :class="followNicknameClass">
						{{ follow.nickname }}
					</view>
					<view :class="followContentClass">
						{{ follow.content }}
					</view>
					<view :class="followDateClass">
						{{ follow.date }}
					</view>
				</view>
				<view :class="likeDisplayClass">
					<image :class="likeClass" :src="like(index)"
						@click="likeClick(index)"></image>
					<view>
						{{ follow.likeCount }}
					</view>
					<view :class="deleteClass" v-if="account == followList[index].account"
						@click="deleteClick(index)">
						删除
					</view>
				</view>
			</li>
		</view>
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				account: null,
				
				commentClass: 'comment',
				namebarClass: 'namebar',
				avatarClass: 'avatar',
				nicknameClass: 'nickname',
				contentClass: 'content',
				dateClass: 'date',
				followDisplayClass: 'followDisplay',
				clinicClass: 'clinic',
				imgClass: 'img',
				clinicNameClass: 'clinicName',
				clinicMarkClass: 'clinicMark',
				clinicInformationDisplayClass: 'clinicInformationDisplay',
				arrowClass: 'arrow',
				followClass: 'follow',
				followInformationClass: 'followInformation',
				followAvatarClass: 'followAvatar',
				followNicknameClass: 'followNickname',
				followContentClass: 'followContent',
				sumClass: 'sum',
				followDateClass: 'followDate',
				likeDisplayClass: 'likeDisplay',
				likeClass: 'like',
				typeinClass: 'typein',
				typeinAvatarClass: 'typeinAvatar',
				typeinInputClass: 'typeinInput',
				typeinPlaceHolderClass: 'typeinPlaceHolder',
				sendClass: 'send',
				deleteClass: 'delete',
				informationDisplayClass: 'informationDisplay',
				commentDeleteClass: 'commentDelete',
				markDisplayClass: 'markDisplay',
				doctorDisplayClass: 'doctorDisplay',
				serviceDisplayClass: 'serviceDisplay',
				starClass: "star",
				
				followList: null,
				starList: [],
				comment: null,
				newFollow: ''
			}
		},
		methods: {
			arrowClick(){
				this.$store.commit("getClinic", this.comment.clinic.id)
				uni.navigateTo({
					url: '/pages/clinicDisplay/clinicDisplay'
				})
			},
			like(index){
				return this.followList[index].havelike ? '/static/like1.png' : '/static/like0.png'
			},
			likeClick(index){
				const self = this
				if(this.followList[index].havelike){
					uni.request({
						url: self.BaseURL + 'follow/dislike/',
						method: 'GET',
						data: {
							id: self.followList[index].id,
							account: self.$store.state.loginAccount
						}
					})
					this.followList[index].havelike = false
					this.followList[index].likeCount -= 1
				}else{
					uni.request({
						url: self.BaseURL + 'follow/like/',
						method: 'GET',
						data: {
							id: self.followList[index].id,
							account: self.$store.state.loginAccount
						}
					})
					this.followList[index].havelike = true
					this.followList[index].likeCount += 1
				}
			},
			commentDeleteClick(index){
				const self = this
				uni.request({
					url: self.BaseURL + 'comment/delete/',
					method: 'GET',
					data:{
						id: self.$store.state.comment
					},
					success(res) {
						uni.showToast({
							title: '删除成功',
							success(){
								uni.navigateBack()
							}
						})
					}
				})
			},
			deleteClick(index){
				const self = this
				uni.request({
					url: self.BaseURL + 'follow/delete/',
					method: 'GET',
					data: {
						followId: self.followList[index].id
					},
					success() {
						uni.request({
							url: self.BaseURL + 'comment/initial/',
							method: 'GET',
							data: {
								id: self.$store.state.comment,
								account: self.$store.state.loginAccount
							},
							success(res) {
								self.followList = res.data.followList
								self.comment = res.data.comment
								const len = self.followList.length
								uni.showToast({
									title: '删除成功'
								})
							}
						})
					}
				})
			},
			send(){
				if(this.newFollow == ''){
					uni.showToast({
						title: '请输入内容',
						icon: 'error'
					})
					return
				}
				const self = this
				uni.request({
					url: self.BaseURL + 'follow/add/',
					method: 'GET',
					data: {
						commentId: self.$store.state.comment,
						account: self.$store.state.loginAccount,
						content: self.newFollow
					},
					success(res) {
						uni.showToast({
							title: '发布成功',
							success() {
								self.newFollow = ''
								uni.request({
									url: self.BaseURL + 'comment/initial/',
									method: 'GET',
									data: {
										id: self.$store.state.comment,
										account: self.$store.state.loginAccount
									},
									success(res) {
										self.followList = res.data.followList
										self.comment = res.data.comment
										const len = self.followList.length
									}
								})
							}
						})
					}
				})
			}
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + 'comment/initial/',
				method: 'GET',
				data: {
					id: self.$store.state.comment,
					account: self.$store.state.loginAccount
				},
				success(res) {
					self.followList = res.data.followList
					self.comment = res.data.comment
					const len = self.comment.mark
					console.log(self.comment)
					for(let i = 0;i < len;i ++) self.starList.push('/static/star1.png')
					for(let i = len;i < 5;i ++) self.starList.push('/static/star0.png')
					console.log(self.starList)
				}
			})
			self.account = self.$store.state.loginAccount
		}
	}
</script>

<style>
	.comment{
		margin-left: 25rpx;
		width: 700rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px #f0f0f0 solid;
	}
	.namebar{
		display: flex;
		flex-direction: row;
		width: 700rpx;
		border-bottom: 1px #f0f0f0 solid;
		margin-top: 10rpx;
		padding-bottom: 20rpx;
	}
	.avatar{
		height: 100rpx;
		width: 100rpx;
		border-radius: 50rpx;
		background-color: gray;
	}
	.nickname{
		font-size: 50rpx;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}
	.content{
		margin-top: 20rpx;
	}
	.date{
		color: #a0a0a0;
		font-size: 30rpx;
	}
	.followDisplay{
		margin-top: 20rpx;
		margin-left: 25rpx;
		width: 700rpx;
		border-bottom: 1px solid #f0f0f0;
	}
	.clinic{
		width: 600rpx;
		height: 200rpx;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		background-color: #f5f5f5;
		margin-left: 50rpx;
		margin-top: 20rpx;
	}
	.clinicName{
		margin-top: 25rpx;
	}
	.clinicMark{
		font-size: 25rpx;
		color: gray;
	}
	.img{
		width: 150rpx;
		height: 150rpx;
		margin-left: 25rpx;
		margin-top: 25rpx;
		background-color: gray;
	}
	.clinicInformationDisplay{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}
	.arrow{
		height: 150rpx;
		width: 150rpx;
		margin-top: 25rpx;
		margin-left: 10rpx;
	}
	.follow{
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		display: flex;
		flex-direction: row;
	}
	.followAvatar{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: gray;
	}
	.followInformation{
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		padding-bottom: 20rpx;
	}
	.followNickname{
		color: #a0a0a0;
	}
	.sum{
		font-size: 25rpx;
		color: #303030;
	}
	.followDate{
		color: gray;
	}
	.followContent{
		width: 500rpx;
		margin-bottom: 20rpx;
	}
	.likeDisplay{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.like{
		height: 50rpx;
		width: 50rpx;
	}
	.typein{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.typeinAvatar{
		height: 75rpx;
		width: 75rpx;
		background-color: gray;
		border-radius: 37.5rpx;
		margin-left: 10rpx;
	}
	.typeinInput{
		width: 450rpx;
		height: 75rpx;
		margin-left: 30rpx;
		border-radius: 37.5rpx;
		background-color: #f0f0f0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.typeinPlaceHolder{
		margin-left: 20rpx;
		width: 400rpx;
	}
	.send{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #ff56c0;
		width: 100rpx;
		height: 75rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
	}
	.send:active{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #c74396;
		width: 100rpx;
		height: 75rpx;
		border-radius: 50rpx;
		font-size: 24rpx;
	}
	.delete{
		color: #a0a0a0;
		font-size: 25rpx;
		margin-top: 10rpx;
	}
	.informationDisplay{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}
	.commentDelete{
		margin-left: 360rpx;
		color: #a0a0a0;
	}
	.markDisplay{
		display: flex;
		flex-direction: row;
		color: gray;
	}
	.star{
		width: 45rpx;
		height: 45rpx;
		margin-left: 10rpx;
	}
	.doctorDisplay{
		color: gray;
	}
	.serviceDisplay{
		color: gray;
		margin-top: 15rpx;
	}
</style>
