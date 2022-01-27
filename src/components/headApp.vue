<template>
    <header id="header" class="header">
        <div class="container">
            <div class="header__row d-flex">
                <router-link :to = "{ name: 'main' }" class="header__logo logo-icon"></router-link>
                
                <button @click.prevent="openScaner" class = "miniQrBtn"></button>

                <div v-show="AUTORISE" class="autorizeHeadElem">
                    <span>{{USER_NAME}}</span>
                     <button @click.prevent="relogin" class = "miniExit"></button>
                </div>

                <p class="header__text">
                    {{header}}
                </p>
            </div>
        </div>
    </header>
</template>

<script>
import {mapGetters} from 'vuex'
import allLibs from '../lib/libs';

export default {
    props: ['header'],

    computed: {
            ...mapGetters (["QR_READER_SHOWED","AUTORISE", "USER_NAME"])
    },


    methods:{
            openScaner() {
                this.$store.dispatch('showQrReader');
            },

            relogin() {
                allLibs.reloginUser();
            }
    }
   
}
</script>

<style>
    .miniExit,
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

    .miniExit {
        background-image: url("../assets/icons/exit.svg");
        background-size: 70%;
    }

    .autorizeHeadElem {
        margin-right: 10px;
        padding-right: 10px;
        border-right: 1px solid #D1D2D4;
        display: flex;
    }

    .autorizeHeadElem span{ 
        margin: auto 10px auto 0;

    }
</style>