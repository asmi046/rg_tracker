<template>
    <header id="header" class="header">
        <div class="container">
            <div class="header__row d-flex">
                <a href="#" class="header__logo logo-icon"></a>
                <button @click.prevent="openScaner" class = "miniQrBtn"></button>
                <p class="header__text">
                    Маршрутный <br>
                    лист
                </p>
            </div>
        </div>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
            ...mapGetters (["QR_READER_SHOWED"])
    },


    methods:{
            openScaner() {
                this.$store.dispatch('showQrReader');
            }
    }
   
}
</script>

<style>
    .miniQrBtn{
        width:30px;
        height:30px;
        margin: auto;
        background-color: #C4041C;
        color:white;
        background-image: url("../assets/icons/qr-code.svg");
        background-repeat: no-repeat;
        background-position: center;
        padding: 5px;
        background-size: 60%;
        border-radius: 50%;
    }
</style>