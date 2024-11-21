<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">岗位智匹</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="['2000-5000', '5000-8000', '8000-15000', '15000以上']" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="false" @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"/>
            </div>
            <JobRecommendTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import JobRecommendTable from "../components/JobRecommendTable.vue";
import FilterSection from "../components/FilterSection.vue";

const dateOrder = ref("默认排序");
const typeOrder = ref("所有薪资待遇");

</script>


<style lang="scss" scoped>
</style>
