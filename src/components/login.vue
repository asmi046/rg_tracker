<template>
  <div class = "appWrapper">
      <div class="loginblk">
          <img class = "loginImg" src="@/assets/logo.svg" alt="">
          <form action="">
                <input v-model = "autinfo.mail" type="text" placeholder="Логин" name = "login">
                <input v-model = "autinfo.pass" type="password" placeholder="Пароль" name = "pass">
                <label class = "checkbox_label" for = "save_login">
                    <input v-model = "savePassword" id = "save_login" name = "save_login" type="checkbox">
                    <span>Запомнить пароль</span>
                </label>
                <div  v-show="errorMsgVisible" class="errorMsg">Не верный логин/пароль</div>
                <button @click.prevent="getAutorisation" class = "btn">Войти</button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import allLibs from '../lib/libs';
export default {
    data() {
        return {
            autinfo: {
                mail:"",
                pass: ""
            },

            savePassword:false,
            errorMsg:"Не верный логин/пароль",
            errorMsgVisible:false        
        } 
    },

    mounted: function() {
            if (allLibs.getCookie("userlogin") != undefined)
            {
                this.savePassword = true;
                this.autinfo.mail = allLibs.getCookie("userlogin");
                this.autinfo.pass = allLibs.getCookie("userpass");
            }
    },

    methods: { 
        getAutorisation() {
             if ((this.autinfo.mail == "") || (this.autinfo.pass == "")) {
                this.errorMsg = "Заполните все обязательные поля";
                this.errorMsgVisible = true;
                return;
            }

            
            axios.get(this.$store.getters.REST_API_PREFIX + 'userautorizationmes',
            {
                params: {
                    autinfo: this.autinfo
                }
            })
            .then( (response) => {
                 allLibs.loginUser(response, this.savePassword,this.autinfo.pass);

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
                
            
                console.log(error.config);
                this.errorMsg = rezText;
                this.errorMsgVisible = true;
            });
        }
    }
}
</script>

<style>
.loginblk {
    margin: 30vh auto;
    width:290px;
    padding: 20px 30px;
    border: 1px solid #D1D2D4;
    border-radius: 10px;
}

.checkbox_label,
.loginblk input[type=text],
.loginblk input[type=password]
{
    margin-bottom: 10px;
    width: 100%;
}

.loginImg {
    margin-bottom: 10px;
}

.checkbox_label {
    display: block;
}

.checkbox_label input{ 
    margin-right: 10px;
}

</style>