<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Полное расписание"></head-app>
        
        <div class="controlPanel infoWrapper">
            <form action="" class="serchForm">
                <input v-model="searchStr" type="text" class="serchElement" placeholder = "Введите запрос">
            </form>
        </div>

        <div class="allRoatsWrapper ">
            <div v-for = "(item, index) in allRoats" :item = "item" :key="item.id" :class = "'al_element_'+index" class="al_element">
                <div class="head" :class = "{head_select:item.show }">
                    <h2>
                        {{item.order_number}} ({{item.contragent}}) <br/>
                        Плановая: {{ new Date(item.plan_data).toLocaleDateString()}}<br/>
                        Расчетная: {{new Date(item.calc_data).toLocaleDateString()}}<br/>
                    </h2>
                </div>
                <div v-show="item.show" class="body">
                    <div v-for = "(itemProd, index) in item.elements" :item = "item" :key="itemProd.id" :class = "'tableRow_'+index" class="tableRow ">
                        <div class="tableCell cellHead elem1">Наменклатура</div>
                        <div class="tableCell cellHead elem2">Спецификация</div>
                        <div class="tableCell cellHead elem3">Количество</div>
                        <div class="tableCell cellHead elem4">№ бухты</div>
                        <div class="tableCell cellHead elem5">Управление</div>
                        
                        <div class="tableCell elem6">{{itemProd.nam}}</div>
                        <div class="tableCell elem7">{{itemProd.sp}}</div>
                        <div class="tableCell elem8">{{itemProd.count}}</div>
                        <div class="tableCell elem9">{{itemProd.buhta_number}}</div>
                        <div class="tableCell elem10"><button @click.prevent="setGuid(itemProd.id_guid)" class="btn selectElem">Выбрать</button></div>
                    </div>

                </div>
                <div class="footer">
                    <button @click.prevent="item.show = !item.show" :class = "{btn_gray:item.show }" class="btn">{{(!item.show)?"Показать все":"Свернуть" }}</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import HeadApp from './headApp.vue'
import qrReader from './qrReader.vue'
import {mapGetters} from 'vuex'

export default {
    components: { qrReader, HeadApp },
    data() {
        return {
            searchStr:"",
            allRoats:[]
        } 
    },

    computed: {
        ...mapGetters (["REST_API_PREFIX", "QR_READER_SHOWED"])
    },

    watch: { 
        searchStr: function() {
            
                this.getRoats();
        
        }
    },

    methods:{
        setGuid(guid) {
            this.$store.dispatch('setProductGuid', guid);
            this.$router.push({ name: 'roatlist'});
        },

        getRoats() {
            axios.get(this.REST_API_PREFIX + 'get_timetable',
            {
                params: {
                    search_str: this.searchStr
                }
            })
            .then( (response) => {
                console.log(response);
                this.allRoats = response.data;
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
        }
    },

    created: function() {
        this.getRoats();
    }
    
}
</script>

<style scoped>

.btn_gray {
    background-color: #6d6e72;
}
    .controlPanel {
        width: 100%;
        display: flex;   
        margin-bottom: 10px;     
    }

    .serchForm {
        width:95%;
        margin: 15px auto 0 auto;
    }

    .serchForm input{ 
        border: 1px solid #D1D2D4;
        border-radius: 10px;
        min-height: 35px;
        width: 100%;
        padding: 0 10px;
    }

    .allRoatsWrapper {
        display: flex;
        flex-direction: column;
    }

    .al_element {
        border: 1px solid #D1D2D4;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        margin: 10px auto;
        width:95%;
        overflow: hidden;
    }

    .al_element h2 {
        font-size: 20px;
        font-weight: 500;
        line-height: 24px;
        color: #C4041C;
    }

    .al_element > div {
        width:100%;
        padding: 10px 15px;
    }

    .head_select {
        background-color: #C4041C;
        
    }

    .head_select h2{
        color: white;
    }

    .body {
        padding: 0!important;
        border-top: 1px solid #D1D2D4;
        
    }

    .tableRow {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }

    .tableCell {
        padding: 5px 15px;
        border-right: 1px solid #D1D2D4;
        color: #C4041C;
    }

    .tableRow .tableCell:nth-child(5n){
        border-right: none;
    }

    .cellHead {
        border-bottom: 1px solid #D1D2D4;
        border-top: 1px solid #D1D2D4;
        color: #6D6E72;
        font-size: 12px;
    }

    .body .tableRow:first-child .cellHead {
        border-top: none;
    }
    
    .footer {
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #D1D2D4;
        
    }

            .elem10 {
                display: flex;
            justify-content: flex-end;
        }

    @media (max-width: 680px) { 
        .tableRow {
            grid-template-columns: repeat(2, 1fr);
        } 

        .elem1 {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 2;
        }

        .elem2 {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
        }

        .elem7 {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 3;
            
        }

        .elem8 {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
            
        }

        .elem10 {
            grid-column-start: 1;
            grid-column-end: 3;
            border-top: 1px solid #D1D2D4; 
        }

        .elem5 {
            display: none;
        }




        .elem2,.elem4,.elem8,.elem9 {
            border-right:none;
        }

        .elem3 {
            border-top: 1px solid #D1D2D4;
        }

        .elem4 {
            border-top: 1px solid #D1D2D4;
        }


    }


</style>