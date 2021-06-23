import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)


export default new Vuex.Store ({
    state: {
        rest_api_prefix:"https://rubexgroup.ru/wp-json/mes/v2/",
        roatLaderShow:false,
        qrReaderShowed:false,
        productGuid: ""
    },

    actions: {
        showQrReader(ctx){
            ctx.commit('showQrReader');
        },
        setProductGuid(ctx, value) {
            ctx.commit('showRoatLoader', true);
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
        }

    },

    mutations: {
        showQrReader(state) {
            state.qrReaderShowed = !state.qrReaderShowed;
        },

        setProductGuid(state, newVal) {
            state.productGuid = newVal;
        },

        showRoatLoader(state, newVal) {
            state.roatLaderShow = newVal;
        }
    },
    
    getters: {
        REST_API_PREFIX (state) {
            return state.rest_api_prefix;
        },

        QR_READER_SHOWED(state) {
            return state.qrReaderShowed;
        },

        PRODUCT_GUID(state) {
            return state.productGuid;
        },

        ROAT_LOADER_SHOW(state) {
            return state.roatLaderShow;
        }
    }
})
