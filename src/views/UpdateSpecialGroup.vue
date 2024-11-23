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
                    <p>取消</p>
                </div>

                <div class="FilterBox p-2 md:p-3" v-if="!isEdit" @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <p>确定</p>
                </div>
                <div class="FilterBox p-2 md:p-3" v-else @click="handleEdit">
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
                        <p class="text-xl font-bold whitespace-nowrap">主要问题：</p>
                        <el-input v-model="mainProblem" placeholder="请输入主要问题" />
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">并存问题：</p>
                        <el-input v-model="coexistingProblem" placeholder="请输入并存问题" />
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-start mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">问题简述：</p>
                        <el-input v-model="problemDescription" placeholder="请输入问题简述" :rows="5" type="textarea" />
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人：</p>
                        <el-input v-model="supportContact" placeholder="请输入帮扶联系人姓名" />
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人电话：</p>
                        <el-input v-model="supportContactPhone" placeholder="请输入帮扶联系人电话" />
                    </div>
                </div>

                <!-- 第四行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">谈话记录：</p>
                        <!-- 跳转到/conversation-records + userInfo.user.studentId -->
                        <el-button type="primary"
                            @click="router.push('/conversation-records/' + userInfo.user?.studentId)">
                            查看
                        </el-button>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">跟踪记录：</p>
                        <el-input v-model="trackingRecord" placeholder="请输入跟踪记录" />
                    </div>
                </div>

                <!-- 第五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">备注：</p>
                        <el-input v-model="remarks" placeholder="请输入备注" />
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
import { userInfoStore } from "../stores/UserInfoStore";

const userInfo = userInfoStore();

// 是否为修改模式
const route = useRoute();
const isEdit = ref(false);
const loading = ref(false);

// 定义表单字段
const id = ref('');
const mainProblem = ref(''); // 主要问题
const coexistingProblem = ref(''); // 并存问题
const problemDescription = ref(''); // 问题简述
const supportContact = ref(''); // 帮扶联系人
const supportContactPhone = ref(''); // 帮扶联系人电话
const trackingRecord = ref(''); // 跟踪记录
const remarks = ref(''); // 备注

// 初始化
onMounted(async () => {
    await getSpecialGroupById(route.params.id as string)
        .then((res) => {
            const data = res.data;

            // 如果不为空则填充表单字段, 如果为空则重置表单字段
            if (data) {
                populateFormFields(data);
                isEdit.value = true;
                loading.value = true;
            } else {
                isEdit.value = false;
                resetFormFields();
            }

            loading.value = false;
        })
        .catch((err) => {
            console.log(err);
        });
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
        router.push('/special-group');
    }
};

// 添加信息
const handleAdd = async () => {
    loading.value = true;
    const newData = {
        mainProblem: mainProblem.value,
        coexistingProblem: coexistingProblem.value,
        problemDescription: problemDescription.value,
        supportContact: supportContact.value,
        supportContactPhone: supportContactPhone.value,
        trackingRecord: trackingRecord.value,
        remarks: remarks.value,
        studentId: userInfo.user?.studentId
    };

    try {
        await addSpecialGroup(newData);
        ElMessage.success('添加成功');
        isEdit.value = true;
        if (userInfoStore().user?.userType === 'teacher') {
            router.push('/special-group');
        }
    } catch (error) {
        console.error(error);
        ElMessage.error('添加失败');
    } finally {
        loading.value = false;
    }
};

// 编辑信息
const handleEdit = async () => {
    loading.value = true;
    const updatedData = {
        id: id.value,
        mainProblem: mainProblem.value,
        coexistingProblem: coexistingProblem.value,
        problemDescription: problemDescription.value,
        supportContact: supportContact.value,
        supportContactPhone: supportContactPhone.value,
        trackingRecord: trackingRecord.value,
        remarks: remarks.value,
        studentId: userInfo.user?.studentId
    };

    try {
        await editSpecialGroup(updatedData);
        ElMessage.success('更新成功');
        if (userInfoStore().user?.userType === 'teacher') {
            router.push('/special-group-management');
        }
    } catch (error) {
        console.log(error);
        ElMessage.error('更新失败');
    } finally {
        loading.value = false;
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
