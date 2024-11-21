<template>
    <div class="AccountView">

        <div class="header">
            <div class="title">
                <p class="md:text-4xl font-extrabold text-2xl">个人信息登记详情</p>
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
                        <p class="text-xl font-bold whitespace-nowrap">学生照片：</p>
                        <!-- <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.name }}</p> -->
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.name }}</p>

                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">性别：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.gender }}</p>
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">学号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.studentId }}</p>

                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">身份证号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.studentId }}</p>
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">年级：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.contactNumber }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">专业：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班级：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                </div>


                <!-- 第四行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班级职务：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">专业方向：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                </div>


                <!-- 第五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">出生日期：</p>
                        <el-date-picker v-model="startTime" type="datetime" placeholder="请选择开始时间"
                            :shortcuts="shortcuts" />

                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入学日期：</p>
                        <el-date-picker v-model="endTime" type="datetime" placeholder="请选择结束时间"
                            :shortcuts="shortcuts" />
                    </div>
                    <div class="flex flex-1 mt-4 md:mt-0 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">预计毕业时间：</p>
                        <el-date-picker v-model="endTime" type="datetime" placeholder="请选择结束时间"
                            :shortcuts="shortcuts" />
                    </div>
                </div>

                <!-- 第六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">籍贯：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">生源地：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">民族：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                </div>

                <!-- 第七行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">就业情况：</p>
                        <el-radio-group v-model="employmentStatus" size="large" class="">
                            <el-radio :label="'实习'">实习</el-radio>
                            <el-radio :label="'签约'">签约</el-radio>
                            <el-radio :label="'暂无'">暂无</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap" v-if="employmentStatus === '实习'">已实习单位：</p>
                        <p class="text-xl font-bold whitespace-nowrap" v-if="employmentStatus === '签约'">已签约单位：</p>
                        <p class="text-xl font-bold whitespace-nowrap" v-else"></p>
                        <el-input v-model="companyName" v-if="employmentStatus !== '暂无'"
                            :placeholder="employmentStatus === '实习' ? '请输入实习单位名称' : '请输入签约单位名称'" />
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue';
import router from '../router/index';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { pcaTextArr } from "element-china-area-data";

// 引入接口方法
import { addEmploymentSearch, getEmploymentSearchByUserId, editEmploymentSearch } from '../api/employmentSearch';
import type { UploadFile } from 'element-plus';
import { userInfoStore } from "../stores/UserInfoStore";

// 是否为修改模式
const route = useRoute();
const isEdit = ref(false);
const loading = ref(false);

// 定义表单字段
const id = ref('');
const name = ref('');
const gender = ref<'男' | '女'>('男');
const className = ref('');
const studentId = ref('');
const contactNumber = ref('');
const classTeacher = ref('');
const graduationTutor = ref('');
const futurePlan = ref('');
const salary = ref('');
const companyNature = ref('');
const workLocation = ref([]);
const employmentStatus = ref('实习');
const companyName = ref('');
const startTime = ref('');
const endTime = ref('');

const userDetail = ref<any>({});

// 定义日期选择器的快捷选项
const shortcuts = [
    {
        text: '今天',
        value: () => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return today;
        },
    },
    {
        text: '明天',
        value: () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            return tomorrow;
        },
    },
    {
        text: '一周后',
        value: () => {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            nextWeek.setHours(0, 0, 0, 0);
            return nextWeek;
        },
    },
];

// 所有未来计划选项
const allFuturePlan = [
    { objectId: '1', name: '就业' },
    { objectId: '2', name: '创业' },
    { objectId: '3', name: '考研' },
    { objectId: '4', name: '出国' },
    { objectId: '5', name: '征兵入伍' },
    { objectId: '6', name: '考公考编' },
    { objectId: '7', name: '不就业' },
    { objectId: '8', name: '其他' },
];
const allMoney = ref<any[]>([
    { objectId: '1', name: '2000-5000' },
    { objectId: '2', name: '5000-8000' },
    { objectId: '3', name: '8000-15000' },
    { objectId: '4', name: '15000以上' }
]);
const allNature = ref<any[]>([
    { objectId: '1', name: '国有企业' },
    { objectId: '2', name: '私有企业' },
    { objectId: '3', name: '外资企业' },
    { objectId: '4', name: '合资企业' },
    { objectId: '5', name: '其他' }
]);

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]);

