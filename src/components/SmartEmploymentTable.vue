<template>
    <div class="Table p-10">
        <!-- 简历优化 -->
        <div class="mb-4">
            <p class="text-left text-2xl font-bold mb-4">一、简历优化</p>
            <div class="flex gap-4">
                <a href="https://resume.io" target="_blank"
                    class="w-1/3 p-4 text-center bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition">
                    Resume.io
                    <p class="text-sm mt-2">创建专业简历</p>
                </a>
                <a href="https://www.canva.com" target="_blank"
                    class="w-1/3 p-4 text-center bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600 transition">
                    Canva
                    <p class="text-sm mt-2">设计美观简历</p>
                </a>
                <a href="https://novoresume.com" target="_blank"
                    class="w-1/3 p-4 text-center bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition">
                    Novoresume
                    <p class="text-sm mt-2">简历模板和建议</p>
                </a>
            </div>
        </div>

        <!-- 面试优化 -->
        <div class="mb-4">
            <p class="text-left text-2xl font-bold mb-4">二、面试优化</p>
            <div class="flex gap-4">
                <a href="https://www.mockquestions.com" target="_blank"
                    class="w-1/3 p-4 text-center bg-green-500 text-white rounded-2xl hover:bg-green-600 transition">
                    MockQuestions
                    <p class="text-sm mt-2">练习常见面试题</p>
                </a>
                <a href="https://www.interviewcake.com" target="_blank"
                    class="w-1/3 p-4 text-center bg-teal-500 text-white rounded-2xl hover:bg-teal-600 transition">
                    Interview Cake
                    <p class="text-sm mt-2">提高面试技巧</p>
                </a>
                <a href="https://www.glassdoor.com" target="_blank"
                    class="w-1/3 p-4 text-center bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition">
                    Glassdoor
                    <p class="text-sm mt-2">面试经验和薪资</p>
                </a>
            </div>
        </div>

        <div class="" v-if="userInfo.user?.userType==='student'">
            <!-- 往期简历 -->
            <div class="flex justify-between items-center mb-4">
                <p class="text-left text-2xl font-bold">往期简历：</p>
            </div>
            <div class="space-y-4 mb-4">
                <el-card v-for="resume in resumeRecords" :key="resume.id" class="hover-shadow transition"
                    style="border-radius: 12px;">
                    <div class="flex items-center justify-between text-left">
                        <div>
                            <p class="text-lg font-semibold">{{ resume.title }}</p>
                            <p class="text-sm text-gray-600">创建时间：{{ resume.date }}</p>
                        </div>
                        <div class="space-x-2">
                            <el-button text bg type="success" size="small" @click="check(resume.id)">
                                查看
                            </el-button>
                            <el-button text bg type="danger" size="small" @click="deletion(resume.id)">
                                删除
                            </el-button>
                        </div>
                    </div>
                </el-card>
            </div>

            <!-- 往期面试 -->
            <div>
                <div class="flex justify-between items-center mb-4">
                    <p class="text-left text-2xl font-bold">往期面试：</p>
                </div>
                <div class="space-y-4">
                    <el-card v-for="interview in interviewRecords" :key="interview.id" class="hover-shadow transition"
                        style="border-radius: 12px;">
                        <div class="flex items-center justify-between text-left">
                            <div>
                                <p class="text-lg font-semibold">{{ interview.title }}</p>
                                <p class="text-sm text-gray-600">面试时间：{{ interview.date }}</p>
                            </div>
                            <div class="space-x-2">
                                <el-button text bg type="success" size="small" @click="check(interview.id)">
                                    查看
                                </el-button>
                                <el-button text bg type="danger" size="small" @click="deletion(interview.id)">
                                    删除
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
// ElConfigProvider 组件
import { ElConfigProvider } from 'element-plus';
// 引入中文包
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';

import router from '../router/index';

import { JobSearch } from '../interfaces/JobSearch';
import { getAllJobSearch, deleteJobSearch } from '../api/jobSearch';


const props = defineProps(['dateOrder', 'typeOrder']);
// 使用userInfoStore
const userInfo = userInfoStore();


// 模拟数据
const resumeRecords = ref([
    { id: 1, title: '简历 2023-01-15', date: '2023年1月15日', status: '已提交', statusColor: 'success' },
    { id: 2, title: '简历 2023-02-10', date: '2023年2月10日', status: '草稿', statusColor: 'info' },
])

const interviewRecords = ref([
    { id: 1, title: '面试记录 2023-02-20', date: '2023年2月20日', status: '待面试', statusColor: 'warning' },
    { id: 2, title: '面试记录 2023-03-05', date: '2023年3月5日', status: '已完成', statusColor: 'success' },
])

// 添加、查看和删除功能
const addResume = () => {
    console.log("添加新的简历")
}
const addInterview = () => {
    console.log("添加新的面试记录")
}

// 模拟查看功能
const check = (id: number) => {
    const url = `http://localhost:8080/简历%202023-01-15.pdf`; // 可以根据 id 动态生成 URL
    window.open(url, '_blank');
    console.log(`查看 ${id}`);
}
const deletion = (id: number) => {
    console.log(`删除 ${id}`)
}
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
    border-radius: 9px;
}

.Table {
    width: auto;
    height: 92%;

    background: #fff;
    border-radius: 16px;

    margin: 24px;

    .tableBar {
        display: flex;
        justify-content: space-between;
        align-content: center;
        gap: 20px;

        /* 输入框样式 */
        .SearchInput {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex: 1;

            background-color: rgba(250, 250, 250, 1);
            border-radius: 12px;


            padding: 12px;
            margin-bottom: 20px;

            input {
                outline: none;
                padding-left: 10px;
                font-size: 16px;
                width: 200px;
                /* 调整输入框的宽度 */
                border: 0px;
                color: rgba(160, 174, 192, 1);
                background-color: rgba(250, 250, 250, 1);
            }
        }

        /* 筛选框样式 */
        .FilterBox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;


            color: rgba(160, 174, 192, 1);
            background-color: rgba(250, 250, 250, 1);
            border-radius: 12px;


            padding: 12px;
            margin-bottom: 20px;
        }
    }
}


.tableBox {
    width: 100%;
    // 表格的外部是否有边框
    // border: solid 2px #f3f4f7;
    border-radius: 2px;
}

.pageList {
    text-align: center;
    margin-top: 30px;
}


:deep(.el-checkbox__inner) {
    width: 19px;
    height: 19px;
    border-radius: 22.5px;
}

:deep(.el-checkbox__inner::after) {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    left: 7px;
    top: 4px;
}

:deep(.el-checkbox__input.is-checked .el-checkbox__inner::after) {
    transform: rotate(50deg) scaleY(1.5);
}
</style>
