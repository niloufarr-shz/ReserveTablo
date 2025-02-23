"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Tablo from "../../../components/data/Tablo";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../../../components/mediacard/Card";
import "swiper/css";

import { IoLocationSharp } from "react-icons/io5";
import { ImQrcode } from "react-icons/im";
import { GrMapLocation } from "react-icons/gr";
import { GiFilmProjector } from "react-icons/gi";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { GiPathDistance } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";

function MapComponent({ lat, lng, address }) {
  const customIcon = new L.Icon({
    iconUrl: "/img/location.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const MapComponentDynamic = dynamic(
    () => import("../../../components/MapComponent"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    }
  );

  return (
    <div
      dir="rtl"
      className="absolute rounded my-5 md:my-0 h-[350px] w-[75%]  md:w-[260px]  
     md:mt-0 border border-solid border-[#8b8a8a] m-auto -z-50 md:mr-8 lg:h-[400px] lg:mt-10   "
    >
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            {address}
            <IoLocationSharp />
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default function Page({ params }) {
  const detail = Tablo.filter((nil) => nil.id == params.detail);
  const mytype = Tablo.filter(
    (shayan) => shayan.mediatype == detail[0].mediatype
  );

  console.log(mytype);

  const [dateRange, setDateRange] = useState([null, null]);

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleSubmit = () => {
    console.log("تاریخ شروع:", dateRange[0]?.format("YYYY/MM"));
    console.log("تاریخ پایان:", dateRange[1]?.format("YYYY/MM"));
  };

  return (
    <>
      {detail.map((tablo) => (
        <div
          dir="rtl"
          key={tablo.id}
          className="flex justify-center flex-col md:flex-row lg:flex-row  items-center lg:w-[100%] w-[75%]  m-auto mt-20"
        >
          <div className="lg:flex ">
            {/*  عکس بیلبورد   */}
            <div className="w-full">
              <Image
                src={tablo.avatar}
                alt="bilboard"
                className="rounded  w-[360px] h-[350px]   mb-3 lg:h-[400px] lg:w-[650px] lg:mt-10"
                height={400}
                width={400}
              />
            </div>

            {/* پاراگراف ها  */}
            <div className="flex flex-col w-full  md:h-[400px] lg:mx-20  justify-center items-center md:mt-10">
              <p className="flex   bg-blue-100 w-[100%]   lg:w-[80%] h-[70px]  pr-3  rounded items-center relative">
                <span className="pr-10"> کد تابلو : {tablo.id} </span>
                <ImQrcode className="absolute top-3  text-blue-800 size-6 " />
              </p>
              <p className="flex   bg-blue-100  w-[100%]  lg:w-[80%] h-[70px] mt-3 pr-3 rounded  items-center relative">
                <span className="pr-10 md:pr-0 ml-2 md:mr-8 ">
                  {" "}
                  استان / شهر :{" "}
                </span>
                <GrMapLocation className="absolute top-3  text-blue-800 size-6 " />
                <span className="bg-gray-100 px-1 py-1 rounded ml-1 font-bold text-[14px]">
                  {" "}
                  {tablo.city}{" "}
                </span>{" "}
                -
                <span className="bg-gray-100 px-3 py-1 rounded mr-1 font-bold text-[14px]">
                  {" "}
                  {tablo.province}{" "}
                </span>
              </p>
              <p className="flex   bg-blue-100  w-[100%]  lg:w-[80%] h-[70px] mt-3 pr-3 rounded  items-center relative">
                <span className="pr-10 ml-2 "> نوع رسانه : </span>
                <span className="bg-gray-100 px-3 py-1 rounded mr-2 font-bold text-[14px]">
                  {" "}
                  {tablo.mediatype}{" "}
                </span>

                <GiFilmProjector className="absolute top-3  text-blue-800 size-6 " />
              </p>
              <p className="flex  bg-blue-100 w-[100%]  lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center  relative ">
                <span className="pr-10 ml-2 "> ابعاد : </span>
                <span className="pr-3"> {tablo.size} </span>
                <TfiRulerAlt2 className="absolute top-3  text-blue-800 size-6 " />
              </p>
              <p className="flex  bg-blue-100 w-[100%]  lg:w-[80%] h-[70px] mt-3 pr-3 rounded items-center  relative ">
                <span className="pr-10 ml-2 "> قیمت : </span>
                <span className=""> {tablo.price} </span>
                <GiMoneyStack className="absolute top-3  text-blue-800 size-6 " />
              </p>

              <p className="flex  h-[110px]  bg-blue-100  w-[100%]  lg:w-[80%] mt-3 pr-3 rounded items-center relative">
                <GiPathDistance className="absolute top-12 text-blue-800 size-6 " />
                <span className="pr-10 ml-2 "> آدرس: </span>
                <span className=""> {tablo.address} </span>
              </p>
            </div>

            <div className="flex w-[100%] lg:h-[450px] h-[300px]  ">
              {/*   نقشه  */}
              <MapComponent
                className="z-10 md:w-[100%]"
                lat={tablo.lat}
                lng={tablo.lng}
                address={tablo.address}
              />
            </div>
          </div>





















          <div className="w-[70%] justify-center flex h-[350px] md:mr-5 lg:mr-14  border border-solid  md:h-[300px] bg-blue-100 rounded">
              <label className="justify-center ml-3">رزرو کنید :</label>
              <DatePicker
                className=" fixed md:h-[290px] h-[230px]"
                range
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM"
                value={dateRange}
                view="month"
                onlyMonthPicker={true}
                placeholder=" رزرو کنید  "
                onChange={handleDateChange}
                minDate={new DateObject({ calendar: persian }).set({
                  day: 1,
                  month: 1,
                })}
                maxDate={new DateObject({ calendar: persian }).set({
                  day: 31,
                  month: 24,
                })}
              />
            </div>
            <div className="flex justify-center relative md:h-[350px] h-[300px]">
              <button
                className="w-[150px] h-[30px] bg-blue-800 absolute bottom-0 text-white rounded mb-3 text-[20px] mt-5"
                onClick={handleSubmit}
              >
                ثبت
              </button>
            </div>




        </div>
      ))}

      {/*   تقویم   */}
     

      <h3 className="flex justify-center mt-10"> بیلبورد های مشابه </h3>

      {/*   سوییپر    */}
      <div className="flex bg-slate-400 justify-center my-10 ">
        <Swiper
          dir="rtl"
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            920: {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }}
        >
          {mytype.map((x) => (
            <SwiperSlide className="w-full" key={x.id}>
              <Card myfilter={[x]} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
