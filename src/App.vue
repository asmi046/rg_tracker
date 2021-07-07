<template>
  <div id="app" class = "wrapper">
    <qr-reader v-show = "QR_READER_SHOWED" />
    <router-view></router-view>
  
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import qrReader from './components/qrReader.vue'
export default {
    components: { qrReader },
  
    name: 'App',

    computed: {
        ...mapGetters (["QR_READER_SHOWED"])
    },
}
</script>

<style>

</style>
