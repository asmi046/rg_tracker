<template>
    <div class="operation__item-block">
		
		<div class="operation__item-title">
			<h2>{{item.operation_name}} /  <router-link  :to = "{ name: 'workcenter', params: {center: item.work_centers}  }"> {{item.work_centers}}</router-link> ({{item.operation_number}})</h2>
		</div>
		<div class="operation__tables">
			<div class="operation__string d-flex">
				<div class="operation__cell">Начало</div>
				<div class="operation__cell">Конец</div>
				<div class="operation__cell">Старт</div>
				<div class="operation__cell">Фактически</div>
			</div>
			<div class="operation__string c-red d-flex">
				<div class="operation__cell">{{item.start_data}}</div>
				<div class="operation__cell">{{item.finish_data}}</div>
				<div class="operation__cell">{{item.started_data}}</div>
				<div class="operation__cell">{{item.fact_data}}</div>
			</div>
		</div>
		<div class="operation__check-blok">
			<operation-fix-blk :item="item" :index = "index"></operation-fix-blk>
		</div>
	</div>
</template>

<script>
import operationFixBlk from "./operationFixBlk.vue"


export default {
    components: { operationFixBlk },
	data() {
      return {

      }
    },

    props: ['item', 'index'],
	

	
}
</script>

<style>


.operation__check-blok {
	display: flex;
}

@media (max-width: 812px) {
	.operation__check-blok {
		flex-direction: column;
	}	

	.operation__check-blok .btn { 
		margin: 5px 0;
		width: 100%;
	}

	.statusFix { 
		margin: 5px 0;
	}
}

</style>