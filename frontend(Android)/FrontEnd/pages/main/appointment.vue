<template>
	预约
	<!-- 默认根据距离显示 -->
	<!-- 通过能够提供的服务筛选诊所 -->
	<!-- 诊所中能够预约医生以及服务以及具体的时间 -->
</template>

<script>
	export default{
		data(){
			return{
				loginAccount: '',
				location: '',
			}
		},
		set(){
			
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
		}
	}
</script>

<style>

</style>
