<template>
    <div class="pt-10 px-10">
        <el-calendar>
            <!-- 自定义日期单元格 -->
            <template #date-cell="{ data }">
                <div :style="{
                    backgroundColor: activityByDate[data.day] ? '#BFDFFF' : '',
                    color: activityByDate[data.day] ? 'white' : '',
                    opacity: data.type === 'current-month' ? 1 : 0.5,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                }" @click="handleDateClick(data.day)">
                    {{ data.day.split('-')[2] }} <!-- 显示日期的日部分 -->

                    <!-- 动态 Popover 展示活动信息 -->
                    <el-popover v-if="popoverVisible[data.day]" v-model:visible="popoverVisible[data.day]" width="100%"
                        :teleported="false">
                        <div v-for="activity in activityByDate[data.day]" :key="activity.id">
                            <p><strong>{{ activity.name }}</strong></p>
                            <p>时间: {{ new Date(activity.startTime).toLocaleString() }}</p>
                            <p>地点: {{ activity.place }}</p>
                        </div>
                    </el-popover>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { Activity } from '../interfaces/Activity';
import { getAllActivity } from '../api/activity';

const loading = ref(false);
const allData = ref<Activity[]>([]);
const activityByDate = ref<{ [key: string]: Activity[] }>({});
const popoverVisible = ref<{ [key: string]: boolean }>({});

onMounted(async () => {
    loading.value = true;
    try {
        const data = {
            page: 1,
            size: 1000000000,
        };
        const res = await getAllActivity(data);
        allData.value = res.data.records;

        // 按日期字符串组织活动
        allData.value.forEach((activity) => {
            const date = activity.startTime.split('T')[0];
            if (!activityByDate.value[date]) {
                activityByDate.value[date] = [];
            }
            activityByDate.value[date].push(activity);
        });
    } catch (error) {
        ElMessage.error('加载活动数据失败');
    } finally {
        loading.value = false;
    }
});

// 点击日期显示活动详情的 Popover
const handleDateClick = (day: string) => {
    if (activityByDate.value[day]) {
        // 切换 Popover 可见状态
        popoverVisible.value[day] = !popoverVisible.value[day];
    } else {
        popoverVisible.value[day] = false;
    }
};
</script>