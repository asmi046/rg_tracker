<template>
    <div class = "appWrapper">
        <head-app header = "Трекинг производства"></head-app>
        <div class="qrBtnWraper">
            <button @click="openScaner">Сканировать QR</button>
            <router-link class = "allRoatsButton" :to = "{ name: 'allroats' }" >Выбрать из <br/>расписания</router-link>
        </div>

        
    </div>
</template>

<script>

import headApp from './headApp.vue'

export default {
    components: { headApp },
    
    methods:{
        openScaner() {
           // aa30fea8-ce90-11eb-80f9-90b11c05915c
            // aa30fea9-ce90-11eb-80f9-90b11c05915c
            // aa30feaa-ce90-11eb-80f9-90b11c05915c
            // aa30feaa-ce90-11eb-80f9-90b11c05915c
            // aa30feac-ce90-11eb-80f9-90b11c05915c
           
            this.$store.dispatch('setProductGuid', "aa30fea8-ce90-11eb-80f9-90b11c05915c");
            this.$router.push({ name: 'roatlist'})
            
            // this.$store.dispatch('showQrReader');
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
</style>