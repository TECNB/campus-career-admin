<template>
    <div class="AccountView">
        <el-scrollbar>
            <div class="header">
                <div class="">
                    <p class="md:text-4xl font-extrabold text-3xl">学生资料查看</p>
                </div>
                <div class="FilterSection">
                    <!-- <div class="FilterBox">
                        <div class="flex justify-center items-center gap-3" @click="toggleIfShowTypeOrderPicker">
                            <p>显示：</p>
                            <p class="text-black font-medium">{{ typeOrder }}</p>
                            <el-icon v-if="ifShowTypeOrderPicker">
                                <ArrowUpBold />
                            </el-icon>
                            <el-icon v-else>
                                <ArrowDownBold />
                            </el-icon>
                        </div>
                        <transition name="fade">
                            <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg p-3"
                                v-if="ifShowTypeOrderPicker">
                                <p class="text-left hover:text-accent-100 cursor-pointer"
                                    @click="choseTypeOrder('招聘会')">
                                    招聘会</p>
                                <p class="text-left mt-5 hover:text-accent-100 cursor-pointer"
                                    @click="choseTypeOrder('宣讲会')">宣讲会</p>
                                <p class="text-left mt-5 hover:text-accent-100 cursor-pointer"
                                    @click="choseTypeOrder('招聘公告')">招聘公告</p>
                            </div>
                        </transition>
                    </div> -->
                    <div class="FilterBox !hidden md:block">
                        <div class="flex justify-center items-center gap-3" @click="toggleIfShowDateOrderPicker">
                            <p>排序：</p>
                            <p class="text-black font-medium">{{ dateOrder }}</p>
                            <el-icon v-if="ifShowDateOrderPicker">
                                <ArrowUpBold />
                            </el-icon>
                            <el-icon v-else>
                                <ArrowDownBold />
                            </el-icon>
                        </div>
                        <transition name="fade">
                            <div class="absolute top-16 right-0 w-full rounded-xl bg-white shadow-lg p-3 z-50"
                                v-if="ifShowDateOrderPicker">
                                <p class="text-left hover:text-accent-100 cursor-pointer"
                                    @click="choseDateOrder('日期倒序')">
                                    日期倒序</p>
                                <p class="text-left mt-5 hover:text-accent-100 cursor-pointer"
                                    @click="choseDateOrder('日期正序')">日期正序</p>
                            </div>
                        </transition>

                    </div>
                    <div class="FilterBox !hidden md:block" @click="handleFileUpload" v-if="userInfo.user?.userType == 'admin'">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>表格导入</p>
                    </div>
                    <div class="FilterBox" @click="toUpdate('create')" v-if="userInfo.user?.userType == 'admin'">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>发布学生资料</p>
                    </div>

                </div>
            </div>
            <UserDetailTable :key="refreshKey" :dateOrder="dateOrder" :typeOrder="typeOrder" />
            <!-- 隐藏的文件输入框 -->
            <input type="file" ref="fileInput" @change="onFileChange" accept=".xls, .xlsx" style="display: none" />
        </el-scrollbar>

    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import router from '../router';

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import UserDetailTable from "../components/UserDetailTable.vue"


// 使用userInfoStore
const userInfo = userInfoStore();

const dateOrder = ref<string>("默认排序")
const typeOrder = ref<string>("所有活动")
const refreshKey = ref(0); // 用于触发子组件重新渲染
const ifShowDateOrderPicker = ref<boolean>(false)
const ifShowTypeOrderPicker = ref<boolean>(false)

const fileInput = ref<HTMLInputElement | null>(null);

const handleFileUpload = () => {
    // 触发文件选择框
    fileInput.value?.click();
};

const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:5173/api/user-detail/importExcel', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            refreshKey.value += 1; // 上传成功后更改 refreshKey 值，触发子组件刷新
            ElMessage.success('文件上传成功！');
        } else {
            ElMessage.error('文件上传失败，请重试！');
        }
    } catch (error) {
        ElMessage.error('上传过程中出现错误！');
    }
};


// 选择日期排序
const choseDateOrder = (order: string) => {
    dateOrder.value = order
    ifShowDateOrderPicker.value = false
}
// 选择类型排序
const choseTypeOrder = (order: string) => {
    typeOrder.value = order
    ifShowTypeOrderPicker.value = false
}

// 控制是否显示日期排序选择框
const toggleIfShowDateOrderPicker = () => {
    ifShowDateOrderPicker.value = !ifShowDateOrderPicker.value
}
// 控制是否显示类型排序选择框
const toggleIfShowTypeOrderPicker = () => {
    ifShowTypeOrderPicker.value = !ifShowTypeOrderPicker.value
}

const toUpdate = (id: string) => {
    console.log('toUpdate')
    router.push('/updateUser-detail/' + id)
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

        .FilterSection {
            display: flex;
            justify-content: center;
            align-content: center;
            gap: 10px;

            .FilterBox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;
                position: relative;

                cursor: pointer;



                color: rgba(160, 174, 192, 1);
                background: white;
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


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


                padding: 12px;
                margin-bottom: 20px;
            }

            .FilterBox:nth-child(3) {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;



                color: white;
                background: rgba(63, 140, 255, 1);
                box-shadow: 0px 6px 12px rgba(63, 140, 255, 0.26);

                border-radius: 12px;


                padding: 12px;
                margin-bottom: 20px;
            }
        }



    }
}
</style>
