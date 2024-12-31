<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">个人信息查看</p>
                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder" :typeOptions="[]"
                    :dateOptions="['日期倒序', '日期正序']" :showImportButton="userInfo.user?.userType === 'teacher'"
                    importLabel="表格导入" :showExportButton="userInfo.user?.userType === 'teacher'" exportLabel="导出表格"
                    :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" batchDeleteLabel="批量删除"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event" @import="handleImport"
                    @export="handleExport" @batchDelete="handleBatchDelete" />
            </div>
            <UserInfoTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder"
                @selectionChange="updateSelectedIds" />
        </el-scrollbar>
    </div>
    <!-- 引入 ImportBox 组件 -->
    <ImportBox :importNotice="importNotice" :ifShow="showImportBox" apiTo="user-info" fileName="学生个人信息" @updateIfShow="updateIfShow" @updateTableKey="updateTableKey" />
    <MaskLayer :ifShow="showImportBox" @updateIfShow="updateIfShow" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import ImportBox from "../components/ImportBox.vue";
import MaskLayer from "../components/MaskLayer.vue";
import { userInfoStore } from "../stores/UserInfoStore";
import UserInfoTable from "../components/UserInfoTable.vue";
import { batchDeleteUserInfo } from "../api/userInfo";

const userInfo = userInfoStore();

const dateOrder = ref("默认排序");
const typeOrder = ref("所有活动");

const selectedIds = ref<string[]>([]);
const tableKey = ref('');
const importNotice = ref("字段需符合数据类型、格式、长度和特定枚举值等限制，部分字段必填，特殊字段有唯一性或特定格式要求（如身份证号18位、手机号码11位、日期格式yyyy/M/d），多值字段用“/”分隔，枚举字段限制选项范围，描述性字段无特殊限制。");

// 控制 PayBox 显示状态的变量
const showImportBox = ref(false);

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
