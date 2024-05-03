<template>
	<scroll-view :class="backgroundClass" scroll-y="true">
		<view :class="barClass">
			<view :class="titleClass">
				评价
			</view>
			<view :class="nameClass">
				{{ name }}
			</view>
		</view>
		<div :class="searchDisplayClass">
			<input v-model="input" :class="searchBarClass">
			<button :class="searchButtonClass" @click="search">
				搜索
			</button>
		</div>
		<div v-for="(comment, index) in showList" :class="commentClass" :key="index">
			<div :class="informationBarClass" @click="informationClick(index)">
				<image :class="avatarClass"></image>
				<div :class="commitClass">
					<div :class="nicknameClass">
						{{ showList[index].committerName }}
					</div>
					<div :class="timeClass">
						{{ date(index) }}
					</div>
				</div>
				<image :class="arrowClass" src="/static/right.png"
				@click="arrowClick(index)"></image>
			</div>
			<div :class="hintClass">
				{{ showList[index].hint }}
			</div>
			<div :class="contentClass">
				{{ showList[index].content }}
			</div>
			<div :class="chooseDisplayClass">
				<image :src="likeImg(index)" :class="buttonClass"
					@click="likeClick(index)"></image>
				<div :class="countClass">
					{{ showList[index].likeCount }}
				</div>
				<image :src="starImg(index)" :class="buttonClass"
					@click="starClick(index)"></image>
				<div :class="countClass">
					{{ showList[index].starCount }}
				</div>
			</div>
		</div>
		<div v-if='showList.length == 0' :class="noCmpClass">
			没有匹配的对象
		</div>
	</scroll-view>
</template>

