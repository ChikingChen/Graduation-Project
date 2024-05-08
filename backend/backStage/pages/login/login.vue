<template>
	<div :class="backgroundClass">
		<div :class="loginBlockClass">
			<div :class="titleClass">登录</div>
			<div :class="typeinDisplayClass">
			    <div :class="fontClass">
			        用户：
			    </div>
			    <input :class="inputClass" v-model="account">
			</div>
			<div :class="typeinDisplayClass">
			    <div :class="fontClass">
			        密码：
			    </div>
			    <input :class="inputClass" v-model="password" :password="true">
			</div>
			<button :class="loginClass" @click="loginClick">
			    登录
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				backgroundClass: 'background',
				titleClass: 'title',
				loginBlockClass: 'loginBlock',
				inputClass: 'input',
				typeinDisplayClass: 'typeinDisplay',
				fontClass: 'font',
				loginClass: 'login',
				
				account: '',
				password: ''
			}
		},
		methods: {
			loginClick(){
				const self = this
				uni.request({
					url: self.$store.state.BaseURL + 'login/login/',
					method: 'GET',
					dataType: 'jsonp',
					data: {
						account: self.account,
						password: self.password
					},
					success(res) {
						console.log(res)
					},
					fail(res) {
						console.log(res)
					},
					complete(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	.background{
		position: fixed;
		background-color: skyblue;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2000px;
		height: 1000px;
	}
	.loginBlock{
		border-radius: 20px;
		height: 500px;
		width: 500px;
		background-color: cornsilk;
		margin-top: 25px;
		display: flex; 
		flex-direction: column;
		align-items: center;
	}
	.title{
		font-size: 5vh;
		margin-top: 5vh;
		color: cadetblue;
	}
	.input{
		width: 30vh;
		height: 3vh;
		background-color: white;
	}
	.typeinDisplay{
		display: flex;
		flex-direction: row;
		margin-top: 5vh;
	}
	.font{
		color: cadetblue;
	}
	.login{
		width: 30vh;
		margin-top: 5vh;
		height: 40px;
		border: none;
		background-color: cadetblue;
		color: white;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}
</style>
