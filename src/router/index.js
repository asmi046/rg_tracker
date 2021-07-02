import Vue from 'vue'
import VueRouter from 'vue-router'

import roatList from '../components/roatList'
import allRoats from '../components/allRoats'

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
            {
                path: '/all-roats',
                name: 'allroats',
                meta: {title: "Расписание"},
                component: allRoats
            } 
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