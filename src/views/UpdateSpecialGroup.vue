<template>
    <div class="AccountView">

        <div class="header">
            <div class="title">
                <p class="md:text-4xl font-extrabold text-2xl">特殊群体详情</p>
            </div>
            <div class="FilterSection">
                <div class="FilterBox p-2 md:p-3" @click="handleCancel">
                    <el-icon>
                        <Close />
                    </el-icon>
                    <p>返回</p>
                </div>
                <div class="FilterBox p-2 md:p-3" @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <p>确定</p>
                </div>
            </div>
        </div>
        <el-scrollbar height="90%">
            <div class="main flex flex-col justify-center gap-10 p-10">
                <!-- 第一行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">主要问题：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ mainProblem }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">并存问题：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ coexistingProblem }}</p>
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-start mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">问题简述：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ problemDescription }}</p>
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ supportContact }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人电话：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ supportContactPhone }}</p>
                    </div>
                </div>

                <!-- 第四行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">谈话记录：</p>
                        <!-- 跳转到/conversation-records/+router的id -->
                        <el-button type="primary" @click="router.push('/conversation-records/' + studentId)">
                            查看
                        </el-button>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">跟踪记录：</p>
                        <p class="text-xl font-bold whitespace-nowrap" v-if="trackingRecord !== null">{{ trackingRecord }}
                        </p>
                        <p class="text-xl font-bold whitespace-nowrap" v-else>无</p>
                    </div>
                </div>

                <!-- 第五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">备注：</p>
                        <p class="text-xl font-bold whitespace-nowrap" v-if="remarks !== null">{{ remarks }}</p>
                        <p class="text-xl font-bold whitespace-nowrap" v-else>无</p>
                    </div>
                </div>

                <!-- 第六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">上传附件：</p>
                        <el-upload class="w-1/2" drag action="http://10.248.6.72:81/api/activity/file" multiple
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx" :file-list="fileList"
                            :on-success="handleUploadSuccess">
                            <el-icon class="el-icon--upload">
                                <upload-filled />
                            </el-icon>
                            <div class="el-upload__text">
                                将文件拖拽在这里或<em>点击上传</em>
                            </div>
                            <template #tip>
                                <div class="el-upload__tip">
                                    支持 jpg,png,word,pdf,excel 格式文件
                                </div>
                            </template>
                        </el-upload>
                    </div>
                </div>

                <!-- 第七行 -->
                <div class="flex flex-1 justify-between items-center gap-10" v-if="isFile">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">下载附件：</p>
                        <!-- 跳转到/conversation-records/+router的id -->
                        <el-button type="primary" @click="downloadAllAttachments(attachmentList)">
                            点击下载
                        </el-button>
                    </div>
                </div>

            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from 'element-plus';
import router from '../router/index';
import { useRoute } from 'vue-router';
import { addSpecialGroup, getSpecialGroupById, editSpecialGroup } from '../api/specialGroup';
import { getUserInfoById } from '../api/userInfo';
import { userInfoStore } from "../stores/UserInfoStore";
import type { UploadFile } from 'element-plus';

const userInfo = userInfoStore();

// 是否为修改模式
const route = useRoute();
// 获取路由参数
const studentId = route.params.id as string;

const loading = ref(false);
const isFile = ref(false);

// 定义表单字段
const id = ref('');
const mainProblem = ref(''); // 主要问题
const coexistingProblem = ref(''); // 并存问题
const problemDescription = ref(''); // 问题简述
const supportContact = ref(''); // 帮扶联系人
const supportContactPhone = ref(''); // 帮扶联系人电话
const trackingRecord = ref(''); // 跟踪记录
const remarks = ref(''); // 备注

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]) // 上传文件列表
const attachmentList = ref<string[]>([]); // 附件列表

