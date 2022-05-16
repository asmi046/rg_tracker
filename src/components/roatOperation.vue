<template>
    <section id="operation" class="operation">
		<div class="container">
			<operation-elem v-for = "(item, index) in ROAT_LIST.timeline" :item = "item" :index = "index" :key="item.id" :class = "'operation_blk_'+index" />
		</div>
	</section>
</template>

<script>
import {mapGetters} from 'vuex'
import operationElem from './operationElem.vue'

export default {
    components: { operationElem },
    computed: {
        ...mapGetters (["ROAT_LIST"])
    }
	
}
</script>

<style>

</style>