<template>
	<div v-if = 'LoginMode' :class='OverallDisplay'>
		<div :class='LoginChooseDisplay'>
			<div :class='LoginChooseClass.PasswordLogin'>
				密码登录
			</div>
			<div :class='LoginChooseClass.CodeLogin' @click='CodeChoose'>
				验证码登录
			</div>
		</div>
		<div>
			<input v-model='InputValue.InputBox1' :class='InputClass.InputBox1' 
			:placeholder='InputPlaceHolder.InputBox1'>
			<div :class='ErrorClass.ErrorBox1'>
				{{ ErrorShow.ErrorBox1 }}
			</div>
			<input v-model='InputValue.InputBox2' :class='InputClass.InputBox2'
			:placeholder='InputPlaceHolder.InputBox2' :password=true>
			<div :class='ErrorClass.ErrorBox2'>
				{{ ErrorShow.ErrorBox2 }}
			</div>
		</div>
		<button :class='LoginButtonClass' @click='login'>
			登录
		</button>
		<div :class='SigninClass' @click='signin'>
			还没有账号？
		</div>
	</div>
	<div v-else :class='OverallDisplay'>
		<div :class='LoginChooseDisplay'>
			<div :class='LoginChooseClass.PasswordLogin' @click='PswChoose'>
				密码登录
			</div>
			<div :class='LoginChooseClass.CodeLogin'>
				验证码登录
			</div>
		</div>
		<div>
			<input v-model='InputValue.InputBox1' :class='InputClass.InputBox1' 
			:placeholder='InputPlaceHolder.InputBox1'>
			<div :class='ErrorClass.ErrorBox1'>
				{{ ErrorShow.ErrorBox1 }}
			</div>
			<div :class='CodeDisplay'>
				<div>
					<input v-model='InputValue.InputBox2' :class='InputClass.InputBox2'
					:placeholder='InputPlaceHolder.InputBox2' :password=true>
					<div :class='ErrorClass.ErrorBox2'>
						{{ ErrorShow.ErrorBox2 }}
					</div>
				</div>
				<div :class='GetClass' @click='get'>
					获取验证码
				</div>
			</div>
		</div>
		<button :class='LoginButtonClass' @click='login'>
			登录
		</button>
		<div :class='SigninClass' @click='signin'>
			还没有账号？
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	import { inject } from 'vue'
	import { createApp } from 'vue'
	import { getCurrentInstance } from 'vue'
	
	import { createStore } from 'vuex'
	
	export default {
		data(){
			return {
				LoginMode: true,
				OverallDisplay: 'col1',
				LoginChooseDisplay: 'row1',
				CodeDisplay: 'row2',
				
				LoginChooseClass: {
					PasswordLogin: 'loginChooseClass1',
					CodeLogin: 'loginChooseClass2'
				},
				LoginButtonClass: 'loginButtonClass1',
				
				InputValue: {
					InputBox1: '',
					InputBox2: ''
				},
				InputClass: {
					InputBox1: 'inputClass1',
					InputBox2: 'inputClass1'
				},
				InputPlaceHolder: {
					InputBox1: '请输入邮箱号',
					InputBox2: '请输入密码'
				},
				
				ErrorShow: {
					ErrorBox1: '',
					ErrorBox2: ''
				},
				ErrorClass: {
					ErrorBox1: 'errorClass',
					ErrorBox2: 'errorClass'
				},
				
				GetClass: 'get1',
				SigninClass: 'signin',
				
				BaseURL: inject('BaseURL')
			};
		},
		setup(){
			
			
		},
		methods: {
			CodeChoose(){
				this.LoginMode = false
				this.LoginChooseClass.PasswordLogin = 'loginChooseClass3'
				this.LoginChooseClass.CodeLogin = 'loginChooseClass4'
				this.ErrorShow.ErrorBox1 = ''
				this.ErrorShow.ErrorBox2 = ''
				this.InputPlaceHolder.InputBox2 = '请输入验证码'
				
				this.InputClass.InputBox2 = 'inputClass3'
				this.InputValue.InputBox2 = ''
				this.LoginButtonClass = 'loginButtonClass1'
				this.GetClass = 'get1'
				
			},
			PswChoose(){
				this.LoginMode = true
				this.LoginChooseClass.PasswordLogin = 'loginChooseClass1'
				this.LoginChooseClass.CodeLogin = 'loginChooseClass2'
				this.ErrorShow.ErrorBox1 = ''
				this.ErrorShow.ErrorBox2 = ''
				this.InputPlaceHolder.InputBox2 = '请输入密码'
				
				this.InputClass.InputBox2 = 'inputClass1'
				this.InputValue.InputBox2 = ''
				this.LoginButtonClass = 'loginButtonClass1'
				this.GetClass = 'get1'
			},
			AccountLogin(self){
				const store = createStore({
					state(){
						return{
							Account: ""
						}
					},
					mutations:{
						login(state, account){
							state.Account = account
						}
					}
				})
				const app = createApp(self.$root)
				app.use(store)
				store.commit('login', self.InputValue.InputBox1)
			},
			login(){
				const self = this
				if(self.LoginMode){ // 账号密码登录
					uni.request({
						url: self.BaseURL + 'login/psw/',
						method: 'GET',
						data: {
							email: self.InputValue.InputBox1,
							psw: self.InputValue.InputBox2
						},
						success: function(res){
							const back = res.data
							console.log(back)
							if(back == 'LEN ERROR.' || back == 'EMAIL ERROR.'){
								self.ErrorShow.ErrorBox1 = '邮箱号错误'
								self.ErrorShow.ErrorBox2 = ''
								self.InputClass.InputBox2 = 'inputClass2'
								self.LoginButtonClass = 'loginButtonClass1'
							}else if(back == 'PSW ERROR.'){
								self.ErrorShow.ErrorBox1 = ''
								self.ErrorShow.ErrorBox2 = '密码错误'
								self.InputClass.InputBox2 = 'inputClass1'
								self.LoginButtonClass = 'loginButtonClass2'
							}else{
								self.AccountLogin(self)
								uni.redirectTo({
									url: '/pages/main/main'
								})
							}
						},
						fail: function(res){
							console.log('LOGIN FAILED.')
						}
					})
				}else{
					console.log(InputValue.InputBox2)
					uni.request({
						url: self.BaseURL + 'login/email/',
						method: 'GET',
						data: {
							email: self.InputValue.InputBox1,
							code: self.InputValue.InputBox2
						},
						success: function(res){
							const back = res.data
							console.log(back)
							if(back == 'LEN ERROR.' || back == 'EMAIL ERROR.'){
								self.ErrorShow.ErrorBox1 = '邮箱号错误'
								self.ErrorShow.ErrorBox2 = ''
								self.InputClass.InputBox2 = 'inputClass4'
								self.GetClass = 'get2'
								self.LoginButtonClass = 'loginButtonClass1'
							}else if(back == 'CODE ERROR.'){
								self.ErrorShow.ErrorBox1 = ''
								self.ErrorShow.ErrorBox2 = '验证码错误'
								self.InputClass.InputBox2 = 'inputClass3'
								self.GetClass = 'get1'
								self.LoginButtonClass = 'loginButtonClass2'
							}else{
								self.AccountLogin(self)
								uni.redirectTo({
									url: '/pages/main/main'
								})
							}
						},
						fail: function(res){
							console.log('LOGIN FAILED.')
						}
					})
				}
			},
			signin(){
				uni.redirectTo({
					url: '/pages/signin/signin'
				})
			},
			get(){
				console.log(Account)
				uni.request({
					url: BaseURL + 'login/get/',
					method: 'GET',
					data: {
						email: self.InputValue.InputBox1
					},
					success: function(res){
						const back = res.data
						if(back == 'LEN ERROR.' || back == 'EMAIL ERROR.'){
							self.ErrorShow.ErrorBox1 = '邮箱号错误'
							self.ErrorShow.ErrorBox2 = ''
							self.InputClass.InputBox2 = 'inputClass4'
							self.GetClass = 'get2'
							self.LoginButtonClass = 'loginButtonClass1'
						}
					},
					fail: function(res){
						console.log('LOGIN FAILED.')
					}
				})
			}
		}
	}
