<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">岗位搜索</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="['2000-5000', '5000-8000', '8000-15000', '15000以上']" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'teacher'" addLabel="发布岗位"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" />
            </div>
            <JobSearchTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userInfoStore } from "../stores/UserInfoStore";
import router from "../router";
import JobSearchTable from "../components/JobSearchTable.vue";
import FilterSection from "../components/FilterSection.vue";

const userInfo = userInfoStore();
const dateOrder = ref("默认排序");
const typeOrder = ref("所有薪资待遇");

const toUpdate = (id: string) => {
    router.push("/updateJob-search/" + id);
};
</script>


<style lang="scss" scoped>
</style>
