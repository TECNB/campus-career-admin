<template>
    <div class="CreateTypeView">
        <el-scrollbar>
            <div class="header">
                <div class="title" v-if="!isEdit">
                    <p>添加分类</p>
                </div>
                <div class="title" v-else>
                    <p>编辑分类</p>
                </div>
                <div class="FilterSection">
                    <div class="FilterBox" @click="toType">
                        <el-icon>
                            <Close />
                        </el-icon>
                        <p>取消</p>
                    </div>

                    <div class="FilterBox" v-if="!isEdit" @click="handleAddType">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>保存分类</p>
                    </div>
                    <div class="FilterBox" v-else @click="handleEditType">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>更新分类</p>
                    </div>

                </div>
            </div>
            <div class="flex justify-center items-center gap-3">
                <div class="flex-[2_1_0] min-h-96 bg-white rounded-2xl m-10 p-10">
                    <p class="text-left font-medium">基础信息</p>
                    <p class="text-left mt-5">分类名称</p>
                    <!-- 下面为分类名称搜索框 -->
                    <el-input v-model="name" placeholder="请输入分类名称" class="mt-4">
                        <template #prefix>
                            <el-icon color="var(--text-100)" class="el-input__icon">
                                <CollectionTag />
                            </el-icon>
                        </template>
                    </el-input>

                </div>
                <div class="flex-[1_1_0] min-h-96 bg-white rounded-2xl m-10 p-10">
                    <p class="text-left font-medium">分类图片</p>
                    <p class="text-neutral-500 my-2 mb-10">选择产品照片或在此处一次拖放,最多1张照片</p>
                    <div v-if="!uploadedImage" @click="openFileInput" v-loading="loading"
                        element-loading-text="加载图片中..."
                        class="flex flex-col justify-center items-center gap-5 h-40 border border-dashed border-text-200 rounded-2xl mt-30 bg-bg-200 cursor-pointer transition-bg-20 hover:border-solid hover:border-text-200 hover:bg-rgba-18-18-18-0.04 ">
                        <el-icon size="40">
                            <Upload />
                        </el-icon>
                        <p class="text-16 text-accent-100 font-bold">
                            拖拽媒体或点击选择文件
                        </p>
                        <p> 最大尺寸:50MB</p>
                        <input id="fileInput" type="file" ref="fileInput" class="hidden" @change="uploadFile">
                    </div>

                    <div v-else class="relative" v-loading="loading" @mouseenter="toggleShowReupload" @mouseleave="toggleShowReupload"
                        element-loading-text="上传图片中...">
                        <img class="rounded-xl" :src="uploadedImage" alt="上传的图片" />
                        <transition name="fade">
                            <div v-if="showReupload" @click="openFileInput"
                                class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 rounded-lg cursor-pointer p-2">
                                <p class="text-accent-100 hover:text-accent-200 text-sm text-nowrap">重新选择图片</p>
                            </div>
                        </transition>
                        <input id="fileInput" type="file" ref="fileInput" class="hidden" @change="uploadFile">
                    </div>
                </div>


            </div>
        </el-scrollbar>


    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"


import { uploadImage } from "../api/collections"
import { addType, getTypeById, editType } from "../api/type"
import router from "../router";
import { useRoute } from 'vue-router';

const route = useRoute();

// 分类名称
let name = ref("");
// 是否为修改
let isEdit = ref(false);
// 加载
let loading = ref(false);
// 是否展示重新选择图片
let showReupload = ref(false);

// 定义上传后的图片URL
const uploadedImage = ref<string | null>(null);

onMounted(async () => {
    console.log(route.params.id);
    // 判断是否为编辑
    if (route.params.id === "create") {
        isEdit.value = false;
    } else {
        isEdit.value = true;
        loading.value = true;
        // 获取分类信息
        await getTypeById(route.params.id as string).then((res) => {
            name.value = res.name;
            uploadedImage.value = res.cover;
            loading.value = false;
        }).catch((err) => {
            console.log(err);
        })
    }
});

// 切换是否展示重新选择图片
const toggleShowReupload = () => {
    showReupload.value = !showReupload.value;
};

// 通过div点击input的方法
const openFileInput = () => {
    console.log('openFileInput');
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
        fileInput.click();
    }
};

const toType = () =>{
    router.push('/type');
}

// 上传图片
const uploadFile = async () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    // 确保存在文件
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        loading.value = true;
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        formData.append('type', 'category');

        await uploadImage(formData).then((res) => {
            uploadedImage.value = res as string;
            loading.value = false;
        }).catch((err) => {
            console.log(err);
        });
    }
};

// 添加分类
const handleAddType = async () => {
    const formData = new FormData();

    // 判断是否有分类名称输入
    if (!name.value) {
        ElMessage.error('分类名称不能为空');
        return;
    }

    if (uploadedImage.value) {
        formData.append('name', name.value);
        formData.append('cover', uploadedImage.value);

        await addType(formData).then((res) => {
            console.log(res);
            ElMessage.success('添加分类成功');
            router.push('/type');
        }).catch((err) => {
            console.log(err);
            ElMessage.error('添加分类失败,请重试');
        })
    } else {
        ElMessage.error('请上传分类图片');
    }
};
// 编辑分类
const handleEditType = async () => {
    const formData = new FormData();

    // 判断是否有分类名称输入
    if (!name.value) {
        ElMessage.error('分类名称不能为空');
        return;
    }

    if (uploadedImage.value) {
        formData.append('name', name.value);
        formData.append('cover', uploadedImage.value);

        await editType(route.params.id as string, formData).then((res) => {
            console.log(res);
            ElMessage.success('编辑分类成功');
            router.push('/type');
        }).catch((err) => {
            console.log(err);
            ElMessage.error('编辑分类失败,请重试');
        })
    } else {
        ElMessage.error('请上传分类图片');
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
.CreateTypeView {
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

.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: rgba(250, 250, 250, 1);

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: rgba(250, 250, 250, 1);

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}

.CreateViewBodyLeft {
    min-width: 40%;


    .CreateViewBodyLeftUpdate {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;


        height: 80%;
        width: 100%;
        min-width: 80%;

        max-height: 600px;
        border: 1px dashed var(--text-200);
        border-radius: 20px;
        margin-top: 30px;
        background-color: var(--bg-200);

        transition: background-color 0.2s cubic-bezier(0.05, 0, 0.2, 1) 0s;
        /* 添加过渡效果 */
    }

    .CreateViewBodyLeftUpdate:hover {

        border: 1px solid var(--text-200);
        background-color: rgba(18, 18, 18, 0.04)
    }
}

:deep(.el-upload--picture-card) {
    flex-direction: column;
    gap: 10px;
}

// 下面为loading的样式
:deep(.el-loading-mask) {
    border-radius: 12px;
}

// 修改图标的颜色
:deep(.el-loading-spinner .path) {
    stroke: var(--accent-200);
}

// 修改文字的颜色
:deep(.el-loading-spinner .el-loading-text) {
    color: var(--accent-200);
}
</style>