</script>

<style>
	.col1{
		display: flex;
		flex-direction: column;
	}
	
	.row1{
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.row2{
		display: flex;
		flex-direction: row;
	}
	
	.loginChooseClass1{
		border-bottom: 2px solid #ff56c0;
		margin-top: 100rpx;
	}
	.loginChooseClass2{
		margin-top: 100rpx;
		margin-left: 100rpx;
	}
	.loginChooseClass3{
		margin-top: 100rpx;
	}
	.loginChooseClass4{
		border-bottom: 2px solid #ff56c0;
		margin-top: 100rpx;
		margin-left: 100rpx;
	}
	
	.inputClass1{
		margin-top: 50rpx;
		border-bottom: 2px solid #a0a0a0;
		width: 550rpx;
		margin-left: 100rpx;
	}
	.inputClass2{
		margin-top: 25rpx;
		border-bottom: 2px solid #a0a0a0;
		width: 550rpx;
		margin-left: 100rpx;
	}
	.inputClass3{
		margin-top: 50rpx;
		border-bottom: 2px solid #a0a0a0;
		width: 380rpx;
		margin-left: 100rpx;
	}
	.inputClass4{
		margin-top: 25rpx;
		border-bottom: 2px solid #a0a0a0;
		width: 380rpx;
		margin-left: 100rpx;
	}
	
	.errorClass{
		margin-left: 100rpx;
		color: #ff0000;
		font-size: 20rpx;
	}
	
	.loginButtonClass1{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #ff56c0;
		width: 550rpx;
		height: 75rpx;
		margin-top: 50rpx;
		border-radius: 50rpx;
	}
	.loginButtonClass1:active{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #c74396;
		width: 550rpx;
		height: 75rpx;
		margin-top: 50rpx;
		border-radius: 50rpx;
	}
	.loginButtonClass2{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #ff56c0;
		width: 550rpx;
		height: 75rpx;
		margin-top: 25rpx;
		border-radius: 50rpx;
	}
	.loginButtonClass2:active{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		background-color: #c74396;
		width: 550rpx;
		height: 75rpx;
		margin-top: 25rpx;
		border-radius: 50rpx;
	}
	
	.get1{
		color: #ff56c0;
		margin-left: 20rpx;
		margin-top: 50rpx;
	}
	.get1:active{
		color: #c74396;
		margin-left: 20rpx;
		margin-top: 50rpx;
	}
	.get2{
		color: #ff56c0;
		margin-left: 20rpx;
		margin-top: 25rpx;
	}
	.get2:active{
		color: #c74396;
		margin-left: 20rpx;
		margin-top: 25rpx;
	}
	
	.signin{
		color: #ff56c0;
		font-size: 20rpx;
		align-self: flex-end;
		margin-top: 20rpx;
		margin-right: 100rpx;
	}
	.signin:active{
		color: #c74396;
		font-size: 20rpx;
		align-self: flex-end;
		margin-top: 20rpx;
		margin-right: 100rpx;
	}
</style>
