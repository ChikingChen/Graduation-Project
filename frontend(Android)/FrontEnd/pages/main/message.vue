<template>
	消息
	<!-- 预约时间提醒 -->
	<!-- 出具报告提醒 -->
	<!-- 医患双方交流提醒 -->
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
