import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


export default new Vuex.Store ({
    state: {
        // Поля авторизации
        autorise: false,
        userName: "",
        userEmail: "",

        rest_api_prefix:"https://rubexgroup.ru/wp-json/mes/v2/",
        roatLaderShow:false,
        qrReaderShowed:false,
        qrReaderCameraState:"off",
        roatList:[],
        productGuid: "",

        showDialog:false,
        dialogResult:false

    },

    actions: {

        // Экшкны авторизации
        chengeAutorise(ctx, value){
            ctx.commit('updateAutorise', value);
        },
    
        chengeUserName(ctx, value){
            ctx.commit('updateUserName', value);
        },
        //----------------

        showQrReader(ctx){
            ctx.commit('showQrReader');
        },
        setProductGuid(ctx, value) {
            ctx.commit('showRoatLoader', true);
            ctx.commit('setProductGuid', "");
            axios.get(ctx.state.rest_api_prefix + 'get_timeline',
            {
                params: {
                    guid: value
                }
            })
            .then( (response) => {
                console.log(response);
                ctx.commit('showRoatLoader', false);
                ctx.commit('setProductGuid', value);
                ctx.commit('setRoatList', response.data);
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
                ctx.commit('showRoatLoader', false);
                ctx.commit('setProductGuid', "");
            });
        },
        showDialog(ctx, value){
            ctx.commit('showDialog', value);
        }

    },

    mutations: {
        // Мутации авторизации
        updateAutorise(state, newVal) {
            state.autorise = newVal;
        },
    
        updateUserName(state, newVal) {
            state.userName = newVal;
        },
        
        //----------------

        showQrReader(state) {
            state.qrReaderShowed = !state.qrReaderShowed;

            if (state.qrReaderShowed)
                state.qrReaderCameraState = "auto"
            else
                state.qrReaderCameraState = "off"

        },

        setProductGuid(state, newVal) {
            state.productGuid = newVal;
        },

        showRoatLoader(state, newVal) {
            state.roatLaderShow = newVal;
        },

        setRoatList(state, newVal) {
            state.roatList = newVal;
        },
        showDialog(state, value){
            state.dialogResult = false;
            state.showDialog = value;
        }
    },
    
    getters: {

        // Геттеры авторизации 
        AUTORISE (state) {
            return state.autorise;
        },
    
        USER_NAME (state) {
            return state.userName;
        },
        //----------------

        REST_API_PREFIX (state) {
            return state.rest_api_prefix;
        },

        QR_READER_SHOWED(state) {
            return state.qrReaderShowed;
        },

        QR_READER_CAMERA_STATE(state) {
            return state.qrReaderCameraState;
        },

        PRODUCT_GUID(state) {
            return state.productGuid;
        },

        ROAT_LOADER_SHOW(state) {
            return state.roatLaderShow;
        },

        ROAT_LIST(state) {
            return state.roatList;
        },

        SHOW_DIALOG(state)  {
            return state.showDialog;
        }

    }
})
