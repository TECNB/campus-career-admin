import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";

// 配置路由
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: () => import("../views/IndexView.vue"),
        children: [
            {
                name:'首页',
                path: "/",
                component: () => import("../views/DataView.vue"),
            },
            {
                name:'分类管理',
                path: "/type",
                component: () => import("../views/TypeView.vue"),
            },
            {
                name:'合集管理',
                path: "/album",
                component: () => import("../views/AlbumView.vue"),
            },
            {
                name:'数宇藏品管理',
                path: "/collections",
                component: () => import("../views/CollectionsView.vue"),
            },
            {
                name:'发行计划管理',
                path:"/issueDate",
                component: () => import("../views/IssueDateView.vue"),
            },
            {
                name:'订单管理',
                path: "/order",
                component: () => import("../views/OrderView.vue"),
            },
            {
                name:'空投管理',
                path: "/drop",
                component: () => import("../views/DropView.vue"),
            },
            {
                name:'审核管理',
                path: "/audit",
                component: () => import("../views/AuditView.vue"),
            },
            {
                name:'用户管理',
                path: "/account",
                component: () => import("../views/AccountView.vue"),
            },
            // {
            //     name:'数据',
            //     path: "/data",
            //     component: () => import("../views/DataView.vue"),
            // },
            {
                name:'设置',
                path: "/setting",
                component: () => import("../views/SettingView.vue"),
            },
            {
                name:'营销与推广',
                path: "/marketing",
                component: () => import("../views/MarketingView.vue"),
            },
            {
                name:'修改分类',
                path: "/updateType/:id",
                component: () => import("../views/UpdateTypeView.vue"),
            },
            {
                name:'修改空投',
                path: "/updateDrop/:id",
                component: () => import("../views/UpdateDropView.vue"),
            },
            {
                name:'修改发行计划',
                path: "/updateIssueDate/:id",
                component: () => import("../views/UpdateIssueDateView.vue"),
            },
            {
                name:'修改合集',
                path: "/updateAlbum/:id",
                component: () => import("../views/UpdateAlbumView.vue"),
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
