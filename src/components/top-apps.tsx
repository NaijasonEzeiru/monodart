import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

function TopApps() {
  return (
    <div className="flex gap-8 items-center w-max">
      <Image
        alt="tiktok logo"
        src="/tiktok-logo.png"
        width={100}
        height={100}
        className="border border-white rounded-[30px]"
      />
      <div className="flex flex-col">
        <p>Tiktok</p>
        <p>Social</p>
        <span className="flex gap-2 items-center">
          <p>4.3</p>
          <Star size={12} fill="#C7920F" />
        </span>
      </div>
    </div>
  );
}

export default TopApps;
