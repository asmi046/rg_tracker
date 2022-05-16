<template>
    <div class="wrapper">   
        <dialog-win v-show="show_this_dialog" :information = "winParam" ></dialog-win>
		<dialog-win-start v-show="show_start_dialog" :information = "startWinParam" ></dialog-win-start>
		<dialog-win-quality v-show="show_quality_dialog" :information = "qualityWinParam"></dialog-win-quality>

		<button v-show = "(item.started == '1')"  class="btn qualityBtn" @click.prevent="quality(index)">Качество</button>
		<button v-if = "(item.started == '0')&&(item.fixation == '0')" class="btn btnStart" :class = "'btn'+index" @click.prevent="startThis(item.id, index)">Старт</button>
		<div v-if = "item.fixation == '1'" class="statusFix">
			<p class="statusLabe">Статус: {{item.fixation_status}}</p>
			<span class="operation__check-icon"></span>
		</div>
		
        <button :disabled = "(item.started == '0')" v-else class="btn" @click.prevent="fixThis(index)">Фиксировать</button>

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
    props: ['item', 'index'],

    computed: {
        ...mapGetters (["PRODUCT_GUID","REST_API_PREFIX", "ROAT_LIST"])
    },

    methods: {
		fixThis(index) {
            if (this.ROAT_LIST.length == 0) 
            {
                console.log("Get roat list")
                this.$store.dispatch('setProductGuid', this.item.id_guid)
            }
			// let operationNumber = parseInt (this.item.operation_number);
			
			if (index == 0)
			{
				
				this.winParam.msg = "Вы хотите зафиксировать:<br/>"+
				this.ROAT_LIST.timeline[0].operation_name+" / "+this.ROAT_LIST.timeline[0].work_centers+"<br/>";
				this.winParam.fixSatatuses = this.ROAT_LIST.timeline[0].fix_statuses;
				this.winParam.fixAllow = true;
			} else {
				if (parseInt(this.ROAT_LIST.timeline[index-1].fixation) == 0) 
				{
				
					this.winParam.fixAllow = false;
				} else {
				
					this.winParam.msg = "Вы хотите зафиксировать:<br/>"+
					this.ROAT_LIST.timeline[index].operation_name+" / "+this.ROAT_LIST.timeline[index].work_centers+"<br/>";
					this.winParam.fixSatatuses = this.ROAT_LIST.timeline[index].fix_statuses;					
					this.winParam.fixAllow = true;
				}
			}
			
			this.fixArray.push(this.ROAT_LIST.timeline[index].id);
			this.show_this_dialog = true;
		},

		startThis(id, index) {
            console.log(index)
			if (this.ROAT_LIST.length == 0) 
            {
                console.log("Get roat list")
                this.$store.dispatch('setProductGuid', this.item.id_guid);
            }
			// let operationNumber = parseInt (this.item.operation_number);
			
			if (index == 0)
			{
				
				this.startWinParam.msg = "Вы хотите запустить: <br/>"+
				this.ROAT_LIST.timeline[0].operation_name+" / "+this.ROAT_LIST.timeline[0].work_centers+"<br/>";
				this.startWinParam.fixSatatuses = [id];
				this.startWinParam.fixAllow = true;
			} else {
				if (parseInt(this.ROAT_LIST.timeline[index-1].fixation) == 0) 
				{
				
					this.startWinParam.fixAllow = false;
				} else {
				
					this.startWinParam.msg = "Вы хотите запустить:<br/>"+
					this.ROAT_LIST.timeline[index-1].operation_name+" / "+this.ROAT_LIST.timeline[index-1].work_centers+"<br/>";
					this.startWinParam.fixSatatuses = [id];				
					this.startWinParam.fixAllow = true;
				}
			}
			console.log(this.startWinParam.fixSatatuses)
			this.show_start_dialog = true;
		},

		quality(index) {
            if (this.ROAT_LIST.length == 0) 
            {
                console.log("Get roat list")
                this.$store.dispatch('setProductGuid', this.item.id_guid);
            }
			this.qualityWinParam.difList = this.ROAT_LIST.timeline[index].diffects,
			this.show_quality_dialog = true;
		}

	}
}
</script>

<style scoped>
.wrapper {
    width:100%;
    display: flex;
    flex-direction: row;
}
    .statusLabe {
        margin: auto 20px auto auto;
    }

    .btnStart {
        background-color: #347815;
        margin: auto 20px auto auto;
    }

    .qualityBtn {
        margin: auto auto auto 0;
    }

    .statusFix {
        display: flex;
    }
</style>