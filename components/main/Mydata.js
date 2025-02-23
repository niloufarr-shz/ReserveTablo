"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";
import Image from "next/image";

function Mydata({ filteredData }) {
  return (
    <div className="w-[95%]  m-auto mb-10 ">
      {filteredData.length === 0 ? (
        <div className="w-[350px] h-[70px] m-auto mt-5 ">
          <p className="text-center text-[24px] border text-red-700 border-black ">
            موردی یافت نشد
          </p>
        </div>
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          freeMode={true}
          grabCursor={true}
          autoplay={false}
          breakpoints={{
            320: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            700: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
            1536: { slidesPerView: 5 },
          }}
        >
          {filteredData.map((mamad) => (
            <SwiperSlide key={mamad.id}>
              <Link href={`/product/${mamad.id}`}>
                <div className="flex flex-col items-center">
                  <Image
                    src={mamad.avatar}
                    alt={mamad.mediatype}
                    width={500}
                    height={500}
                    className="mt-2 w-[239px] h-[239px] rounded-md"
                  />

                  <p className="px-2">{mamad.address}</p>

                  <div className="flex justify-between w-[230px]  ">
                    <div className="border  border-slate-700  rounded-md ">
                      <p>{mamad.mediatype}</p>
                    </div>
                    <div className="border border-slate-700  rounded-md ">
                      <p>{mamad.city}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default Mydata;