<script>
	import { inject } from 'vue'
	import { useStore } from 'vuex'
	import { onShow } from "@dcloudio/uni-app"
	export default {
		data() {
			return {
				BaseURL: inject("BaseURL"),
				screenHeightRpx: '',
				
				backgroundClass: 'background',
				barClass: 'bar',
				titleClass: 'title',
				nameClass: 'name',
				commentClass: 'comment',
				informationBarClass: 'informationBar',
				avatarClass: 'avatar',
				commitClass: 'commit',
				nicknameClass: 'nickname',
				timeClass: 'time',
				contentClass: 'content',
				arrowClass: 'arrow',
				chooseDisplayClass: 'chooseDisplay',
				buttonClass: 'button',
				countClass: 'count',
				searchDisplayClass: 'searchDisplay',
				searchButtonClass: 'searchButton',
				hintClass: 'hint',
				noCmpClass: 'noCmp',
				
				dataList: null,
				showList: [],
				
				name: null,
				input: '',
				searchBarClass: 'searchBar'
			}
		},
		methods: {
			date(index){
				if(this.showList[index].time[5] == '0')
					return this.showList[index].time.slice(6, 7) + '月'
					+ this.showList[index].time.slice(8, 10) + '日'
				else
					return this.showList[index].time.slice(5, 7) + '月'
					+ this.showList[index].time.slice(8, 10) + '日'
			},
			arrowClick(index){
				this.$store.commit("getComment", this.showList[index].id)
				uni.navigateTo({
					url: '/pages/comment/comment'
				})
			},
			likeImg(index){
				return this.showList[index].haveLike 
					? '/static/like1.png' : '/static/like0.png'
			},
			starImg(index){
				return this.showList[index].starLike
					? '/static/star1.png' : '/static/star0.png'
			},
			likeClick(index){
				const self = this
				if(this.showList[index].haveLike){
					uni.request({
						url: self.BaseURL + 'comment/dislike/',
						method: 'GET',
						data: {
							commentId: self.showList[index].id,
							account: self.$store.state.loginAccount
						},
						success() {
							self.showList[index].haveLike = false
							self.showList[index].likeCount -= 1
						}
					})
				}else{
					uni.request({
						url: self.BaseURL + 'comment/makelike/',
						method: 'GET',
						data: {
							commentId: self.showList[index].id,
							account: self.$store.state.loginAccount
						},
						success() {
							self.showList[index].haveLike = true
							self.showList[index].likeCount += 1
						}
					})
				}
			},
			starClick(index){
				const self = this
				if(this.showList[index].starLike){
					uni.request({
						url: self.BaseURL + 'comment/disstar/',
						method: 'GET',
						data: {
							commentId: self.showList[index].id,
							account: self.$store.state.loginAccount
						},
						success() {
							self.showList[index].starLike = false
							self.showList[index].starCount -= 1
						}
					})
				}else{
					uni.request({
						url: self.BaseURL + 'comment/makestar/',
						method: 'GET',
						data: {
							commentId: self.showList[index].id,
							account: self.$store.state.loginAccount
						},
						success() {
							self.showList[index].starLike = true
							self.showList[index].starCount += 1
						}
					})
				}
			},
			informationClick(index){
				this.$store.commit("getAccount", this.showList[index].committerAccount)
				uni.navigateTo({
					url: '/pages/personPage/personPage'
				})
			},
			search(){
				if(this.input == ''){
					this.showList = this.dataList
					return
				}
				this.showList = this.dataList.filter((val) => {
					return val.doctor == this.input || val.service == this.input
				})
				const len = this.showList.length
				for(let i = 0;i < len;i ++){
					if(this.showList[i].doctor == this.input){
						this.showList[i].hint = "医生：" + this.input
					}else{
						this.showList[i].hint = '服务：' + this.input
					}
				}
			}
		},
		mounted() {
			const self = this
			uni.request({
				url: self.BaseURL + 'comment/clinic/',
				method: 'GET',
				data: {
					clinicId: self.$store.state.clinicId,
					account: self.$store.state.loginAccount
				},
				success(res) {
					self.showList = res.data.commentList
					self.dataList = res.data.commentList
					self.name = res.data.name
				}
			})
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + 'rpx'
				}
			})
		},
		watch: {
			"$store.state.deleteSignal":{
				handler: function(newVal, oldVal){
					console.log(123)
					const self = this
					uni.request({
						url: self.BaseURL + 'comment/clinic/',
						method: 'GET',
						data: {
							clinicId: self.$store.state.clinicId,
							account: self.$store.state.loginAccount
						},
						success(res) {
							self.showList = res.data.commentList
							self.dataList = res.data.commentList
							self.name = res.data.name
						}
					})
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
		align-items: center;
	}
	.bar{
		width: 750rpx;
		height: 120rpx;
		background-color: #ff56c0;
		color: white;
		display: flex;
		flex-direction: column;
	}
	.title{
		font-size: 50rpx;
	}
	.name{
		font-size: 30rpx;
	}
	.comment{
		width: 700rpx;
		background-color: white;
		border-radius: 20rpx;
		margin-left: 25rpx;
		margin-top: 50rpx;
	}
	.informationBar{
		display: flex;
		flex-direction: row;
	}
	.commit{
		display: flex;
		flex-direction: column;
	}
	.avatar{
		height: 100rpx;
		width: 100rpx;
		background-color: gray;
		border-radius: 50rpx;
		margin-left: 25rpx;
		margin-top: 25rpx;
	}
	.nickname{
		margin-left: 25rpx;
		margin-top: 25rpx;
	}
	.time{
		margin-left: 25rpx;
	}
	.content{
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.arrow{
		height: 120rpx;
		width: 120rpx;
		margin-left: 300rpx;
	}
	.chooseDisplay{
		display: flex;
		flex-direction: row;
	}
	.button{
		height: 60rpx;
		width: 75rpx;
		margin-top: 20rpx;
		margin-left: 150rpx;
		margin-bottom: 30rpx;
	}
	.count{
		margin-left: 20rpx;
		margin-top: 10rpx;
		font-size: 50rpx;
	}
	.searchBar{
		width: 550rpx;
		height: 60rpx;
		background-color: white;
	}
	.searchDisplay{
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
		margin-left: 25rpx;
	}
	.searchButton{
		width: 120rpx;
		font-size: 25rpx;
		color: white;
		background-color: #ff56c0;
	}
	.searchButton:active{
		width: 120rpx;
		font-size: 25rpx;
		color: white;
		background-color: #c74396;
	}
	.hint{
		color: chocolate;
		margin-top: 10rpx;
		margin-left: 20rpx;
	}
	.noCmp{
		margin-left: 25rpx;
	}
</style>
