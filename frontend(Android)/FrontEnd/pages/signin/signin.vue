<template>
	<div :class='OverallDisplay'>
		<div :class='TitleDisplay'>
			<div :class='TitleClass'>
				注册
			</div>
		</div>
		<input :placeholder='placeholderValue.emailPlaceholder' :class='inputClass.emailInput'
			v-model='inputValue.emailInput'>
		<div :class='ErrorClass'>
			{{ errorValue.emailError }}
		</div>
		<div :class='CodeDisplay'>
			<input :placeholder='placeholderValue.codePlaceholder' :class='inputClass.codeInput' 
				v-model='inputValue.codeInput' :password='passwordValid.code'>
			<div :class='GetClass' @click='get'>
				获取验证码
			</div>
		</div>
		<div :class='ErrorClass'>
			{{ errorValue.codeError }}
		</div>
		<input :placeholder='placeholderValue.nicknamePlaceholder' :class='inputClass.nicknameInput'
			v-model='inputValue.nicknameInput'>
		<div :class='ErrorClass'>
			{{ errorValue.nicknameError }}
		</div>
		<input :placeholder='placeholderValue.passwordPlaceholder' :class='inputClass.passwordInput'
			v-model='inputValue.passwordInput' :password='passwordValid.password'>
		<div :class='ErrorClass'>
			{{ errorValue.passwordError }}
		</div>
		<input :placeholder='placeholderValue.repeatPlaceholder' :class='inputClass.repeatInput'
			v-model='inputValue.repeatInput' :password='passwordValid.repeat'>
		<div :class='ErrorClass'>
			{{ errorValue.repeatError }}
		</div>
		<button :class='buttonClass' @click='signin'>
			注册
		</button>
		<div :class='TipClass'>
			注册成功即可跳转
		</div>
	</div>
</template>

