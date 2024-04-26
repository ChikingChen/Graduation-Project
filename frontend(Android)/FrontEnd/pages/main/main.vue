<template>
	<div v-if='ModeChoose==1'>
		<scroll-view :scroll-y='ScrollY' :scroll-top="ScrollTop">
			<home />
		</scroll-view>
		<div :class='BarClass'>
			<div :class='chooseBarClass2'>
				首页
			</div>
			<div :class='chooseBarClass1' @click='appClicked'>
				预约
			</div>
			<div :class='chooseBarClass1' @click='messClicked'>
				消息
			</div>
			<div :class='chooseBarClass3' @click='perClicked'>
				个人
			</div>
		</div>
	</div>
	<div v-else-if = 'ModeChoose == 2'>
		<scroll-view :scroll-y = 'ScrollY' :scroll-top = "ScrollTop">
			<appointment />
		</scroll-view>
		<div :class = 'BarClass'>
			<div :class='chooseBarClass1' @click='priClicked'>
				首页
			</div>
			<div :class='chooseBarClass2'>
				预约
			</div>
			<div :class='chooseBarClass1' @click='messClicked'>
				消息
			</div>
			<div :class='chooseBarClass3' @click='perClicked'>
				个人
			</div>
		</div>
	</div>
	<div v-else-if = 'ModeChoose == 3'>
		<scroll-view :scroll-y = 'ScrollY' :scroll-top = "ScrollTop">
			<message />
		</scroll-view>
		<div :class = 'BarClass'>
			<div :class='chooseBarClass1' @click='priClicked'>
				首页
			</div>
			<div :class='chooseBarClass1' @click='appClicked'>
				预约
			</div>
			<div :class='chooseBarClass2'>
				消息
			</div>
			<div :class='chooseBarClass3' @click='perClicked'>
				个人
			</div>
		</div>
	</div>
	<div v-else>
		<scroll-view scroll-y = 'ScrollY' :scroll-top = "ScrollTop">
			<personality />
		</scroll-view>
		<div :class = 'BarClass'>
			<div :class='chooseBarClass1' @click='priClicked'>
				首页
			</div>
			<div :class='chooseBarClass1' @click='appClicked'>
				预约
			</div>
			<div :class='chooseBarClass1' @click='messClicked'>
				消息
			</div>
			<div :class='chooseBarClass4'>
				个人
			</div>
		</div>
	</div>
</template>

<script setup>
	
	import { ref, onMounted } from 'vue'
	import { useStore } from 'vuex'
	
	import { appointment } from './appointment.vue'
	import { home } from './home.vue'
	import { message } from './message.vue'
	import { personality } from './personality.vue'
	
	const ScrollY = ref('true')
	const ScrollClass = ref('scrollClass')
	const ScrollTop = ref('0')
	const BarClass = ref('barClass')
	const chooseBarClass1 = ref('chooseBarClass1')
	const chooseBarClass2 = ref('chooseBarClass2')
	const chooseBarClass3 = ref('chooseBarClass3')
	const chooseBarClass4 = ref('chooseBarClass4')
	const ModeChoose = ref('1')
	const Email = ref('null')
	
	function priClicked(){
		ModeChoose.value = 1
	}
	function appClicked(){
		ModeChoose.value = 2
	}
	function messClicked(){
		ModeChoose.value = 3
	}
	function perClicked(){
		ModeChoose.value = 4
	}
	
	onMounted(() => {
		const store = useStore()
		console.log(store.state.lastPage)
		if(store.state.lastPage == 1){
			ModeChoose.value = '2'
		}else if(store.state.lastPage == 'AppointmentDisplay'){
			ModeChoose.value = '3'
		}
	})

</script>

<style>
	.barClass{
		position: fixed;
		height: 100rpx;
		width: 750rpx;
		bottom: 0;
		display: flex;
		flex-direction: row;
		border-top: 2px solid #ff56c0;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	
	.chooseBarClass1{
		margin-right: 100rpx;
	}
	.chooseBarClass2{
		margin-right: 100rpx;
		border-bottom: 2px solid #ff56c0;
	}
	.chooseBarClass3{
		
	}
	.chooseBarClass4{
		border-bottom: 2px solid #ff56c0;
	}
	
</style>