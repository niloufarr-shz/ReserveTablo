"use client";
import React, { useState, useEffect } from "react";
import { OtpInput } from "reactjs-otp-input";
import { IoMdTime } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import api from "../Services/Confgaxios";
import toast, { Toaster } from "react-hot-toast";

function Otpform({ setdisplay, phone }) {
  const router = useRouter();
  const [accessToken, setAccesstoken] = useState();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (inputOtp) => {
    setOtp(inputOtp); // تنظیم OTP در حالت محلی
    if (inputOtp.length === 4) {
      setLoading(true);
      api
        .post(
          "verifycode",
          {
            phoneNumber: phone,
            code: inputOtp,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          const accessToken = res.data.accessToken; // دریافت توکن از پاسخ API

          if (accessToken) {
            // فراخوانی Action setToken با استفاده از توکن دریافتی
            dispatch(setToken(accessToken));
            router.push("/dashboard");
            // ذخیره توکن در حالت محلی (اختیونی)
            setAccesstoken(accessToken);
          } else {
            console.error("Access Token not found in API response:", res.data);
            alert("خطا: توکن دسترسی در پاسخ API وجود ندارد!");
          }
        })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          toast.error("کد وارد شده نا معتبر است");
        });
    }
  };

  const tokenHandler = () => {
    api
      .get("isvalidtoken", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          nonce: Math.round(Math.random() * 8),
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const [count, setCount] = useState(120);

  useEffect(() => {
    console.log(phone);
  }, [setdisplay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        }
        return prevCount;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  const minutes = Math.floor(count / 60);
  const seconds = count % 60;

  return (
    <>
      <Toaster />
      <div
        className={`m-auto ${setdisplay} h-screen w-full flex flex-col items-center bg-blue-50 font-vazir`}
      >
        <div className="mt-20 flex h-[600px] w-[100%] flex-col items-center rounded-t-[50px] bg-primary">
          <div className="mt-11 flex w-[90%] items-start justify-center">
            <h3 className="text-[16px] text-secondary">{`کد تایید به شماره ${phone} ارسال شد`}</h3>
          </div>
          <div className="mt-5 flex w-[90%] justify-center">
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={4}
              inputStyle={{
                width: "40px",
                height: "40px",
                margin: "20px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #CAC4D0",
                backgroundColor: "#fff",
              }}
              focusStyle={{
                border: "3px solid #Adacac",
                outline: "none",
                boxShadow: "0px 5px 12px rgba(173, 172, 172, .6)",
              }}
            />
          </div>

          <div className="min-500:w-[50%] mt-5 flex w-[75%] justify-between">
            <div className="flex w-[40%] items-end">
              <a href="/auth">
                <p className="h-[20px] pl-2 text-[15px] text-[#8BB4FF]">
                  ویرایش شماره{" "}
                </p>
              </a>
            </div>
            <div className="flex w-[60%] flex-row items-center justify-around pr-1">
              <a href="#">
                <p className="h-[20px] text-[15px] text-secondary">
                  {" "}
                  دریافت مجدد کد{" "}
                </p>
              </a>
              <h1 className="h-[20px] text-[#8BB4FF]">
                {" "}
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
              </h1>
              <IoMdTime className="h-[20px] w-[20px] text-secondary" />
            </div>
          </div>
          <div className="mt-14">
            <button
              onClick={tokenHandler}
              className="flex h-[50px] w-[250px] items-center justify-center rounded-[16px] bg-blue-500  "
            >
              <p dir="rtl" className="text-[24px]  text-secondary ">{`${
                loading ? "در حال ورود ..." : "ارسال کد"
              }`}</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otpform;
