<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">个人信息查看</p>
                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder" :typeOptions="[]"
                    :dateOptions="['日期倒序', '日期正序']" :showImportButton="userInfo.user?.userType === 'teacher'"
                    importLabel="表格导入" :showExportButton="userInfo.user?.userType === 'teacher'" exportLabel="导出表格"
                    :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" batchDeleteLabel="批量删除"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @import="handleFileUpload" @export="handleExport" @batchDelete="handleBatchDelete" />
            </div>
            <UserInfoTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
                @selectionChange="updateSelectedIds" />
            <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" style="display: none" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import UserInfoTable from "../components/UserInfoTable.vue";
import { batchDeleteUserInfo } from "../api/userInfo";

const userInfo = userInfoStore();

const dateOrder = ref("默认排序");
const typeOrder = ref("所有活动");
const fileInput = ref<HTMLInputElement | null>(null);

const selectedIds = ref<string[]>([]);
const tableKey = ref(0);

const updateSelectedIds = (ids: string[]) => {
    console.log("ids", ids);
    selectedIds.value = ids;
};

const handleBatchDelete = async () => {
    console.log("selectedIds", selectedIds.value);
    if (selectedIds.value.length === 0) {
        return ElMessage.warning("请选择要删除的学生个人信息");
    }
    try {
        await batchDeleteUserInfo(selectedIds.value);
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
        const response = await fetch("http://10.248.6.72:81/api/user-info/importExcel", {
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
            a.download = "user_info_error_data.xlsx"; // 下载文件名
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
        ? "http://10.248.6.72:81/api/user-info/exportExcel"
        : "http://10.248.6.72:81/api/user-info/downloadStandardTemplate";

    const fileName = type === "database" ? "学生个人信息.xlsx" : "学生个人信息模板.xlsx";

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
