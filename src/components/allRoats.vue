<template>
    <div class = "appWrapper">
        <qr-reader v-show = "QR_READER_SHOWED" />
        <head-app header = "Полное расписание"></head-app>
        
    </div>
</template>

<script>
import HeadApp from './headApp.vue'
import qrReader from './qrReader.vue'

export default {
    components: { qrReader, HeadApp },

}
</script>

<style>

</style>