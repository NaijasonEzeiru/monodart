"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
import AuthContext from "@/components/auth-context";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { formatUTCDate } from "@/lib/utils";
// import { apiAddress } from "@/lib/variables";
import { useContext, useState } from "react";
// import { toast } from "sonner";
import AppReview from "./app-review";

export default function Page() {
  const { user, authChecking } = useContext(AuthContext);
  const [appEditID, setAppEditID] = useState<null | {
    dataCollected: dataCollected;
    screenshots: screenshots;
    appData: App;
  }>(null);

  function findApp(appName: string) {
    if (user) {
      const entry = user[0]; // assuming single element in data array

      const [dataCollected] =
        entry?.dataCollected?.filter((item) => item?.appName === appName) || [];

      const [screenshots] = entry?.screenshots?.filter(
        (item) => item?.appName == appName
      );

      const appData =
        entry?.updateApp?.find((item) => item?.appName === appName) ||
        entry.newApp.find((item) => item?.appName === appName)!;

      console.log({ appData });

      setAppEditID({
        dataCollected,
        screenshots,
        appData,
      });
    }
  }

  // const getReviews = async () => {
  //   try {
  //     const res = await fetch(`${apiAddress}/fetch-apps-inreview`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("monodat_token"),
  //       },
  //       // method: "POST",
  //       // body: JSON.stringify({ userEmail: user?.[0]?.userEmail }),
  //     });
  //     const response = await res.json();
  //     if (res.ok) {
  //       console.log({ res });
  //       // setAcc(response?.data);
  //       // setLoading(false);
  //     } else {
  //       toast.error(response?.message || "Unable to generate virtual account", {
  //         description: "Please try again",
  //       });
  //       // setOpenDialog(false);
  //     }
  //   } catch (err) {
  //     toast.error("Unable to generate virtual account", {
  //       description: "Please try again",
  //     });
  //     // setOpenDialog(false);
  //     console.error({ err });
  //   }
  // };

  if (appEditID != null) {
    return <AppReview app={appEditID} setAppEditID={setAppEditID} />;
  }

  return (
    <>
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold">App Review</h1>
      </div>
      <Separator />
      {/* <button onClick={() => getReviews()}>Hello</button> */}
      <div className="mt-8 space-y-5">
        {authChecking &&
          user?.length == 0 &&
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
          ))}
        {user?.length &&
          [...user?.[0]?.newApp, ...user?.[0]?.updateApp]
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
            ))}
      </div>
    </>
  );
}
