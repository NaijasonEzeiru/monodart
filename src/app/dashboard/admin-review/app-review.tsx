"use client";

import { ChevronLeftIcon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import { useState, type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { App, dataCollected, screenshots } from "@/app/types/data";
import { Label } from "@/components/ui/label";
import { apiAddress } from "@/lib/variables";
import { toast } from "sonner";

type Transformed = {
  value: string;
  selected: boolean;
};

function restructureApiResponse(
  apiData: Omit<dataCollected, "appName">,
  mapping: typeof dataCollectionQuestionaire
): Transformed[] {
  return mapping.map((item) => ({
    value: item.value,
    selected: Boolean(
      apiData[item.label as keyof Omit<dataCollected, "appName">]
    ),
  }));
}

const dataCollectionQuestionaire = [
  { value: "Location service", selected: false, label: "location" },
  { value: "Personal information", selected: false, label: "personalInfo" },
  { value: "Payment information", selected: false, label: "paymentInfo" },
  { value: "Device information", selected: false, label: "deviceInfo" },
  { value: "GPS tracking", selected: false, label: "gps" },
  { value: "Images data", selected: false, label: "phot" },
  { value: "Biometrics data", selected: false, label: "biometric" },
  { value: "User contacts", selected: false, label: "contacts" },
] as const;

export default function AppReview({
  app,
  setAppEditID,
}: {
  app: {
    dataCollected: dataCollected;
    appData: App;
    screenshots: screenshots;
  };
  setAppEditID: Dispatch<
    SetStateAction<{
      dataCollected: dataCollected;
      screenshots: screenshots;
      appData: App;
    } | null>
  >;
}) {
  const { appName: _, ...rest } = app.dataCollected;
  console.log(_);

  const trueValues = dataCollectionQuestionaire
    .filter((item) => rest?.[item.label])
    .map((item) => item.value);

  const {
    apkUrl,
    appCat,
    appDescription,
    appLogo,
    appName,
    appPassword,
    appPrivacyPolicy,
    appType,
    appVersion,
    appuserName,
    copyright,
    rating,
    whatsNew = "nothing",
  } = app.appData;
  const { screenshot1, screenshot2, screenshot3, screenshot4 } =
    app.screenshots;

  const body = {
    apkUrl,
    appCat,
    appDescription,
    appLogo,
    appName,
    appPassword,
    appPrivacyPolicy,
    appType,
    appVersion,
    appuserName,
    copyright,
    rating,
    whatsNew,
    dataCollected: restructureApiResponse(rest, dataCollectionQuestionaire),
    screenShots: [screenshot1, screenshot2, screenshot3, screenshot4],
  };

  const [loading, setLoading] = useState(false);

  async function acceptSubmission() {
    try {
      setLoading(true);
      const res = await fetch(`${apiAddress}/accept-submission`, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      if (res.ok) {
        toast.success(response?.message || "App successfully approved");
        setAppEditID(null);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Ooops!!! Something went wrong");
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  async function rejectSubmission() {
    try {
      setLoading(true);
      const res = await fetch(`${apiAddress}/reject-submission-inreview`, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      if (res.ok) {
        toast.success(response?.message || "App rejected approved");
        setAppEditID(null);
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Ooops!!! Something went wrong");
      console.log({ err });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        className="inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10 absolute top-3 left-12"
        onClick={() => setAppEditID(null)}
      >
        <ChevronLeftIcon size={24} />
      </button>
      <h1 className="text-xl font-bold mb-3">Review App</h1>
      <Separator />
      <div className="space-y-7 mt-6 mb-16  max-w-[920px]">
        <div className="grid gap-3 md:grid-cols-2 items-end">
          <div className="space-y-0.5">
            <Label>App version</Label>
            <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
              {app.appData.appVersion}
            </p>
          </div>
          {app.appData?.whatsNew && (
            <div className="space-y-0.5">
              <Label>What&apos;s new</Label>
              <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
                {app.appData?.whatsNew}
              </p>
            </div>
          )}
        </div>
        <div className="items-end flex gap-7">
          <div className="mt-2">
            App logo
            <div className="grid relative items-center w-[132px] h-[132px] rounded-lg border border-border">
              <Image
                src={`https://www.huntersapp.xyz/developers.monodat.com/${app?.appData?.appLogo}`}
                alt="App logo"
                className="h-32 w-32 object-cover rounded-lg"
                width={132}
                height={132}
              />
            </div>
          </div>
          <div className="w-full">
            <p className="min-h-[80px] rounded-md border border-input px-3 py-2 md:text-sm h-[132px] w-full">
              {app.appData.appDescription}
            </p>
          </div>
        </div>
        <div className="">
          Screenshots
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            {[
              app.screenshots.screenshot1,
              app.screenshots.screenshot2,
              app.screenshots.screenshot3,
              app.screenshots.screenshot4,
            ].map((v, i) => (
              <div className="relative" key={i}>
                <div
                  className="grid relative items-center w-[215px] h-[466px] grow rounded-3xl border border-border"
                  aria-label="Add image"
                >
                  <Image
                    src={`https://www.huntersapp.xyz/developers.monodat.com/${v}`}
                    alt={`screenshot - ${i + 1}`}
                    className="h-full w-full object-cover rounded-lg"
                    width={215}
                    height={466}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-10">
          <div className="max-w-3xl w-full space-y-5">
            <div className="">
              Privacy policy link
              <a
                className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm block"
                href={app.appData.appPrivacyPolicy!}
              >
                {app.appData.appPrivacyPolicy}
              </a>
            </div>
            <div className="">
              Copyright
              <a
                className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm block"
                href={app.appData.appPrivacyPolicy!}
              >
                {app.appData.copyright}
              </a>
            </div>
            <div className="flex gap-7">
              <div className="w-full">
                Age rating
                <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
                  {app.appData.rating}
                </p>
              </div>
              <div className="w-full">
                App version
                <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
                  {app.appData.appVersion}
                </p>
              </div>
            </div>
            {app.appData.appuserName && (
              <span className="flex gap-4 items-center">
                <div className="w-full">
                  Username
                  <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
                    {app.appData.appuserName}
                  </p>
                </div>
                <div className="w-full">
                  Password
                  <p className="h-10 w-full rounded-md border border-input px-3 py-2 md:text-sm">
                    {app.appData.appPassword}
                  </p>
                </div>
              </span>
            )}
          </div>
          {/* <div className="mt-2 w-72 relative bottom-5">
            <p className="text-center w-40">APK</p>
            <label
              className="grid relative items-center w-40 h-40 rounded-3xl border border-border"
              tabIndex={0}
              aria-label="Add apk file"
            >
              <span className="w-40 h-40 flex items-center justify-center">
                <div className="h-full w-full border-border rounded-lg flex items-center p-1 overflow-hidden text-center">
                  <span className="break-words inline-size">
                    <svg
                      width="256px"
                      height="301px"
                      viewBox="0 0 256 301"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="xMidYMid"
                      className="w-full h-24 text-chart-2"
                    >
                      <g>
                        <path
                          d="M78.3890161,0.858476242 C76.9846593,0.871877584 75.5269206,1.21067383 74.1988355,1.94683705 C69.9813154,4.28464966 68.4344792,9.70448752 70.7705059,13.9187887 L80.2936432,31.1148585 C57.3501835,45.3109605 42.146676,69.5583356 42.146676,97.23264 C42.146676,97.3488107 42.1463538,97.5233203 42.146676,97.6951925 C42.1467894,97.7558421 42.1461099,97.7904107 42.146676,97.8584397 C42.1467112,97.9488816 42.146676,98.0809536 42.146676,98.1033235 L42.146676,102.37513 C37.7401995,97.3051619 31.2627337,94.103607 24.0255064,94.103607 C10.766574,94.103607 0,104.870185 0,118.129121 L0,192.137501 C0,205.396437 10.766574,216.163015 24.0255064,216.163015 C31.2627337,216.163015 37.7401995,212.96146 42.146676,207.891492 L42.146676,218.258109 C42.146676,232.234601 53.5833566,243.671281 67.5598484,243.671281 L74.0083724,243.671281 L74.0083724,276.594135 C74.0083724,289.853131 84.774955,300.619649 98.0338856,300.619649 C111.292821,300.619649 122.0594,289.853131 122.0594,276.594135 L122.0594,243.671281 L133.215081,243.671281 L133.215081,276.594135 C133.215081,289.853131 143.981659,300.619649 157.240595,300.619649 C170.499522,300.619649 181.266118,289.853131 181.266118,276.594135 L181.266118,243.671281 L187.714637,243.671281 C201.691129,243.671281 213.127809,232.234601 213.127809,218.258109 L213.127809,207.891492 C217.534299,212.96146 224.011752,216.163015 231.248984,216.163015 C244.507919,216.163015 255.274498,205.396437 255.274498,192.137501 L255.274498,118.129121 C255.274498,104.870185 244.507919,94.103607 231.248984,94.103607 C224.011752,94.103607 217.534299,97.3051619 213.127809,102.37513 L213.127809,98.1849514 L213.127809,98.1033407 C213.128367,97.9723769 213.127955,97.8421262 213.127809,97.8584655 C213.129527,97.5976548 213.127809,97.3898395 213.127809,97.2326572 C213.127809,69.5631979 197.890397,45.339215 174.95363,31.1420821 L184.503985,13.918763 C186.840011,9.70446174 185.293178,4.28462389 181.075655,1.94681128 C179.747565,1.21064805 178.289834,0.871868993 176.885477,0.85845047 C173.770979,0.828641074 170.714038,2.4700306 169.103704,5.37514094 L159.118011,23.4146964 C149.353914,19.811505 138.730068,17.8368515 127.637245,17.8368515 C116.555726,17.8368515 105.912363,19.7912913 96.1564693,23.3874813 L86.1707769,5.37514094 C84.5604527,2.47002201 81.503506,0.828709799 78.3890161,0.85845047 L78.3890161,0.858476242 Z"
                          fill="#FFFFFF"
                        ></path>
                        <path
                          d="M24.0260725,100.361664 C14.1317,100.361664 6.25861893,108.234747 6.25861893,118.129121 L6.25861893,192.137501 C6.25861893,202.031875 14.1317,209.904958 24.0260725,209.904958 C33.9204441,209.904958 41.7935257,202.031875 41.7935257,192.137501 L41.7935257,118.129121 C41.7935257,108.234747 33.9204441,100.361664 24.0260725,100.361664 L24.0260725,100.361664 Z M231.249551,100.361664 C221.355176,100.361664 213.482094,108.234747 213.482094,118.129121 L213.482094,192.137501 C213.482094,202.031875 221.355176,209.904958 231.249551,209.904958 C241.143925,209.904958 249.016999,202.031875 249.016999,192.137501 L249.016999,118.129121 C249.016999,108.234747 241.143925,100.361664 231.249551,100.361664 L231.249551,100.361664 Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M98.0338856,184.818075 C88.1395114,184.818075 80.2664341,192.691157 80.2664341,202.585531 L80.2664341,276.593963 C80.2664341,286.488363 88.1395114,294.361308 98.0338856,294.361308 C107.92826,294.361308 115.801342,286.488363 115.801342,276.593963 L115.801342,202.585531 C115.801342,192.691157 107.92826,184.818075 98.0338856,184.818075 L98.0338856,184.818075 Z M157.240595,184.818075 C147.346221,184.818075 139.473138,192.691157 139.473138,202.585531 L139.473138,276.593963 C139.473138,286.488363 147.346221,294.361308 157.240595,294.361308 C167.134969,294.361308 175.008043,286.488363 175.008043,276.593963 L175.008043,202.585531 C175.008043,192.691157 167.134969,184.818075 157.240595,184.818075 L157.240595,184.818075 Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M78.4434341,7.11654228 C78.0234231,7.12083758 77.6320498,7.22919946 77.2462398,7.44304537 C75.9792855,8.14533584 75.5626532,9.60121987 76.2667168,10.8713836 L88.782836,33.4820338 C64.7023936,46.0117562 48.4373365,69.8232526 48.4047377,97.1510121 L206.869751,97.1510121 C206.837193,69.8232526 190.572096,46.0117562 166.491645,33.4820338 L179.007777,10.8713836 C179.711837,9.60121987 179.295201,8.14533584 178.02825,7.44304537 C177.642438,7.22919946 177.251067,7.1205455 176.831055,7.11654228 C175.931919,7.10786577 175.079646,7.55712 174.599912,8.42257181 L161.920533,31.2781058 C151.548297,26.6773219 139.914231,24.0949434 127.637245,24.0949434 C115.360249,24.0949434 103.726174,26.6773219 93.3539479,31.2781058 L80.6745686,8.42257181 C80.1948375,7.55712 79.3425576,7.10791732 78.4434341,7.11654228 L78.4434341,7.11654228 Z M48.4047377,103.40907 L48.4047377,218.258109 C48.4047377,228.870039 56.9479173,237.413214 67.5598484,237.413214 L187.714637,237.413214 C198.326576,237.413214 206.869751,228.870039 206.869751,218.258109 L206.869751,103.40907 L48.4047377,103.40907 L48.4047377,103.40907 Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M91.0681772,54.9226953 C87.4507168,54.9226953 84.4563973,57.9170105 84.4563973,61.5344795 C84.4563973,65.1519399 87.4507168,68.146255 91.0681772,68.146255 C94.6856376,68.146255 97.6799528,65.1519399 97.6799528,61.5344795 C97.6799528,57.9170105 94.6856376,54.9226953 91.0681772,54.9226953 L91.0681772,54.9226953 Z M164.205874,54.9226953 C160.588413,54.9226953 157.59409,57.9170105 157.59409,61.5344795 C157.59409,65.1519399 160.588413,68.146255 164.205874,68.146255 C167.823326,68.146255 170.817649,65.1519399 170.817649,61.5344795 C170.817649,57.9170105 167.823326,54.9226953 164.205874,54.9226953 L164.205874,54.9226953 Z"
                          fill="#FFFFFF"
                        ></path>
                      </g>
                    </svg>
                    {app.appData.apkUrl?.split("/")?.pop()}
                  </span>
                </div>
              </span>
            </label>
          </div> */}
          <ul className="w-72 space-y-0.5">
            <p className="text-lg font-bold">Data collected</p>
            {trueValues.map((val) => (
              <li key={val}>{val}</li>
            ))}
          </ul>
        </div>
        <div className="flex w-full justify-end gap-7">
          <Button
            disabled={loading}
            className=""
            variant="outline"
            onClick={() => rejectSubmission()}
          >
            {loading && <LoaderIcon className="animate-spin" />}
            Reject app
          </Button>
          <Button
            disabled={loading}
            className="bg-black hover:bg-black/85"
            onClick={() => acceptSubmission()}
          >
            {loading && <LoaderIcon className="animate-spin" />}
            Approve app
          </Button>
        </div>
      </div>
    </>
  );
}