// 初始化
onMounted(async () => {
    await getUserInfoById(route.params.id as string)
        .then((res) => {
            const data = res.data;

            // 如果不为空则填充表单字段, 如果为空则重置表单字段
            if (data) {
                populateFormFields(data);
                console.log("data:", data);
                loading.value = true;
            } else {
                console.log('data is empty');
                resetFormFields();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    await getSpecialGroupById(route.params.id as string).then((res) => {
        const data = res.data;
        if (data) {
            // 将attachment数组存入fileList
            fileList.value = data.attachment.map((data: any) => ({
                name: data.fileName,
                url: data.filePath,
                uid: data.id,
                status: 'success'
            }));

            attachmentList.value = data.attachment

            // 如果attachment数组不为空，则显示下载附件按钮
            if (data.attachment.length > 0) {
                isFile.value = true;
            }
        } else {
            console.log('data is empty');
        }
        loading.value = false;
    })
});

// 重置表单字段
const resetFormFields = () => {
    mainProblem.value = '';
    coexistingProblem.value = '';
    problemDescription.value = '';
    supportContact.value = '';
    supportContactPhone.value = '';
    trackingRecord.value = '';
    remarks.value = '';
    fileList.value = [];
};

// 填充表单字段
const populateFormFields = (data: any) => {
    id.value = data.id;
    mainProblem.value = data.mainProblem;
    coexistingProblem.value = data.coexistingProblem;
    problemDescription.value = data.problemDescription;
    supportContact.value = data.supportContact;
    supportContactPhone.value = data.supportContactPhone;
    trackingRecord.value = data.trackingRecord;
    remarks.value = data.remarks;
};

// 取消操作
const handleCancel = () => {
    ElMessage.success('取消成功');
    if (userInfoStore().user?.userType === 'teacher') {
        router.push('/user-info');
    }
};

// 添加信息
const handleAdd = async () => {
    loading.value = true;
    const newData = {
        studentId: route.params.id,
        attachment: fileList.value.map((file) => ({
            fileName: file.name,       // 使用文件的名称作为 fileName
            filePath: file.url         // 使用文件的 URL 作为 filePath
        })),
    };

    try {
        await editSpecialGroup(newData);
        ElMessage.success('添加成功');
        if (userInfoStore().user?.userType === 'teacher') {
            router.push('/user-info');
        }
    } catch (error) {
        console.error(error);
        ElMessage.error('添加失败');
    } finally {
        loading.value = false;
    }
};

// 成功上传后的处理方法
const handleUploadSuccess = (response: any, file: UploadFile) => {
    if (!fileList.value.find(f => f.uid === file.uid)) {
        fileList.value.push({
            name: file.name,
            url: response.data,
            uid: file.uid,
            status: 'success' // 添加status属性
        })
    }
    console.log('handleUploadSuccess fileList:', fileList.value.map((file) => file.url))
};

const downloadAllAttachments = async (attachment: string[]) => {
    const data = {
        attachment: attachment
    };

    const response = await fetch('http://10.248.6.72:81/api/special-group/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        // 转换响应为 Blob 对象
        const blob = await response.blob();

        // 创建临时下载链接
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'attachments.zip'; // 下载文件名
        document.body.appendChild(a);
        a.click(); // 自动触发下载
        a.remove(); // 移除临时元素

        // 释放 URL 对象
        window.URL.revokeObjectURL(url);
    } else {
        console.error('下载失败');
    }
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

                color: rgba(63, 140, 255, 1);
                border: 1px solid rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);
                border-radius: 12px;
                cursor: pointer;


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
:deep(.el-cascader--large) {
    width: 100%;
    height: 50px;
}

:deep(.el-cascader .el-input) {
    height: 50px;
}

:deep(.el-input--large .el-input__wrapper) {
    border-radius: 12px;
}

:deep(.el-cascader .el-input .el-input__inner) {
    font-size: 16px;
    font-weight: bold;
}

.avatar-uploader .avatar {
    width: 80px;
    height: 112px;
    /* 80px * (35/25) */
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 112px;
    /* 80px * (35/25) */
    text-align: center;
}
</style>
