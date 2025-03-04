"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function Header() {
  const [buttonText, setButtonText] = useState("ورود و ثبت نام");

  useEffect(() => {
  // localStorage.setItem("token", "niloofar");
    const token = localStorage.getItem("accessToken");
    if (token) {
      setButtonText("داشبورد");
    } else {
      setButtonText("ورود و ثبت نام");
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-blue-200 h-[70px] flex justify-around flex-row-reverse items-center">
      <Link href="/">
        <Image src="/img/logo.png" height={50} width={50} alt="" />
      </Link>

      <ul className="sm:flex hidden justify-around flex-row-reverse w-[500px]">
        <Link href="/">
          <li>صفحه اصلی</li>
        </Link>

        <Link href="/product">
          <li>همه محصولات</li>
        </Link>

        <Link href="/callus">
          <li>تماس با ما</li>
        </Link>

        <Link href="/about">
          <li>درباره ما</li>
        </Link>
      </ul>

      <Link
        href={buttonText === "داشبورد" ? "/dashboard" : "/auth"}
        className="bg-blue-600 px-3 py-2 text-blue-100 rounded-lg"
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default Header;
