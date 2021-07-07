<template>
    <div class = "qr_zone">
        <button @click.prevent="closeQrScaner" class = "close">Закрыть</button>
        <qrcode-stream :camera="QR_READER_CAMERA_STATE" :track="paintOutline" @decode="onDecode" @init="onInit"></qrcode-stream> 
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import {mapGetters} from 'vuex'

export default {
    components: {
        QrcodeStream
    },
    computed: {
        ...mapGetters (["QR_READER_CAMERA_STATE"]),

        
    },

    methods: {

        closeQrScaner() {
            this.$store.dispatch('showQrReader');
        },

        paintOutline (detectedCodes, ctx) {
            for (const detectedCode of detectedCodes) {
                const [ firstPoint, ...otherPoints ] = detectedCode.cornerPoints

                ctx.strokeStyle = "red";

                ctx.beginPath();
                ctx.moveTo(firstPoint.x, firstPoint.y);
                for (const { x, y } of otherPoints) {
                ctx.lineTo(x, y);
                }
                ctx.lineTo(firstPoint.x, firstPoint.y);
                ctx.closePath();
                ctx.stroke();
            }
        },
        onDecode (result) {
            console.log(result);
            this.$store.dispatch('setProductGuid',result);
            this.$store.dispatch('showQrReader');
            console.log("Scaned");
            if (this.$router.currentRoute.name != 'roatlist')
            this.$router.push({ name: 'roatlist'})
        },

        async onInit (promise) {
        try {
            await promise
        } catch (error) {
            if (error.name === 'NotAllowedError') {
            this.error = "ERROR: you need to grant camera access permisson"
            } else if (error.name === 'NotFoundError') {
            this.error = "ERROR: no camera on this device"
            } else if (error.name === 'NotSupportedError') {
            this.error = "ERROR: secure context required (HTTPS, localhost)"
            } else if (error.name === 'NotReadableError') {
            this.error = "ERROR: is the camera already in use?"
            } else if (error.name === 'OverconstrainedError') {
            this.error = "ERROR: installed cameras are not suitable"
            } else if (error.name === 'StreamApiNotSupportedError') {
            this.error = "ERROR: Stream API is not supported in this browser"
            }
        }
        }
    }
}
</script>

<style>
.qr_zone {
    position: fixed;

    width: 100vw;
    height: 100vh;
    top:0;
    left: 0;
    z-index: 1000000;
}

.close {
    position: absolute;
    right: 0;
    top:0;
    background-color: #C4041C;
    color:white;
    min-height: 20px;
    z-index: 90000000;
    padding: 5px 10px;
}
</style>