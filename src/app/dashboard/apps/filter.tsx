"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
import AuthContext from "@/components/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { formatUTCDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";

export default function Filter({
  setAppEditID,
  filter,
}: {
  setAppEditID: Dispatch<
    SetStateAction<{
      dataCollected: dataCollected;
      screenshots: screenshots;
      appData: App;
    } | null>
  >;
  filter?: string;
}) {
  const router = useRouter();
  const { user, authChecking } = useContext(AuthContext);

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

  return (
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
          //   ?.filter((val) => val.appName && val.status == filter)
          ?.filter((val) => {
            if (filter) {
              return val.appName && val.status == filter;
            } else {
              return val.appName;
            }
          })
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
                <i className="text-[#DF7104]">{app?.status || "No details"}</i>
              </span>
              <div className="w-20">
                <button
                  className="items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 size-8 bg-primary rounded-full mx-auto block text-2xl"
                  onClick={() => {
                    if (app.status) {
                      findApp(app.appName!);
                    } else if (app.appName) {
                      router.push(
                        `/dashboard/apps/new?app=${app.appName
                          .replace(/\s{2,}/g, " ")
                          .trim()}`
                      );
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
    </div>
  );
}
