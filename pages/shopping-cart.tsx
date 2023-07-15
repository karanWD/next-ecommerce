import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import Header from "../components/Header/Header";
import GhostButton from "../components/Buttons/GhostButton";
import { GetStaticProps } from "next";
import { roundDecimal } from "../components/Util/utilFunc";
import { useCart } from "../context/cart/CartProvider";
import { useRouter } from "next/router";


const ShoppingCart = () => {
  const t = useTranslations("CartWishlist");
  const router = useRouter();
  const [deli, setDeli] = useState("Pickup");
  const { cart, addOne, removeItem, deleteItem, clearCart } = useCart();

  let subtotal = 0;

  let deliFee = 0;
  if (deli === "Yangon") {
    deliFee = 2.0;
  } else if (deli === "Others") {
    deliFee = 7.0;
  }

  return (
    <div>
      {/* ===== Head Section ===== */}
      <Header title={`سبدخرید - فرووشگاه تیــارا`} />

      <main id="main-content">
        <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
          <div className="h-full w-full lg:w-4/6 mr-4">
            <table className="w-full mb-6">
              <thead>
                <tr className="border-t-2 border-b-2 border-gray200">
                  <th className="font-normal text-left sm:text-center py-2 xl:w-72">
                    {t("product_details")}
                  </th>
                  <th
                    className={`font-normal py-2 hidden sm:block ${
                      cart?.products.length === 0 ? "text-center" : "text-right"
                    }`}
                  >
                    {t("unit_price")}
                  </th>
                  <th className="font-normal py-2">{t("quantity")}</th>
                  <th className="font-normal py-2 text-right">{t("amount")}</th>
                  <th
                    className="font-normal py-2 text-right"
                    style={{ minWidth: "3rem" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr className="w-full text-center h-60 border-b-2 border-gray200">
                    <td colSpan={5}>{t("cart_is_empty")}</td>
                  </tr>
                ) : (
                  cart?.products.map((item) => {
                    subtotal += item?.price * item?.qty!;
                    return (
                      <tr className="border-b-2 border-gray200" key={item.id}>
                        <td className="my-3 flex flex-col xl:flex-row items-start sm:items-center xl:space-x-2 text-center xl:text-left">
                          <Link
                            href={`/products/${encodeURIComponent(item.id)}`}
                          >
                            <a>
                              {/*<Image*/}
                              {/*  src={item?.img1 as string}*/}
                              {/*  alt={item?.name}*/}
                              {/*  width={95}*/}
                              {/*  height={128}*/}
                              {/*  className="h-32 xl:mr-4"*/}
                              {/*/>*/}
                            </a>
                          </Link>
                          <span>{item.name}</span>
                        </td>
                        <td className="text-right text-gray400 hidden sm:table-cell">
                          $ {roundDecimal(item.price)}
                        </td>
                        <td>
                          <div className="w-12 h-32 sm:h-auto sm:w-3/4 md:w-2/6 mx-auto flex flex-col-reverse sm:flex-row border border-gray300 sm:divide-x-2 divide-gray300">
                            <div
                              onClick={() => removeItem!(item)}
                              className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              -
                            </div>
                            <div className="h-full w-12 flex justify-center items-center pointer-events-none">
                              {item.qty}
                            </div>
                            <div
                              onClick={() => addOne!(item)}
                              className="h-full w-12 flex justify-center items-center cursor-pointer hover:bg-gray500 hover:text-gray100"
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td className="text-right text-gray400">
                          $ {roundDecimal(item.price * item.qty!)}
                          <br />
                          <span className="text-xs">
                            ($ {roundDecimal(item.price)})
                          </span>
                        </td>
                        <td className="text-right" style={{ minWidth: "3rem" }}>
                          <button
                            onClick={() => deleteItem!(item)}
                            type="button"
                            className="outline-none text-gray300 hover:text-gray500 focus:outline-none text-4xl sm:text-2xl"
                          >
                            &#10005;
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <div>
              <GhostButton
                onClick={clearCart}
                extraClass="hidden sm:inline-block"
              >
                {t("clear_cart")}
              </GhostButton>
            </div>
          </div>
          <div className="h-full w-full lg:w-4/12 mt-10 lg:mt-0 text-right">
            <div className="border border-gray500 divide-y-2 divide-gray200 p-6">
              <h2 className="text-xl mb-3">{t("invoice")}</h2>
              <div className="flex justify-between py-2">
                <span>{roundDecimal(subtotal)}</span>
                <span className="uppercase">{t("subtotal")}</span>
              </div>
              <div className="flex justify-between py-3">
                <span> {roundDecimal(subtotal + deliFee)}</span>
                <span>{t("grand_total")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../messages/common/${locale}.json`)).default,
    },
  };
};

export default ShoppingCart;
