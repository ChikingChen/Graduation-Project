<template>
	<div v-if = 'ModeChoose == 2'>
		<scroll-view scroll-y = 'True' :scroll-top = "ScrollTop">
			<appointment />
		</scroll-view>
		<div :class = 'BarClass'>
			<div :class='chooseBarClass2'>
				预约
			</div>
			<div :class='chooseBarClass3' @click='perClicked'>
				个人
			</div>
		</div>
	</div>
	<div v-else>
		<scroll-view scroll-y = 'True' :scroll-top = "ScrollTop">
			<personality />
		</scroll-view>
		<div :class = 'BarClass'>
			<div :class='chooseBarClass1' @click='appClicked'>
				预约
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
	import { personality } from './personality.vue'
	
	const ScrollY = ref('true')
	const ScrollClass = ref('scrollClass')
	const ScrollTop = ref('0')
	const BarClass = ref('barClass')
	const chooseBarClass1 = ref('chooseBarClass1')
	const chooseBarClass2 = ref('chooseBarClass2')
	const chooseBarClass3 = ref('chooseBarClass3')
	const chooseBarClass4 = ref('chooseBarClass4')
	const ModeChoose = ref('4')
	const Email = ref('null')

	function appClicked(){
		ModeChoose.value = 2
	}
	function perClicked(){
		ModeChoose.value = 4
	}
	
	onMounted(() => {
		const store = useStore()
		if(store.state.lastPage == 1){
			ModeChoose.value = '2'
		}else if(store.state.lastPage == 'AppointmentDisplay'){
			ModeChoose.value = '4'
			uni.navigateTo({
				url: '/pages/message/message'
			})
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
		margin-right: 280rpx;
	}
	.chooseBarClass2{
		margin-right: 280rpx;
		border-bottom: 2px solid #ff56c0;
	}
	.chooseBarClass3{
		
	}
	.chooseBarClass4{
		border-bottom: 2px solid #ff56c0;
	}
	
</style>