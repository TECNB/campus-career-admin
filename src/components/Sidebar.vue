<template>
    <div :class="[
        'Sidebar rounded-none md:rounded-3xl z-[10000]',
        props.device === 'phone' ? 'fixed top-0 left-0' : ''
    ]">
        <div class="sidebar-logo-container" v-if="props.device === 'pc'">
            <img class="h-8" src="../assets/images/logo.png" />
            <p>数智学工</p>
        </div>
        <el-scrollbar height="90%">
            <ul>
                <li v-for="(menu, index) in menus" :key="index">
                    <div class="menu-item" @click="selectMenu(index, menu)"
                        :class="{ 'active-menu': selectedMenu === index && !menu.children }">
                        <div class="flex justify-start items-center gap-2">
                            <el-icon color="#3E8CFF" v-if="selectedMenu === index">
                                <component :is="menu.icon" />
                            </el-icon>
                            <el-icon v-else>
                                <component :is="menu.icon" />
                            </el-icon>
                            <p>{{ menu.label }}</p>
                        </div>

                        <el-icon v-if="menu.children" class="ml-7">
                            <ArrowDownBold v-if="!menu.isOpen" />
                            <ArrowUpBold v-else />
                        </el-icon>
                    </div>
                    <ul v-if="menu.children && menu.isOpen">
                        <li v-for="(child, childIndex) in menu.children" :key="childIndex">
                            <div class="menu-item child-menu" @click="selectSubMenu(index, childIndex, child.path!)"
                                :class="{ 'active-menu': menu.selectedSubMenu === childIndex }">
                                <p class="ml-6">{{ child.label }}</p>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { userInfoStore } from '../stores/UserInfoStore';
import { ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue';

const props = defineProps({
    device: String,
});

// 获取用户信息
const userInfo = userInfoStore();
const router = useRouter();
const route = useRoute();

// 选中的菜单索引
const selectedMenu = ref<number | null>(0);

// 菜单数据
const menus = ref<any[]>([]);

// 为菜单添加 `isOpen` 属性
const addOpenProperty = (menus: any[]): any[] => {
    return menus.map(menu => {
        const updatedMenu = { ...menu, isOpen: false, selectedSubMenu: null }; // 新增 selectedSubMenu
        if (menu.children) {
            updatedMenu.children = addOpenProperty(menu.children); // 递归处理子菜单
        }
        return updatedMenu;
    });
};

// 学生菜单
const menusStudent = addOpenProperty([
    {
        label: '职场引航',
        icon: 'School',
        path: '/',
        children: [
            { label: '活动日历', path: '/' },
            { label: '活动查看', path: '/activity' },
            { label: '就业信息登记', path: '/updateEmployment-search/' + userInfo.user!.studentId },
            { label: '岗位智匹', path: '/job-recommend' },
            { label: '岗位搜索', path: '/job-search' },
            { label: '智能就业', path: '/smart-employment' },
        ],
    },
    {
        label: '研途领航',
        icon: 'List',
        path: '/graduate-navigation',
    },
    {
        label: '留学智选',
        icon: 'WindPower',
        path: '/study-abroad-selection',
    },
    {
        label: '就业资料库',
        icon: 'Collection',
        path: '/employment-database',
    },
    {
        label: '个人信息',
        icon: 'User',
        path: '/updateUser-info/' + userInfo.user!.studentId,
    },
]);

// 教师菜单

const menusTeacher = addOpenProperty([
    {
        label: '学生管理',
        icon: 'User',
        path: '/user-info',
    },
    {
        label: '就业管理',
        icon: 'School',
        path: '/',
        children: [
            { label: '活动日历', path: '/' },
            { label: '活动发布', path: '/activity' },
            { label: '就业查询', path: '/employment-search' },
            { label: '岗位搜索', path: '/job-search' },
            { label: '智能就业', path: '/smart-employment' },
            { label: '学生意向', path: '/student-intention' },
            { label: '研途领航', path: '/graduate-navigation' },
            { label: '留学智选', path: '/study-abroad-selection' },
            { label: '就业资料库', path: '/employment-database' },
        ],
    },

    {
        label: '竞赛管理',
        icon: 'Files',
        path: '/extracurricular-tutors',
        children: [
            { label: '竞赛介绍', path: '/competition-introduction' },
            { label: '导师库', path: '/tutor-database' },
            { label: '项目库', path: '/project-database' },
            { label: '项目负责人', path: '/project-leaders' },

        ],
    },
    {
        label: '学工资料',
        icon: 'Collection',
        path: '/student-affairs',
        children: [
            { label: '年级事务', path: '/grade-affairs' },
            { label: '各类证明&模板', path: '/certificates-templates' },
            { label: '专项事务', path: '/special-affairs' },
            { label: '工作计划与总结', path: '/work-plans-summaries' },
            { label: '避雷针', path: '/pioneers' },
        ],
    },
    {
        label: 'AI辅导员',
        icon: 'Collection',
        path: '/ai-counselor',
    },
]);

// 管理员菜单
const menusAdmin = addOpenProperty([
    {
        label: '职场引航',
        icon: 'School',
        path: '/',
        children: [
            { label: '活动日历', path: '/' },
            { label: '活动地点', path: '/activity-place' },
            { label: '发送人群', path: '/activity-target-audience' },
            { label: '智能就业', path: '/smart-employment' },
        ],
    },
]);

// 设置用户的菜单
if (userInfo.user?.userType === 'student') {
    menus.value = menusStudent;
} else if (userInfo.user?.userType === 'teacher') {
    menus.value = menusTeacher;
} else {
    menus.value = menusAdmin;
}

// 初始化选中的菜单
onMounted(() => {
    const index = menus.value.findIndex(menu => menu.path === route.path);
    if (index !== -1) {
        selectedMenu.value = index;
    }
});

// 切换主菜单
const selectMenu = (index: number, menu: any) => {
    if (menu.children) {
        menus.value[index].isOpen = !menus.value[index].isOpen;
    } else {
        selectedMenu.value = index;
        menus.value.forEach((menu) => {
            menu.selectedSubMenu = null; // 重置其他父菜单的子菜单选中状态
        });
        router.push(menu.path);
    }
};

// 切换子菜单
const selectSubMenu = (parentIndex: number, childIndex: number, path: string) => {
    menus.value.forEach((menu, index) => {
        if (index === parentIndex) {
            menu.selectedSubMenu = childIndex; // 设置当前父菜单的子菜单选中状态
        } else {
            menu.selectedSubMenu = null; // 重置其他父菜单的子菜单选中状态
        }
    });
    selectedMenu.value = parentIndex;
    router.push(path);
};
</script>

<style lang="scss" scoped>
.Sidebar {
    height: 100%;
    background: #fff;

    .sidebar-logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        padding: 20px 0;

        p {
            font-weight: 800;
            color: var(--text-100);
            font-size: 18px;

        }
    }

    .menu-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;


        padding: 15px 20px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        /* 添加过渡效果 */

        &:hover {
            border-radius: 20px;
            background: var(--primary-100);
        }


        p {
            font-size: 16px;
            color: var(--text-100);
        }

        &.active-menu {
            border-radius: 16px;
            background: var(--primary-100);


        }

        &.child-menu {

            // 定义子菜单的样式
            &.active-menu {
                background: var(--primary-100);
            }
        }
    }
}
</style>
