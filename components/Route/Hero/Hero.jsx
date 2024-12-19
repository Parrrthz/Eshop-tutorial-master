import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/ddks1baxz/image/upload/v1726563709/images/m8teecy0eyrdlbaknmvp.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed' 
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[black] font-[600] capitalize`}
        >
          <b> Wholesale Gemstone <br /> Marketplace </b>
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[black]">
        A premier online gemstone b2b marketplace designed for jewelers, traders and collectors, offering a vast <br /> variety of dazzling gemstones at wholesale prices. Discover our exceptional gems easily.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
