import React from "react";
import { TypeAnimation } from "react-type-animation";
import img from "@/public/images/technology_2.jpg";

const Banner: React.FC = () => {
  return (
    <div
      className="flex-1 flex justify-center items-center relative w-full h-screen"
      style={{
        backgroundImage: `url(${img.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "} */}
      {/* Optional overlay to make text more readable */}
      <div className="relative z-10 text-center px-6 lg:px-12 py-4">
        <TypeAnimation
          sequence={[
            "WELCOME BACK",
            1000,
            "BIT 2 BYTE - IDEA 2 INNOVATION",
            1000,
            "YOUR NEXT ADVENTURE",
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{
            fontSize: "2.5rem", // Default font size
            display: "inline-block",
            color: "white",
            fontWeight: "bold",
          }}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Banner;
