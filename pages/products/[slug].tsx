import React, {useEffect, useState} from 'react';
import {GetServerSideProps} from "next";
import Header from "../../components/Header/Header";
import useFetch from "../../hooks/useFetch";
import {useRouter} from "next/router";
import {ApiRoutes} from "../../enums/ApiRoutes";
import InfoContaincer from "../../components/Product/InfoContaincer";
import FeatureContainer from "../../components/Product/FeatureContainer";
import {useTranslations} from "next-intl";
import CounterContainer from "../../components/Product/CounterContainer";
import StickyPament from "../../components/Product/StickyPament";
import {toast} from 'react-toastify';
import {useCart} from "../../context/cart/CartProvider";
import LoadingPage from "../../components/Reusable/LoadingPage";

const ProductPage = () => {
  const router = useRouter()
  const {slug} = router.query
  const t = useTranslations("Product");
  const [color, setColor] = useState<{id:string,value:string,images:any[]}>({id: "", value: "",images:[]})
  const [size, setSize] = useState<{id:string,value:string,images:any[]}>({id: "", value: "",images:[]})
  const [count, setCount] = useState(1)
  const {response, loading, error, request} = useFetch()
  const {response: addResponse, request: addRequest,loading:addReqLoading} = useFetch()
  const {updateCart,cart} = useCart()

  const addToCartHandler = async () => {
    await addRequest({
      method: "POST",
      url: ApiRoutes.CLIENT_CART + "/" + response._id + "/product",
      data: {
        items: [{
          sizeId: size.id,
          colorId: color.id,
          count: count
        }]
      }
    }).then((res: any) => {
      updateCart(res)
      setColor({id: "", value: "",images:[]})
      setSize({id: "", value: "",images:[]})
      setCount(1)
      toast.success("با موفقیت افزوده شد",)
    })
  }

  useEffect(() => {
    slug && request({url: ApiRoutes.CLIENT_PRODUCTS + "/" + slug})
  }, [slug])

  return (
      <>
        <Header/>
        <LoadingPage loaded={!loading && response}>
          <div className='flex flex-col gap-4 text-right'>
            <InfoContaincer name={response?.title}
                            wage={response?.wage}
                            images={ size.images?.length>0 ? size.images :[response?.thumbnail]}/>
            <FeatureContainer title={t("textureAndSize")} features={response?.sizes}
                              selectHandler={(data) => setSize(data)}
                              selected={size.id}/>
            <FeatureContainer title={t("color")} features={response?.colors}
                              selectHandler={(data) => setColor(data)}
                              selected={color.id}/>

            <CounterContainer clickHandler={(value => setCount(prev => prev + value))} currentValue={count}
                              title={t("count")}/>
            <br/>
            <br/>
            <StickyPament clickHandler={addToCartHandler} total={+size.value * count}
                          isActive={!!size.id && !!count && !!color.id} loading={addReqLoading}/>
          </div>
        </LoadingPage>
      </>
  );
};
export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({params, locale,}) => {
  return {
    props: {
      messages: (await import(`../../messages/common/${locale}.json`)).default,
    },
  };
}