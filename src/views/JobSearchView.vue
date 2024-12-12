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
                    :showExportButton="userInfo.user?.userType === 'teacher'" 
                    exportLabel="导出表格" 
                    @update:typeOrder="typeOrder = $event" 
                    @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" 
                    @batchDelete="handleBatchDelete" 
                    @import="handleFileUpload"
                    @export="handleExport"/>
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
        const response = await fetch("http://10.248.6.72:81/api/job-search/importExcel", {
            method: "POST",
            body: formData,
        });

        // 检查响应类型
        const contentType = response.headers.get("content-type");

        if (response.ok && contentType?.includes("application/json")) {
            const json = await response.json();
            if (json.message === "导入成功") {
                ElMessage.success("文件上传成功！");
                tableKey.value += 1;
            } else {
                ElMessage.error("上传失败：" + json.error);
            }
        } else if (response.ok && contentType?.includes("application/vnd.ms-excel")) {
            // 下载错误 Excel 文件
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "job_search_error_data.xlsx"; // 下载文件名
            a.click();
            window.URL.revokeObjectURL(url);
            ElMessage.error("导入文件包含错误，请查看下载的错误文件！");
        } else {
            ElMessage.error("文件上传失败，请重试！");
        }
    } catch (error) {
        ElMessage.error("上传过程中出现错误！");
    }
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
