<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Рабочие центры"></head-app>

        <div class="allWorkCenters">
            <router-link  :to = "{ name: 'workcenter', params: {center: item.name}  }" v-for = "(item, index) in workCenters" :item = "item" :key="item.id" :class = "'wc_element_'+index" class="wc_element">
                <span>Подразделение:</span>
                <h2>{{item.subdivisions_name}}</h2>
                <span>Рабочий центр:</span>
                <h2>{{item.name}}</h2>
            </router-link>
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
            workCenters:[]
        }
    },
    components: { qrReader, HeadApp },

    computed: {
        ...mapGetters (["REST_API_PREFIX", "QR_READER_SHOWED"])
    },


    methods:{
        getCenters() {
            axios.get(this.REST_API_PREFIX + 'get_workcenters',
            {
                params: {
                    supdevision: 0
                }
            })
            .then( (response) => {
                this.workCenters = response.data;
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
        this.getCenters();
    }
}
</script>

<style>
    .allWorkCenters{
        display: flex;
        justify-content: space-between;
        width: 94%;
        
        margin: 0 3%;
        margin-top: 61px;
        height: auto;
        flex-wrap: wrap;
    }

    .wc_element{
        border: 1px solid #D1D2D4;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        width: 20%;
        min-width: 320px;
    }

    h2 {
        color: #C4041C;
        margin: 5px 0;
        font-size: 16px;
        font-weight: 500;
    }

</style>