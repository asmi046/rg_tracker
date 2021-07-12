<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Полное расписание"></head-app>
        
        <div class="allRoatsWrapper infoWrapper">
            <div v-for = "(item, index) in allRoats" :item = "item" :key="item.id" :class = "'al_element_'+index" class="al_element">
                <div class="head">
                    <h2>{{item.order_number}}</h2>
                </div>
                <div class="body">
                    <div class="tableRow ">
                        <div class="tableCell cellHead elem1">Наменклатура</div>
                        <div class="tableCell cellHead elem2">Спецификация</div>
                        <div class="tableCell cellHead elem3">Количество</div>
                        <div class="tableCell cellHead elem4">№ бухты</div>
                        
                        <div class="tableCell elem5">{{item.nam}}</div>
                        <div class="tableCell elem6">{{item.sp}}</div>
                        <div class="tableCell elem7">{{item.count}}</div>
                        <div class="tableCell elem8">{{item.buhta_number}}</div>
                    </div>

                </div>
                <div class="footer">
                    <button class="btn selectElem">Выбрать</button>
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
            allRoats:[]
        } 
    },

    computed: {
        ...mapGetters (["REST_API_PREFIX", "QR_READER_SHOWED"])
    },

    methods:{
        getRoats() {
            axios.get(this.REST_API_PREFIX + 'get_timetable',
            {
                params: {
                    zaknumber: 1
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

<style>
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

    .body {
        padding: 0!important;
        border-top: 1px solid #D1D2D4;
        border-bottom: 1px solid #D1D2D4;
    }

    .tableRow {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .tableCell {
        padding: 5px 15px;
        border-right: 1px solid #D1D2D4;
        color: #C4041C;
    }

    .tableRow .tableCell:nth-child(4n){
        border-right: none;
    }

    .cellHead {
        border-bottom: 1px solid #D1D2D4;
        color: #6D6E72;
        font-size: 12px;
    }

    .footer {
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

        .elem5 {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 2;
            grid-row-end: 3;
            
        }

        .elem6 {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
            
        }

        .elem3 {
            border-top: 1px solid #D1D2D4;
        }

        .elem4 {
            border-top: 1px solid #D1D2D4;
        }
    }


</style>