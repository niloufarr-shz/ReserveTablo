"use client";
import { useState } from "react";
import Mydata from "../main/Mydata";
import Tablo from "../data/Tablo";
import Searchdata from "../main/Searchdata";
function SelectCity() {
  const [selectedCity, setSelectedCity] = useState("کرج");
  const [selectedMediaType, setSelectedMediaType] = useState("عرشه پل");
  const [filteredData, setFilteredData] = useState([]);
  const [isDataVisible, setIsDataVisible] = useState(false);

  function handleSearch() {
    const filteredData = Tablo.filter(
      (mamad) =>
        mamad.city === selectedCity && mamad.mediatype === selectedMediaType
    );

    const last = filteredData.slice(-10);
    console.log(last);
    setFilteredData(last);
    setIsDataVisible(true);
  }

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setIsDataVisible(false);
  };

  const handleMediaTypeChange = (e) => {
    setSelectedMediaType(e.target.value);
    setIsDataVisible(false);
  };

  return (
    <div dir="rtl">
      <div className="flex flex-col w-[100%] h-[264px] bg-blue-100 mx-auto mt-16 mb-6 ">
        <div className="flex flex-col items-center justify-around w-[100%] h-[264px] ">
          <label className="pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب شهر
          </label>
          <select
            style={{ appearance: "none" }}
            value={selectedCity}
            onChange={handleCityChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 focus:ring-blue-500  focus:border-blue-500 block w-[300px] p-2.5   "
          >
            {Array.from(new Set(Tablo.map((mamad) => mamad.city))).map(
              (uniqueCity) => (
                <option value={uniqueCity} key={uniqueCity}>
                  {uniqueCity}
                </option>
              )
            )}
          </select>

          <label className="pt-4 mb-2 text-base font-medium text-gray-900 dark:text-white">
            انتخاب رسانه
          </label>
          <select
            style={{ appearance: "none" }}
            value={selectedMediaType}
            onChange={handleMediaTypeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500  focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 "
          >
            {Array.from(new Set(Tablo.map((mamad) => mamad.mediatype))).map(
              (uniqueMediatype) => (
                <option key={uniqueMediatype} value={uniqueMediatype}>
                  {uniqueMediatype}
                </option>
              )
            )}
          </select>

          <button
            onClick={handleSearch}
            className="w-[150px] p-2 mb-2 bg-blue-800 text-white rounded-lg text-center"
          >
            جستجو
          </button>
        </div>
      </div>

      {isDataVisible && <Searchdata filteredData={filteredData} />}
    </div>
  );
}

export default SelectCity;
