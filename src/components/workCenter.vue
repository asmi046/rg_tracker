<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Рабочий центр"></head-app>

        <div class="allWorkCenters">
            <h1>{{$route.params.center}}</h1>
            <router-link  :to = "{ name: 'workcenters'}" class="btn backBtn">&larr; К списку РЦ</router-link>
            <div class="allWorkCenter">
                <div v-for = "(item, index) in workCenter" :item = "item" :key="item.id" :class = "'oneWc_'+index" class="oneWc">
                    <div class="stb stb1">
                        <span class = "red">{{item.order_number}}</span> {{item.contragent}} 
                    </div>
                    
                    <div class="stb stb2">
                        {{item.operation_name}} 
                    </div>
                    
                    <div class="stb stb3">
                        {{new Date(item.start_data).toLocaleDateString()}} 
                    </div>
                    
                </div>
            </div>

            <div v-if = "workCenter.length == 0" class="noInfo">
                <h2>Нет данных по этому рабочему центру</h2>
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
            workCenter:[]
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
                    rpdata:''
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
        
        margin: 10px;
        width: 100%;
        min-width: 320px;
        display: flex;
    }

    .oneWc .stb {
        width: 33%;
        padding: 10px;
    }

    .oneWc .stb2 { 
        border-left: 1px solid #D1D2D4;
        border-right: 1px solid #D1D2D4;
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

    @media (max-width: 580px) { 
        .oneWc .stb {
            width: 100%;
        }

        .oneWc{ 
            flex-direction: column;            
        }

        .oneWc .stb2 {
            border: none; 
            border-top: 1px solid #D1D2D4;
            border-bottom: 1px solid #D1D2D4;
        }
    }

</style>