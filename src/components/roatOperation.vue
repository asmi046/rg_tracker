<template>
    <section id="operation" class="operation">
		<div class="container">

			<div class="operation__item-block">
				<div class="operation__item-title">
					<h2>Операция № 1 / РЦ 0</h2>
				</div>
				<div class="operation__tables">
					<div class="operation__string d-flex">
						<div class="operation__cell">Начало1</div>
						<div class="operation__cell">Конец</div>
						<div class="operation__cell">Фактически</div>
					</div>
					<div class="operation__string c-red d-flex">
						<div class="operation__cell">30.12.2021</div>
						<div class="operation__cell">30.12.2021</div>
						<div class="operation__cell">30.12.2021</div>
					</div>
				</div>
				<div class="operation__check-blok">
					<a href="#" class="operation__check-icon"></a>
				</div>
			</div>

			<div class="operation__item-block">
				<div class="operation__item-title">
					<h2>Операция № 1 / РЦ 1</h2>
				</div>
				<div class="operation__tables">
					<div class="operation__string d-flex">
						<div class="operation__cell">Начало</div>
						<div class="operation__cell">Конец</div>
						<div class="operation__cell">Фактически</div>
					</div>
					<div class="operation__string c-red d-flex">
						<div class="operation__cell">30.12.2021</div>
						<div class="operation__cell">30.12.2021</div>
						<div class="operation__cell">-</div>
					</div>
				</div>
				<div class="operation__check-blok">
					<button class="btn">Фиксировать</button>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
export default {

}
</script>

<style>

</style>