<template>
  <div class = "appWrapper">
      <qr-reader v-show = "QR_READER_SHOWED" />
      <head-app header = "Маршрутный лист"></head-app>
      <dialog-win v-show="SHOW_DIALOG" :information = "winParam"></dialog-win>
      <div v-if = "PRODUCT_GUID != ''" class = "infoWrapper">
        <roat-detale/>
        <roat-operation></roat-operation>
      </div>
      <div v-else class="qrBtnWraper">
          <img v-show =  "ROAT_LOADER_SHOW" src="../assets/icons/loader.svg" alt="" class="loadDataQr">
          <button @click="openScaner">
            Сканировать QR
          </button>

          <router-link class = "allRoatsButton" :to = "{ name: 'allroats' }" >Выбрать из <br/>расписания</router-link>
          
      </div>
      
  </div>
</template>

<script>
import headApp from './headApp.vue'
import QrReader from './qrReader.vue'
import RoatDetale from './roatDetale.vue'
import RoatOperation from './roatOperation.vue'


import {mapGetters} from 'vuex'
import DialogWin from './dialogWin.vue'

export default {
    data() {
      return {
        winParam: {
          head: "Фиксация этапов",
          msg: "Вы хотите зафиксировать:<br/>1<br/>2",
          callback: {
              doOk() {
                console.log("WinOk");
              },

              doConcle() {
                console.log("NoOk");
              }
          }
        }
      }
    },

    components: { headApp, RoatDetale, RoatOperation, QrReader, DialogWin },
    computed: {
        ...mapGetters (["QR_READER_SHOWED", "PRODUCT_GUID", "ROAT_LOADER_SHOW", "ROAT_LIST", "SHOW_DIALOG"])
    },

    methods:{
      openScaner() {
        // aa30fea8-ce90-11eb-80f9-90b11c05915c
        // aa30fea9-ce90-11eb-80f9-90b11c05915c
        // aa30feaa-ce90-11eb-80f9-90b11c05915c
        // aa30feaa-ce90-11eb-80f9-90b11c05915c
        // aa30feac-ce90-11eb-80f9-90b11c05915c
           
        // this.$store.dispatch('setProductGuid', "aa30fea8-ce90-11eb-80f9-90b11c05915c");
        
        this.$store.dispatch('showQrReader');
           
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
  margin: 10vh auto 0 auto;
}
.qrBtnWraper .allRoatsButton, 
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
    min-width: 220px;
    text-align: center;
}

.qrBtnWraper .allRoatsButton {
    background-image: url("../assets/icons/calendar.svg");
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