<template>
  <div class = "appWrapper">
      <qr-reader v-show = "QR_READER_SHOWED" />
      <head-app header = "Очередь выполнения"></head-app>
      
      <div class="allWorkCenters">
            <div v-for = "(item, key, index) in tabloInfo.timeline" :item = "item" :key="key" :class = "'ca_'+index" class="centres">
                <h1 class = "cl_blk">{{key}}</h1>
                <div class="tabloWrapper">
                    <div v-for = "(item, index) in item" :item = "item" :key="item.id" :class = "'te_'+index" class="tablo_elem">
                        
                        <div class="tl_elem">
                            <h2 class="big_text">{{item.buhta_number}}</h2>
                        </div>

                        <div class="tl_elem">
                            <strong>Планируемая дата запуска</strong> {{new Date(item.start_data.replace(/-/g, "/")).toLocaleDateString()}} 
                            {{new Date(item.start_data).toLocaleTimeString()}} 
                        </div>

                        <div class="tl_elem">
                            <strong>Наименование:</strong> {{item.nam}}
                        </div>

                        <div class="tl_elem">
                            <strong>Спецификация:</strong> {{item.sp}}
                        </div>

                        <div class="tl_elem">
                            <span class = "red">{{item.order_number}}</span> {{item.contragent}} 
                        </div>
                    </div>
                </div>
            </div>
            
            
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex'
import qrReader from './qrReader.vue';
import HeadApp from './headApp.vue';
export default {
    components: { qrReader, HeadApp },
    data() {
        return {
            tabloInfo:[],
        }
    },


    computed: {
        ...mapGetters (["REST_API_PREFIX", "QR_READER_SHOWED"])
    },

    created: function() {
        if (this.$route.params.center !== "") 
        axios.get(this.REST_API_PREFIX + 'get_tablo',
            {
                params: {
                    group: this.$route.params.center,
                }
            })
            .then( (response) => {
                console.log(response.data);
                this.tabloInfo = response.data;
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
}
</script>

<style>

.tabloWrapper {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
    justify-content: left;
}

.tablo_elem {
    border: 1px solid #D1D2D4;
    padding: 10px 20px;
    margin-right: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.tl_elem {
    margin: 6px;
}


.big_text{
    font-size: 28px;
}

.centres {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
}

.cl_blk {
    color:black
}

</style>