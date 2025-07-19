"use client";

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
import type { appData, dataCollected, screenshots } from "@/lib/types";
import { formatUTCDate } from "@/lib/utils";
import { apiAddress } from "@/lib/variables";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UpdateApp from "./update-app";

const data = [
  {
    id: 3,
    userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
    lastLoginCode: 1234,
    accountType: "user",
    profileStatus: true,
    firstName: "John",
    lastName: "Doe",
    userEmail: "ezeiruchibuike@gmail.com",
    phoneNumber: "+2348053662673",
    createdAt: "2025-07-18T13:04:22.000Z",
    updatedAt: "2025-07-18T13:04:22.000Z",
    screenshots: [
      {
        id: 5,
        userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
        screenshot1: null,
        screenshot2: null,
        screenshot3: null,
        screenshot4: null,
        header: null,
        appName: "Test-App",
        createdAt: "2025-07-18T13:09:11.000Z",
        updatedAt: "2025-07-18T13:09:11.000Z",
      },
    ],
    dataCollected: [
      {
        id: 5,
        userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
        location: null,
        personalInfo: null,
        paymentInfo: null,
        deviceInfo: null,
        gps: null,
        phot: null,
        biometric: null,
        contacts: null,
        appName: "Test-App",
        createdAt: "2025-07-18T13:09:11.000Z",
        updatedAt: "2025-07-18T13:09:11.000Z",
      },
    ],
    newApp: [
      {
        id: 4,
        userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
        appName: "",
        appDescription: null,
        appLogo: null,
        appPrivacyPolicy: null,
        copyright: null,
        appVersion: null,
        whatsNew: null,
        rating: null,
        appCat: null,
        appType: null,
        appPassword: null,
        appuserName: null,
        status: null,
        apkUrl: null,
        createdAt: "2025-07-18T13:04:22.000Z",
        updatedAt: "2025-07-18T13:04:22.000Z",
      },
    ],
    updateApp: [
      {
        id: 4,
        userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
        appName: "",
        appDescription: null,
        appLogo: null,
        appPrivacyPolicy: null,
        copyright: null,
        appVersion: null,
        whatsNew: null,
        rating: null,
        appCat: null,
        appType: null,
        appPassword: null,
        appuserName: null,
        status: null,
        apkUrl: null,
        createdAt: "2025-07-18T13:04:22.000Z",
        updatedAt: "2025-07-18T13:04:22.000Z",
      },
    ],
    setting: {
      id: 3,
      userUid: "963b7a1e-8fd7-4118-9bcb-59c652afba47",
      userEmail: "ezeiruchibuike@gmail.com",
      password: "$2b$10$W8pcAOMkiTphvWiIMysUUuk2yMB4OK.NCukVr7rZ7Sc8FXiw3Guai",
      createdAt: "2025-07-18T13:04:22.000Z",
      updatedAt: "2025-07-18T13:04:22.000Z",
    },
  },
];

export default function Page() {
  const router = useRouter();
  const [appNameSubmitting, setAppNameSubmitting] = useState(false);
  const [appName, setAppName] = useState("");
  const [apps, setApps] = useState<typeof data>([]);
  const [fetching, setFectching] = useState(true);
  const [appEditID, setAppEditID] = useState<null | {
    dataCollected: dataCollected;
    screenshots: screenshots;
    appData: appData;
  }>(null);

  useEffect(() => {
    getApps();
  }, []);

  function findApp(appName: string) {
    const entry = apps[0]; // assuming single element in data array

    const [dataCollected] = entry.dataCollected.filter(
      (item) => item?.appName === appName
    );

    const screenshots = entry.screenshots.filter(
      (item) => item?.appName === appName
    );

    const appData =
      entry.updateApp.find((item) => item?.appName === appName) ||
      entry.newApp.find((item) => item?.appName === appName)!;

    console.log({ appData });

    setAppEditID({
      dataCollected,
      screenshots,
      appData,
    });
  }

  const getApps = async () => {
    try {
      const res = await fetch(`${apiAddress}/fetch-myapps`, {
        // const res = await fetch(`${apiAddress}/fetch-apps`, {
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
      });
      const response = await res.json();
      if (res.ok) {
        setApps(response?.data);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Ooops!!! Something went wrong");
      console.error({ err });
    } finally {
      setFectching(false);
    }
  };

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

  console.log({ check: data[0].userUid });

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
        {fetching &&
          apps.length == 0 &&
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
        {apps.length > 0 &&
          [...apps?.[0]?.newApp, ...apps?.[0]?.updateApp]
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
