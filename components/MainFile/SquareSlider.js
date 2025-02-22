"use client";

import { GiTallBridge } from "react-icons/gi";
import { TfiBlackboard } from "react-icons/tfi";
import { BsFillMotherboardFill } from "react-icons/bs";
import { GiBusStop } from "react-icons/gi";
import { PiTelevisionLight } from "react-icons/pi";
import { BsShop } from "react-icons/bs";
import { RiOilLine } from "react-icons/ri";
import { BiBus } from "react-icons/bi";
import { RiArtboardLine } from "react-icons/ri";
import { BiChalkboard } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SquareSlider = () => {
  const slides = [
    { id: 2, icon: <TfiBlackboard />, title: "بیلبورد" },
    { id: 1, icon: <GiTallBridge />, title: "عرشه پل" },
    { id: 3, icon: <BiChalkboard />, title: "استرابورد" },
    { id: 4, icon: <BsFillMotherboardFill />, title: "لمپوست" },
    { id: 5, icon: <GiBusStop />, title: "ایستگاه اتوبوس" },
    { id: 6, icon: <PiTelevisionLight />, title: "تلویزیون شهری" },
    { id: 7, icon: <BsShop />, title: "کیوسک مطبوعاتی" },
    { id: 9, icon: <BiBus />, title: "بدنه حمل و نقل عمومی" },
    { id: 10, icon: <RiArtboardLine />, title: "بیلبورد سه وجهی" },
    { id: 8, icon: <RiOilLine />, title: "پمپ بنزین" },
  ];

  return (
    <div dir="rtl" className="w-[80%] flex justify-center m-auto relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="w-[100%]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-[200px] h-[200px] flex flex-col items-center justify-center shadow-lg relative m-auto bg-blue-100 rounded-lg">
              <div className="text-blue-800 text-[90px] mb-2">
                {slide.icon}
              </div>
              <h1 className="text-gray-700 text-lg font-semibold">
                {slide.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-next absolute top-1/2 -left-[50px] transform -translate-y-1/2 text-blue-800 text-3xl bg-transparent">
        ❯
      </button>
      <button className="custom-prev absolute top-1/2 -right-[50px] transform -translate-y-1/2 text-blue-800 text-3xl bg-transparent">
        ❮
      </button>
    </div>
  );
};

export default SquareSlider;
