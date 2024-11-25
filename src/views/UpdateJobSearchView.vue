<template>
    <div class="AccountView">
        <div class="header">
            <div class="">
                <p class="md:text-4xl font-extrabold text-2xl">岗位发布详情</p>
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
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">企业名称：</p>
                        <el-input v-model="companyName" placeholder="请输入名称" />
                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">岗位名称：</p>
                        <el-input v-model="positionName" placeholder="请输入名称" />
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">HR：</p>
                        <el-input v-model="hrName" placeholder="请输入HR名称" />
                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">联系电话：</p>
                        <el-input v-model="hrPhone" placeholder="请输入名称" />
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">专业要求：</p>
                        <el-select v-model="majorRequirement" placeholder="请点击选择专业" size="large" clearable
                            :teleported="false" multiple>
                            <el-option v-for="item in allMajor" :key="item.objectId" :label="item.name"
                                :value="item.name" />
                        </el-select>
                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">招聘人数：</p>
                        <el-input-number v-model="participantCount" :min="1" placeholder="请输入人数" />
                    </div>
                </div>


                <!-- 第四行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">薪资待遇：</p>
                        <el-select v-model="money" placeholder="请点击选择分类" size="large" clearable :teleported="false">
                            <el-option v-for="item in allMoney" :key="item.objectId" :label="item.name"
                                :value="item.name" />
                        </el-select>
                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">工作地点：</p>
                        <el-cascader size="large" :options="pcaTextArr" v-model="area" placeholder="请点击选择区域">
                        </el-cascader>

                    </div>
                </div>

                <!-- 第五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">网申链接：</p>
                        <el-input v-model="applicationLink" placeholder="请输入链接" />

                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">其他要求：</p>
                        <el-input v-model="additionalRequirements" placeholder="请输入其他要求" />

                    </div>
                </div>

                <!-- 第六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-start">
                        <p class="text-xl font-bold whitespace-nowrap">企业简介：</p>
                        <el-input v-model="companyDescription" placeholder="请输入企业简介" :rows="5" type="textarea" />
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Close, Plus } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';
import { pcaTextArr } from "element-china-area-data";
import { addJobSearch, getJobSearchById, editJobSearch } from '../api/jobSearch';
import type { UploadFile } from 'element-plus';
import router from '../router/index';

const route = useRoute();

let isEdit = ref(false);
let loading = ref(false);

// 定义表单属性
const companyName = ref('');
const positionName = ref('');
const hrName = ref('');
const hrPhone = ref('');
const majorRequirement = ref<string[]>([]);  // 将其定义为数组以支持多选
const participantCount = ref(0);
const money = ref('');
const area = ref<string[]>([]);
const applicationLink = ref('');
const additionalRequirements = ref('');
const companyDescription = ref('');

// 定义下拉选项
const allMajor = ref<any[]>([
    { objectId: '1', name: '软件工程' },
    { objectId: '2', name: '自动化' },
    { objectId: '3', name: '电子信息工程' },
    { objectId: '4', name: '计算机科学与技术' },
    { objectId: '5', name: '电气工程与智能控制' },
]);

const allMoney = ref<any[]>([
    { objectId: '1', name: '2000-5000' },
    { objectId: '2', name: '5000-8000' },
    { objectId: '3', name: '8000-15000' },
    { objectId: '4', name: '15000以上' }
]);

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

onMounted(async () => {
    if (route.params.id === "create") {
        isEdit.value = false;
    } else {
        isEdit.value = true;
        loading.value = true;
        try {
            const res = await getJobSearchById(route.params.id as string);
            const data = res.data;
            companyName.value = data.companyName;
            positionName.value = data.positionName;
            hrName.value = data.hrName;
            hrPhone.value = data.hrPhone;
            majorRequirement.value = data.majorRequirement.split('/');
            participantCount.value = data.participantCount;
            money.value = data.money;
            area.value = data.area.split(',');
            applicationLink.value = data.applicationLink;
            additionalRequirements.value = data.additionalRequirements;
            companyDescription.value = data.companyDescription;

            if (data.activityImage) {
                fileList.value = [{
                    name: "activity-image",
                    url: data.activityImage,
                    status: 'success',
                    uid: Date.now()
                }];
            }
        } catch (err) {
            console.log(err);
        } finally {
            loading.value = false;
        }
    }
});

// 成功上传后的处理方法
const handleUploadSuccess = (response: any, file: UploadFile) => {
    if (!fileList.value.find(f => f.uid === file.uid)) {
        fileList.value.push({
            name: file.name,
            url: file.url || (file.raw ? URL.createObjectURL(file.raw) : ''),
            uid: file.uid,
            status: 'success'
        });
    }
};
const handleRemove = (file: UploadFile) => {
    fileList.value = fileList.value.filter(f => f.uid !== file.uid);
};

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    dialogVisible.value = true;
};

const handleCancel = () => {
    ElMessage.success('取消成功');
    router.push('/job-search');
};

const handleAdd = async () => {
    loading.value = true;
    const newData = {
        companyName: companyName.value,
        positionName: positionName.value,
        hrName: hrName.value,
        hrPhone: hrPhone.value,
        majorRequirement: majorRequirement.value.join('/'),
        participantCount: participantCount.value,
        money: money.value,
        area: area.value.join(','),
        applicationLink: applicationLink.value,
        additionalRequirements: additionalRequirements.value,
        companyDescription: companyDescription.value,
        activityImages: fileList.value.map((file) => file.url),
    };

    try {
        await addJobSearch(newData);
        ElMessage.success('发布成功');
        router.push('/job-search');
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
        companyName: companyName.value,
        positionName: positionName.value,
        hrName: hrName.value,
        hrPhone: hrPhone.value,
        majorRequirement: majorRequirement.value.join('/'),
        participantCount: participantCount.value,
        money: money.value,
        area: area.value.join(','),
        applicationLink: applicationLink.value,
        additionalRequirements: additionalRequirements.value,
        companyDescription: companyDescription.value,
        activityImage: fileList.value.length ? fileList.value[0].url : null,
    };

    try {
        await editJobSearch(updatedData);
        ElMessage.success('更新成功');
        router.push('/job-search');
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
</style>
