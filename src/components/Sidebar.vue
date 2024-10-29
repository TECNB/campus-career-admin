<template>
    <div class="Sidebar">
        <div class="sidebar-logo-container">
            <img class="h-8" src="../assets/images/logo.png">
            <p>HyperStarAdmin</p>
        </div>
        <el-scrollbar height="90%">

            <ul>
                <!-- 遍历菜单项 -->
                <li v-for="(menu, index) in menus" :key="index">
                    <div class="menu-item" @click="selectMenu(index, menu.children, menu.path!)"
                        :class="{ 'active-menu': selectedMenu === index }">
                        <el-icon color="#3E8CFF" v-if="selectedMenu === index">
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <el-icon v-else>
                            <component :is="menu.icon"></component>
                        </el-icon>
                        <p>{{ menu.label }}</p>
                        <!-- 如果有子菜单，显示箭头 -->
                        <el-icon v-if="menu.children" class="ml-7">
                            <ArrowDownBold v-if="!ifShowSubMenu" />
                            <ArrowUpBold v-else />
                        </el-icon>
                        
                    </div>
                    <!-- 如果有子菜单，渲染子菜单 -->
                    <ul v-if="menu.children && ifShowSubMenu">
                        <li v-for="(child, childIndex) in menu.children" :key="childIndex">
                            <div class="menu-item child-menu"
                                @click="selectSubMenu(index, childIndex, menu.children[childIndex].path!)"
                                :class="{ 'active-menu': selectedSubMenu === childIndex }">
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
import { onMounted, ref,watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';
// 实例化router
const router = useRouter();
const route = useRoute();

const selectedMenu = ref<number | null>(null);
const selectedSubMenu = ref<number | null>(null);
// ifShowSubMenu
const ifShowSubMenu = ref<boolean>(false);

const menus = [
    { label: '首页', icon: 'HomeFilled', path: '/' },
    { label: '分类管理', icon: 'PriceTag', path: '/type' },
    { label: '数字藏品管理', icon: 'GoodsFilled', path: '/collections' },
    { label: '合集管理', icon: 'Histogram', path: '/album' },
    { label: '空投管理', icon: 'WindPower', path: '/drop' },
    { label: '发行计划管理', icon: 'UploadFilled', path: '/issueDate' },
    {
        label: '用户管理',
        icon: 'Menu',
        path: '/account',
    },
    {
        label: '交易管理',
        icon: 'List',
        path: '/order',
        children: [
            { label: '订单处理', path: '/order' },
            { label: '营销与推广', path: '/marketing' },
        ],
    },

    // { label: '数据', icon: 'TrendCharts', path: '/data' },
    { label: '设置', icon: 'Setting', path: '/setting' },
];



onMounted(() => {
    // 初始化选中的菜单
    const index = menus.findIndex((menu) => menu.path === route.path);
    if (index !== -1) {
        selectedMenu.value = index;
    }
});


const toggleSubMenu = () => {
    // 翻转子菜单的显示状态
    ifShowSubMenu.value = !ifShowSubMenu.value;
    if (ifShowSubMenu.value) {
        selectedSubMenu.value = 0; // 清除子菜单的选中状态
    }
};


const selectMenu = (index: number, ifChildren: any, path: string) => {
    if (!ifChildren) {
        selectedMenu.value = index;
        selectedSubMenu.value = null; // 清除子菜单的选中状态
        router.push(path)

    } else {
        selectedMenu.value = null;
        selectedSubMenu.value = 0; // 清除子菜单的选中状态
        router.push(menus[index].children![0].path!);
        toggleSubMenu();

    }

};

const selectSubMenu = (parentIndex: number, childIndex: number, path: string) => {
    console.log("parentIndex:"+parentIndex)
    router.push(path)

    selectedMenu.value = null;
    selectedSubMenu.value = childIndex;
};



</script>

<style lang="scss" scoped>
.Sidebar {
    height: 100%;
    border-radius: 24px;
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
        gap: 12px;


        padding: 15px 20px;
        margin: 10px;
        cursor: pointer;
        transition: all 0.3s ease; /* 添加过渡效果 */

        &:hover {
            border-radius: 20px;
            background: var(--primary-100);
        }


        p {
            font-size: 16px;
            color: var(--text-100);
        }

        &.active-menu {
            border-radius: 20px;
            background: var(--primary-100);

            
        }

        &.child-menu {

            // 定义子菜单的样式
            &.active-menu {
                background: var(--primary-100);

            }
        }


    }


}</style>
