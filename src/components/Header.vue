<template>
    <div class="Header rounded-none md:rounded-2xl md:mx-6 md:mb-6 m-0 px-5 md:pr-5 md:pl-0">
        <el-icon size="20" class="!block md:!hidden mr-2" @click="showSlider">
                <Menu/>
            </el-icon>
        <div class="nav-tabs">
            
            <div v-for="(tab, index) in tabs" :key="index" :class="{ 'nav-tab-item': true, active: currentTab === index }"
                @click="switchTab(index)">
                <p>{{ tab.name }}</p>
                <el-icon size="14" @click.stop="closeTab(index)">
                    <Close />
                </el-icon>
            </div>

        </div>
        <div class="user-tabs ml-5 md:ml-0">
            <!-- <el-icon size="20" class="!hidden md:block">
                <Search />
            </el-icon>
            <el-icon size="20" class="!hidden md:block">
                <Bell />
            </el-icon> -->
            <el-icon size="20" @click="toggleFullScreen" class="cursor-pointer !hidden md:!block">
                <FullScreen />
            </el-icon>
            <div class="user-info">
                <img class="w-8 h-8 rounded-full object-cover aspect-square"
                    :src="userInfo.user?.avatarUrl">
                <p class="text-nowrap">{{ userInfo.user?.username }}</p>
            </div>
            <el-icon size="20" @click="toLogin" class="cursor-pointer">
                <SwitchButton />
            </el-icon>
        </div>
        <Sidebar device="phone" v-if="ifShowSidebar"/>
        <MaskLayer :ifShow="ifShowSidebar" @click="showSlider"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router';
import Sidebar from '../components/Sidebar.vue'
import MaskLayer from '../components/MaskLayer.vue'
// 引入userInfoStore
import  {userInfoStore}  from '../stores/UserInfoStore';

// 使用userInfoStore
const userInfo = userInfoStore();

const isFullScreen = ref(false);
// 控制Sidebar是否展示
const ifShowSidebar = ref(false);

const showSlider = () => {
    ifShowSidebar.value = !ifShowSidebar.value;
};

const toggleFullScreen = () => {
    if (isFullScreen.value) {
        exitFullScreen();
    } else {
        enterFullScreen();
    }
};

const enterFullScreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen();
    }

    isFullScreen.value = true;
};

const exitFullScreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }

    isFullScreen.value = false;
};

watch(isFullScreen, (newValue) => {
    // 在这里可以处理全屏状态变化后的逻辑
    console.log('全屏状态变化：', newValue);
});



const tabs = ref([
    { name: '活动日历', route: '/' },
    { name: '活动查看', route: '/activity' },
]);

const currentTab = ref(0);
const router = useRouter();

// 监听路由变化，更新当前标签
onMounted(() => {
    const updateCurrentTab = () => {
        const currentRoute = router.currentRoute.value as RouteLocationNormalizedLoaded;

        if(userInfo.user?.userType == 'admin'){
            tabs.value = [
                { name: '活动日历', route: '/' },
                { name: '活动地点', route: '/activity-place' },
            ];
        }

        // 检查当前路由是否在tabs数组中，如果不在就添加
        const index = tabs.value.findIndex(tab => tab.route === currentRoute.path);
        if (index === -1) {
            tabs.value.push({ name: String(currentRoute.name || '未命名'), route: currentRoute.path });
        }

        // 更新当前标签
        const newIndex = tabs.value.findIndex(tab => tab.route === currentRoute.path);
        currentTab.value = newIndex !== -1 ? newIndex : 0;
    };

    router.afterEach(updateCurrentTab);
    updateCurrentTab();
});

const toLogin = () => {
    // 删掉token
    localStorage.removeItem('token');
    router.push('/login');
};

// 切换导航
const switchTab = (index: number) => {
    currentTab.value = index;
    const route = tabs.value[index].route;
    router.push(route);
    console.log(route)
};

// 关闭标签
const closeTab = (index: number) => {
    const isCurrentTab = index === currentTab.value;

    // 移除标签
    tabs.value.splice(index, 1);

    // 如果关闭的是当前标签，则导航到前一个标签
    if (isCurrentTab && tabs.value.length > 0) {
        const prevTab = tabs.value[Math.max(index - 1, 0)];
        switchTab(tabs.value.indexOf(prevTab));
    }
};


</script>

<style lang="scss" scoped>
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
@mixin flex-stat {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.Header {
    display: flex;
    justify-content: space-between;
    align-items: center;


    height: 50px;

    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);


    .nav-tabs {
        @include flex-stat;

        position: relative;
        overflow-x: auto;
        overflow-y: hidden;

        scrollbar-width: none;
        

        width: 846px;
        height: 100%;


        .nav-tab-item {
            @include flex-center;

            gap: 10px;

            height: 100%;


            cursor: pointer;
            white-space: nowrap;
            color: var(--text-100);
            border-radius: 14px;

            padding: 0 20px;

            &.active {

                background-color: var(--bg-200);

            }
        }
    }

    .user-tabs {
        @include flex-center;
        gap: 20px;

        .user-info {
            @include flex-center;
            gap: 10px;
        }
    }
}
</style>
