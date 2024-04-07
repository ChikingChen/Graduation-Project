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

<script setup>
	import { ref } from 'vue'
	import { inject } from 'vue'
	
	const BaseURL = inject('BaseURL')
	
	const LoginMode = ref(true)
	const OverallDisplay = ref('col1')
	const LoginChooseDisplay = ref('row1')
	const CodeDisplay = ref('row2')
	
	const LoginChooseClass = ref({
		PasswordLogin: 'loginChooseClass1',
		CodeLogin: 'loginChooseClass2'
	})
	const LoginButtonClass = ref('loginButtonClass1')
	
	const InputValue = ref({
		InputBox1: '',
		InputBox2: ''
	})
	const InputClass = ref({
		InputBox1: 'inputClass1',
		InputBox2: 'inputClass1'
	})
	const InputPlaceHolder = ref({
		InputBox1: '请输入手机号',
		InputBox2: '请输入密码'
	})
	
	const ErrorShow = ref({
		ErrorBox1: '',
		ErrorBox2: ''
	})
	const ErrorClass = ref({
		ErrorBox1: 'errorClass',
		ErrorBox2: 'errorClass'
	})
	
	const GetClass = ref('get1')
	const SigninClass = ref('signin')
	
	function CodeChoose(){
		LoginMode.value = false
		LoginChooseClass.value.PasswordLogin = 'loginChooseClass3'
		LoginChooseClass.value.CodeLogin = 'loginChooseClass4'
		ErrorShow.value.ErrorBox1 = ''
		ErrorShow.value.ErrorBox2 = ''
		InputPlaceHolder.value.InputBox2 = '请输入验证码'
		
		InputClass.value.InputBox2 = 'inputClass3'
		InputValue.value.InputBox2 = ''
		LoginButtonClass.value = 'loginButtonClass1'
		GetClass.value = 'get1'
		
	}
	function PswChoose(){
		LoginMode.value = true
		LoginChooseClass.value.PasswordLogin = 'loginChooseClass1'
		LoginChooseClass.value.CodeLogin = 'loginChooseClass2'
		ErrorShow.value.ErrorBox1 = ''
		ErrorShow.value.ErrorBox2 = ''
		InputPlaceHolder.value.InputBox2 = '请输入密码'
		
		InputClass.value.InputBox2 = 'inputClass1'
		InputValue.value.InputBox2 = ''
		LoginButtonClass.value = 'loginButtonClass1'
		GetClass.value = 'get1'
	}
	
	function login(){
		if(LoginMode.value){ // 账号密码登录
			uni.request({
				url: BaseURL + 'login/psw/',
				method: 'GET',
				data: {
					tele: InputValue.value.InputBox1,
					psw: InputValue.value.InputBox2
				},
				success: function(res){
					const back = res.data
					console.log(back)
					if(back == 'LEN ERROR.' || back == 'TELE ERROR.'){
						ErrorShow.value.ErrorBox1 = '手机号错误'
						ErrorShow.value.ErrorBox2 = ''
						InputClass.value.InputBox2 = 'inputClass2'
						LoginButtonClass.value = 'loginButtonClass1'
					}else if(back == 'PSW ERROR.'){
						ErrorShow.value.ErrorBox1 = ''
						ErrorShow.value.ErrorBox2 = '密码错误'
						InputClass.value.InputBox2 = 'inputClass1'
						LoginButtonClass.value = 'loginButtonClass2'
					}
				},
				fail: function(res){
					console.log('LOGIN FAILED.')
				}
			})
		}else{
			uni.request({
				url: BaseURL + 'login/tele/',
				method: 'GET',
				data: {
					tele: InputValue.value.InputBox1,
					psw: InputValue.value.InputBox2
				},
				success: function(res){
					const back = res.data
					console.log(back)
					if(back == 'LEN ERROR.' || back == 'TELE ERROR.'){
						ErrorShow.value.ErrorBox1 = '手机号错误'
						ErrorShow.value.ErrorBox2 = ''
						InputClass.value.InputBox2 = 'inputClass4'
						GetClass.value = 'get2'
						LoginButtonClass.value = 'loginButtonClass1'
					}else if(back == 'CODE ERROR.'){
						ErrorShow.value.ErrorBox1 = ''
						ErrorShow.value.ErrorBox2 = '验证码错误'
						InputClass.value.InputBox2 = 'inputClass3'
						GetClass.value = 'get1'
						LoginButtonClass.value = 'loginButtonClass2'
					}
				},
				fail: function(res){
					console.log('LOGIN FAILED.')
				}
			})
		}
	}
	
	function signin(){
		uni.navigateTo({
			url: '/pages/signin/signin'
		})
	}
	
	function get(){
		uni.request({
			url: BaseURL + 'login/get/',
			method: 'GET',
			data: {
				tele: InputValue.value.InputBox1
			},
			success: function(res){
				const back = res.data
				if(back == 'LEN ERROR.' || back == 'TELE ERROR.'){
					ErrorShow.value.ErrorBox1 = '手机号错误'
					ErrorShow.value.ErrorBox2 = ''
					InputClass.value.InputBox2 = 'inputClass4'
					GetClass.value = 'get2'
					LoginButtonClass.value = 'loginButtonClass1'
				}
			},
			fail: function(res){
				console.log('LOGIN FAILED.')
			}
		})
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
