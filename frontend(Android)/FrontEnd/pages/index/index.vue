<template>
	<div class='col1' v-if='!valuelist.getShow'>
		<div class='row1'>
			<div :class='valuelist.loginClasspsw' @click='psw' ref='loginchoose1'>
				密码登录
			</div>
			<div :class='valuelist.loginClasstele' @click='tele' ref='loginchoose2'>
				验证码登录
			</div>
		</div>
		<input :class='valuelist.inputClass1' :placeholder='valuelist.inputPlaceholder1' 
			v-model='valuelist.inputValue1' :maxlength=11>
		<input :class='valuelist.inputClass2' :placeholder='valuelist.inputPlaceholder2' 
			v-model='valuelist.inputValue2' :maxlength='valuelist.inputMaxLength2' 
			:password='valuelist.inputPassword'>
		<button :class='valuelist.loginStyle' @click='login'>
			登录
		</button>
		<div :class='valuelist.signinClass' @click='signin'>
			还没有账号？
		</div>
	</div>
	<div class='col1' v-else>
		<div class='row1'>
			<div :class='valuelist.loginClasspsw' @click='psw' ref='loginchoose1'>
				密码登录
			</div>
			<div :class='valuelist.loginClasstele' @click='tele' ref='loginchoose2'>
				验证码登录
			</div>
		</div>
		<div class="col1">
			<input :class='valuelist.inputClass1' :placeholder='valuelist.inputPlaceholder1' 
				v-model='valuelist.inputValue1' :maxlength=11>
			<div class='row2'>
				<input :class='valuelist.inputClass2' :placeholder='valuelist.inputPlaceholder2' 
					v-model='valuelist.inputValue2' :maxlength='valuelist.inputMaxLength2' 
					:password='valuelist.inputPassword'>
				<div @click='get' :class='valuelist.getClass'>
					获取验证码
				</div>
			</div>
		</div>
		<button :class='valuelist.loginStyle' @click='login'>
			登录
		</button>
		<div :class='valuelist.signinClass' @click='signin'>
			还没有账号？
		</div>
	</div>
	
</template>

<script setup>
	import { ref } from 'vue'
	import { inject } from 'vue'
	
	const baseURL = inject('baseURL')
	
	const valuelist = ref({
		loginClasspsw: 'loginClass1',
		loginClasstele: 'loginClass2',
		inputPlaceholder1: '请输入注册时的手机号',
		inputPlaceholder2: '请输入密码',
		inputClass1: 'inputClass1',
		inputClass2: 'inputClass2',
		inputValue1: '',
		inputValue2: '',
		getClass: 'get',
		getShow: 0,
		loginStyle: 'login',
		signinClass: 'signinClass',
		inputMaxLength2: -1,
		inputPassword: 1,
	})
	
	function psw(){
		valuelist.value.loginClasspsw = 'loginClass1'
		valuelist.value.loginClasstele = 'loginClass2'
		valuelist.value.inputPlaceholder2 = '请输入密码'
		valuelist.value.getShow = 0
		valuelist.value.inputValue2 = ''
		valuelist.value.inputMaxLength2 = -1
		valuelist.value.inputPassword = 1
	}
	function tele(){
		valuelist.value.loginClasspsw = 'loginClass3'
		valuelist.value.loginClasstele = 'loginClass4'
		valuelist.value.inputPlaceholder2 = '请输入验证码'
		valuelist.value.getShow = 1
		valuelist.value.inputValue2 = ''
		valuelist.value.inputMaxLength2 = 4
		valuelist.value.inputPassword = 0
	}
	function get(){
		console.log('get')
	}
	function login(){
		if(valuelist.value.getShow === 0){
			console.log(baseURL + 'login/psw/')
			uni.request({
				url: baseURL + 'login/psw/',
				method: 'GET',
				data: {
					tele: valuelist.value.inputValue1,
					psw: valuelist.value.inputValue2
				}
			})
		}else{
			console.log(baseURL + 'login/tele/')
			uni.request({
				url: baseURL + 'login/tele/',
				method: 'GET',
				data: {
					tele: valuelist.value.inputValue1,
					psw: valuelist.value.inputValue2
				},
				success: function(res) {
					console.log(res.data)
				},
				fail: function(res) {
					console.log('LOGIN FAILED')
				}
			})
		}
		
	}
	function signin(){
		console.log('signin')
	}
</script>

<style>
.col1{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.row1{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-content: space-between;
}
.row2{
	display: flex;
	flex-direction: row;
}

.loginClass1{
	margin-top: 100rpx;
	margin-right: 100rpx;
	border-bottom: 2px solid #ff56c0;
}
.loginClass2{
	margin-top: 100rpx;
}
.loginClass3{
	margin-top: 100rpx;
	margin-right: 100rpx;
}
.loginClass4{
	margin-top: 100rpx;
	border-bottom: 2px solid #ff56c0;
}

.inputClass1{
	margin-left: 100rpx;
	margin-right: 100rpx;
	margin-top: 50rpx;
	width: 550rpx;
	border-bottom: 2px solid #a0a0a0;
}
.inputClass2{
	margin-left: 100rpx;
	margin-right: 100rpx;
	margin-top: 50rpx;
	width: 550rpx;
	border-bottom: 2px solid #a0a0a0;
}

.get{
	color: #ff56c0;
	width: 350rpx;
	align-self: flex-end;
	margin-right: 100rpx;
	margin-top: 60rpx;
}
.get:active{
	color: #c74396;
	width: 350rpx;
	align-self: flex-end;
	margin-right: 100rpx;
	margin-top: 60rpx;
}

.login{
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
.login:active{
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

.signinClass{
	display: flex;
	align-self: flex-end;
	color: #ff56c0;
	margin-top: 20rpx;
	margin-right: 100rpx;
	font-size: 20rpx;
}
.signinClass:active{
	display: flex;
	align-self: flex-end;
	color: #c74396;
	margin-top: 20rpx;
	margin-right: 100rpx;
	font-size: 20rpx;
}
</style>