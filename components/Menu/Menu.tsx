import {Fragment, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";

import MenuIcon from "../../public/icons/MenuIcon";
import {useAuth} from "../../context/AuthContext";
import BagIcon from "../../public/icons/BagIcon";
import Button from "../Buttons/Button";
import {removeCookies} from "cookies-next";
import LeftArrow from "../../public/icons/LeftArrow";
import Switch from "../Switch/Switch";
import useFetch from "../../hooks/useFetch";
import {ApiRoutes} from "../../enums/ApiRoutes";

export default function Menu() {
  const t = useTranslations("Navigation");
  const router = useRouter();
  const {asPath, locale} = router;
  const {user,updateUser} = useAuth();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const {request}=useFetch()

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(false);
    router.push(`/search?q=${searchValue}`);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue((e.target as HTMLInputElement).value);
  };

  const logoutHandler = () => {
    removeCookies("user")
    removeCookies("cart")
    router.push("/")
  }

  const changeWageHandler = () =>{
    request({
      method:"PATCH",
      url:ApiRoutes.UPDATE_WAGE_VISIBILITY,
      data:{
        wageIsActive:!user?.showWage
      }
    }).then(res=>{
      updateUser && updateUser("showWage",!user?.showWage)
    })
  }


  return (
      <>
        <div className="relative text-right">
          <button
              type="button"
              aria-label="Hamburger Menu"
              onClick={openModal}
              className="focus:outline-none transform rotate-180"
          >
            <MenuIcon/>
          </button>
        </div>
        <Transition show={open} as={Fragment}>
          <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              style={{zIndex: 99999}}
              static
              open={open}
              onClose={closeModal}
          >
            <div className="min-h-screen">
              <Transition.Child as={Fragment}>
                <Dialog.Overlay className="fixed inset-0 bg-gray500 opacity-50"/>
              </Transition.Child>
              <Transition.Child
                  as={Fragment}
                  enter="ease-linear duration-600"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-linear duration-150"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
              >
                <div
                    style={{height: "100vh"}}
                    className="relative opacity-95 overflow-y-auto inline-block dur h-screen w-full max-w-md overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl"
                >
                  <div className="flex justify-between items-center p-6 pb-0">
                    <Link href="/">
                      <a>
                        <Image
                            className="justify-center"
                            src="/logo/tiara-logo.png"
                            alt="Picture of the author"
                            width={120}
                            height={35}
                        />
                      </a>
                    </Link>
                    <button
                        type="button"
                        className="outline-none focus:outline-none text-2xl "
                        onClick={closeModal}
                    >
                      &#10005;
                    </button>
                  </div>

                  <div className="mb-10 mt-4">
                    <div className="itemContainer px-6 w-full flex flex-col justify-around items-center ">
                      <Link href="/">
                        <a
                            className="w-full hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("home")}
                        </a>
                      </Link>
                      <Link href="ring">
                        <a
                            className="w-full hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("ring")}
                        </a>
                      </Link>
                      <Link href="bracelet">
                        <a
                            className="w-full hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("bracelet")}
                        </a>
                      </Link>
                      <Link href="earrings">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("earrings")}
                        </a>
                      </Link>
                      <Link href="clothing">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("clothing")}
                        </a>
                      </Link>
                      <Link href="gold-se">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("service")}
                        </a>
                      </Link>
                      <Link href="half-gold-set">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("half-gold-set")}
                        </a>
                      </Link>
                      <Link href="ankle-bracelet">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("ankle-bracelet")}
                        </a>
                      </Link>
                      <Link href="chain">
                        <a
                            className="w-full  hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("chain")}
                        </a>
                      </Link>
                      <Link href="bangle">
                        <a
                            className="w-full hover:bg-gray100 text-right py-2"
                            onClick={closeModal}
                        >
                          {t("bangle")}
                        </a>
                      </Link>
                      <hr className="border border-gray300 w-full mt-2"/>
                      <div className="flex items-center justify-between gap-8 py-3">
                        <div className="text-right">
                          <div className="text-black">نمایش اجرت</div>
                          <div className="text-gray-500 text-sm">با فعالسازی میزان اجرت نمایش داده می شود</div>
                        </div>
                         <Switch handleChange={changeWageHandler} isChecked={user?.showWage as boolean} />
                      </div>
                      <hr className="border border-gray300 w-full mt-2"/>
                      <div className="w-full flex justify-start gap-4 mt-4 items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="text-lg font-bold text-right">{user?.fullname}</div>
                      </div>
                      <Link href="/orders">
                        <a className=" py-2 mt-4  w-full flex justify-between">
                          <span>{t("orders")}</span>
                          <div className="relative"><LeftArrow/></div>
                        </a>
                      </Link>
                      <Link href="/shopping-cart">
                        <a className=" py-2  w-full flex justify-between">
                          <span>{t("shopping-cart")}</span>
                          <div className="relative"><LeftArrow/></div>
                        </a>
                      </Link>
                      <div className="mt-8 w-full">
                        <Button value={t("logout")} extraClass="w-full" onClick={logoutHandler} size="lg"/>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
  );
}


