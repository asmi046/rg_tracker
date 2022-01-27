import Vue from 'vue'
import VueRouter from 'vue-router'

import roatList from '../components/roatList'
import allRoats from '../components/allRoats'
import mainPage from '../components/mainPage'
import workCenters from '../components/workCenters'
import workCenter from '../components/workCenter'
import login from '../components/login'
import tablo from '../components/tablo'
import allLibs from '../lib/libs'
import store from '../store';

Vue.use(VueRouter);

let router = new VueRouter ( {
    mode: 'history',    
    routes: [
            {
                path: '/',
                name: 'main',
                meta: {title: "Трекинг производства"},
                component: mainPage
            },
            {
                path: '/roat-list',
                name: 'roatlist',
                meta: {title: "Маршрутный лист"},
                component: roatList
            },
            {
                path: '/login',
                name: 'login',
                meta: {title: "Вход в систему"},
                component: login
            },
            {
                path: '/all-roats',
                name: 'allroats',
                meta: {title: "Расписание"},
                component: allRoats
            },
            {
                path: '/work-centers',
                name: 'workcenters',
                meta: {title: "Рабочие центры"},
                component: workCenters
            },
            {
                path: '/work-center:center/',
                name: 'workcenter',
                meta: {title: "Рабочий центр"},
                props: true,
                component: workCenter
            },
            {
                path: '/tablo:center/',
                name: 'tablo',
                meta: {title: "Табло"},
                props: true,
                component: tablo
            } 
        ]
    }
);

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
       
    let autorise = allLibs.getCookie("servautorise"); 
    if (autorise != undefined) 
    {
        store.dispatch('chengeAutorise',  true);
        store.dispatch('chengeUserName',   localStorage.getItem('name'));
    }
    else {
        store.dispatch('chengeAutorise',  false);
        if (to.name !== "login") 
            allLibs.reloginUser();
    } 

    if ((!store.getters.AUTORISE) && (to.name !== "login")) {
        router.push({ name: 'login' })
    }   
    
    next();
});

export default router;