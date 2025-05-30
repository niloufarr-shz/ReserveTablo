"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TileLayer, useMapEvents } from "react-leaflet";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import toast, { Toaster } from "react-hot-toast";
import { comment } from "postcss";
import Tablo from "../../components/data/Tablo";

function Citylist() {
  const [selectedCity, setSelectedCity] = useState("کرج");
  const [filteredData, setFilteredData] = useState([]);
  const citylistfilter = Tablo.filter((lotus) => lotus.city === selectedCity);
  console.log(citylistfilter);
}

// Dynamic import برای MapContainer
const MapContainerNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

function Datadashbord() {
  const [center, setCenter] = useState([35.8327, 50.9915]);
  const [mapCenter, setMapCenter] = useState(center);
  const [formdata, setFormdata] = useState({
    city: "",
    size: "",
    address: "",
    price: "",
    mediaType: "",
    image: null,
    comment: "",
    toggle: false,
  });

  // مدیریت تغییرات فرم
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  // مدیریت وضعیت Toggle
  const handleToggle = (e) => {
    setFormdata((prev) => ({
      ...prev,
      toggle: e.target.checked,
    }));
  };
  // مدیریت آپلود عکس
  const handleImageUpload = (e) => {
    setFormdata((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // ارسال فرم
  const submitHandler = (e) => {
    e.preventDefault();
    const finalData = {
      city: formdata.city,
      size: formdata.size,
      address: formdata.address,
      price: formdata.price,
      mediaType: formdata.mediaType,
      image: formdata.image,
      mapCenter: mapCenter,
      comment: formdata.comment,
      Toggle: formdata.toggle ? "فعال" : "غیرفعال",
    };

    // چاپ داده‌ها فقط در محیط مرورگر
    if (typeof window !== "undefined") {
      console.log(finalData);
      toast.success("اطلاعات پس از تایید مدیر داخل سایت نمایش داده میشود");
    }
  };

  // ردیابی حرکت نقشه
  function LocationMarker() {
    useMapEvents({
      moveend: (e) => {
        const map = e.target;
        const newCenter = map.getCenter();
        setMapCenter([newCenter.lat, newCenter.lng]);
      },
    });
    return null;
  }
  // تنظیمات مربوط به دکمه تاگل
  const ToggleSwitch = ({ isChecked, onToggle }) => {
    return (
      <label className="relative inline-block w-16 h-8">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={onToggle}
        />
        <span
          className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 ${
            isChecked ? "bg-blue-500" : "bg-gray-300"
          } rounded-full transition duration-400 ease-in-out`}
        >
          <span
            className={`absolute h-6 w-6 left-2 bottom-1 bg-white rounded-full transition duration-400 ease-in-out transform ${
              isChecked ? "translate-x-full" : ""
            }`}
          ></span>
        </span>
      </label>
    );
  };

  return (
    <>
      <Toaster />
      <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          ثبت اطلاعات تابلو
        </h3>

        <form onSubmit={submitHandler} className="w-[50%]">
          <label className="block mt-7 mb-2 text-sm font-medium text-gray-900 ">
            لیست شهرها
          </label>
          <input
            type="text"
            id="city"
            onChange={handleChange}
            value={formdata.city}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="کرج"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            ابعاد
          </label>
          <input
            type="text"
            id="size"
            onChange={handleChange}
            value={formdata.size}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="6x2.5"
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آدرس{" "}
          </label>
          <input
            type="text"
            id="address"
            onChange={handleChange}
            value={formdata.address}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" مثال: خیابان راه آهن، نرسیده به میدان بسیج "
            required
          />

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            قیمت{" "}
          </label>
          <input
            type="text"
            id="price"
            onChange={handleChange}
            value={formdata.price}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" مثال: 25/000/000 میلیون تومان "
            required
          />

          <div className="relative">
            <MapContainerNoSSR
              center={center}
              zoom={17}
              className="w-full h-[300px] relative z-0"
              style={{ height: "300px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker />
            </MapContainerNoSSR>

            {/* پین ثابت در مرکز نقشه */}
            <div
              className="absolute left-1/2 top-[50%] z-10 transform -translate-x-1/2 -translate-y-full pointer-events-none"
              style={{ marginTop: "-20px" }}
            >
              <FaLocationDot size={30} color="red" />
            </div>
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            نوع رسانه{" "}
          </label>
          <input
            type="text"
            id="mediaType"
            onChange={handleChange}
            value={formdata.mediaType}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder=" مثال: استرابورد "
            required
          />
          {/*  دکمه  */}
          <div className="mt-5">
            <span className="ml-5 text-sm text-black">تابلو فعال باشد :</span>
            <ToggleSwitch isChecked={formdata.toggle} onToggle={handleToggle} />
          </div>

          <label className="block mt-4 mb-2 text-sm font-medium text-gray-900">
            آپلود عکس
          </label>
          <input
            type="file"
            id="image_upload"
            onChange={handleImageUpload}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            accept="image/*"
            required
          />

          <div dir="rtl" className="w-[100%] text-sm text-black mt-5 ">
            <span> متن خود را وارد کنید </span>
            <textarea
              placeholder="  متن خود را وارد کنید ... "
              type="text"
              id="comment"
              onChange={handleChange}
              value={formdata.comment}
              className="w-[100%] my-5 h-[150px] rounded mt-5 border  border-gray-300 "
            ></textarea>
          </div>

          <button
            className="bg-blue-700 mt-7 text-white px-4 py-3 rounded-lg"
            type="submit"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </>
  );
}

export default Datadashbord;
