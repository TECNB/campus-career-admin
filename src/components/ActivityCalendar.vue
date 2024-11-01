<template>
    <div class="pt-10 px-10">
        <el-calendar>
            <!-- 自定义日期单元格 -->
            <template #dateCell="{ data }">
                <div :style="{
                    backgroundColor: activityByDate[data.day] ? '#f56c6c' : '',
                    borderRadius: activityByDate[data.day] ? '50%' : '',
                    color: activityByDate[data.day] ? 'white' : '',
                    opacity: data.type === 'current-month' ? 1 : 0.5,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }" @click="handleDateClick(data.day, $event)">
                    {{ data.day.split('-')[2] }} <!-- 显示日期的日部分 -->
                </div>
            </template>
        </el-calendar>

        <!-- 动态 Popover 展示活动信息 -->
        <el-popover v-if="popoverVisible" :visible="popoverVisible" width="200" placement="top"
            :style="{ position: 'fixed', top: popoverPosition.top, left: popoverPosition.left }"
            @mouseleave="popoverVisible = false">
            <div v-for="activity in selectedActivities" :key="activity.id">
                <p><strong>{{ activity.name }}</strong></p>
                <p>时间: {{ new Date(activity.startTime).toLocaleString() }}</p>
                <p>地点: {{ activity.place }}</p>
            </div>
        </el-popover>
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
const selectedActivities = ref<Activity[]>([]);
const popoverVisible = ref(false);
const popoverPosition = ref({ top: '0px', left: '0px' });

onMounted(async () => {
    loading.value = true;
    try {
        const res = await getAllActivity();
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
const handleDateClick = (day, event) => {
    selectedActivities.value = activityByDate.value[day] || [];
    if (selectedActivities.value.length > 0) {
        popoverVisible.value = true;
        popoverPosition.value = {
            top: `${event.clientY + 10}px`,
            left: `${event.clientX + 10}px`,
        };
    } else {
        popoverVisible.value = false;
    }
};
</script>