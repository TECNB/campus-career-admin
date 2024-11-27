<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">岗位搜索</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="['2000-5000', '5000-8000', '8000-15000', '15000以上']" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'teacher'"
                    addLabel="发布岗位"
                    :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" 
                    batchDeleteLabel="批量删除"
                    :showImportButton="userInfo.user?.userType === 'teacher'"
                    importLabel="表格导入"
                    @update:typeOrder="typeOrder = $event" 
                    @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" 
                    @batchDelete="handleBatchDelete" 
                    @import="handleFileUpload"/>
            </div>
            <JobSearchTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
                @selectionChange="updateSelectedIds" />
                <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" style="display: none" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userInfoStore } from "../stores/UserInfoStore";
import router from "../router";
import JobSearchTable from "../components/JobSearchTable.vue";
import FilterSection from "../components/FilterSection.vue";
import { deleteJobSearchBatch } from "../api/jobSearch";

const userInfo = userInfoStore();
const dateOrder = ref("默认排序");
const typeOrder = ref("所有薪资待遇");

const fileInput = ref<HTMLInputElement | null>(null);

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
        await deleteJobSearchBatch(selectedIds.value);
        ElMessage.success("批量删除成功");
        selectedIds.value = [];
        tableKey.value++; // 更新 key 值以刷新组件
    } catch (error) {
        ElMessage.error("批量删除失败，请重试");
    }
};

const handleFileUpload = () => {
    fileInput.value?.click();
};
const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:5173/api/user-info/importExcel", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            tableKey.value += 1;
            ElMessage.success("文件上传成功！");
        } else {
            ElMessage.error("文件上传失败，请重试！");
        }
    } catch (error) {
        ElMessage.error("上传过程中出现错误！");
    }
};

const toUpdate = (id: string) => {
    router.push("/updateJob-search/" + id);
};
</script>


<style lang="scss" scoped></style>
