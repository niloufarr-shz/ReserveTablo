"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "../Services/Confgaxios";
import toast, { Toaster } from "react-hot-toast";
import Otpform from "./Otpform";

function Phoneforme() {
  const [phone, setPhone] = useState("");
  const [regtest, setRegtest] = useState(false);
  const [zeronine, setZeronine] = useState(false);
  const [display, setDisplay] = useState(true);
  const [loader, setLoader] = useState(false);

  const regex = /^09\d{9}$/g;
  const zero = /^(?!09)/;

  useEffect(() => {
    setRegtest(regex.test(phone));
    if (phone === "" || phone === "0") {
      setZeronine(false);
    } else {
      setZeronine(zero.test(phone));
    }
  }, [phone]);

  const submitHandler = (event) => {
    event.preventDefault();

    setLoader(true);
    api
      .get(`getNumberAndSnedSms?phoneNumber=${phone}`)
      .then((res) =>
        res.status == 200
          ? toast.success("پیام با موفقیت ارسال شد") && setDisplay(false)
          : toast.error("خطا در ارسال کد لطفا دوباره امتحان کنید")
      )
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Toaster />
      <Otpform setdisplay={`${display ? "hidden" : "flex"}`} />
      <div
        className={`m-auto w-full ${
          display ? "flex" : "hidden"
        } flex-col items-center  bg-blue-50 font-vazir`}
      > 
        <div className="flex h-screen w-full flex-col items-center">
          <div className="flex h-[50vh] w-full flex-col items-center rounded-tl-[50px] rounded-tr-[50px] bg-primary">
            <p className="mt-[40px] h-[56px] text-[24px] font-normal leading-[20px]">
              لطفا شماره همراه خود را وارد کنید
            </p>

            <form
              className="w-full m-auto flex justify-center items-center flex-col"
              onSubmit={submitHandler}
            >
              <input
                inputMode="numeric"
                placeholder="09123456789"
                className="bg-gray-50 fo mt-5 h-[56px] sm:w-[40%] w-[70%] rounded-[11px] px-4 [-moz-appearance:_textfield] focus:bg-[#fff] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                type="text"
                value={phone}
                maxLength="11"
                onChange={(e) => setPhone(e.target.value)}
              ></input>
              <p
                className={`mt-3 h-[20px] text-red-800 transition-opacity ${
                  zeronine ? "opacity-100" : "opacity-0"
                }`}
              >
                شماره تلفن باید با 09 شروع شود
              </p>

              <button
                className={`text-gray flex justify-center items-center  mt-[70px] h-[50px] sm:w-[20%] w-[40%] rounded-[16px] text-[24px] font-normal ${
                  regtest ? "bg-blue-500" : "bg-blue-200"
                }`}
                type="submit"
                disabled={!regtest}
              >
                <div
                  className={`size-8 mr-3 ${
                    loader ? "block" : "hidden"
                  }  rounded-full border-4 border-secondary text-secondary border-r-bg animate-spin`}
                ></div>

                <p> ارسال کد</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phoneforme;
