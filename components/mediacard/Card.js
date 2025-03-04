"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
function Card({ myfilter }) {
  console.log(myfilter);
  return (
    <div className="w-full  flex flex-wrap justify-center">
      {myfilter.map((card) => (
        <Link
          href={`/product/${card.id}`}
          key={card.id}
          className="h-[410px]  overflow-hidden rounded-t-3xl w-96 m-2    bg-blue-200"
        >
          <Image
            className="w-full h-56"
            src={card.avatar}
            alt={card.mediatype}
            width={1500}
            height={1500}
          />

          <div className="flex flex-col items-center justify-center  ">
            <div className="flex flex-row items-center justify-center">
              <p className="text-right text-sm p-1 m-3 bg-white rounded-xl ">
                {card.province} / {card.city}{" "}
              </p>
              <p className="text-right bg-white rounded-xl p-1">
                {card.size}
              </p>
              <p className="text-right bg-white rounded-xl p-1 ml-1 mr-3">
                {card.mediatype}
              </p>
            </div>
            <div className="flex flex-row items-center justify-center  ">
              <p className="text-right bg-white rounded-xl p-1 mr-1 ">
                روشنایی: {card.light}
              </p>
              <p className="text-right bg-white rounded-xl p-1 mr-1">
                ارگان: {card.owner}
              </p>
            </div>
          </div>
          <p className="text-center mt-1 ">{card.address}</p>
          <p className="text-center   rounded-xl p-1  ">
            {card.price.toLocaleString("fa-IR")} تومان{" "}
          </p>
          <div className="w-full flex justify-center  ">
            <button className="text-white rounded-lg h-9 w-32 bg-blue-800">
              جزئیات
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Card;
