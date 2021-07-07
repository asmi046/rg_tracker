<template>
  <div class = "appWrapper">
      <head-app header = "Маршрутный лист"></head-app>
      <img v-show =  "ROAT_LOADER_SHOW" src="../assets/icons/loader.svg" alt="" class="loadDataQr">
      <div v-if = "PRODUCT_GUID != ''" class = "infoWrapper">
        <roat-detale/>
        <roat-operation/>
      </div>
      <div v-else class="infoWrapper">
            <h2 class = "msgH2">Нет данных отсканируйте</h2>
      </div>
      
  </div>
</template>

<script>
import headApp from './headApp.vue'
import RoatDetale from './roatDetale.vue'
import RoatOperation from './roatOperation.vue'
import {mapGetters} from 'vuex'

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

    components: { headApp, RoatDetale, RoatOperation },
    computed: {
        ...mapGetters ([ "PRODUCT_GUID", "ROAT_LOADER_SHOW", "ROAT_LIST", "SHOW_DIALOG"])
    },
}
</script>

<style>

  .loadDataQr{
    width:40px;
    height: auto;
    margin: 10px auto;
  }

  .appWrapper {
    min-height: 100vh;
    
  }

  .msgH2 {
    margin: 30px auto;
    text-align: center;
    display: inline-block;
    width:100%;
    font-size:22px;
    color: #C4041C;
  }
</style>