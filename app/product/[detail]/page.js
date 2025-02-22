"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Tablo from "../../../components/data/Tablo";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
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
    <div dir="rtl" className=" rounded h-[350px] w-[320px] md:w-[400px] md:h-[480px]
     mt-10 md:mt-0 border border-solid border-[#8b8a8a] p-4  ">
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
    console.log("تاریخ شروع:", dateRange[0]?.format("YYYY/MM/DD"));
    console.log("تاریخ پایان:", dateRange[1]?.format("YYYY/MM/DD"));
  };

  return (
    <>
      {detail.map((tablo) => (
        <div
          dir="rtl"
          key={tablo.id}
          className="flex justify-center flex-col md:flex-row  items-center w-[75%]  m-auto mt-20"
        >
          <div className="">
            <Image
              src={tablo.avatar}
              alt="bilboard"
              className="rounded  w-[360px] h-[340px]  md:w-[590px] md:h-[460px] mb-3 "
              height={400}
              width={400}
            />
          </div>
          <div className="flex flex-col w-[100%] md:w-[40%] md:h-[500px]  justify-center items-center">
            <p className="flex   bg-[#aaa] w-[100%]  md:w-[80%] h-[60px]  pr-3  rounded items-center relative">
              <span className="pr-10"> کد تابلو : {tablo.id} </span>
              <ImQrcode className="absolute top-3  text-purple-700 size-6 " />
            </p>
            <p className="flex   bg-[#aaa]  w-[100%]  md:w-[80%] h-[60px] mt-3 pr-3 rounded  items-center relative">
              <span className="pr-10 ml-2"> استان / شهر : </span>
              <GrMapLocation className="absolute top-3  text-purple-700 size-6 " />
              <span className="bg-gray-300 px-3 py-1 rounded ml-2 font-bold">
                {" "}
                {tablo.city}{" "}
              </span>{" "}
              -
              <span className="bg-gray-300 px-3 py-1 rounded mr-2 font-bold">
                {" "}
                {tablo.province}{" "}
              </span>
            </p>
            <p className="flex   bg-[#aaa]  w-[100%]  md:w-[80%] h-[60px] mt-3 pr-3 rounded  items-center relative">
              <span className="pr-10 ml-2 "> نوع رسانه : </span>
              <span className="bg-gray-300 px-3 py-1 rounded mr-2 font-bold">
                {" "}
                {tablo.mediatype}{" "}
              </span>

              <GiFilmProjector className="absolute top-3  text-purple-700 size-6 " />
            </p>
            <p className="flex  bg-[#aaa] w-[100%]  md:w-[80%] h-[60px] mt-3 pr-3 rounded items-center  relative ">
              <span className="pr-10 ml-2 "> ابعاد : </span>
              <span className="pr-3"> {tablo.size} </span>
              <TfiRulerAlt2 className="absolute top-3  text-purple-700 size-6 " />
            </p>
            <p className="flex  bg-[#aaa] w-[100%]  md:w-[80%] h-[60px] mt-3 pr-3 rounded items-center  relative ">
              <span className="pr-10 ml-2 "> قیمت : </span>
              <span className="pr-3"> {tablo.price} </span>
              <GiMoneyStack className="absolute top-3  text-purple-700 size-6 " />
            </p>

            <p className="flex  h-[110px]  bg-[#aaa]  w-[100%]  md:w-[80%] mt-3 pr-3 rounded items-center relative">
              <GiPathDistance className="absolute top-12 text-purple-700 size-6 " />
              <span className="pr-10 ml-2 "> آدرس : </span>
              <span className=""> {tablo.address} </span>
            </p>
          </div>
          <MapComponent
            className="z-10"
            lat={tablo.lat}
            lng={tablo.lng}
            address={tablo.address}
          />
          <br />

          <div className=" w-[320px] h-[400px] md:mr-14  border border-solid md:w-[400px] md:h-[500px] bg-[#aaa] rounded ">
            <div className="persian-date-picker m-auto ">
              <div className="mt-5">
                <label className="flex flex-row justify-center">
                  تاریخ شروع:
                  <input
                    className="w-[50%] rounded mr-2 px-2"
                    readOnly
                    value={dateRange[0]?.format("YYYY/MM/DD") || ""}
                    placeholder="تاریخ  شروع"
                  />
                </label>
              </div>
              <div className="mt-5">
                <label className="flex flex-row justify-center mr-2 ">
                  تاریخ پایان:
                  <input
                    className="w-[51.5%] rounded mr-2 px-2"
                    readOnly
                    value={dateRange[1]?.format("YYYY/MM/DD") || ""}
                    placeholder="تاریخ  پایان"
                  />
                </label>
              </div>

              <div className="flex justify-center mr-5 mt-5 ">
              <DatePicker
                className="fixed left-[-16px] md:h-[290px] h-[230px]  "
                range
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                value={dateRange}
                view= "month"
                open={true}
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
         <div className="flex justify-center  relative md:h-[350px] h-[250px]">
         <button className=" w-[150px] h-[30px] bg-purple-700 absolute bottom-0 text-white rounded mb-3 text-[20px]  mt-5" onClick={handleSubmit}>
              ثبت
            </button>
         </div>

            </div>

           
          </div>
        </div>
      ))}
      <h3 className="flex justify-center mt-10"> بیلبورد های مشابه </h3>
      <div className="flex justify-center mt-10">
        <Swiper
          dir="rtl"
          className="w-[80%]"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
         
        >
          {mytype.map((x) => (
            <SwiperSlide
              key={x.id}
              className="w-[45%]  flex flex-col items-center justify-center m-auto p-0  h-[100px]  "
            >
              <div className="md:w-[200px] md:h-[200px] p-0 w-[150px] h-[150px] flex justify-center m-auto">
                <Image
                  src={x.avatar}
                  alt="safkari"
                  className="rounded mt-5"
                  height={340}
                  width={340}
                />
              </div>
              <div className=" flex justify-center flex-row">
                <button className="border border-solid border-[#aaa] rounded-[20px] mt-2 px-2  ">
                  {x.mediatype}
                </button>
                <button className="border border-solid border-[#aaa] rounded-[20px] mt-2  mr-3 px-2">
                  {x.city}
                </button>
              </div>

              <p className=" mt-1 flex justify-center"> {x.address} </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
