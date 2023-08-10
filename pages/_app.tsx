import {NextComponentType, NextPageContext} from "next";
import Router, {useRouter} from "next/router";
import NProgress from "nprogress";
import {NextIntlProvider} from "next-intl";

import {ProvideCart} from "../context/cart/CartProvider";
import {ProvideAuth} from "../context/AuthContext";

import "../styles/globals.css";
import "animate.css";
import "nprogress/nprogress.css";
import 'react-toastify/dist/ReactToastify.min.css';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/scrollbar/scrollbar.min.css";
import {toast, ToastContainer} from "react-toastify";
import {useEffect, useState} from "react";
import {getCookie} from "cookies-next";
import jsx from "acorn-jsx";


Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

type AppCustomProps = {
    Component: NextComponentType<NextPageContext, any, {}>;
    pageProps: any;
    cartState: string;
    wishlistState: string;
};


const MyApp = ({Component, pageProps}: AppCustomProps) => {
    const router = useRouter()
    const [isBlock, setBlock] = useState(false)

    useEffect(() => {
        window.screen.width > 768 && setBlock(true)
        const initialCookie = getCookie("user")
        const user = initialCookie && JSON.parse(initialCookie as string)
        const token = user?.token
        if (!token) router.push("/")
    }, [])

    return (
        !isBlock ?
            <NextIntlProvider messages={pageProps?.messages}>
                <ProvideAuth>
                    <ProvideCart>
                        <Component {...pageProps} />
                        <ToastContainer autoClose={1500} rtl position={toast.POSITION.TOP_CENTER}  limit={1}/>
                    </ProvideCart>
                </ProvideAuth>
            </NextIntlProvider>
            :
            <div className='h-screen flex items-center justify-center'>
                برای استفاده از امکانات اپلیکیشن تیارا، با تلفن همراه خود وارد سایت شوید
            </div>
    );
};

export default MyApp;
