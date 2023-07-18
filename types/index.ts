import {AxiosRequestConfig} from "axios";

export interface ResponseTypes {
    loading: boolean,
    response: any
    error: any
    request: (params:AxiosRequestConfig) => void
}

export interface CatItemsType {
    images: string[],
    thumbnail: string,
    title: string
    slug: string,
    _id: string,
    isActive: boolean,
    products?: any[]
    hasSubCategories: boolean
};

export interface CategoryType {
    subCategories: CatItemsType[],
    _id: string,
    title: string,
    slug: string
    thumbnail: string
}

export interface CartItemType{
    title:string
    sizeName:string
    colorName:string
    count:number
    totalWeightWithWage:number
    productId:string
}

export interface CartType{
    cart:{
        products:CartItemType[]
        totalCartWeightWithWage:number
        totalCartWeight:number
        updatedAt:string
    },
    updateCart:(data:any)=>void
}

export interface OrderItemType {
    createdAt: string
    numberOfProducts: number
    status: "NEW" | "PENDING" | "ACCEPTED" | "CANCELED" | "DELIVERED"
    totalWeightWithWage: number
    totalWeight?: number
    _id?: string
}

export interface OrdersType {
    orders:OrderItemType[]
}

export interface ProductItemType {
    minWeight?:number
    maxWeight?:number
    thumbnail:string
    title:string
    slug?:string
    wage:number
}