<template>
    <div
        class="w-[30%] absolute z-[99999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg" v-if="props.ifShow">
        <div class="flex justify-between items-center text-[#1d1c1c] text-xl font-semibold border-b pb-4">
            <p>导入须知</p>
            <div class="cursor-pointer" @click="toggleVisibility">
                <el-icon class="w-6 h-6 text-gray-400 hover:text-gray-600 transition">
                    <Close />
                </el-icon>
            </div>
        </div>

        <div class="mt-6 space-y-6">
            <!-- 表格字段规则 -->
            <div>
                <h3 class="text-lg font-medium text-gray-800">表格字段规则</h3>
                <p class="mt-2 text-sm text-gray-600 leading-6">
                    字段需符合数据类型、格式、长度和特定枚举值等限制，部分字段必填，特殊字段有唯一性或特定格式要求（如身份证号18位、手机号码11位、日期格式yyyy/M/d），多值字段用“/”分隔，枚举字段限制选项范围，描述性字段无特殊限制。
                </p>
            </div>

            <!-- 下载模板 -->
            <div>
                <h3 class="text-lg font-medium text-gray-800">具体规则下载标准查看</h3>
                <p
                    class="mt-2 text-sm text-[#00668c] hover:text-[#71c4ef] cursor-pointer underline"
                    @click="handleExport(standard)">
                    学生个人信息模板.xlsx
                </p>
            </div>

            <!-- 上传按钮 -->
            <div>
                <button
                    class="w-full bg-[#00668c] text-white py-3 rounded-xl font-semibold hover:bg-[#004a63] transition"
                    @click="handleFileUpload">
                    点击上传表格
                </button>
            </div>
        </div>

        <!-- 隐藏的文件输入框 -->
        <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" class="hidden" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['ifShow']);
const emit = defineEmits();

const tableKey = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

const toggleVisibility = () => {
    emit('updateIfShow', false);
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
                toggleVisibility();
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
            a.download = "conversation_records_error_data.xlsx"; // 下载文件名
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
