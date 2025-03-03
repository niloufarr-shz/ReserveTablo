"use client";

import { useState } from "react";

import { FaPhone } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";



function CallUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col md:flex-row justify-center px-5 pb-10"
    >
      <div className="w-full sm:w-[50%] h-[100%] md:w-[70%] lg:w-[50%] overflow-hidden flex flex-col rounded items-center md:items-start justify-around bg-blue-300">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="sm:flex sm:flex-row sm:w-[40%]">
            <div className="flex flex-row w-full mt-5">
              <label className="md:w-[120px] text-center">نام:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="rounded w-[60%] md:w-[100px] lg:w-[250px] h-[30px] mr-[68px] md:mr-[15px] lg:mr-[55px]"
              />
            </div>
            <div className="flex flex-row w-full mt-5 md:mr-5">
              <label className="lg:w-[140px] text-center">نام خانوادگی:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="rounded w-[60%] md:w-[100px] lg:w-[200px] h-[30px] lg:mr-4 mr-[10px] md:mr-[15px]"
              />
            </div>
          </div>
          <div className="sm:flex sm:flex-row sm:w-[40%]">
            <div className="flex flex-row w-full mt-5">
              <label className="md:w-[120px] text-center">آدرس:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="rounded w-[60%] md:w-[100px] lg:w-[250px] h-[30px] mr-[55px] md:mr-0 lg:mr-[55px]"
              />
            </div>
            <div className="flex flex-row w-full mt-5">
              <label className="md:w-[120px] text-center md:mr-10">
                ایمیل:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded w-[60%] md:w-[100px] lg:w-[250px] h-[30px] mr-14 md:mr-5 lg:mr-10"
              />
            </div>
          </div>
          <div className="w-[100%] flex justify-center md:w-[81%] md:mr-16">
            <textarea
              placeholder="متن خود را وارد کنید"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-[80%] my-5 h-[150px] rounded"
            ></textarea>
          </div>
          <div className="flex justify-center w-full p-3">
            <button
              type="submit"
              className="bg-blue-800 w-[150px] h-[30px] text-white rounded"
            >
              ثبت
            </button>
          </div>
        </form>
      </div>

      <div className="md:mr-10 mt-10">
        <ul>
          <li className="mb-10 bg-blue-200 items-center p-2 rounded flex">
            <span className="bg-blue-600 w-[50px] h-[50px] flex justify-center items-center rounded-[50%] ml-5">
              <FaPhone className="w-[25px] h-[25px]" />
            </span>
            <span>تلفن تماس:</span>
            <span>0992068721</span>
          </li>
          <li className="mb-10 bg-blue-200 items-center p-2 rounded flex">
            <span className="bg-blue-600 w-[50px] h-[50px] flex justify-center items-center rounded-[50%] ml-5">
              <IoLocationSharp className="w-[40px] h-[40px]" />
            </span>
            <span>آدرس:</span>
            <span>البرز - کرج - عظیمیه</span>
          </li>
          <li className="bg-blue-200 items-center p-2 rounded flex">
            <span className="bg-blue-600 w-[50px] h-[50px] flex justify-center items-center rounded-[50%] ml-5">
              <TfiEmail className="w-[25px] h-[25px]" />
            </span>
            <span>ایمیل:</span>
            <span>ensafanTablo@gmal.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CallUs;
