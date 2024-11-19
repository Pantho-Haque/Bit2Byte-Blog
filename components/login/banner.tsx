import React from "react";
import { TypeAnimation } from "react-type-animation";
import img from "@/public/images/technology_2.jpg";
const Banner: React.FC = () => {
  return (
    <div
      className="flex-1 flex justify-center items-center relative"
      style={{
        backgroundImage: `url(${img.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
        style={{ fontSize: "2em", display: "inline-block", color: "white" }}
        repeat={Infinity}
      />
    </div>
  );
};

export default Banner;
