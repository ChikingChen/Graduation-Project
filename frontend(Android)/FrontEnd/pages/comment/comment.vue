<template>
	<view>
		
	</view>
</template>

<script>
	import { inject } from 'vue'
	export default {
		data() {
			return {
				BaseURL: inject('BaseURL'),
				
				followList: null,
				comment: null
			}
		},
		methods: {
			
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
				}
			})
		}
	}
</script>

<style>

</style>
