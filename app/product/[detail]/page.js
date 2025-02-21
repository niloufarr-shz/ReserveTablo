"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Tablo from "@/components/data/Tablo";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoLocationSharp } from "react-icons/io5";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import addDays from "date-fns/addDays";
import "react-datepicker/dist/react-datepicker.css";

const BookingCalendar = () => {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = (data) => {
    console.log(data);
    // اینجا می‌توانید داده‌ها را به سرور ارسال کنید
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>تاریخ رزرو:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date()}
          maxDate={addDays(new Date(), 30)} // حداکثر 30 روز آینده
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="MMMM d, yyyy h:mm aa"
          {...register("reservationDate", { required: true })}
        />
      </div>
      <button type="submit">رزرو</button>
    </form>
  );
};

function MapComponent({ lat, lng, address }) {
  // تعریف آیکون سفارشی
  const customIcon = new L.Icon({
    iconUrl: "/img/location.png", // آدرس تصویر آیکون خود را اینجا قرار دهید
    iconSize: [41, 41], // اندازه آیکون
    iconAnchor: [12, 41], // نقطه‌ای که آیکون روی آن قرار می‌گیرد
    popupAnchor: [1, -34], // نقطه‌ای که پاپ آپ نسبت به آیکون قرار می‌گیرد
  });

  const MapComponentDynamic = dynamic(
    () => import("@/components/MapComponent"),
    {
      ssr: false,
      loading: () => <p>Loading Map...</p>,
    }
  );

  return (
    <div dir="rtl" className="mt-5 rounded h-[350px] w-[350px] md:h-[415px]">
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

  return (
    <>
      {detail.map((tablo) => (
        <div
          dir="rtl"
          key={tablo.id}
          className="flex justify-center flex-col md:flex-row  items-center w-[80%] md:w-[60%] m-auto mt-20"
        >
          <div className="md:">
            <Image
              src={tablo.avatar}
              alt="safkari"
              className="rounded mt-5 w-[340px] h-[340px]  md:w-[430px] md:h-[410px] "
              height={340}
              width={340}
            />
          </div>
          <div className="flex flex-col w-[100%] md:w-[40%] md:h-[50%]  justify-center items-center">
            <p className="flex   bg-[#E7E7E7] w-[100%]  md:w-[80%] h-[50px]  pr-3  rounded items-center ">
              کد تابلو : {tablo.id}
            </p>
            <p className="flex   bg-[#E7E7E7]  w-[100%]  md:w-[80%] h-[50px] mt-3 pr-3 rounded  items-center">
              استان / شهر :<span> {tablo.city} </span> -
              <span> {tablo.province} </span>
            </p>
            <p className="flex   bg-[#E7E7E7]  w-[100%]  md:w-[80%] h-[50px] mt-3 pr-3 rounded  items-center">
              نوع رسانه :{tablo.mediatype}
            </p>
            <p className="flex  bg-[#E7E7E7] w-[100%]  md:w-[80%] h-[50px] mt-3 pr-3 rounded items-center">
              نوع رسانه :{tablo.size}
            </p>
            <p className="flex  h-[150px]  bg-[#E7E7E7]  w-[100%]  md:w-[80%] mt-3 pr-3 rounded items-center">
              آدرس :{tablo.address}
            </p>
          </div>
          <MapComponent
            className=" "
            lat={tablo.lat}
            lng={tablo.lng}
            address={tablo.address}
          />
          <br />
        </div>
      ))}
      <h3 className="flex justify-center"> بیلبورد های مشابه </h3>
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
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {mytype.map((x) => (
            <SwiperSlide
              key={x.id}
              className="w-[95%]  flex flex-col items-center justify-center m-auto p-4  h-[100px]  "
            >
              <div className="md:w-[200px] md:h-[200px]  flex justify-center m-auto">
                <Image
                  src={x.avatar}
                  alt="safkari"
                  className="rounded mt-5"
                  height={340}
                  width={340}
                />
              </div>
              <div className=" flex justify-center flex-row">
                <button className="border border-solid border-[#aaa] rounded-[20px] mt-2  ">
                  {x.mediatype}
                </button>
                <button className="border border-solid border-[#aaa] rounded-[20px] mt-2  mr-3">
                  {x.city}
                </button>
              </div>

              <p className=" mt-1 flex justify-center"> {x.address} </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <BookingCalendar />
      </div>
    </>
  );
}
