<template>
    <div class = "dialogWrapper" >
        <div class="dialogWin">
            <div class="head">
                <span>{{information.head}}</span>
                <a @click.prevent="closeWin" href="#" class="closeWin"></a>
            </div>

            <div class="body">
                <form action="" class="qualityForm">
                    <label for = "metr">Метр</label>
                    <input v-model = "metr" type="number" class="metr" id = "metr" value="0" >
                    
                    <h3 v-show = "this.information.difList != 0" class="diffectListHeader">Список диффектов</h3>
                    <div class="diffectsList">
                        <label v-for = "(item, index) in this.information.difList" :item = "item.id" :key="item.id" :for = "'diffects'+index" > <input v-model = "item.checed" type="checkbox" :id="'diffects'+index"> {{item.name}} </label>
                    </div>

                    <label for = "comment">Комментарий</label>
                    <textarea v-model = "comment" id = "comment">
                    </textarea>
                </form>
            </div>

            <div class="footer">
                
                 <button class = "btn ok" @click.prevent="doOk({'metr': metr, 'comment':comment, 'list':information.difList})">Отправить</button> 
                <button class = "btn concle" @click.prevent="closeWin">Oтменить</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            metr:0,
            comment:""
        }
    },

    props: ['information'],

    methods:{
        closeWin() {
            this.information.callback.doConcle(); 
        },

        doOk (status) {
           this.information.callback.doOk(status); 
        }
    }
}
</script>

<style scoped>
.dialogWrapper {
    width:100%;
    height: 100%;
    position: fixed;
    background-color: #010101aa;
    z-index: 900000000;
    top:0;
    left:0;
    overflow: auto;
}

.dialogWrapper::-webkit-scrollbar {
  width: 0;
}

.dialogWin {
    width: 30%;
    min-width: 300px;
    height: auto;
    background-color: white;
    min-height: 200px;
    margin:  100px auto;
}

.dialogWin div{ 
    padding-left: 15px;
    padding-right: 15px;
}

.head{
    width: 100%;
    border-bottom: 1px solid lightgray;
    min-height: 10px;
    display: flex;
}

.head span{ 
    margin: auto auto auto 0;
}

.closeWin {
    width: 20px;
    height: 20px;
    background-size: cover;
    background-image: url("../assets/icons/cancel.svg");
    background-repeat: no-repeat;
    display: block;
    margin: 5px 0 5px auto;
}

.body{
    min-height: 100px;
    margin: 10px auto;
}

.body h2{
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
}

.footer {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 5px 0;
}

.footer button{
    width: 100%;
    margin: 5px 0;
}


h2 {
    color: #347815;
}

.concle {
    background-color: #6d6e72;
}

.qualityForm {
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.diffectListHeader {
    margin: 10px 0;
}

.diffectsList {
    display:flex;
    flex-direction: column;
    width:100%;
}

.diffectsList label{
    font-size: 12px;
    margin: 7px 0;
}

</style>