// 初始化
onMounted(async () => {
    await getEmploymentSearchByUserId(route.params.id as string).then((res) => {
        const data = res.data;
        console.log("userDetail.value", userDetail.value);
        // 如果不为空则填充表单字段,如果为空则重置表单字段
        if (data) {
            populateFormFields(data);
            isEdit.value = true;
            loading.value = true;
        } else {
            isEdit.value = false;
            resetFormFields();
        }

        loading.value = false;
    }).catch((err) => {
        console.log(err);
    });
});

// 重置表单字段
const resetFormFields = () => {
    name.value = '';
    gender.value = '男';
    className.value = '';
    studentId.value = '';
    contactNumber.value = '';
    classTeacher.value = '';
    graduationTutor.value = '';
    futurePlan.value = '';
    salary.value = '';
    companyNature.value = '';
    workLocation.value = [];
    employmentStatus.value = '实习';
    companyName.value = '';
    fileList.value = [];
};

// 填充表单字段
const populateFormFields = (data: any) => {
    userDetail.value = data.userDetail;
    id.value = data.id;
    name.value = data.userDetail.name;
    gender.value = data.userDetail.gender;
    className.value = data.userDetail.className;
    studentId.value = data.userDetail.studentId;
    contactNumber.value = data.userDetail.contactNumber;
    classTeacher.value = data.userDetail.classTeacher;
    graduationTutor.value = data.userDetail.graduationTutor;
    futurePlan.value = data.futurePlan;
    salary.value = data.salary;
    companyNature.value = data.companyNature;
    workLocation.value = data.workLocation.split('/');
    employmentStatus.value = data.employmentStatus;
    if (employmentStatus.value !== '暂无'){
        companyName.value = ''
    }else{
        companyName.value = data.companyName;
    }
    
};

// 取消操作
const handleCancel = () => {
    ElMessage.success('取消成功');
    if (userInfoStore().user?.userType === 'teacher') {
        router.push('/employment-search');
    }
};

// 添加信息
const handleAdd = async () => {
    loading.value = true;
    const newData = {
        name: name.value,
        gender: gender.value,
        className: className.value,
        studentId: userInfoStore().user?.studentId,
        contactNumber: contactNumber.value,
        classTeacher: classTeacher.value,
        graduationTutor: graduationTutor.value,
        futurePlan: futurePlan.value,
        salary: salary.value,
        companyNature: companyNature.value,
        workLocation: workLocation.value.join('/'),
        employmentStatus: employmentStatus.value,
        // 如果employmentStatus.value为暂无则companyName为空
        companyName: employmentStatus.value === '暂无' ? '' : companyName.value,
    };

    try {
        await addEmploymentSearch(newData);
        ElMessage.success('发布成功');
        isEdit.value = true;
        if (userInfoStore().user?.userType === 'teacher') {
            router.push('/employment-search');
        }

    } catch (error) {
        console.error(error);
        ElMessage.error('发布失败');
    } finally {
        loading.value = false;
    }
};

// 编辑信息
const handleEdit = async () => {
    loading.value = true;
    const updatedData = {
        id: id.value,
        name: name.value,
        gender: gender.value,
        className: className.value,
        studentId: studentId.value,
        contactNumber: contactNumber.value,
        classTeacher: classTeacher.value,
        graduationTutor: graduationTutor.value,
        futurePlan: futurePlan.value,
        salary: salary.value,
        companyNature: companyNature.value,
        workLocation: workLocation.value.join('/'),
        employmentStatus: employmentStatus.value,
        // 如果employmentStatus.value为暂无则companyName为空
        companyName: employmentStatus.value === '暂无' ? '' : companyName.value,
    };

    try {
        await editEmploymentSearch(updatedData);
        ElMessage.success('更新成功');
        if (userInfoStore().user?.userType === 'teacher') {
            router.push('/employment-search');
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
</style>
