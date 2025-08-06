"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatUTCDate } from "@/lib/utils";
import { apiAddress } from "@/lib/variables";
// import { apiAddress } from "@/lib/variables";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { toast } from "sonner";
import AppReview from "./app-review";

type Rev = {
  screenshots: screenshots[];
  dataCollected: dataCollected[];
  newApp: App[];
  updateApp: App[];
}[];

export default function Page() {
  // const { user, authChecking } = useContext(AuthContext);
  const [appEditID, setAppEditID] = useState<null | {
    dataCollected: dataCollected;
    screenshots: screenshots;
    appData: App;
  }>(null);
  const [loading, setLoading] = useState(true);
  const [acc, setAcc] = useState<Rev | null>(null);

  useEffect(() => {
    getReviews();
  }, []);

  function findApp(appName: string) {
    if (acc) {
      const entry = acc[0]; // assuming single element in data array

      const [dataCollected] =
        entry?.dataCollected?.filter((item) => item?.appName === appName) || [];

      const [screenshots] = entry?.screenshots?.filter(
        (item) => item?.appName == appName
      );

      const appData = entry.newApp.find((item) => item?.appName === appName)!;

      console.log({ appData });

      setAppEditID({
        dataCollected,
        screenshots,
        appData,
      });
    }
  }

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
        setAcc(response?.data);
        setLoading(false);
      } else {
        toast.error(response?.message || "Unable to get apps in review", {
          description: "Please try again",
        });
        // setOpenDialog(false);
      }
    } catch (err) {
      toast.error("Unable to get apps in review", {
        description: "Please try again",
      });
      // setOpenDialog(false);
      console.error({ err });
    }
  };

  if (appEditID != null) {
    return (
      <AppReview
        app={appEditID}
        setAppEditID={setAppEditID}
        getReviews={getReviews}
      />
    );
  }

  return (
    <>
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold">App Review</h1>
      </div>
      <Separator />
      <div className="mt-8 space-y-5">
        {acc?.length ? (
          [acc?.[0]?.newApp?.[0]]
            ?.filter((val) => val.appName)
            ?.map((app, index) => (
              <div className="flex justify-between items-center" key={index}>
                <span className="grid">
                  <p className="font-bold">
                    {app?.appName} {app?.appVersion}
                  </p>
                  <i className="text-muted-foreground text-sm">
                    Created on {formatUTCDate(app?.createdAt)}
                  </i>
                </span>
                <span className="grid justify-items-center">
                  <p className="font-medium">Status</p>
                  <i className="text-[#DF7104]">
                    {app?.status || "No details"}
                  </i>
                </span>
                <div className="w-20">
                  <button
                    className="text-red-700"
                    onClick={() => {
                      findApp(app.appName!);
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))
        ) : loading ? (
          Array.from({ length: 4 }).map((app, index) => (
            <div className="flex justify-between items-center" key={index}>
              <span className="grid gap-1">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-36" />
              </span>
              <span className="grid justify-items-center gap-2">
                <Skeleton className="h-4 w-11" />
                <Skeleton className="h-4 w-24" />
              </span>
              <div className="w-24">
                <Skeleton className="size-10 rounded-full mx-auto" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg">No apps in review</p>
        )}
      </div>
    </>
  );
}
