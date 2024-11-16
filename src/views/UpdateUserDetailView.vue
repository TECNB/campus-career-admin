<template>
    <div class="AccountView">

        <div class="header">
            <div class="">
                <p class="md:text-4xl font-extrabold text-xl">添加发送人群详情</p>
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
                        <p class="text-xl font-bold whitespace-nowrap">姓名：</p>
                        <el-input v-model="name" placeholder="请输入姓名" />
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4">
                        <p class="text-xl font-bold whitespace-nowrap">性别：</p>
                        <el-input v-model="gender" placeholder="请输入性别" />
                    </div>
                </div>

                <!-- 第二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班级：</p>
                        <el-input v-model="className" placeholder="请输入班级" />
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4">
                        <p class="text-xl font-bold whitespace-nowrap">学号：</p>
                        <el-input v-model="studentId" placeholder="请输入学号" />
                    </div>
                </div>

                <!-- 第三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">联系方式：</p>
                        <el-input v-model="contactNumber" placeholder="请输入联系方式" />
                    </div>
                    <div class="flex flex-1 justify-start items-center mt-4">
                        <p class="text-xl font-bold whitespace-nowrap">班主任：</p>
                        <el-input v-model="classTeacher" placeholder="请输入班主任" />
                    </div>
                </div>

                <!-- 第四行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">毕业设计导师：</p>
                        <el-input v-model="graduationTutor" placeholder="请输入毕业设计导师" />
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Plus } from '@element-plus/icons-vue'
import router from '../router/index';
// 引入route
import { useRoute } from 'vue-router';
// 引入接口
import { addUserDetail, getUserDetailById, editUserDetail } from '../api/userDetail';


const route = useRoute();

const name = ref('');
const gender = ref('');
const className = ref('');
const studentId = ref('');
const contactNumber = ref('');
const classTeacher = ref('');
const graduationTutor = ref('');
// 是否为修改
let isEdit = ref(false);
// 加载
let loading = ref(false);

onMounted(async () => {
    console.log(route.params.id);
    // 判断是否为编辑
    if (route.params.id === "create") {
        isEdit.value = false;
        // 清空表单属性
        name.value = '';
        gender.value = '';
        className.value = '';
        studentId.value = '';
        contactNumber.value = '';
        classTeacher.value = '';
        graduationTutor.value = '';
        loading.value = false;
    } else {
        isEdit.value = true;
        loading.value = true;
        // 获取用户信息
        await getUserDetailById(route.params.id as string).then((res) => {
            const data = res.data;
            console.log(data);
            name.value = data.name;
            gender.value = data.gender;
            className.value = data.className;
            studentId.value = data.studentId;
            contactNumber.value = data.contactNumber;
            classTeacher.value = data.classTeacher;
            graduationTutor.value = data.graduationTutor;
            loading.value = false;
        }).catch((err) => {
            console.log(err);
        });
    }
});

const handleCancel = () => {
    ElMessage.success('取消成功');
    router.push('/user-detail');
};

const handleAdd = async () => {
    loading.value = true;
    const newData = {
        name: name.value,
        gender: gender.value,
        className: className.value,
        studentId: studentId.value,
        contactNumber: contactNumber.value,
        classTeacher: classTeacher.value,
        graduationTutor: graduationTutor.value,
    };

    try {
        await addUserDetail(newData);
        ElMessage.success('发布成功');
        router.push('/user-detail');
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
        name: name.value,
        gender: gender.value,
        className: className.value,
        studentId: studentId.value,
        contactNumber: contactNumber.value,
        classTeacher: classTeacher.value,
        graduationTutor: graduationTutor.value,
    };

    try {
        await editUserDetail(updatedData);
        ElMessage.success('更新成功');
        router.push('/user-detail');
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
