<template>
    <div class="h-full">
        <el-scrollbar>
            <div class="flex justify-between content-center px-7 pt-7">
                <p class="md:text-4xl font-extrabold text-3xl">发送人群查看</p>

                <FilterSection :typeOrder="typeOrder" :dateOrder="dateOrder"
                    :typeOptions="[]" :dateOptions="['日期倒序', '日期正序']"
                    :showAddButton="userInfo.user?.userType === 'admin'" addLabel="发布发送人群"                     
                    :showImportButton="userInfo.user?.userType === 'admin'"
                    importLabel="表格导入"
                    @update:typeOrder="typeOrder = $event" @update:dateOrder="dateOrder = $event"
                    @add="toUpdate('create')" 
                    @import="handleFileUpload"/>
            </div>
            <TargetAudienceTable :key="refreshKey" :dateOrder="dateOrder" :typeOrder="typeOrder" />
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
const refreshKey = ref(0);
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
        const response = await fetch("http://localhost:5173/api/activity-target-audience/importExcel", {
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
</script>

<style lang="scss" scoped></style>
