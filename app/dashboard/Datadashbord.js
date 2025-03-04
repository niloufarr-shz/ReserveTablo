"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { TileLayer, useMapEvents } from "react-leaflet";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import toast, { Toaster } from "react-hot-toast";

// Dynamic import برای MapContainer
const MapContainerNoSSR = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });

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
  });

  // مدیریت تغییرات فرم
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [id]: value,
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
    };

    // چاپ داده‌ها فقط در محیط مرورگر
    if (typeof window !== "undefined") {
      console.log(finalData);
      toast.success("اطلاعات پس از تایید مدیر داخل سایت نمایش داده میشود")
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

  return (
    <>
    <Toaster/>
    <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full">
      <h3 className="text-lg font-bold text-gray-900 mb-2">ثبت اطلاعات تابلو</h3>

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

        <button className="bg-blue-700 mt-7 text-white px-4 py-3 rounded-lg" type="submit">
          ثبت اطلاعات
        </button>
      </form>
    </div>
    </>
  );
}

export default Datadashbord;