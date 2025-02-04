import Image from "next/image";
import React from "react";

function RecommendedApps() {
  return (
    <div className="flex gap-7 items-center md:flex-col md:bg-[#FDFBFB] md:px-7 md:pt-2 md:pb-6 rounded-2xl">
      <Image
        alt="tiktok logo"
        src="/tiktok-logo.png"
        width={272}
        height={268}
        className="size-24 md:size-52"
      />
      <span className="flex flex-col gap-1">
        <h4 className="text-lg text-muted-foreground">
          Tiktok: Video and content app
        </h4>
        <p className="text-[#5D5757] text-xs">
          Create videos, go live, have fun
        </p>
        <p className="text-[#E15610] text-sm">Social networking</p>
      </span>
    </div>
  );
}

export default RecommendedApps;
