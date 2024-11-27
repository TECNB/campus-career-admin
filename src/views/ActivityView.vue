<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <div>
                    <p class="md:text-4xl font-extrabold text-3xl">活动查看</p>
                </div>
                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder" :typeOptions="['招聘会', '宣讲会', '招聘公告']"
                    :dateOptions="['日期倒序', '日期正序']" :showAddButton="userInfo.user?.userType === 'teacher'"
                    addLabel="发布活动" :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" 
                    batchDeleteLabel="批量删除" @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" @batchDelete="handleBatchDelete" />
            </div>
            <ActivityTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
            @selectionChange="updateSelectedIds" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userInfoStore } from "../stores/UserInfoStore";
import router from "../router";
import ActivityTable from "../components/ActivityTable.vue";
import FilterSection from "../components/FilterSection.vue";
import { batchDeleteActivity } from "../api/activity";

const userInfo = userInfoStore();
const dateOrder = ref("默认排序");
const typeOrder = ref("所有活动");

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
        await batchDeleteActivity(selectedIds.value);
        ElMessage.success("批量删除成功");
        selectedIds.value = [];
        tableKey.value++; // 更新 key 值以刷新组件
    } catch (error) {
        ElMessage.error("批量删除失败，请重试");
    }
};

const toUpdate = (id: string) => {
    router.push("/updateActivity/" + id);
};

</script>


<style lang="scss" scoped>

</style>
