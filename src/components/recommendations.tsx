import React from "react";
import RecommendedApps from "./recommended-apps";

function Recommendations() {
  return (
    <section className="bg-background pt-7 md:pt-20 pb-24 md:pb-40 px-10 sm:px-16 lg:px-24">
      <h3 className="text-lg mb-3 md:mb-12 text-muted-foreground">
        Recommended for you
      </h3>
      <div className="grid gap-7 md:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RecommendedApps />
        <RecommendedApps />
        <RecommendedApps />
        <RecommendedApps />
        {/* <RecommendedApps /> */}
      </div>
      <button className="text-sm text-[#188509] mt-11 mx-auto block md:hidden">
        See more apps
      </button>
    </section>
  );
}

export default Recommendations;
