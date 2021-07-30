<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Рабочий центр"></head-app>

        <div class="allWorkCenters">
            <h1>{{$route.params.center}}</h1>

            <div class="btnWrapper">
                <router-link  :to = "{ name: 'workcenters'}" class="btn backBtn">&larr; К списку РЦ</router-link>
                <select @change.prevent="getCenter()" v-model = "dataElem" class = "selectData">
                    <option selected value = "">Сегодня</option>
                    <option v-for = "(item, index) in workCenter.dates" :item = "item" :key="item.start_data" :class = "'oneWc_'+index" :value = "item.start_data">{{new Date(item.start_data.replace(/-/g, "/")).toLocaleDateString()}}</option>

                </select>
            </div>
            
            <div class="allWorkCenter">
                <div v-for = "(item, index) in workCenter.timeline" :item = "item" :key="item.id" :class = "'oneWc_'+index" class="oneWc">
                    <div class="stb stb1">
                        <span class = "red">{{item.order_number}}</span> {{item.contragent}} 
                    </div>

                    <div class="stb stb1_1">
                        {{item.nam}}
                    </div>

                    <div class="stb stb1_2">
                        {{item.buhta_number}}
                    </div>
                    
                    <div class="stb stb2">
                        {{item.operation_name}} 
                    </div>
                    
                    <div class="stb stb3">
                        {{new Date(item.start_data.replace(/-/g, "/")).toLocaleDateString()}} 
                    </div>
                    
                    <div class="stb stb4">
                        {{item.fixation_status}} 
                    </div>
                    
                </div>
            </div>

            <div v-if = "workCenter.timeline == 0" class="noInfo">
                <h2>Нет данных по этому рабочему центру на эту дату</h2>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeadApp from './headApp.vue'
import qrReader from './qrReader.vue'
import {mapGetters} from 'vuex'
export default {
    data() {
        return {
            workCenter:[],
            dataElem:""
        }
    },

    props: ['center'],

    components: { qrReader, HeadApp },

    computed: {
        ...mapGetters (["REST_API_PREFIX", "QR_READER_SHOWED"])
    },


    methods:{
        getCenter() {
            axios.get(this.REST_API_PREFIX + 'get_workcenter',
            {
                params: {
                    center: this.$route.params.center,
                    rpdata:this.dataElem
                }
            })
            .then( (response) => {
                console.log(response.data);
                this.workCenter = response.data;
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
        this.getCenter();
    }
}
</script>

<style>
    .selectData {
        margin: auto 0 auto auto;
    }

    .btnWrapper {
        width: 100%;
        display: flex;
    }
    
    .allWorkCenter{
        display: flex;
        justify-content: space-between;
        width: 100%;

        height: auto;
        flex-wrap: wrap;
    }

    .oneWc{
        border: 1px solid #D1D2D4;
        border-radius: 10px;
        
        margin: 10px 0;
        width: 100%;
        min-width: 300px;
        display: flex;
    }

    .oneWc .stb {
        width: 33%;
        padding: 10px;
    }

    .oneWc .stb { 
        border-right: 1px solid #D1D2D4;
    }

    .oneWc .stb:last-child { 
        border-right: none;
    }

    h1 {
        color: #C4041C;
        margin: 5px 0;
        font-size: 26px;
        font-weight: 500;
        width: 100%;
    }

    .backBtn {
        margin: 20px auto 20px 0;
    }

    .red{
        color: #C4041C;    
    }

    @media (max-width: 1024px) { 
        .oneWc .stb { 
            min-width: 16%;
            overflow: hidden;
        }
    }

    @media (max-width: 780px) { 
        .oneWc .stb {
            width: 100%;
        }

        .oneWc{ 
            flex-direction: column;            
        }

        .oneWc .stb {
            border: none; 
            border-bottom: 1px solid #D1D2D4;
        }

        .oneWc .stb:last-child { 
            border-bottom: none;
        }
    }

</style>