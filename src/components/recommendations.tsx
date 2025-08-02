"use client";
// import { App, dataCollected, screenshots } from "@/app/types/data";
// import { apiAddress } from "@/lib/variables";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import Recommended from "./recommend-selected";
import RecommendedApps from "./recommended-apps";

// type Rev = {
//   screenshots: screenshots[];
//   dataCollected: dataCollected[];
//   newApp: App[];
//   updateApp: App[];
// }[];

function Recommendations() {
  // const [appEditID, setAppEditID] = useState<null | {
  //   dataCollected: dataCollected;
  //   screenshots: screenshots;
  //   appData: App;
  // }>(null);
  // const [apps, setApps] = useState<Rev | null>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   getReviews();
  // }, []);

  // const getReviews = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(`${apiAddress}/fetch-apps-inreview`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("monodat_token"),
  //       },
  //     });
  //     const response = await res.json();
  //     if (res.ok) {
  //       console.log({ res });
  //       setApps(response?.data);
  //       setLoading(false);
  //     } else {
  //       toast.error("Unable to get apps. Something went wrong", {
  //         description: "Please try again",
  //       });
  //     }
  //   } catch (err) {
  //     toast.error("Unable to get apps. Something went wrong", {
  //       description: "Please try again",
  //     });
  //     // setOpenDialog(false);
  //     console.error({ err });
  //   }
  // };

  // if (appEditID != null) {
  //   return <Recommended app={appEditID} setAppEditID={setAppEditID} />;
  // }
  return (
    <section className="bg-background pt-7 md:pt-20 pb-24 md:pb-40 px-10 sm:px-16 lg:px-24">
      <h3 className="text-lg mb-3 md:mb-12 text-muted-foreground">
        Recommended for you
      </h3>
      <RecommendedApps />
      <button className="text-sm text-[#188509] mt-11 mx-auto block md:hidden">
        See more apps
      </button>
    </section>
  );
}

export default Recommendations;
