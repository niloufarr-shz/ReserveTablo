"use client";
import { useState } from "react";
import Mydata from "../main/Mydata";
import Tablo from "../data/Tablo";
function SelectCity() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMediaType, setSelectedMediaType] = useState("");
  const [filteredData, setFilteredData] = useState(Tablo);
  function handleCityChange(e) {
    setSelectedCity(e.target.value);
  }
  function handleMediaChange(e) {
    setSelectedMediaType(e.target.value);
  }

  return (
    <div dir="rtl">
      <div className=" flex flex-col  w-[95%] h-[264px] bg-slate-300 m-auto ">
        <div className="  flex flex-col items-center justify-around w-[100%] h-[264px] ">
          <label className=" pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب شهر
          </label>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Array.from(new Set(Tablo.map((mamad) => mamad.city))).map(
              (uniqueCity) => (
                <option value={uniqueCity} key={uniqueCity}>
                  {uniqueCity}
                </option>
              )
            )}
          </select>
          <label className=" pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب رسانه
          </label>
          <select
            value={selectedMediaType}
            onChange={handleMediaChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Array.from(new Set(Tablo.map((mamad) => mamad.mediatype))).map(
              (uniqueMediatype) => (
                <option key={uniqueMediatype} value={uniqueMediatype}>
                  {uniqueMediatype}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      <Mydata
        selectedCity={selectedCity}
        selectedMediaType={selectedMediaType}
      />
    </div>
  );
}

export default SelectCity;
