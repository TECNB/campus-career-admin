<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">活动地点查看</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="[]" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'admin'" addLabel="发布活动地点" :showBatchDeleteButton="userInfo.user?.userType === 'admin'" 
                    batchDeleteLabel="批量删除"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" @batchDelete="handleBatchDelete" />
            </div>
            <PlaceTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
            @selectionChange="updateSelectedIds"  />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import FilterSection from "../components/FilterSection.vue";
import PlaceTable from "../components/PlaceTable.vue";
import { batchDeleteActivityPlace } from "../api/activityPlace";

// 使用 userInfoStore
const userInfo = userInfoStore();

// 筛选与排序状态
const dateOrder = ref<string>("默认排序");
const typeOrder = ref<string>("所有活动");

const selectedIds = ref<string[]>([]);
const tableKey = ref(0);

const updateSelectedIds = (ids: string[]) => {
    selectedIds.value = ids;
};

const handleBatchDelete = async () => {
    if (selectedIds.value.length === 0) {
        return ElMessage.warning("请选择要删除的岗位");
    }
    try {
        await batchDeleteActivityPlace(selectedIds.value);
        ElMessage.success("批量删除成功");
        selectedIds.value = [];
        tableKey.value++; // 更新 key 值以刷新组件
    } catch (error) {
        ElMessage.error("批量删除失败，请重试");
    }
};


// 跳转到发布活动地点页面
const toUpdate = (id: string) => {
    router.push("/updatePlace/" + id);
};
</script>

<style lang="scss" scoped>
</style>
