<template> 
	主页 <!-- 显示带图片的评论（小红书模式）查看详细评论后可以点击进入具体的诊所 -->
</template>

<script>
	export default{
		data(){
			return{
				loginAccount: ''
			}
		},
		set(){
			
		},
		mounted(){
			this.loginAccount = this.$store.state.loginAccount
		}
	}
</script>

<style>

</style>
