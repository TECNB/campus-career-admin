<template>
    <div class="h-full">

        <div class="flex justify-center items-center px-8">
            <div class="h-full">
                <p class="md:text-4xl font-extrabold text-2xl" v-if="userInfo.user?.userType == 'student'">个人信息登记详情</p>
                <p class="md:text-4xl font-extrabold text-2xl text-center" v-if="userInfo.user?.userType == 'teacher'">{{ userDetail.name }}学生信息表</p>
            </div>
        </div>
        <el-scrollbar height="90%">
            <div class="main flex flex-col justify-center gap-10 p-10">
                <!-- 第一行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">学生照片：</p>
                        <img :src="userDetail.imageUrl" class="avatar" />
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
                        <p class="text-xl font-bold whitespace-nowrap">手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.phone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">学号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.studentId }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">身份证号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.idCard }}</p>
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">年级：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.grade }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                        <p class="text-xl font-bold whitespace-nowrap">专业：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.major }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班级：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                    </div>
                </div>

                <!-- 出生日期相关 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">出生日期：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.birthDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入学日期：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.admissionDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">预计毕业时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.expectedGraduation }}</p>
                    </div>
                </div>

                <!-- 其他信息 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">籍贯：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.nativePlace }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">生源地：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.sourcePlace }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">民族：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.ethnicity }}</p>
                    </div>
                </div>


                <!-- 第四行 -->
                <div class="flex flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班级职务：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classRole }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">专业方向：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.specialization }}</p>
                    </div>
                </div>

                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">户口所在地：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.residence }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家庭住址：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.homeAddress }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">辅导员：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.counselor }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">辅导员手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.counselorPhone }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班主任：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classTeacher }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班主任手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classTeacherPhone }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">毕设导师：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.graduationTutor }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">毕设导师手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.graduationTutorPhone }}</p>
                    </div>
                </div>

                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">寝室号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.dormitoryNumber }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">红旗网络：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.networkStatus }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">寝室成员名单：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.dormitoryMembers }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">政治面貌：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.politicalStatus }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党进度：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyProgress }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党培训进度：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyTrainingProgress }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">所在支部：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchName }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党申请时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.applicationDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党积极分子时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.activistDate }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">发展对象时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.developmentDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">预备党员时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.probationaryDate }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">发展转正时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.fullMemberDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党建工时：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyHours }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党支部书记姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchSecretary }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党支部副书记姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchDeputySecretary }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">电子邮箱：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.email }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">QQ号码：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.qqNumber }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">微信号码：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.wechatId }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">抖音账号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.douyinId }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <!-- 家长1信息 -->
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长1姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Name }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长1手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Phone }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长1工作单位：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Company }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长1职业：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Job }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <!-- 家长2信息 -->
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长2姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Name }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长2手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Phone }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长2工作单位：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Company }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家长2职业：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Job }}</p>
                    </div>
                </div>
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <!-- 紧急联系人信息 -->
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">紧急联系人姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.emergencyContactName }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">紧急联系人手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.emergencyContactPhone }}</p>
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
import type { UploadProps } from 'element-plus'

// 引入接口方法
import { addUserInfo, getUserInfoById, editUserInfo } from '../api/userInfo';
import type { UploadFile } from 'element-plus';
import { userInfoStore } from "../stores/UserInfoStore";
const userInfo = userInfoStore();

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

const userDetail = ref<any>({
    id: '', // 用户ID
    name: '', // 姓名
    gender: '男', // 性别
    studentId: '', // 学号
    idCard: '', // 身份证号
    grade: '', // 年级
    major: '', // 专业
    className: '', // 班级
    classRole: '', // 班级职务
    specialization: '', // 专业方向
    birthDate: '', // 出生日期
    admissionDate: '', // 入学日期
    expectedGraduation: '', // 预计毕业时间
    nativePlace: '', // 籍贯
    sourcePlace: '', // 生源地
    ethnicity: '', // 民族
    residence: '', // 户口所在地
    homeAddress: '', // 家庭住址
    counselor: '', // 辅导员姓名
    counselorPhone: '', // 辅导员手机号
    classTeacher: '', // 班主任姓名
    classTeacherPhone: '', // 班主任手机号
    graduationTutor: '', // 毕设导师姓名
    graduationTutorPhone: '', // 毕设导师手机号
    dormitoryNumber: '', // 寝室号
    networkStatus: '', // 红旗网络
    dormitoryMembers: '', // 寝室成员名单
    politicalStatus: '', // 政治面貌
    partyProgress: '', // 入党进度
    partyTrainingProgress: '', // 入党培训进度
    branchName: '', // 所在支部
    applicationDate: '', // 入党申请时间
    activistDate: '', // 入党积极分子时间
    developmentDate: '', // 发展对象时间
    probationaryDate: '', // 预备党员时间
    fullMemberDate: '', // 发展转正时间
    partyHours: '', // 党建工时
    branchSecretary: '', // 党支部书记姓名
    branchDeputySecretary: '', // 党支部副书记姓名
    email: '',
    qqNumber: '',
    wechatId: '',
    douyinId: '',
    parent1Name: '',
    parent1Phone: '',
    parent1Company: '',
    parent1Job: '',
    parent2Name: '',
    parent2Phone: '',
    parent2Company: '',
    parent2Job: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
});

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]);

// 初始化
onMounted(async () => {
    await getUserInfoById(route.params.id as string).then((res) => {
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

const populateFormFields = (data: any) => {
    Object.assign(userDetail.value, data);
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
