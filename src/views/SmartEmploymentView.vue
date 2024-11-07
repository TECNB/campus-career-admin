<template>
    <div class="AccountView">
        <el-scrollbar>
            <div class="header">
                <div class="title">
                    <p>智能就业</p>
                </div>
                <div class="FilterSection">
                    <div class="FilterBox">
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
                    <div class="FilterBox" @click="triggerFileUpload('resume')"
                        v-if="userInfo.user?.userType === 'student'">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>添加简历</p>
                    </div>
                    <div class="FilterBox" @click="triggerFileUpload('interview')"
                        v-if="userInfo.user?.userType === 'student'">
                        <el-icon>
                            <Plus />
                        </el-icon>
                        <p>添加面试</p>
                    </div>
                </div>
            </div>
            <SmartEmploymentTable :dateOrder="dateOrder" :typeOrder="typeOrder" />
            <!-- 隐藏的文件选择框 -->
            <input ref="fileInput" type="file" accept=".pdf" style="display: none" @change="handleFileChange" />
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SmartEmploymentTable from "../components/SmartEmploymentTable.vue"
import { userInfoStore } from "../stores/UserInfoStore";
import { ElMessage } from 'element-plus'

const userInfo = userInfoStore();

const dateOrder = ref<string>("默认排序")
const typeOrder = ref<string>("所有链接")
const ifShowDateOrderPicker = ref<boolean>(false)
const ifShowTypeOrderPicker = ref<boolean>(false)

// 引用文件输入
const fileInput = ref<HTMLInputElement | null>(null)
// 当前文件类型
const fileType = ref<string>('')

// 触发文件选择框
const triggerFileUpload = (type: string) => {
    fileType.value = type // 设置文件类型为简历或面试
    fileInput.value?.click()
}

// 处理文件选择
const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]

    if (file && file.type === 'application/pdf') {
        // 创建 FormData 并将文件添加到请求中
        const formData = new FormData()
        formData.append('file', file)
        formData.append('fileType', fileType.value) // 使用当前的 fileType 值
        formData.append('userId', userInfo.user?.userId || '')

        try {
            const response = await fetch('http://localhost:5173/api/user-resume-interview-attachment/file', {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                ElMessage.success('文件上传成功')
                console.log('文件上传成功')
            } else {
                ElMessage.error('文件上传失败')
                console.error('文件上传失败')
            }
        } catch (error) {
            console.error('上传过程中出错:', error)
        }
    } else {
        alert('仅支持上传 PDF 文件')
    }

    // 清空文件选择框的值，确保可以重新选择同一文件
    target.value = ''
}


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
