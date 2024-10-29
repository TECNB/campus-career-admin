// src/stores/index.ts
import { defineStore } from 'pinia';
// 引入Collection接口
import { Collection } from '../interfaces/Collection';

// 推荐的藏品
export const RecommendedCollectionStore = defineStore('RecommendedCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 排行前十的藏品
export const CollectionRankingStore = defineStore('CollectionRankingStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const PopularAnimationCollectionStore = defineStore('PopularAnimationCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const PopularRealityCollectionStore  = defineStore('PopularRealityCollectionStore', {
    state: () => ({
        collections: [] as Collection[], 
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const PopularTechnologyCollectionStore = defineStore('PopularTechnologyCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const PopularAnimalCollectionStore = defineStore('PopularAnimalCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 购物车中的藏品
export const CartListCollectionStore = defineStore('CartListCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
export const TypeCollectionStore = defineStore('TypeCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 收藏的藏品
export const FavoriteCollectionStore = defineStore('FavoriteCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 收集的藏品
export const OwnedCollectionStore = defineStore('OwnedCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 售卖的藏品
export const SellingCollectionStore = defineStore('SellingCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});
// 创建的藏品
export const CreatedCollectionStore = defineStore('CreatedCollectionStore', {
    state: () => ({
        collections: [] as Collection[],
    }),
    //数据持久化配置 这里是当前所有变量都持久化
    persist:true
});