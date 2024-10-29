// types/collection.ts

export interface Collection {
    objectId: string;
    collectionId: string;
    name: string;
    shortIntro: string;
    intro: string;
    cover: string;
    file: string;
    authorId: string;
    categoryId: string;
    type: string;
    price: number;
    visitCount: number;
    issueNumber: number;
    soldNumber: number;
    recommend: boolean;
    final: boolean;
    albumId: number | null;
    aiCreator: boolean;
    aiDescription: string | null;
    aiNegDescription: string | null;
    aiStyle: string | null;
    historyPrice: number[];
    historyPriceTime: string[];
    checked: boolean;
    createdAt: string;
    
    categoryName:string;
}

