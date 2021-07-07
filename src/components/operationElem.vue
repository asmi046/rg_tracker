<template>
    <div class="operation__item-block">
		<dialog-win v-show="show_this_dialog" :information = "winParam" ></dialog-win>
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
			<span v-if = "item.fixation == '1'" class="operation__check-icon"></span>
            <button v-else class="btn" @click.prevent="fixThis">Фиксировать</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import dialogWin from './dialogWin.vue';
import axios from 'axios';

export default {
	data() {
      return {
		show_this_dialog:false, 
		fixArray:[], 
		winParam: {
				head: "Фиксация этапов",
				msg: "",
				callback: {
					doOk: () => {
						axios.get(this.REST_API_PREFIX + 'set_fix',
						{
							params: {
								id_list: this.fixArray
							}
						})
						.then( (response) => {
							console.log(response);
							this.$store.dispatch('setProductGuid', this.PRODUCT_GUID);
						})

						.catch((error) => {
							let rezText = "";
								if (error.response)
								{
									rezText = error.response.data.message;
								} else 
								if (error.request) {
									rezText = error.message;
								} else {
									rezText = error.message;
								}

							console.log(rezText);
							console.log(error.config);
						});
						this.show_this_dialog = false;
					},

					doConcle: () => {
						console.log("NoOk");
						this.show_this_dialog = false;
					}
				}
			}
      }
    },

    components: { dialogWin },
    props: ['item'],
	
	computed: {
        ...mapGetters (["PRODUCT_GUID","REST_API_PREFIX", "ROAT_LIST"])
    },
	methods: {
		fixThis() {
			
			this.fixArray = [];
			let textFixation = "Вы хотите зафиксировать:<br/>";
			for (let i = 0; i < parseInt(this.item.operation_number); i++)
			{
				console.log(this.ROAT_LIST.timeline[i]);
				if (parseInt(this.ROAT_LIST.timeline[i].fixation) == 0) {
					this.fixArray.push(this.ROAT_LIST.timeline[i].id);
					textFixation += "Операция № "+this.ROAT_LIST.timeline[i].operation_number+" / "+this.ROAT_LIST.timeline[i].work_centers+"<br/>";
				}
			}

			console.log(this.fixArray);
			console.log(textFixation);

			this.winParam.msg = textFixation;
			this.show_this_dialog = true;
			// this.$store.dispatch('showDialog', true);
		}
	}
}
</script>

<style>

</style>