<template>
    <div class="AccountView">
        <el-scrollbar>
            <div class="header">
                <p class="md:text-4xl font-extrabold text-3xl">谈话记录详情</p>
                <FilterSection
                    :typeOrder="typeOrder"
                    :dateOrder="dateOrder"
                    :typeOptions="[]"
                    :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'admin'"
                    addLabel="发布学生资料"
                    :showBatchDeleteButton="userInfo.user?.userType === 'teacher'" batchDeleteLabel="批量删除"
                    :showImportButton="userInfo.user?.userType === 'teacher'"
                    importLabel="表格导入"
                    :showExportButton="userInfo.user?.userType === 'teacher'" 
                    exportLabel="导出表格" 
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')"
                    @batchDelete="handleBatchDelete"
                    @import="handleImport"
                    @export="handleExport"
                />
            </div>
            <ConversationRecordsTable :key="tableKey" :dateOrder="dateOrder" :typeOrder="typeOrder" @selectionChange="updateSelectedIds"/>
        </el-scrollbar>
    </div>
    <!-- 引入 ImportBox 组件 -->
    <ImportBox :importNotice="importNotice" :ifShow="showImportBox" apiTo="conversation-records" fileName="谈话记录" @updateIfShow="updateIfShow" @updateTableKey="updateTableKey" />
    <MaskLayer :ifShow="showImportBox" @updateIfShow="updateIfShow" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import ConversationRecordsTable from "../components/ConversationRecordsTable.vue";
import { batchDeleteConversationRecord } from "../api/conversationRecords";

const userInfo = userInfoStore();

const dateOrder = ref("默认排序");
const typeOrder = ref("所有活动");

const selectedIds = ref<string[]>([]);
const tableKey = ref('');
const importNotice = ref("请严格按照模板格式填写数据，确保字段内容符合数据类型、格式（如日期为yyyy/M/d）、长度、枚举值等要求，必填项完整，多值字段按规则分隔，避免错误提交。");

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
        await batchDeleteConversationRecord(selectedIds.value);
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
        ? "http://10.248.6.72:81/api/conversation-records/exportExcel"
        : "http://10.248.6.72:81/api/conversation-records/downloadStandardTemplate";

    const fileName = type === "database" ? "谈话记录.xlsx" : "谈话记录模板.xlsx";

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
    router.push("/updateUser-detail/" + id);
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.AccountView {
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;
        align-content: center;

        padding: 30px 30px 0 30px;

        .FilterSection {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 10px;

            .FilterBox:nth-child(1) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
                position: relative;

                cursor: pointer;



                color: rgba(160, 174, 192, 1);
                background: white;
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }

            .FilterBox:nth-child(2) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;



                color: white;
                background: rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }

            .FilterBox:nth-child(3) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;



                color: white;
                background: rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }
        }



    }
}
</style>
