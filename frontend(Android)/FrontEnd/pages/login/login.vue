<template>
	<div class="col1">
		<div class='row1'>
			<div class="loginchoose1">
				账号密码登录
			</div>
			<div class="loginchoose2" ref="loginchoose2" @click="tele">
				手机号码登录
			</div>
		</div>
		<div class='col2'>
			<input type="text" placeholder="请输入注册时的账号" class="accpwd" v-model="inputvalue1">
			<input type="password" placeholder="请输入密码" class="accpwd" v-model="inputvalue2">
		</div>
		<div class="row1">
			<button class="login">
				登录
			</button>
		</div>
		<div class="row2">
			<div class="signin">
				还没有账号？
			</div>
		</div>
	</div>
</template>

<script>
	import { ref } from 'vue'
	const inputvalue1 = ref('');
	const inputvalue2 = ref('');
	export default {
		data(){
			return{
				
			};
		},
		methods: {
			tele() {
				
			}
		},
	}
</script>


<style>
.row1 {
	display: flex;
	justify-content: center;
	flex-direction: row;
}
.row2 {
	display: flex;
	flex-direction: row;
	align-self: flex-end;
	margin-right: 100rpx;
}
.col1 {
	display: flex;
	flex-direction: column;
}
.col2 {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.accpwd {
	width: 600rpx;
	margin-top: 60rpx;
	border-bottom: 2px solid #e0e0e0;
}
.accpwd:focus {
	margin-top: 30rpx;
	border-bottom: 2px solid #000000;
}
.accpwd::placeholder {
	font-size: 28rpx;
}

.loginchoose1 {
	margin-top: 100rpx;
	font-size: 28rpx;
	border-bottom: 3px solid #fa78eb;
	border-radius: 0rpx;
	margin-right: 100rpx;
}

.loginchoose2 {
	margin-top: 100rpx;
	font-size: 28rpx;
	border-radius: 0rpx;
}

.login {
	display: flex;
	background-color: #fa78eb;
	color: #ffffff;
	border-radius: 40rpx;
	width: 550rpx;
	border: none;
	height: 60rpx;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	margin-top: 50rpx;
}
.login:active {
	display: flex;
	background-color: #db69ce;
	color: #ffffff;
	border-radius: 40rpx;
	border: none;
	height: 60rpx;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	margin-top: 50rpx;
}

.signin {
	display: flex;
	border-color: transparent;
	background-color: transparent;
	color: #fa78eb;
	font-size: 15rpx;
	margin-top: 10rpx;
}
.signin:active {
	display: flex;
	border-color: transparent;
	background-color: transparent;
	color: #db69ce;
	font-size: 15rpx;
}
</style>
