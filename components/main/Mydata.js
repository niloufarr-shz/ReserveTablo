"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

import Tablo from "../data/Tablo";
import Link from "next/link";
import Image from "next/image";

function Mydata() {
  const filteredData = Tablo.filter((mamad) => mamad.province === "تهران");
  const lastThree = filteredData.slice(-5);

  return (
    <div className="w-[95%] m-auto">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        freeMode={true}
        grabCursor={true}
        autoplay={false}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          700: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
          1536: { slidesPerView: 5 },
        }}
      >
        {lastThree.map((mamad) => (
          <SwiperSlide key={mamad.id}>
            <Link href={`/product/${mamad.id}`}>
              <div className="flex flex-col items-center">
                <Image
                  src={mamad.avatar}
                  alt=""
                  width={500}
                  height={500}
                  className="mt-2 w-[239px] h-[239px] rounded-lg"
                />
                <p>{mamad.address}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Mydata;
