<template>
    <div class="IndexView flex p-0 md:p-5">
        <!-- 仅在大屏幕上显示 sidebar (大于md) -->
        <div class="hidden md:block md:min-w-[16%]">
            <Sidebar device="pc"/>
        </div>
        <div class="md:max-w-[85%] w-full h-full">
            <div class="">
                <Header />
            </div>
            <div class="h-[93%]">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
// 引入Header
import Header from '../components/Header.vue'

</script>

<style lang="scss" scoped>
.IndexView {
    height: 100vh;
    background: #F2F8FC;
}
</style>
