<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">发送人群查看</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder" :typeOptions="[]"
                    :dateOptions="['日期倒序', '日期正序']" :showAddButton="userInfo.user?.userType === 'admin'"
                    addLabel="发布发送人群" :showImportButton="userInfo.user?.userType === 'admin'" importLabel="表格导入"                     
                    :showExportButton="userInfo.user?.userType === 'admin'" 
                    exportLabel="导出表格" 
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" @import="handleFileUpload" @export="handleExport"/>
            </div>
            <TargetAudienceTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder" />
            <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" style="display: none" />
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
const tableKey = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

// 跳转到发布发送人群页面
const toUpdate = (id: string) => {
    router.push("/updateActivity-target-audience/" + id);
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
        const response = await fetch("http://10.248.6.72:81/api/activity-target-audience/importExcel", {
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
            a.download = "activity_target_audience_error_data.xlsx"; // 下载文件名
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
        ? "http://10.248.6.72:81/api/activity-target-audience/exportExcel"
        : "http://10.248.6.72:81/api/activity-target-audience/downloadStandardTemplate";

    const fileName = type === "database" ? "活动发送人群.xlsx" : "活动发送人群模板.xlsx";

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
</script>

<style lang="scss" scoped></style>
