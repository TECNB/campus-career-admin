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
                    :showImportButton="userInfo.user?.userType === 'teacher'"
                    importLabel="表格导入"
                    :showExportButton="userInfo.user?.userType === 'teacher'" 
                    exportLabel="导出表格" 
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')"
                    @import="handleFileUpload"
                    @export="handleExport"
                />
            </div>
            <ConversationRecordsTable :key="refreshKey" :dateOrder="dateOrder" :typeOrder="typeOrder" />
            <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" style="display: none" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router";
import { userInfoStore } from "../stores/UserInfoStore";
import ConversationRecordsTable from "../components/ConversationRecordsTable.vue";

const userInfo = userInfoStore();

const dateOrder = ref("默认排序");
const typeOrder = ref("所有活动");
const refreshKey = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

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
        const response = await fetch("http://localhost:5173/api/conversation-records/importExcel", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            refreshKey.value += 1;
            ElMessage.success("文件上传成功！");
        } else {
            ElMessage.error("文件上传失败，请重试！");
        }
    } catch (error) {
        ElMessage.error("上传过程中出现错误！");
    }
};

const handleExport = async () => {
    try {
        // 发送导出请求
        const response = await fetch("http://localhost:5173/api/conversation-records/exportExcel", {
            method: "GET",
        });

        if (response.ok) {
            // 将响应转换为 Blob 对象
            const blob = await response.blob();

            // 创建下载链接
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;

            // 设置文件名，确保与后端导出一致
            link.setAttribute("download", "谈话记录.xlsx");
            document.body.appendChild(link);

            // 自动触发下载
            link.click();

            // 清理临时链接
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            ElMessage.success("文件导出成功！");
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
