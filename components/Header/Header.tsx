import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import TopNav from "./TopNav";
import CartItem from "../CartItem/CartItem";
import Menu from "../Menu/Menu";
import AppHeader from "./AppHeader";

import styles from "./Header.module.css";

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState<boolean>(true);
  const [didMount, setDidMount] = useState<boolean>(false);


  // const handleScroll = useCallback(() => {
  //   const offset = window.scrollY;
  //   if (offset > 30) {
  //     setScrolled(true);
  //   } else {
  //     setScrolled(false);
  //   }
  // }, [setScrolled]);

  useEffect(() => {
    setDidMount(true);
    // window.addEventListener("scroll", handleScroll);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }
  return (
    <>
      <AppHeader title={title} />

      {/*<a*/}
      {/*  href="#main-content"*/}
      {/*  className="whitespace-nowrap absolute z-50 left-4 opacity-90 rounded-md bg-white px-4 py-3 transform -translate-y-40 focus:translate-y-0 transition-all duration-300"*/}
      {/*>*/}
      {/*  {t("skip_to_main_content")}*/}
      {/*</a>*/}

      {/*<TopNav />*/}

      <nav
        className={`${
          scrolled ? "bg-white sticky top-0 shadow-md z-50" : "bg-transparent"
        } w-full z-50  relative`}
      >
        <div className="app-max-width w-full">
          <div
            className={`flex flex-row-reverse justify-between items-center app-x-padding ${styles.mainMenu}`}
          >
            <div className="flex-1  lg:flex-0 lg:hidden">
              <Menu />
            </div>

            <div className="flex-1 flex justify-center lg:justify-end items-center cursor-pointer">
              <div className="w-32 h-auto">
                <Link href="/">
                  <a>
                    <Image
                      className="justify-center"
                      src="/logo/tiara-logo.png"
                      alt="Picture of the author"
                      width={947}
                      height={236}
                      layout="responsive"
                    />
                  </a>
                </Link>
              </div>
            </div>

            <ul className={`flex-1 flex justify-end ${styles.rightMenu}`}>
              <li className='ml-0 mr-auto'>
                <CartItem />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
