<template>
    <div class="operation__item-block">
		<dialog-win v-show="show_this_dialog" :information = "winParam" ></dialog-win>
		<dialog-win-start v-show="show_start_dialog" :information = "startWinParam" ></dialog-win-start>
		<dialog-win-quality v-show="show_quality_dialog" :information = "qualityWinParam"></dialog-win-quality>
		<div class="operation__item-title">
			<h2>{{item.operation_name}} /  <router-link  :to = "{ name: 'workcenter', params: {center: item.work_centers}  }"> {{item.work_centers}}</router-link></h2>
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
			<button v-show = "(item.started == '1')"  class="btn qualityBtn" @click.prevent="quality(item.operation_number)">Качество</button>
			<button v-if = "(item.started == '0')&&(item.fixation == '0')" class="btn btnStart" @click.prevent="startThis(item.id)">Старт</button>
			<div v-if = "item.fixation == '1'" class="statusFix">
				<p class="statusLabe">Статус: {{item.fixation_status}}</p>
				<span class="operation__check-icon"></span>
			</div>
			
            <button :disabled = "(item.started == '0')" v-else class="btn" @click.prevent="fixThis()">Фиксировать</button>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import dialogWin from './dialogWin.vue';
import axios from 'axios';
import DialogWinStart from './dialogWinStart.vue';
import DialogWinQuality from './dialogWinQuality.vue';

export default {
	data() {
      return {
		show_this_dialog:false, 
		
		fixArray:[], 
		winParam: {
				head: "Фиксация этапов",
				msg: "",
				fixSatatuses:[],
				fixAllow: false,
				callback: {
					doOk: (status) => {
						axios.get(this.REST_API_PREFIX + 'set_fix',
						{
							params: {
								id_list: this.fixArray,
								status:status
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
			},

			show_start_dialog:false,
			startWinParam: {
				head: "Запуск oперации",
				msg: "",
				fixSatatuses:[],
				fixAllow: false,
				callback: {
					doOk: (id) => {
						axios.get(this.REST_API_PREFIX + 'set_start',
									{
										params: {
											id: id,
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
					},

					doConcle: () => {
						console.log("NoOk");
						this.show_start_dialog = false;
					}
				}
			},

			show_quality_dialog:false, 
			qualityWinParam: {
				head: "Оценка качества",
				difList:[],
				callback: {
					doOk: (paramt) => {
						
						let result = [];

						for (let i = 0; i<paramt.list.length; i++) {
							if (paramt.list[i].checed)
							result.push({
								metr: paramt.metr,
								orderNumber: this.item.order_number,
								buhtaNumber: this.item.buhta_number,
								workCenter: this.item.work_centers,
								diffect: paramt.list[i].name,
								comment: paramt.comment
							})
						}

						if (result.length == 0) {
							result.push({
								metr: paramt.metr,
								orderNumber: this.item.order_number,
								buhtaNumber: this.item.buhta_number,
								workCenter: this.item.work_centers,
								diffect: "Нет",
								comment: paramt.comment
							})
						}

						axios.get(this.REST_API_PREFIX + 'fix_diffect',
						{
							params: {
								fixdata: result
							}
						})
						.then( (response) => {
							console.log(response);
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

						console.log(result);
					},

					doConcle: () => {
						this.show_quality_dialog = false;
					}
				}
			},
      }
    },

    components: { dialogWin, DialogWinStart, DialogWinQuality },
    props: ['item'],
	
	computed: {
        ...mapGetters (["PRODUCT_GUID","REST_API_PREFIX", "ROAT_LIST"])
    },
	methods: {
		fixThis() {
			let operationNumber = parseInt (this.item.operation_number);
			if (operationNumber == 1)
			{
				
				this.winParam.msg = "Вы хотите зафиксировать:<br/>"+
				this.ROAT_LIST.timeline[0].operation_name+" / "+this.ROAT_LIST.timeline[0].work_centers+"<br/>";
				this.winParam.fixSatatuses = this.ROAT_LIST.timeline[0].fix_statuses;
				this.winParam.fixAllow = true;
			} else {
				if (parseInt(this.ROAT_LIST.timeline[operationNumber-2].fixation) == 0) 
				{
				
					this.winParam.fixAllow = false;
				} else {
				
					this.winParam.msg = "Вы хотите зафиксировать:<br/>"+
					this.ROAT_LIST.timeline[operationNumber-1].operation_name+" / "+this.ROAT_LIST.timeline[operationNumber-1].work_centers+"<br/>";
					this.winParam.fixSatatuses = this.ROAT_LIST.timeline[operationNumber-1].fix_statuses;					
					this.winParam.fixAllow = true;
				}
			}
			
			this.fixArray.push(this.ROAT_LIST.timeline[operationNumber-1].id);
			this.show_this_dialog = true;
		},

		startThis(id) {
			let operationNumber = parseInt (this.item.operation_number);
			
			if (operationNumber == 1)
			{
				
				this.startWinParam.msg = "Вы хотите запустить: <br/>"+
				this.ROAT_LIST.timeline[0].operation_name+" / "+this.ROAT_LIST.timeline[0].work_centers+"<br/>";
				this.startWinParam.fixSatatuses = [id];
				this.startWinParam.fixAllow = true;
			} else {
				if (parseInt(this.ROAT_LIST.timeline[operationNumber-2].fixation) == 0) 
				{
				
					this.startWinParam.fixAllow = false;
				} else {
				
					this.startWinParam.msg = "Вы хотите запустить:<br/>"+
					this.ROAT_LIST.timeline[operationNumber-1].operation_name+" / "+this.ROAT_LIST.timeline[operationNumber-1].work_centers+"<br/>";
					this.startWinParam.fixSatatuses = [id];				
					this.startWinParam.fixAllow = true;
				}
			}
			console.log(this.startWinParam.fixSatatuses)
			this.show_start_dialog = true;
		},

		quality(index) {
			this.qualityWinParam.difList = this.ROAT_LIST.timeline[index].diffects,
			this.show_quality_dialog = true;
		}

	}
}
</script>

<style>
.statusLabe {
	margin: auto 20px auto auto;
}

.btnStart {
	background-color: #347815;
	margin: auto 20px auto 0;
}

.qualityBtn {
	margin: auto auto auto 0;
}

.statusFix {
	display: flex;
}

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