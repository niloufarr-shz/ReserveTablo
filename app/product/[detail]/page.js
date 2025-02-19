"use client";
import React from "react";
import Tablo from "@/components/data/Tablo";

function detail({ params }) {
  const detail = Tablo.filter((nil) => nil.id == params.detail);
  return (
    <div>
      {detail.map((ana) => (
        <div key={ana.id}>
          <img src={ana.avatar} alt="" />

          <p className="bg-indigo-300">{ana.city}</p>
          <p>{ana.address}</p>
        </div>
      ))}
    </div>
  );
}

export default detail;
