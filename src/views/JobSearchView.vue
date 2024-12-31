<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">岗位搜索</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="['2000-5000', '5000-8000', '8000-15000', '15000以上']" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'teacher'" addLabel="发布岗位"
                    :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" batchDeleteLabel="批量删除"
                    :showImportButton="userInfo.user?.userType === 'teacher'" importLabel="表格导入"
                    :showExportButton="userInfo.user?.userType === 'teacher'" exportLabel="导出表格"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" @batchDelete="handleBatchDelete" @import="handleImport"
                    @export="handleExport" />
            </div>
            <JobSearchTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
                @selectionChange="updateSelectedIds" />
        </el-scrollbar>
    </div>
    <!-- 引入 ImportBox 组件 -->
    <ImportBox :ifShow="showImportBox" :importNotice="importNotice" apiTo="job-search" fileName="岗位信息" @updateIfShow="updateIfShow" @updateTableKey="updateTableKey" />
    <MaskLayer :ifShow="showImportBox" @updateIfShow="updateIfShow" />
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

// 控制 PayBox 显示状态的变量
const showImportBox = ref(false);
const importNotice = ref("请严格按照模板格式填写数据，确保字段内容符合数据类型、格式、长度、枚举值等要求，多值字段用“/”分隔，必填项完整，避免错误提交。");

const selectedIds = ref<string[]>([]);
const tableKey = ref('');

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
        tableKey.value = `key_${Date.now()}`; // 使用时间戳确保唯一性
    } catch (error) {
        ElMessage.error("批量删除失败，请重试");
    }
};

const handleImport = () => {
    showImportBox.value = true; // 显示 PayBox
    // fileInput.value?.click();
};

// 处理显示状态的更新方法
const updateIfShow = (value: boolean) => {
    showImportBox.value = value;
};

// 更新 tableKey 的方法
const updateTableKey = (value: string) => {
    tableKey.value = value;
    console.log("tableKey", tableKey.value);
};

const handleExport = async (type: string) => {
    const apiUrl = type === "database"
        ? "http://10.248.6.72:81/api/job-search/exportExcel"
        : "http://10.248.6.72:81/api/job-search/downloadStandardTemplate";

    const fileName = type === "database" ? "岗位信息.xlsx" : "岗位信息模板.xlsx";

    try {
        // 发送导出请求
        const response = await fetch(apiUrl, {
            method: "GET",
        });

        if (response.ok) {
            // 将响应转换为 Blob 对象
            const blob = await response.blob();

            // 创建下载链接
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            // 设置文件名
            link.setAttribute("download", fileName);
            document.body.appendChild(link);

            // 自动触发下载
            link.click();

            // 清理临时链接
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            ElMessage.success(`${fileName} 导出成功！`);
        } else {
            ElMessage.error("文件导出失败，请重试！");
        }
    } catch (error) {
        console.error("导出过程中出现错误：", error);
        ElMessage.error("导出过程中出现错误！");
    }
};

const toUpdate = (id: string) => {
    router.push("/updateJob-search/" + id);
};
</script>


<style lang="scss" scoped></style>
