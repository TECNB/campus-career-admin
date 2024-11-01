<template>
    <div class="AccountView">
        <div class="header">
            <div class="title">
                <p>发布资料详情</p>
            </div>
            <div class="FilterSection">
                <div class="FilterBox" @click="handleCancel">
                    <el-icon>
                        <Close />
                    </el-icon>
                    <p>取消</p>
                </div>

                <div class="FilterBox" v-if="!isEdit" @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <p>发布</p>
                </div>
                <div class="FilterBox" v-else @click="handleEdit">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <p>更新</p>
                </div>

            </div>
        </div>
        <el-scrollbar height="90%">
            <div class="main flex flex-col justify-center gap-10 p-10">
                <!-- 第一行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">资料类别：</p>
                        <el-select v-model="category" placeholder="请点击选择类别" size="large" clearable :teleported="false">
                            <el-option v-for="item in allType" :key="item.objectId" :label="item.name"
                                :value="item.name" />
                        </el-select>

                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">标题：</p>
                        <el-input v-model="title" placeholder="请输入标题" />
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">上传附件：</p>
                        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                            :auto-upload="false" :file-list="fileList" multiple :on-success="handleUploadSuccess">
                            <el-icon>
                                <Plus />
                            </el-icon>

                            <template #file="{ file }">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <el-icon>
                                                <ZoomIn />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleDownload(file)">
                                            <el-icon>
                                                <Download />
                                            </el-icon>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete"
                                            @click="handleRemove(file)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                        </el-upload>

                        <el-dialog v-model="dialogVisible">
                            <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-start">
                        <p class="text-xl font-bold whitespace-nowrap">资料详情：</p>
                        <el-input v-model="details" placeholder="请输入资料详情" :rows="10" type="textarea" />
                    </div>
                </div>
                
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Download, Plus } from '@element-plus/icons-vue';
import router from '../router/index';
import { useRoute } from 'vue-router';

import type { UploadFile } from 'element-plus';
import { addEmploymentDatabase, getEmploymentDatabaseById, editEmploymentDatabase } from '../api/employmentDatabase';

const route = useRoute();

// 是否为修改
let isEdit = ref(false);
// 加载
let loading = ref(false);

// 定义类别选项
const allType = ref<any[]>([
    { objectId: '1', name: '就业资料' },
    { objectId: '2', name: '考研资料' },
    { objectId: '3', name: '出国资料' }
]);

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]) // 上传文件列表
const dialogImageUrl = ref(''); // 预览图片的URL
const dialogVisible = ref(false); // 控制对话框可见性
const disabled = ref(false) // 控制按钮是否禁用

// 表单属性
const id = ref('');
const category = ref('');
const title = ref('');
const attachment = ref('');
const details = ref('');
const createdAt = ref('');

onMounted(async () => {
    if (route.params.id === "create") {
        isEdit.value = false;
        // 清空表单属性
        title.value = '';
        category.value = '';
        attachment.value = '';
        details.value = '';
        fileList.value = [];
        loading.value = false;
    } else {
        isEdit.value = true;
        loading.value = true;
        // 获取文档信息
        await getEmploymentDatabaseById(route.params.id as string).then((res) => {
            const data = res.data;
            title.value = data.title;
            category.value = data.category;
            attachment.value = data.attachment;
            details.value = data.details;
            createdAt.value = data.createdAt;

            // 如果有附件
            if (data.attachment) {
                fileList.value = [{
                    name: "attachment-file",
                    url: data.attachment,
                    status: 'success',
                    uid: Date.now()
                }];
            }

            loading.value = false;
        }).catch((err) => {
            console.log(err);
        });
    }
});

// 成功上传后的处理方法
const handleUploadSuccess = (response: any, file: UploadFile) => {
    if (!fileList.value.find(f => f.uid === file.uid)) {
        fileList.value.push({
            name: file.name,
            url: file.url || (file.raw ? URL.createObjectURL(file.raw) : ''), // 使用本地URL预览
            uid: file.uid,
            status: 'success'
        });
    }
};
const handleRemove = (file: UploadFile) => {
    fileList.value = fileList.value.filter(f => f.uid !== file.uid);
};

const handleDownload = (file: UploadFile) => {
    console.log('Downloading file:', file);
};
const handleCancel = () => {
    ElMessage.success('取消成功')
    router.push('/employment-database')
}
const handleAdd = async () => {
    loading.value = true;
    const newData = {
        title: title.value,
        category: category.value,
        attachment: fileList.value.length ? fileList.value[0].url : null,
        details: details.value,
    };

    try {
        await addEmploymentDatabase(newData);
        ElMessage.success('发布成功');
        router.push('/employment-database');
    } catch (error) {
        console.error(error);
        ElMessage.error('发布失败');
    } finally {
        loading.value = false;
    }
};
const handleEdit = async () => {
    loading.value = true;
    const updatedData = {
        id: route.params.id as string,
        title: title.value,
        category: category.value,
        attachment: fileList.value.length ? fileList.value[0].url : null,
        details: details.value,
    };

    try {
        await editEmploymentDatabase(updatedData);
        ElMessage.success('更新成功');
        router.push('/employment-database');
    } catch (error) {
        console.log(error);
        ElMessage.error('更新失败');
    } finally {
        loading.value = false;
    }
};
const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true

    console.log('Previewing file:', file)
}
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

        .title {
            font-size: 36px;
            font-weight: 800;
        }

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

                color: rgba(63, 140, 255, 1);
                border: 1px solid rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);
                border-radius: 12px;
                cursor: pointer;


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
                cursor: pointer;


                padding: 12px;
                margin-bottom: 20px;
            }
        }



    }
}

// 下面为el-select部分
@mixin select_radius {
    border-radius: 12px;
}


// 控制el-select的长度以及圆角
:deep(.el-select__wrapper) {
    height: 50px;
    @include select_radius;
}

// 控制el-select中文字的样式
:deep(.el-select__placeholder) {

    font-size: 16px;
    font-weight: bold;
}

// 控制点击后的边框颜色
:deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 0 0 1px var(--accent-100);
}

// 下面为下拉框部分
// 下面用于控制整体的下拉框圆角
:deep(.el-select__popper.el-popper) {
    @include select_radius;
}


//下拉框的文本未选中的样式
// .el-select-dropdown__item {

// }
//下拉框的文本颜色选中之后的样式
.el-select-dropdown__item.is-selected {
    color: var(--accent-200);
}

.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 16px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
    }

    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-100)
    }
}

// 下面是日期选择组件的自定义样式
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
    height: 50px;
    border-radius: 12px;
}

.el-date-editor-style {
    --el-input-border-radius: 12px;
}



// 下面是数字选择组件的自定义样式
.el-input-number {
    width: 100%;
    height: 50px;
}

:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}

// 下面是textarea组件的自定义样式
.el-textarea {
    font-size: 16px;
    font-weight: bold;

    --el-input-focus-border-color: var(--accent-200);
}


// 下面是地区选择组件的自定义样式
:deep(.el-cascader--large){
    width: 100%;
    height: 50px;
}
:deep(.el-cascader .el-input){
    height: 50px;
}
:deep(.el-input--large .el-input__wrapper){
    border-radius: 12px;
}
:deep(.el-cascader .el-input .el-input__inner){
    font-size: 16px;
    font-weight: bold;
}
</style>
