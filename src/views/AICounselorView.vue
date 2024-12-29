<template>
    <div class="w-full h-full flex flex-col justify-between p-10">
        <!-- 用户信息 -->
        <div class="flex flex-col items-center mb-6">
            <img class="w-20 h-20 rounded-full object-cover shadow-md" src="../assets/images/AI.jpeg" alt="Avatar">
            <p class="text-lg font-bold mt-2">小芯</p>
            <p class="text-sm text-gray-500">@186***5250</p>
        </div>

        <!-- 聊天内容 -->
        <div class="flex flex-col gap-4 flex-1 overflow-y-auto">
            <!-- 发送者消息 -->
            <div class="self-end max-w-[70%]">
                <div class="bg-blue-500 text-white text-sm p-3 rounded-lg shadow-md">
                    你是谁？
                </div>
            </div>
            <!-- 回复消息 -->
            <div class="self-start max-w-[70%]">
                <div class="bg-white text-gray-800 text-sm p-3 rounded-lg shadow-md">
                    同学你好，在学习、生活或者心理上有什么疑问想交流吗？
                </div>
            </div>
        </div>

        <!-- 输入框 -->
        <div class="mt-4">
            <el-input v-model="name" placeholder="点击登录解锁更多有趣对话" class="w-full" @focus="redirectToLink">
                <template #suffix>
                    <el-icon color="var(--text-100)" class="el-input__icon">
                        <Promotion />
                    </el-icon>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const name = ref('');

const redirectToLink =()=>{
    // 跳转到指定链接
    window.location.href = 'https://m.tongyi.aliyun.com/app/tongyi/tongyi-share/agent-share?shareId=87276bc0-b140-4905-9faa-6a5dbc8381cf';
}
</script>

<style lang="scss" scoped>
.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 18px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
        background-color: white;

    }


    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-200)
    }
}
</style>