{/*<form*/
}
{/*  className="flex w-full justify-between items-center mt-5 mb-5 border-gray300 border-b-2"*/
}
{/*  onSubmit={handleSubmit}*/
}
{/*>*/
}
{/*  <SearchIcon extraClass="text-gray300 w-6 h-6" />*/
}
{/*  <input*/
}
{/*    type="search"*/
}
{/*    placeholder={t("search_anything")}*/
}
{/*    className="px-4 py-2 w-full focus:outline-none text-xl"*/
}
{/*    onChange={handleChange}*/
}
{/*  />*/
}
{/*</form>*/
}

{/* Locale Dropdown */
}
{/*<HMenu*/
}
{/*  as="div"*/
}
{/*  className="relative bg-gray100 mt-4 mb-2 w-full"*/
}
{/*>*/
}
{/*  <HMenu.Button*/
}
{/*    as="a"*/
}
{/*    href="#"*/
}
{/*    className="flex justify-center items-center py-2 px-4 text-center"*/
}
{/*  >*/
}
{/*    {locale === "en" ? t("english") : t("myanmar")}{" "}*/
}
{/*    <DownArrow />*/
}
{/*  </HMenu.Button>*/
}
{/*  <HMenu.Items*/
}
{/*    className="flex flex-col w-full right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"*/
}
{/*    style={{ zIndex: 9999 }}*/
}
{/*  >*/
}
{/*    <HMenu.Item>*/
}
{/*      <Link href={asPath} locale="en">*/
}
{/*        <a*/
}
{/*          className={`${*/
}
{/*            locale === "en"*/
}
{/*              ? "bg-gray200 text-gray500"*/
}
{/*              : "bg-white text-gray500"*/
}
{/*          } py-2 px-4 text-center focus:outline-none`}*/
}
{/*        >*/
}
{/*          {t("english")}*/
}
{/*        </a>*/
}
{/*      </Link>*/
}
{/*    </HMenu.Item>*/
}
{/*    <HMenu.Item>*/
}
{/*      <Link href={asPath} locale="my">*/
}
{/*        <a*/
}
{/*          className={`${*/
}
{/*            locale === "my"*/
}
{/*              ? "bg-gray200 text-gray500"*/
}
{/*              : "bg-white text-gray500"*/
}
{/*          } py-2 px-4 text-center focus:outline-none`}*/
}
{/*        >*/
}
{/*          {t("myanmar")}*/
}
{/*        </a>*/
}
{/*      </Link>*/
}
{/*    </HMenu.Item>*/
}
{/*  </HMenu.Items>*/
}
{/*</HMenu>*/
}

{/*/!* Currency Dropdown *!/*/
}
{/*<HMenu as="div" className="relative bg-gray100 my-2 w-full">*/
}
{/*  <HMenu.Button*/
}
{/*    as="a"*/
}
{/*    href="#"*/
}
{/*    className="flex justify-center items-center py-2 px-4 text-center"*/
}
{/*  >*/
}
{/*    {t("usd")} <DownArrow />*/
}
{/*  </HMenu.Button>*/
}
{/*  <HMenu.Items*/
}
{/*    className="flex flex-col w-full right-0 absolute p-1 border border-gray200 bg-white mt-2 outline-none"*/
}
{/*    style={{ zIndex: 9999 }}*/
}
{/*  >*/
}
{/*    <HMenu.Item>*/
}
{/*      {({ active }) => (*/
}
{/*        <a*/
}
{/*          href="#"*/
}
{/*          className={`${*/
}
{/*            active*/
}
{/*              ? "bg-gray100 text-gray500"*/
}
{/*              : "bg-white text-gray500"*/
}
{/*          } py-2 px-4 text-center focus:outline-none`}*/
}
{/*        >*/
}
{/*          {t("usd")}*/
}
{/*        </a>*/
}
{/*      )}*/
}
{/*    </HMenu.Item>*/
}
{/*    <HMenu.Item>*/
}
{/*      {({ active }) => (*/
}
{/*        <a*/
}
{/*          href="#"*/
}
{/*          className={`${*/
}
{/*            active*/
}
{/*              ? "bg-gray100 text-gray500"*/
}
{/*              : "bg-white text-gray500"*/
}
{/*          } py-2 px-4 text-center focus:outline-none`}*/
}
{/*        >*/
}
{/*          {t("mmk")}*/
}
{/*        </a>*/
}
{/*      )}*/
}
{/*    </HMenu.Item>*/
}
{/*  </HMenu.Items>*/
}
{/*</HMenu>*/
}

{/*<div className="flex my-10 w-2/5 space-x-6 justify-center">*/
}
{/*  <a*/
}
{/*    href="#"*/
}
{/*    className="text-gray400 w-10 h-10 py-1 px-auto flex justify-center rounded-md active:bg-gray300"*/
}
{/*    aria-label="Haru Fashion Facebook Page"*/
}
{/*  >*/
}
{/*    <FacebookLogo extraClass="h-8" />*/
}
{/*  </a>*/
}
{/*  <a*/
}
{/*    href="#"*/
}
{/*    className="text-gray400 w-10 h-10 py-1 px-auto flex justify-center rounded-md active:bg-gray300"*/
}
{/*    aria-label="Haru Fashion Facebook Page"*/
}
{/*  >*/
}
{/*    <InstagramLogo extraClass="h-8" />*/
}
{/*  </a>*/
}
{/*</div>*/
}
