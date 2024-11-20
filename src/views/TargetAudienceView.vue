<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">发送人群查看</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="[]" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'admin'" addLabel="发布发送人群"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" />
            </div>
            <TargetAudienceTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import FilterSection from "../components/FilterSection.vue";
import TargetAudienceTable from "../components/TargetAudienceTable.vue";

// 使用 userInfoStore
const userInfo = userInfoStore();

// 筛选与排序状态
const dateOrder = ref<string>("默认排序");
const typeOrder = ref<string>("所有活动");

// 跳转到发布发送人群页面
const toUpdate = (id: string) => {
    router.push("/updateActivity-target-audience/" + id);
};
</script>

<style lang="scss" scoped></style>
