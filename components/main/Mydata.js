"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import Tablo from "../data/Tablo";
import Card from "../mediacard/Card";

function Mydata({ filteredData, filterPrice }) {
  
  const getRandomItems = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomTablo = getRandomItems(Tablo, 8);
  console.log("filterPrice:", filterPrice);

  return (
    <div className="w-[95%] m-auto  ">
      <div className="w-full flex flex-row-reverse items-center justify-around">
        <h2 className="text-right w-[40%] sm:w-[15%] md:w-[20%] 2xl:w-[12%]  ">
          پیشنهادی های این ماه
        </h2>
        <hr className="border-slate-600 w-[50%] sm:w-[85%] md:w-[77%] 2xl:w-[88%] h-[1px]" />
      </div>
      {/* {filteredData.length === 0 ? (
        <div className="w-[350px] h-[70px] m-auto mt-5 ">
          <p className="text-center text-[24px] border text-red-700 border-black ">
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
            <SwiperSlide className="bg-red-200" key={mamad.id}>
              <Card myfilter={[mamad]} />
            </SwiperSlide>
          ))}
        </Swiper>
      )} */}

      <Card myfilter={randomTablo} />

      <Card
        myfilter={filterPrice && Array.isArray(filterPrice) ? filterPrice : []}
      />
    </div>
  );
}

export default Mydata;
