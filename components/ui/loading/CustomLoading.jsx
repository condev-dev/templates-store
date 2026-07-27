"use client";
import React from 'react';
import { Infinity } from 'ldrs/react'
import 'ldrs/react/Infinity.css'
import "./index.css"

const CustomLoading = () => {

  return (
    <div className="loading-overlay">

      <Infinity
        size="55"
        stroke="4"
        strokeLength="0.15"
        bgOpacity="0.1"
        speed="1.3"
        color="var(--bg-btn-color)"
      />
    </div>
  );
};

export default CustomLoading;




