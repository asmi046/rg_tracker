import Vue from 'vue'
import VueRouter from 'vue-router'

import roatList from '../components/roatList'
import allRoats from '../components/allRoats'
import mainPage from '../components/mainPage'
import workCenters from '../components/workCenters'
import workCenter from '../components/workCenter'

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