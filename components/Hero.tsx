"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">
          Find, add and rate films - nice and easy!
        </h1>
        <p className="hero__subtitle">
          Optimize your movie watching experience! Collect your favorite movies
          and rate them!
        </p>
        {/* <CustomButton
          title="Explore Movies"
          containerStyles="bg-primary-blue text-white rounded-full mt-10"
          handleClick={handleScroll}
        /> */}
        <Link
          href="/catalog"
          className="bg-primary-blue text-white rounded-full mt-10 py-2 px-4 inline-block"
        >
          Explore Movies
        </Link>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>

        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
