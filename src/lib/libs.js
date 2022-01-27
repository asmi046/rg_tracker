// возвращает куки с указанным name,
// или undefined, если ничего не найдено

import store from '../store'
import router from '../router'

class allLibs {
    getCookie(name) {
        var results = document.cookie.match ( '(^|;) ?' + name + '=([^;]*)(;|$)' );
 
        if ( results )
          return ( unescape ( results[2] ) );
        else
          return undefined;
    }

    loginUser(response, savePassword,password) {
    console.log(response.data);
          var d = new Date();
          
          d.setMilliseconds(d.getMilliseconds() + (100000 * 60 * 60 * 1000)); 
          
        

          document.cookie = "servautorise="+response.data.login+"; path=/; expires=" + d.toUTCString();
          document.cookie = "servlevel="+response.data.level+"; path=/; expires=" + d.toUTCString();
          
          localStorage.setItem('login', response.data.login); 
          localStorage.setItem('name', response.data.name); 
          localStorage.setItem('level', response.data.level); 
          localStorage.setItem('subdivisions', response.data.subdivisions); 
          localStorage.setItem('gz', response.data.gz); 
          localStorage.setItem('start_screen', response.data.start_screen);

          store.dispatch('chengeAutorise',  true);
          store.dispatch('chengeUserName',  response.data.name);

          if (savePassword) {
              d = new Date();
              d.setHours(d.getHours() + 5000);

              document.cookie = "userlogin="+response.data.login+"; path=/; expires=" + d.toUTCString();
              document.cookie = "userpass="+password+"; path=/; expires=" + d.toUTCString();
          }

        if (response.data.start_screen == "Табло")
            router.push({ name: 'tablo' })
        else router.push({ name: 'main' })
      
    }

    reloginUser() {
      document.cookie = "servautorise=0; path=/; max-age=0";
      document.cookie = "servlevel=0; path=/; max-age=0";

      localStorage.removeItem('login'); 
      localStorage.removeItem('name'); 
      localStorage.removeItem('level'); 
      localStorage.removeItem('subdivisions'); 
      localStorage.removeItem('gz'); 
      localStorage.removeItem('start_screen');

      store.dispatch('chengeAutorise',  false);
      
      router.push({ name: 'login' })
    }
}

let alllibs = new allLibs();

export default alllibs


