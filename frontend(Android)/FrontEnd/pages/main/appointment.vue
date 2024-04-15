<template>
	<scroll-view>
		<view :class="countyDisplayClass">
			<li v-for="(county, index) in countyList">
				<view :class="countyClassList[index]">
					{{ county }}
				</view>
			</li>
		</view>
	</scroll-view>
</template>

<script>
	import { inject } from 'vue'
	export default{
		data(){
			return{
				loginAccount: '',
				location: '',
				BaseURL: inject('BaseURL'),
				
				countyList: [],
				countyClassList: [],
				
				countyDisplayClass: 'countyDisplay',
				
				scrollX: 'false'
			}
		},
		mounted(){
			this.loginAccount = this.$store.state.loginAccount
			if(this.$store.state.location != ""){
				this.location = this.$store.state.location
			}else{
				uni.redirectTo({
					url: '/pages/locationChoose/locationChoose'
				})
			}
			const self = this
			uni.request({
				url: self.BaseURL + 'location/county/get/',
				method: 'GET',
				data: {
					city: self.$store.state.location
				},
				success(res) {
					const countyList = res.data.countyList
					const len = countyList.length
					for(let i = 0;i < len;i ++){
						self.countyList.push(countyList[i])
						self.countyClassList.push('countyNoChoose')
					}
					self.countyClassList[0] = 'countyChoose'
				}
			})
		}
	}
</script>

<style>
	.countyDisplay{
		display: flex;
		flex-direction: row;
		width: 750rpx;
	}
	.countyNoChoose{
		border: 2px #f0f0f0 solid;
		width: 150rpx;
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	.countyChoose{
		border-top: 2px #f0f0f0 solid;
		border-left: 2px #f0f0f0 solid;
		border-right: 2px #f0f0f0 solid;
		width: 150rpx;
		height: 50rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>
