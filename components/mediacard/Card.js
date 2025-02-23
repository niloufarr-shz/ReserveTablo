import React from "react";
import Link from "next/link";
import Image from "next/image";
function Card({ myfilter }) {
  console.log(myfilter)
  return (
    <div className="w-full  flex flex-wrap justify-center">
      {myfilter.map((card) => (
        <Link
          href={`/product/${card.id}`}
          key={card.id}
          className="h-[400px]  overflow-hidden rounded-t-3xl w-96 m-2    bg-blue-200"
        >
          <Image
            className="w-full h-60"
            src={card.avatar}
            width={1500}
            height={1500}
          />

          <div className="flex flex-row-reverse items-center  ">
            <p className="text-right m-3 bg-white rounded-xl p-1">
              {card.province} / {card.city}{" "}
            </p>
            <p className="text-right bg-white rounded-xl p-1">{card.size}</p>
            <p className="text-right bg-white rounded-xl p-1 mr-3">{card.mediatype}</p>
          </div>

          <p className="text-center">{card.address}</p>
          <div className="w-full flex justify-center mt-4 ">
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
