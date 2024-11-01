import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";

// 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../views/IndexView.vue"),
        children: [
            {
                name: '活动日历',
                path: "/",
                component: () => import("../views/ActivityCalendarView.vue"),
            },
            {
                name: '活动查看',
                path: "/activity",
                component: () => import("../views/ActivityView.vue"),
            },
            {
                name: '活动发布',
                path: "/updateActivity/:id",
                component: () => import("../views/UpdateActivityView.vue"),
            },
            {
                name: '就业查询',
                path: "/employment-search",
                component: () => import("../views/EmploymentSearchView.vue"),
            },
            {
                name: '就业信息登记',
                path: "/updateEmployment-search",
                component: () => import("../views/UpdateEmploymentSearchView.vue"),
            },
            {
                name: '岗位搜索',
                path: "/job-search",
                component: () => import("../views/JobSearchView.vue"),
            },
            {
                name: '岗位发布',
                path: "/updateJob-search/:id",
                component: () => import("../views/UpdateJobSearchView.vue"),
            },
            {
                name: '智能就业',
                path: "/smart-employment",
                component: () => import("../views/SmartEmploymentView.vue"),
            },
            {
                name: '就业资料库',
                path: "/employment-database",
                component: () => import("../views/EmploymentDatabaseView.vue"),
            },
            {
                name: '发布资料',
                path: "/updateEmployment-database/:id",
                component: () => import("../views/UpdateEmploymentDatabaseView.vue"),
            },

            {
                name: '研途领航',
                path: "/graduate-navigation",
                component: () => import("../views/GraduateNavigationView.vue"),
            },


            {
                name: '留学智选',
                path: "/study-abroad-selection",
                component: () => import("../views/StudyAbroadSelectionView.vue"),
            },

            {
                name:'设置',
                path: "/setting",
                component: () => import("../views/SettingView.vue"),
            },
        ],
    },
    {
        path: "/login",
        component: () => import("../views/LoginView.vue"),
    },
];


// 返回一个 router 实例，为函数，里面有配置项（对象） history
const router = createRouter({
    history: createWebHashHistory(('/admin/')),
    routes,
});

// 导出路由，然后去 main.ts 注册 router.ts
export default router;
