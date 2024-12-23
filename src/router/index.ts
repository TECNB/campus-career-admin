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
                path: "/updateEmployment-search/:id",
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
                name: '学生意向',
                path: "/student-intention",
                component: () => import("../views/StudentIntentionView.vue"),
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
            {
                name:'岗位智匹',
                path: "/job-recommend",
                component: () => import("../views/JobRecommendView.vue"),
            },
            {
                name:'个人信息',
                path: "/user-info",
                component: () => import("../views/UserInfoView.vue"),
            },
            {
                name:'个人信息登记',
                path: "/updateUser-info/:id",
                component: () => import("../views/UpdateUserInfoView.vue"),
            },
            {
                name:'政治面貌详情',
                path: "/updatePolitical-status/:id",
                component: () => import("../views/UpdatePoliticalStatus.vue"),
            },
            {
                name:'特殊群体详情',
                path: "/updateSpecial-group/:id",
                component: () => import("../views/UpdateSpecialGroup.vue"),
            },
            {
                name:'谈话记录详情',
                path: "/conversation-records/:id",
                component: () => import("../views/ConversationRecordsView.vue"),
            },

            // 下面是超级管理员的路由
            {
                name:'活动地点',
                path: "/activity-place",
                component: () => import("../views/PlaceView.vue"),
            },
            {
                name:'添加活动地点',
                path: "/updatePlace/:id",
                component: () => import("../views/UpdatePlaceView.vue"),
            },
            {
                name:'发送人群',
                path: "/activity-target-audience",
                component: () => import("../views/TargetAudienceView.vue"),
            },
            {
                name:'添加发送人群',
                path: "/updateActivity-target-audience/:id",
                component: () => import("../views/UpdateTargetAudienceView.vue"),
            },

            {
                name: '导师库',
                path: '/tutor-database',
                component: () => import("../views/TutorDatabaseView.vue"),
            },
            {
                name: '项目库',
                path: '/project-database',
                component: () => import("../views/ProjectDatabaseView.vue"),
            },
            {
                name: '项目负责人',
                path: '/project-leaders',
                component: () => import("../views/ProjectLeadersView.vue"),
            },
            {
                name: '年级事务',
                path: '/grade-affairs',
                component: () => import("../views/GradeAffairsView.vue"),
            },
            {
                name: '各类证明&模板',
                path: '/certificates-templates',
                component: () => import("../views/CertificatesTemplatesView.vue"),
            },
            {
                name: '专项事务',
                path: '/special-affairs',
                component: () => import("../views/SpecialAffairsView.vue"),
            },
            {
                name: '工作计划与总结',
                path: '/work-plans-summaries',
                component: () => import("../views/WorkPlansSummariesView.vue"),
            },
            {
                name: '急先锋',
                path: '/pioneers',
                component: () => import("../views/PioneersView.vue"),
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
