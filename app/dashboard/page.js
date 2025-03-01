"use client";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { useState, useRef, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import Datadashbord from "./Datadashbord";
function page() {
  const [center, setCenter] = useState([35.8327, 50.9915]);
  const [mapCenter, setMapCenter] = useState(center);
  const [event, setEvent] = useState("create");
  const [formdata, setFormdata] = useState({
    city: "",
    size: "",
    address: "",
    price: "",
    mediaType: "",
    image: null,
  });

  const exitHandler = () => {
    localStorage.removeItem("token");
    location.href = "/";
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const createHandler = () => {
    setEvent(true);
  };



  // useEffect(() => {
  //   switch (event) {
  //     case "create":
  //       break;

  //     case "list":
  //       break;
  //     default:
  //       break;
  //   }
  // }, [event]);



  return (
    <>
      <div dir="rtl" className="md:flex mt-20">
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500  md:me-4 mb-4 md:mb-0">
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event == "create"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              aria-current="page"
              onClick={() => setEvent("create")}
            >
              ثبت تابلو
            </button>
          </li>
          <li>
            <button
              onClick={() => setEvent("list")}
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event == "list"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
            >
              لیست تابلوها
            </button>
          </li>
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event == "reseve"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              onClick={() => {
                setEvent("reseve");
              }}
            >
              رزرو شده
            </button>
          </li>
          <li>
            <button
              href="#"
              className={`inline-flex items-center px-4 py-3 rounded-lg ${
                event == "accept"
                  ? "text-white bg-blue-700"
                  : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"
              } w-full`}
              onClick={() => {
                setEvent("accept");
              }}
            >
              تایید شده
            </button>
          </li>
          <li>
            <button
              onClick={exitHandler}
              className="inline-flex cursor-pointer items-center px-4 py-3 text-red-400 rounded-lg  bg-gray-50 w-full  "
            >
              خروج
            </button>
          </li>
        </ul>

        
              <Datadashbord/>
    
      </div>
    </>
  );
}

export default page;
