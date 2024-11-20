<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">就业查询</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder" :typeOptions="['签约', '实习', '暂无']"
                    :dateOptions="['日期倒序', '日期正序']" @update:typeOrder="typeOrder = $event"
                    @update:dateOrder="dateOrder = $event" />
            </div>
            <EmploymentSearchTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EmploymentSearchTable from "../components/EmploymentSearchTable.vue";
import FilterSection from "../components/FilterSection.vue";

const dateOrder = ref("默认排序");
const typeOrder = ref("所有就业状态");
</script>


<style lang="scss" scoped></style>
