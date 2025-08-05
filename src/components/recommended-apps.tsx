"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
import { apiAddress } from "@/lib/variables";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

type Rev = {
  screenshots: screenshots[];
  dataCollected: dataCollected[];
  newApp: App[];
  updateApp: App[];
}[];

function RecommendedApps() {
  const [apps, setApps] = useState<Rev | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiAddress}/fetch-apps-inreview`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
      });
      const response = await res.json();
      if (res.ok) {
        console.log({ res });
        setApps(response?.data);
        setLoading(false);
      } else {
        // setOpenDialog(false);
      }
    } catch (err) {
      toast.error("Unable to get apps. Something went wrong", {
        description: "Please try again",
      });
      // setOpenDialog(false);
      console.error({ err });
    }
  };
  return (
    <div className="grid gap-7 md:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {!!loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div
            className="flex gap-7 items-center md:flex-col md:bg-[#FDFBFB] md:px-7 md:pt-2 md:pb-6 rounded-2xl"
            key={i}
          >
            <Skeleton className="size-24 md:size-52" />
            <span className="flex flex-col gap-1">
              <h4 className="text-lg text-muted-foreground">
                <Skeleton className="h-6 w-36" />
              </h4>
              <span className="space-y-1">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
              </span>
              <Skeleton className="h-4 w-8" />
            </span>
          </div>
        ))}
      {!!apps?.length &&
        !loading &&
        [apps?.[0]?.newApp?.[0]]
          ?.filter((val) => val.appName)
          ?.map((app) => (
            <Link
              href={`/app/${app.appName}`}
              className="flex gap-7 items-center md:flex-col md:bg-[#FDFBFB] md:px-7 md:pt-2 md:pb-6 rounded-2xl hover:no-underline hover:bg-muted hover:md:bg-[#f2f2f2]"
              key={app.appName}
            >
              <Image
                alt="tiktok logo"
                src={`https://www.huntersapp.xyz/developers.monodat.com/${app?.appLogo}`}
                width={272}
                height={268}
                className="size-24 md:size-52"
              />
              <span className="flex flex-col gap-1">
                <h4 className="text-lg text-muted-foreground">
                  {app.appName}: {app.appCat} app
                  {/* Tiktok: Video and content app */}
                </h4>
                <p className="text-[#5D5757] text-xs line-clamp-2">
                  {app.appDescription}
                  {/* Create videos, go live, have fun */}
                </p>
                <p className="text-[#E15610] text-sm">{app.appType}</p>
              </span>
            </Link>
          ))}
    </div>
  );
}

export default RecommendedApps;
