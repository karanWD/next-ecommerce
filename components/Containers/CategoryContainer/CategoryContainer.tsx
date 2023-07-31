import React, {FC} from 'react';
import CategoryItem from "../../Reusable/CategoryItem";

type CatItemsType = {
    images:string[],
    thumbnail:string,
    title:string
    slug:string,
    _id:string,
    isActive:boolean,
    products?:any[]
    hasSubCategories:boolean
};

type Props = {
    data:CatItemsType[],
    title:string,
    desc:string
}
const CategoryContainer:FC<Props> = ({data,title,desc}) => {
    return (
        <section className="w-full h-auto py-6 border border-b-2 border-gray100">
            <div className="flex justify-center">
                <div className="w-3/4 sm:w-1/2 md:w-1/3 text-center mb-6">
                    <h2 className="text-2xl mb-2">{title}</h2>
                    <span className='text-gray400'>{desc}</span>
                </div>
            </div>
            <div
                className="app-max-width app-x-padding h-full grid grid-cols-4 gap-2  ">
                {data?.map((item, index) => {
                    return (
                        <div className='col-span-2 md:col-span-1' key={"CAT_ITEM_" + index}>
                            <CategoryItem  title={item.title} img={item.thumbnail} name={item.slug} link={"/"+item.slug+(item.hasSubCategories?"":"/products" )}/>
                        </div>
                    )})}
            </div>
        </section>
    );
};

export default CategoryContainer;