<template>
    <div class="IndexView flex p-0 md:p-5">
        <!-- 仅在大屏幕上显示 sidebar (大于md) -->
        <div class="min-w-52 hidden md:block">
            <Sidebar />
        </div>
        <div class="md:w-[86%] w-full h-full">
            <div class="">
                <Header />
            </div>
            <div class="h-[93%] ">
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

    .sidebar-container {
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;


        height: 95%;
        width: 210px !important;



    }

    .main-container {
        // background: #f0f2f5;


        position: relative;

        height: 100%;

        margin-left: 210px;
        background: #F2F8FC;



        .fixed-header {
            position: fixed;
            top: 0px;



            width: calc(100% - 300px);


        }

        .app-main {
            width: 100%;
            height: 90%;

            position: relative;





            margin-top: 60px;
        }
    }
}
</style>
