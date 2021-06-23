<template>
  <div class = "appWrapper">
      <qr-reader v-show = "QR_READER_SHOWED" />
      <head-app></head-app>
      <div v-if = "PRODUCT_GUID != ''" class = "infoWrapper">
        <roat-detale/>
        <roat-operation></roat-operation>
      </div>
      <div v-else class="qrBtnWraper">
          <img v-show =  "ROAT_LOADER_SHOW" src="../assets/icons/loader.svg" alt="" class="loadDataQr">
          <button @click="openScaner">
            Сканировать QR
          </button>
      </div>
      
  </div>
</template>

<script>
import headApp from './headApp.vue'
import QrReader from './qrReader.vue'
import RoatDetale from './roatDetale.vue'
import RoatOperation from './roatOperation.vue'

import {mapGetters} from 'vuex'

export default {
    components: { headApp, RoatDetale, RoatOperation, QrReader },
    computed: {
        ...mapGetters (["QR_READER_SHOWED", "PRODUCT_GUID", "ROAT_LOADER_SHOW"])
    },
    methods:{
      openScaner() {
           this.$store.dispatch('showQrReader');
           console.log(this.QR_READER_SHOWED);
      }
    }
}
</script>

<style>

.qrBtnWraper {
  width:100%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  margin: 10vh auto;
}
.qrBtnWraper button{ 
    margin: auto;
    background-color: #C4041C;
    color:white;
    background-image: url("../assets/icons/qr-code.svg");
    background-repeat: no-repeat;
    background-position: center 10px ;
    padding: 60px 20px 20px 20px;
    background-size: 40px;
    border-radius: 20px;
    font-size: 22px;
}

.loadDataQr{
  width:40px;
  height: auto;
  margin: 10px auto;
}

.appWrapper {
  min-height: 100vh;
  
}
</style>