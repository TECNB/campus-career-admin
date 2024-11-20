<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">活动地点查看</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="[]" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'admin'" addLabel="发布活动地点"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" />
            </div>
            <PlaceTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import FilterSection from "../components/FilterSection.vue";
import PlaceTable from "../components/PlaceTable.vue";

// 使用 userInfoStore
const userInfo = userInfoStore();

// 筛选与排序状态
const dateOrder = ref<string>("默认排序");
const typeOrder = ref<string>("所有活动");

// 跳转到发布活动地点页面
const toUpdate = (id: string) => {
    router.push("/updatePlace/" + id);
};
</script>

<style lang="scss" scoped>
</style>
