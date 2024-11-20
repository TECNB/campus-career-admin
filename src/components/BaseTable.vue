<template>
    <div class="BaseTable p-5 md:p-10">
        <!-- 搜索和筛选 -->
        <div class="tableBar flex justify-between items-center mb-4" v-if="showSearch || showFilter">
            <div class="SearchInput flex items-center" v-if="showSearch">
                <el-icon :size="16">
                    <Search />
                </el-icon>
                <input type="text" class="ml-2" :placeholder="searchPlaceholder" v-model="searchQuery"
                    @keyup.enter="onSearch" />
            </div>
            <div class="FilterBox md:flex items-center cursor-pointer" v-if="showFilter" @click="toggleFilter">
                <el-icon>
                    <Operation />
                </el-icon>
                <p class="ml-2">{{ filterText }}</p>
            </div>
        </div>

        <!-- 筛选选项 -->
        <el-scrollbar v-if="filterVisible && filters.length">
            <div class="flex gap-8 mb-5">
                <p v-for="(option, index) in filters" :key="index" :class="[
                    selectedFilter === option.value
                        ? 'text-blue-400 p-2 bg-blue-50 rounded-md cursor-pointer'
                        : 'text-gray-500 cursor-pointer',
                ]" @click="onFilter(option.value)">
                    {{ option.label }}
                </p>
            </div>
        </el-scrollbar>

        <!-- 表格 -->
        <el-scrollbar height="100%">
            <el-table :data="tableData" class="tableBox" v-loading="loading" table-layout="fixed"
                :row-style="{ height: '80px' }" @selection-change="onSelectionChange">
                <slot name="columns"></slot>

                <!-- 操作栏（默认支持插槽） -->
                <el-table-column label="操作" align="center" width="200" v-if="showActions">
                    <template #default="{ row }">
                        <slot name="actions" :row="row"></slot>
                    </template>
                </el-table-column>
            </el-table>
        </el-scrollbar>

        <!-- 分页 -->
        <el-pagination v-if="pagination" class="mt-4" :page-sizes="pageSizes" :page-size="pageSize"
            :layout="paginationLayout" :total="total" :current-page="currentPage" @size-change="onPageSizeChange"
            @current-change="onPageChange" />
    </div>
</template>

<script setup lang="ts">
import { ref,PropType } from 'vue';

// Props
const props = defineProps({
    tableData: { type: Array, required: true }, // 表格数据
    loading: { type: Boolean, default: false }, // 加载状态
    total: { type: Number, default: 0 }, // 总数据量
    pageSize: { type: Number, default: 10 }, // 每页大小
    currentPage: { type: Number, default: 1 }, // 当前页码
    pagination: { type: Boolean, default: true }, // 是否显示分页
    pageSizes: { type: Array, default: () => [10, 20, 30] }, // 可选分页大小
    paginationLayout: { type: String, default: 'total, sizes, prev, pager, next' }, // 分页布局
    filters: { 
        type: Array as PropType<Array<{ label: string; value: string }>>, 
        default: () => [] 
    }, // 筛选选项
    showSearch: { type: Boolean, default: true }, // 是否显示搜索
    searchPlaceholder: { type: String, default: '请输入文字进行搜索' }, // 搜索框占位符
    filterText: { type: String, default: '筛选' }, // 筛选文字
    showFilter: { type: Boolean, default: true }, // 是否显示筛选
    showActions: { type: Boolean, default: true }, // 是否显示操作栏
});

// Emits
const emit = defineEmits(['search', 'filter', 'page-change', 'size-change', 'selection-change']);

// State
const searchQuery = ref('');
const selectedFilter = ref('');
const filterVisible = ref(false);

// Methods
const onSearch = () => emit('search', { filter: selectedFilter.value, query: searchQuery.value });
const onFilter = (value: string) => {
    selectedFilter.value = value;
    emit('filter', value);
};
const toggleFilter = () => (filterVisible.value = !filterVisible.value);
const onPageSizeChange = (size: number) => emit('size-change', size);
const onPageChange = (page: number) => emit('page-change', page);
const onSelectionChange = (val: any) => emit('selection-change', val);
</script>

<style scoped>
/* 可根据需求自定义样式 */
</style>