<script setup>
	// import { Account } from 'main.js'
	import { ref } from 'vue'
	import { inject } from 'vue'
	
	const BaseURL = inject('BaseURL')
	
	const OverallDisplay = ref('col1')
	const CodeDisplay = ref('row2')
	const TitleDisplay = ref('row1')
	
	const sex = ref('无')
	
	const TitleClass = ref('title')
	const GetClass = ref('get1')
	const ErrorClass = ref('errorClass')
	const TipClass = ref('tipClass')
	
	const successBox = ref(null)
	
	const passwordValid = ref({
		code: '1',
		password: '1',
		repeat: '1'
	})
	
	const errorValue = ref({
		emailError: '', // 请输入正确的电子邮箱
		codeError: '', // 请输入正确的验证码
		nicknameError: '',
		passwordError: '', // 请保证输入格式正确
		repeatError: '' // 请保证两次输入的密码相同
	})
	const placeholderValue = ref({
		emailPlaceholder: '请输入电子邮箱',
		codePlaceholder: '请输入验证码',
		nicknamePlaceholder: '请输入昵称',
		passwordPlaceholder: '请输入密码',
		repeatPlaceholder: '请确认密码'
	})
	const inputClass = ref({
		emailInput: 'inputClass1',
		codeInput: 'inputClass3',
		nicknameInput: 'inputClass1',
		passwordInput: 'inputClass1',
		repeatInput: 'inputClass1'
	})
	const inputValue = ref({
		emailInput: '',
		codeInput: '',
		nicknameInput: '',
		passwordInput: '',
		repeatInput: ''
	})
	const buttonClass = ref('loginButtonClass1')
	
	function emailValid(email){
		return true
	}
	
	function codeValid(code){
		if(code.length != 4) return false
		for(let i = 0;i < code.length; i++){
			if(!(code[i] >= '0' && code[i] <= '9')) return false
		}
		return true
	}
	
	function nickValid(code){
		if(code.length > 10) return false
		return true
	}
	
	function pswValid(code){
		if(!(code.length >= 6 && code.length <= 20)) return false
		return true
	}
	
	function signin(){
		if(!emailValid(inputValue.value.emailInput)){
			// 电子邮箱
			errorValue.value.emailError = '请输入正确的电子邮箱'
			errorValue.value.codeError = ''
			errorValue.value.nicknameError = ''
			errorValue.value.passwordError = ''
			errorValue.value.repeatError = ''
			GetClass.value = 'get2'
			inputClass.value.codeInput = 'inputClass4'
			inputClass.value.nicknameInput = 'inputClass1'
			inputClass.value.passwordInput = 'inputClass1'
			inputClass.value.repeatInput = 'inputClass1'
			buttonClass.value = 'loginButtonClass1'
			return
		}
		if(!codeValid(inputValue.value.codeInput)){
			// 验证码 4 位
			errorValue.value.emailError = ''
			errorValue.value.codeError = '验证码错误'
			errorValue.value.nicknameError = ''
			errorValue.value.passwordError = ''
			errorValue.value.repeatError = ''
			GetClass.value = 'get1'
			inputClass.value.codeInput = 'inputClass3'
			inputClass.value.nicknameInput = 'inputClass2'
			inputClass.value.passwordInput = 'inputClass1'
			inputClass.value.repeatInput = 'inputClass1'
			buttonClass.value = 'loginButtonClass1'
			return
		}
		if(!nickValid(inputValue.value.nicknameInput)){
			// 昵称少于或等于 10 位
			errorValue.value.emailError = ''
			errorValue.value.codeError = ''
			errorValue.value.nicknameError = '昵称只能由少于或等于10个字符'
			errorValue.value.passwordError = ''
			errorValue.value.repeatError = ''
			GetClass.value = 'get1'
			inputClass.value.codeInput = 'inputClass3'
			inputClass.value.nicknameInput = 'inputClass1'
			inputClass.value.passwordInput = 'inputClass2'
			inputClass.value.repeatInput = 'inputClass1'
			buttonClass.value = 'loginButtonClass1'
			return
		}
		if(!pswValid(inputValue.value.passwordInput)){
			// 密码只能使用大小写英文或数字 少于20位 多于6位
			errorValue.value.emailError = ''
			errorValue.value.codeError = ''
			errorValue.value.nicknameError = ''
			errorValue.value.passwordError = '密码只能由少于20位并且多于6位大小写英文或数字'
			errorValue.value.repeatError = ''
			GetClass.value = 'get1'
			inputClass.value.codeInput = 'inputClass3'
			inputClass.value.nicknameInput = 'inputClass1'
			inputClass.value.passwordInput = 'inputClass1'
			inputClass.value.repeatInput = 'inputClass2'
			buttonClass.value = 'loginButtonClass1'
			return 
		}
		if(inputValue.value.passwordInput != inputValue.value.repeatInput){
			// 密码与重复必须相同
			errorValue.value.emailError = ''
			errorValue.value.codeError = ''
			errorValue.value.nicknameError = ''
			errorValue.value.passwordError = ''
			errorValue.value.repeatError = '请保证两次输入的密码相同'
			GetClass.value = 'get1'
			inputClass.value.codeInput = 'inputClass3'
			inputClass.value.nicknameInput = 'inputClass1'
			inputClass.value.passwordInput = 'inputClass1'
			inputClass.value.repeatInput = 'inputClass1'
			buttonClass.value = 'loginButtonClass2'
			return
		}
		errorValue.value.emailError = ''
		errorValue.value.codeError = ''
		errorValue.value.nicknameError = ''
		errorValue.value.passwordError = ''
		errorValue.value.repeatError = ''
		GetClass.value = 'get1'
		inputClass.value.codeInput = 'inputClass3'
		inputClass.value.nicknameInput = 'inputClass1'
		inputClass.value.passwordInput = 'inputClass1'
		inputClass.value.repeatInput = 'inputClass1'
		buttonClass.value = 'loginButtonClass1'
		uni.request({
			url: BaseURL + 'signin/signin/',
			method: 'GET',
			data: {
				email: inputValue.value.emailInput,
				code: inputValue.value.codeInput,
				nickname: inputValue.value.nicknameInput,
				password: inputValue.value.passwordInput
			},
			success: function(res){
				const back = res.data
				if(back == 'EMAIL EXISTS.'){
					errorValue.value.emailError = '该邮箱已经被注册'
					errorValue.value.codeError = ''
					errorValue.value.nicknameError = ''
					errorValue.value.passwordError = ''
					errorValue.value.repeatError = ''
					GetClass.value = 'get2'
					inputClass.value.codeInput = 'inputClass4'
					inputClass.value.nicknameInput = 'inputClass1'
					inputClass.value.passwordInput = 'inputClass1'
					inputClass.value.repeatInput = 'inputClass1'
					buttonClass.value = 'loginButtonClass1'
				}else if(back == 'SIGNIN SUCCESS.'){
					uni.redirectTo({
						url: '/pages/index/index'
					})
				}
				console.log(back)
			},
			fail: function(res){
				errorValue.value.emailError = '请输入正确的邮箱'
				errorValue.value.codeError = ''
				errorValue.value.nicknameError = ''
				errorValue.value.passwordError = ''
				errorValue.value.repeatError = ''
				GetClass.value = 'get2'
				inputClass.value.codeInput = 'inputClass4'
				inputClass.value.nicknameInput = 'inputClass1'
				inputClass.value.passwordInput = 'inputClass1'
				inputClass.value.repeatInput = 'inputClass1'
				buttonClass.value = 'loginButtonClass1'
			}
		})
	}
	function get(){
		uni.request({
			url: BaseURL + 'signin/get/',
			method: 'GET',
			data: {
				email: inputValue.value.emailInput
			},
			success: function(res){
				const back = res.data
				if(back == 'LEN ERROR.'){
					errorValue.value.emailError = '请输入正确的电子邮箱'
					errorValue.value.codeError = ''
					errorValue.value.nicknameError = ''
					errorValue.value.passwordError = ''
					errorValue.value.repeatError = ''
					GetClass.value = 'get2'
					inputClass.value.codeInput = 'inputClass4'
					inputClass.value.nicknameInput = 'inputClass1'
					inputClass.value.passwordInput = 'inputClass1'
					inputClass.value.repeatInput = 'inputClass1'
					buttonClass.value = 'loginButtonClass1'
				}else if(back == 'EMAIL EXISTS.'){
					errorValue.value.emailError = '该邮箱已经被注册'
					errorValue.value.codeError = ''
					errorValue.value.nicknameError = ''
					errorValue.value.passwordError = ''
					errorValue.value.repeatError = ''
					GetClass.value = 'get2'
					inputClass.value.codeInput = 'inputClass4'
					inputClass.value.nicknameInput = 'inputClass1'
					inputClass.value.passwordInput = 'inputClass1'
					inputClass.value.repeatInput = 'inputClass1'
					buttonClass.value = 'loginButtonClass1'
				}else{
					errorValue.value.emailError = ''
					errorValue.value.codeError = ''
					errorValue.value.nicknameError = ''
					errorValue.value.passwordError = ''
					errorValue.value.repeatError = ''
					GetClass.value = 'get1'
					inputClass.value.codeInput = 'inputClass3'
					inputClass.value.nicknameInput = 'inputClass1'
					inputClass.value.passwordInput = 'inputClass1'
					inputClass.value.repeatInput = 'inputClass1'
					buttonClass.value = 'loginButtonClass1'
				}
			},
			fail: function(res){
				errorValue.value.emailError = '请输入正确的电子邮箱'
				errorValue.value.codeError = ''
				errorValue.value.nicknameError = ''
				errorValue.value.passwordError = ''
				errorValue.value.repeatError = ''
				GetClass.value = 'get2'
				inputClass.value.codeInput = 'inputClass4'
				inputClass.value.nicknameInput = 'inputClass1'
				inputClass.value.passwordInput = 'inputClass1'
				inputClass.value.repeatInput = 'inputClass1'
				buttonClass.value = 'loginButtonClass1'
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
	
	.title{
		border-top: 100rpx;
		border-bottom: 2px solid #ff56c0;
		margin-top: 50rpx;
		font-size: 50rpx;
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
	
	.errorClass{
		margin-left: 100rpx;
		color: #ff0000;
		font-size: 20rpx;
	}
	
	.tipClass{
		display: flex;
		justify-content: flex-end;
		color: #ff56c0;
		margin-right: 100rpx;
		font-size: 20rpx;
		margin-top: 20rpx;
	}
</style>
