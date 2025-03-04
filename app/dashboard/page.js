"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import برای غیرفعال کردن SSR برای کامپوننت نقشه
const DatadashbordNoSSR = dynamic(() => import("./Datadashbord"), { ssr: false });

function Page() {
  const [center, setCenter] = useState([35.8327, 50.9915]);
  const [event, setEvent] = useState("create");

  // مدیریت localStorage و location فقط در محیط مرورگر
  const exitHandler = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
  };

  return (
    <>
      <div dir="rtl" className="md:flex mt-20 w-full">
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 md:me-4 mb-4 md:mb-0">
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event === "create"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              aria-current="page"
              onClick={() => setEvent("create")}
            >
              ثبت تابلو
            </button>
          </li>
          <li>
            <button
              onClick={() => setEvent("list")}
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event === "list"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
            >
              لیست تابلوها
            </button>
          </li>
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event === "reseve"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              onClick={() => setEvent("reseve")}
            >
              رزرو شده
            </button>
          </li>
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event === "accept"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              onClick={() => setEvent("accept")}
            >
              تایید شده
            </button>
          </li>
          <li>
            <button
              onClick={exitHandler}
              className="inline-flex cursor-pointer items-center px-4 py-3 text-red-400 rounded-lg bg-gray-50 w-full"
            >
              خروج
            </button>
          </li>
        </ul>

        {/* نمایش کامپوننت Datadashbord فقط در حالت "create" */}
        {event === "create" && <DatadashbordNoSSR />}
      </div>
    </>
  );
}

export default Page;