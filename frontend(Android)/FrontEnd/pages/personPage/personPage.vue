<template>
	<div :class='backgroundClass'>
		<div :class='nameBarClass'>
			<div :class='avatarClass'></div>
			<div :class='nameClass'>
				{{ account.nickname }}
			</div>
		</div>
		<div :class="chooseBarClass">
			<div :class="evaluationClass">
				评价
			</div>
		</div>
		<div :class="evaluationDisplayClass">
			<div v-for="(comment, index) in commentList" :class="commentClass"
				:key="index" @click="commentClick(index)">
				<div :class="clinicClass">
					{{ commentList[index].clinicName }}
				</div>
				<div :class="commentDisplayClass">
					<div :class="dateClass">
						{{ "发布于 " + datecal(index) }}
					</div>
					<div :class="starDisplayClass">
						{{ "评分：" }}
						<div v-for="(star, index1) in commentList[index].starList" :key="index1">
							<image :class="starClass" :src="star"></image>
						</div>
					</div>
					<div>
						{{ commentList[index].content }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				backgroundClass: 'background',
				BaseURL: inject('BaseURL'),
				
				nameBarClass: 'nameBar',
				nameClass: 'name',
				avatarClass: 'avatar',
				evaluationDisplayClass: 'evaluationDisplay',
				commentClass: 'comment',
				chooseBarClass: 'chooseBar',
				evaluationClass: 'evaluation',
				clinicClass: 'clinic',
				commentDisplayClass: 'commentDisplay',
				dateClass: 'date',
				starDisplayClass: 'starDisplay',
				starClass: 'star',
				
				account: null,
				commentList: null
			}
		},
		methods: {
			datecal(index){
				return this.commentList[index].date.slice
				(5 + (this.commentList[index].date[5] == '0' ? 1 : 0), 7) + '月'
				+ this.commentList[index].date.slice
				(8 + (this.commentList[index].date[8] == '0' ? 1 : 0), 10) + '日'
			},
			commentClick(index){
				console.log(this.commentList[index])
				this.$store.commit("getComment", this.commentList[index].id)
				uni.navigateTo({
					url: '/pages/comment/comment'
				})
			}
		},
		mounted() {
			const self = this
			uni.getSystemInfo({
				success(res){
					self.screenHeightRpx = Math.floor(res.screenHeight / res.screenWidth * 750) - 180 + 'rpx'
				}
			})
			uni.request({
				url: self.BaseURL + 'personality/initial/',
				method: 'GET',
				data: {
					email: self.$store.state.account
				},
				success(res) {
					self.account = res.data.account
					self.commentList = res.data.commentList
					const len = self.commentList.length
					for(let i = 0;i < len;i ++){
						self.commentList[i].starList = []
						const mark = self.commentList[i].mark
						for(let j = 0;j < mark;j ++){
							self.commentList[i].starList.push('/static/star1.png')
						}
						for(let j = mark;j < 5;j ++){
							self.commentList[i].starList.push('/static/star0.png')
						}
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
	}
	.nameBar{
		height: 200rpx;
		width: 750rpx;
		border-bottom: 2px #ff56c0 solid;
		border-top: 2px #ff56c0 solid;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffffff content-box;
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
	.evaluationDisplay{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.comment{
		width: 700rpx;
		height: 200rpx;
		border-radius: 10rpx;
		border: 1px solid #e0e0e0;
		background-color: white;
		margin-top: 30rpx;
	}
	.chooseBar{
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		margin-left: 10rpx;
	}
	.evaluation{
		font-size: 40rpx;
		font-weight: bold;
		border-bottom: 4px solid #ff56c0;
	}
	.clinic{
		font-weight: 530;
		border-bottom: 1px solid #e0e0e0;
		width: 650rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		margin-left: 25rpx;
	}
	.commentDisplay{
		margin-left: 25rpx;
	}
	.date{
		font-size: 30rpx;
		color: gray;
	}
	.starDisplay{
		display: flex;
		flex-direction: row;
	}
	.star{
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
	}
</style>
