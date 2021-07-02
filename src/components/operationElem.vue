<template>
    <div class="operation__item-block">
		<div class="operation__item-title">
			<h2>Операция № {{item.operation_number}} / {{item.work_centers}}</h2>
		</div>
		<div class="operation__tables">
			<div class="operation__string d-flex">
				<div class="operation__cell">Начало</div>
				<div class="operation__cell">Конец</div>
				<div class="operation__cell">Фактически</div>
			</div>
			<div class="operation__string c-red d-flex">
				<div class="operation__cell">{{item.start_data}}</div>
				<div class="operation__cell">{{item.finish_data}}</div>
				<div class="operation__cell">{{item.fact_data}}</div>
			</div>
		</div>
		<div class="operation__check-blok">
			<!-- <a href="#" class="operation__check-icon"></a> -->
            <button class="btn" @click.prevent="fixThis">Фиксировать</button>
		</div>
	</div>
</template>

<script>

export default {
    props: ['item'],
	methods: {
		fixThis() {
			this.$store.dispatch('showDialog', true);
		}
	}
}
</script>

<style>

</style>