"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Tablo from "../data/Tablo"
import Card from "../mediacard/Card";

function Searchdata({ filteredData }) {
  return (
    <>
      <div className="w-[95%] m-auto  ">
      <h2 className="text-right">جستجو</h2>
     {filteredData.length === 0 ? (
        <div className="w-[350px] h-[70px] m-auto mt-5 ">
          <p className="text-center text-[24px] border border-black ">
            موردی یافت نشد
          </p>
        </div>
      ) : (
        <Swiper
          className="w-full "
          spaceBetween={10}
          slidesPerView={1}
          freeMode={true}
          grabCursor={true}
          autoplay={false}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            700: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 3 },
            1536: { slidesPerView: 3 },
          }}
        >
          {filteredData.map((mamad) => (
            <SwiperSlide className="" key={mamad.id}>
              <Card myfilter={[mamad]} />
            </SwiperSlide>
          ))}
        </Swiper>
      )} 


    </div></>
  )
}

export default Searchdata