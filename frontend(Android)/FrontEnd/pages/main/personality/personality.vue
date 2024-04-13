<template>
	<div @click='changeMessage'>
		{{ test }}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				test: "this is a test",
				Account: ""
			};
		},
		methods: {
			changeMessage() {
				this.test = 'this is another test'
			}
		},
		mounted() {
			console.log(this.$store.state.Account)
		}
	}
</script>

<style>

</style>
