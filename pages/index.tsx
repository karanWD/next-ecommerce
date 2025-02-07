import React, {useEffect, useState} from 'react';
import Input from "../components/Input/Input";
import Button from "../components/Buttons/Button";
import {useAuth} from "../context/AuthContext";
import {useTranslations} from "next-intl";
import {GetStaticProps} from "next";
import Logo from "../components/Reusable/Logo";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {getCookie} from "cookies-next";
import useFetch from "../hooks/useFetch";
import {ApiRoutes} from "../enums/ApiRoutes";
import {useCart} from "../context/cart/CartProvider";
import Loading from "../public/icons/Loading";
import LoadingPage from "../components/Reusable/LoadingPage";

const Index = () => {
  const router = useRouter()
  const auth = useAuth();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("LoginRegister");
  const [loading, setLoading] = useState(false)
  const {request, response} = useFetch()
  const {request: fetchUser, response: userREs} = useFetch()
  const {updateCart} = useCart()
  const [checkedLogin, setCheckedLogin] = useState(false)

  useEffect(() => {
    const initialCookie = getCookie("user")
    const user = initialCookie && JSON.parse(initialCookie as string)
    const token = user?.token
    if (token) {
      router.push("/shop")
    } else {
      setCheckedLogin(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const loginResponse = await auth.login!(phone, password);
    if (loginResponse.success) {
      setLoading(false)
      router.push("/shop")
      request({url: ApiRoutes.CLIENT_CART})
          .then((res: any) => {
            updateCart(res.cart)
          })
    }
    if (!loginResponse.success) {
      setLoading(false)
      toast.error(t("incorrect_email_password"))
    }
  };

  return (
      <LoadingPage loaded={checkedLogin}>
        <div className='p-4'>
          <div className='flex justify-center mt-6 mb-12'>
            <Logo/>
          </div>

          <h2 className="text-2xl text-right  font-bold leading-6 text-gray-900">{t("loginToTiara")}</h2>
          <p className=" text-right mt-3 mb-8 font-medium leading-6 text-gray-900">{t("loginDesc")}</p>

          <form onSubmit={handleSubmit} className="mt-2">
            <label className='block text-right mb-2' htmlFor="">{t("phone")}</label>
            <Input
                type="phone"
                placeholder={`${t("phone_placeholder")}`}
                name="phone"
                required
                extraClass="w-full focus:border-gray500 text-right"
                border="border-2 border-gray300 mb-4"
                onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                value={phone}
            />
            <label className='block text-right mb-2' htmlFor="">{t("password")}</label>
            <Input
                type="password"
                placeholder={`${t("password_placeholder")}`}
                name="password"
                required
                extraClass="w-full focus:border-gray500 mb-4 text-right"
                border="border-2 border-gray300"
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                value={password}
            />

            <Button
                type="submit"
                value={t("login")}
                extraClass="w-full text-center text-xl mb-4"
                size="lg"
                disabled={loading}
            />
          </form>
        </div>
      </LoadingPage>
  );
};


export const getStaticProps: GetStaticProps = async ({locale}) => {
  return {
    props: {
      messages: {
        ...require(`../messages/common/${locale}.json`),
      },
    },
  };
};

export default Index;