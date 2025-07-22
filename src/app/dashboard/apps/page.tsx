"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
import AuthContext from "@/components/auth-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
// import type { appData, dataCollected, screenshots } from "@/lib/types";
import { formatUTCDate } from "@/lib/utils";
import { apiAddress } from "@/lib/variables";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { toast } from "sonner";
import UpdateApp from "./update-app";

export default function Page() {
  const { user, authChecking } = useContext(AuthContext);
  const router = useRouter();
  const [appNameSubmitting, setAppNameSubmitting] = useState(false);
  const [appName, setAppName] = useState("");
  // const [fetching, setFectching] = useState(true);
  const [appEditID, setAppEditID] = useState<null | {
    dataCollected: dataCollected;
    screenshots: screenshots;
    appData: App;
  }>(null);

  // useEffect(() => {
  //   getApps();
  // }, []);

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

  // const getApps = async () => {
  //   try {
  //     const res = await fetch(`${apiAddress}/fetch-myapps`, {
  //       // const res = await fetch(`${apiAddress}/fetch-apps`, {
  //       // credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("monodat_token"),
  //       },
  //     });
  //     const response = await res.json();
  //     if (res.ok) {
  //       setApps(response?.data);
  //     } else {
  //       toast.error(response?.message || "Something went wrong");
  //     }
  //   } catch (err) {
  //     toast.error("Ooops!!! Something went wrong");
  //     console.error({ err });
  //   } finally {
  //     setFectching(false);
  //   }
  // };

  const nameSubmit = async () => {
    setAppNameSubmitting(true);
    try {
      const res = await fetch(`${apiAddress}/create-app`, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
        body: JSON.stringify({
          appName: appName.replace(/\s{2,}/g, " ").trim(),
        }),
      });
      const response = await res.json();
      if (res.ok) {
        toast.success(response?.message);
        router.push(
          `/dashboard/apps/new?app=${appName.replace(/\s{2,}/g, " ").trim()}`
        );
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      console.error({ err });
      toast.error("Ooops!!! Something went wrong");
    } finally {
      setAppNameSubmitting(false);
      // setOpenNewAppDialog(false);
    }
  };

  if (appEditID != null) {
    return <UpdateApp app={appEditID} setAppEditID={setAppEditID} />;
  }
  return (
    <>
      <div className="flex justify-between mb-3 items-center">
        <h1 className="text-xl font-bold">Applications</h1>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full bg-primary text-white hover:bg-primary/85 hover:text-white"
              >
                Create new
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>App name</DialogTitle>
                <DialogDescription>
                  Please enter the name of your app
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name">App name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    onChange={(e) => {
                      setAppName(e.target.value);
                      // const input = e.target.value.replace(/\s/g, "");
                      // setAppName(input);
                    }}
                    value={appName}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={appNameSubmitting}
                  onClick={nameSubmit}
                >
                  {appNameSubmitting && <Loader className="animate-spin" />}
                  Submit name
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
      <Separator />
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
    </>
  );
}
