import Vue from 'vue'
import VueRouter from 'vue-router'

import roatList from '../components/roatList'

Vue.use(VueRouter);

let router = new VueRouter ( {
    mode: 'history',    
    routes: [
            {
                path: '/',
                name: 'main',
                meta: {title: "Маршрутный лист"},
                component: roatList
            }, 
        ]
    }
);

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    console.log(to);
    console.log(from);
    next();
});

export default router;