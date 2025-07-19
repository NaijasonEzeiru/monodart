"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Suspense, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NewAppSchema } from "@/lib/zodSchema";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiAddress } from "@/lib/variables";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertToWebP } from "@/lib/utils";

const dataCollectionQuestionaire = [
  { value: "Location service", selected: false, label: "location" },
  { value: "Personal information", selected: false, label: "personalInfo" },
  { value: "Payment information", selected: false, label: "paymentInfo" },
  { value: "Device information", selected: false, label: "deviceInfo" },
  { value: "GPS tracking", selected: false, label: "gps" },
  { value: "Images data", selected: false, label: "phot" },
  { value: "Biometrics data", selected: false, label: "biometric" },
  { value: "User contacts", selected: false, label: "contacts" },
];

const CATEGORIES = [
  "Social network",
  "Crypto exchange",
  "Utilities",
  "Bank",
  "Payments",
  "Editor",
  "Magazine",
  "News",
  "Others",
];

const APPTYPE = ["Application", "Game", "Browser"];

function Page() {
  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  const router = useRouter();

  const form = useForm<z.infer<typeof NewAppSchema>>({
    resolver: zodResolver(NewAppSchema),
    defaultValues: { appName: appName! },
    reValidateMode: "onSubmit",
  });

  const loginAccess = form.watch("loginAccess");

  const [appLogoImg, setAppLogoImg] = useState("");
  const [apkFile, setApkFile] = useState("");
  const [screenshotImgs, setScreenshootsImgs] = useState(["", "", "", ""]);
  const [files, setFiles] = useState<(null | File)[]>([null, null, null, null]);
  const [selectedItems, setSelectedItems] = useState([
    { value: "Location service", selected: false },
    { value: "Personal information", selected: false },
    { value: "Payment information", selected: false },
    { value: "Device information", selected: false },
    { value: "GPS tracking", selected: false },
    { value: "Images data", selected: false },
    { value: "Biometrics data", selected: false },
    { value: "User contacts", selected: false },
  ]);

  const handleAppLogoChange = async (img: File | undefined) => {
    if (img && appName) {
      const validate = z
        .any()
        .refine((files) => files.size <= 2000000, "Max image size is 2MB.")
        .safeParse(img);
      if (validate?.error) {
        form.setError("appLogo", {
          type: "server",
          message: validate.error?.issues[0].message,
        });
        return;
      }
      setAppLogoImg("loading");
      const formData = new FormData();
      try {
        const webpFile = await convertToWebP(img);
        formData.append("file", webpFile);
        formData.append("imageCat", "appLogo");
        formData.append("appName", appName);
        const res = await fetch(`${apiAddress}/upload-images`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("monodat_token"),
          },
        });
        const response = await res.json();
        if (res.ok) {
          setAppLogoImg(response?.publicUrl);
          console.log({ response });
          return;
        } else {
          form.setValue("appLogo", "");
          setAppLogoImg("");
          toast.error("Unable to upload image", {
            description: response?.message || "Something went wrong",
          });
        }
      } catch (err) {
        form.setValue("appLogo", "");
        setAppLogoImg("");
        toast.error("Unable to upload image", {
          description: "Ooops!!! Something went wrong",
        });
        console.log({ err });
      }
      // setAppLogoImg(URL.createObjectURL(img));
    } else if (!appName) {
      toast.error("App name is undefined");
      router.push("/dashboard/apps");
    }
  };

  const handleAPKUpload = async (apk: File | undefined) => {
    if (apk && appName) {
      setApkFile("loading");
      const formData = new FormData();
      try {
        formData.append("file", apk);
        formData.append("appName", appName);
        const res = await fetch(`${apiAddress}/upload-app`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("monodat_token"),
          },
        });
        const response = await res.json();
        if (res.ok) {
          setApkFile(response?.apkUrl);
          return;
        } else {
          form.setValue("apk", "");
          setApkFile("");
          toast.error("Unable to upload APK", {
            description: response?.message || "Something went wrong",
          });
        }
      } catch (err) {
        form.setValue("apk", "");
        setApkFile("");
        toast.error("Unable to upload APK", {
          description: "Ooops!!! Something went wrong",
        });
        console.log({ err });
      }
    } else if (!appName) {
      toast.error("App name is undefined");
      router.push("/dashboard/apps");
    }
  };

  const handleScreenshotChange = async (img: File | undefined, i: number) => {
    if (img && appName) {
      console.log({ img });
      const validate = z
        .any()
        .refine((files) => files.size <= 5000000, "Max image size is 5MB.")
        .safeParse(img);
      if (validate?.error) {
        form.setError("screenShots", {
          message: validate.error?.issues[0].message,
        });
        return;
      }

      const items = [...screenshotImgs];
      const w = [...files];
      w[i] = img;
      setFiles(w);
      // items[i] = URL.createObjectURL(img);
      items[i] = "loading";
      setScreenshootsImgs([...items]);
      const formData = new FormData();
      try {
        const webpFile = await convertToWebP(img);
        console.log({ webpFile });
        formData.append("file", webpFile);
        formData.append("imageNumber", (i + 1).toString());
        formData.append("appName", appName);
        formData.append("imageCat", "screenshot");
        const res = await fetch(`${apiAddress}/upload-images`, {
          method: "POST",
          // credentials: "include",
          body: formData,
          headers: {
            // "Content-Type": "application/json"
            Authorization: "Bearer " + localStorage.getItem("monodat_token"),
          },
        });
        const response = await res.json();
        if (res.ok) {
          items[i] = response?.publicUrl;
        } else {
          items[i] = "";
          form.setValue(`screenShots.${i}`, "");
          toast.error("Unable to upload image", {
            description: response?.message || "Something went wrong",
          });
        }
      } catch (err) {
        items[i] = "";
        form.setValue(`screenShots.${i}`, "");
        toast.error("Unable to upload image", {
          description: "Ooops!!! Something went wrong",
        });
        console.log({ err });
      }
      setScreenshootsImgs([...items]);
    } else if (!appName) {
      toast.error("App name is undefined");
      router.push("/dashboard/apps");
    }
  };

  const handleSelectChange = (value: string) => {
    const indexById = selectedItems.findIndex((item) => item.value === value);
    const s = [...selectedItems];
    s[indexById].selected = !s[indexById].selected;
    setSelectedItems(s);
    // if (!selectedItems.includes(value)) {
    //   setSelectedItems((prev) => [...prev, value]);
    // } else {
    //   const referencedArray = [...selectedItems];
    //   const indexOfItemToBeRemoved = referencedArray.indexOf(value);
    //   referencedArray.splice(indexOfItemToBeRemoved, 1);
    //   setSelectedItems(referencedArray);
    // }
  };

  // const isOptionSelected = (value: string): boolean => {
  //   return selectedItems.includes(value) ? true : false;
  // };

  async function onSubmit(body: z.infer<typeof NewAppSchema>) {
    console.log({ selectedItems });
    try {
      const res = await fetch(`${apiAddress}/submit-newapp`, {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
        body: JSON.stringify({
          ...body,
          dataCollected: selectedItems,
          appName,
          apk: apkFile,
          screenShots: screenshotImgs,
          appLogo: appLogoImg,
        }),
      });
      const response = await res.json();
      if (res.ok) {
        toast.success(response?.message || "App created successfully");
        router.push("/dashboard/apps");
      } else {
        toast.error(response?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Ooops!!! Something went wrong");
      console.log({ err });
    }
  }

  console.log({ errors: form.formState.errors });
  console.log({ vals: form.watch() });

  return (
    <>
      <h1 className="text-xl font-bold mb-3">Create new application</h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 mt-6 mb-16 text-[#808080]"
        >
          <div className="grid gap-3 md:grid-cols-3 items-end max-w-4xl">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>App name</FormLabel>
                  <FormControl>
                    <Input placeholder="New app version" {...field} disabled />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appCat"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>App category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-300">
                        <SelectValue placeholder="App category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((e) => (
                        <SelectItem value={e} key={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appType"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>App type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-gray-300 text-black">
                        <SelectValue
                          placeholder="App type"
                          className="text-black placeholder:text-black"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {APPTYPE.map((e) => (
                        <SelectItem value={e} key={e}>
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="items-end flex gap-7">
            <div className="mt-2">
              App logo
              <label
                className="grid relative items-center w-36 h-36 rounded-lg border border-border"
                tabIndex={0}
                aria-label="Add image"
              >
                {!appLogoImg ? (
                  <p className="text-4xl text-center text-muted-foreground">
                    +
                  </p>
                ) : (
                  <span className="w-[132px] h-[132px] flex items-center justify-center">
                    {appLogoImg == "loading" ? (
                      <span>
                        <Loader className="animate-spin opacity-50" size={40} />
                      </span>
                    ) : (
                      <Image
                        src={appLogoImg}
                        alt="App logo"
                        className="h-full w-full object-cover rounded-lg"
                        width={132}
                        height={132}
                      />
                    )}
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="appLogo"
                  render={({
                    field: { onChange, onBlur, value, name, ref, disabled },
                  }) => (
                    <FormItem className="space-y-0.5 hidden">
                      <FormControl>
                        <input
                          accept="image/*"
                          type="file"
                          hidden
                          onChange={(e) => {
                            onChange(e);
                            handleAppLogoChange(e.target.files?.[0]);
                            //   setUrlImg(
                            //     URL.createObjectURL(e.target.files?.[0]!)
                            //   );
                          }}
                          ref={ref}
                          disabled={disabled}
                          name={name}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </FormItem>
                  )}
                />
              </label>
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors?.appLogo?.message as string}
              </p>
            </div>
            <FormField
              control={form.control}
              name="appDescription"
              render={({ field }) => (
                <FormItem className="space-y-0.5 w-full">
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Textarea
                      placeholder="App description"
                      {...field}
                      className="h-[132px] w-full"
                    />
                  </FormControl>
                  <FormMessage className="absolute" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
            {[0, 1, 2, 3].map((i) => (
              <div className="relative" key={i}>
                <label
                  className="grid relative items-center w-[215px] h-[466px] grow rounded-3xl border border-border"
                  tabIndex={0}
                  aria-label="Add image"
                >
                  {!screenshotImgs[i] ? (
                    <p className="text-4xl text-center text-muted-foreground">
                      +
                    </p>
                  ) : (
                    <span className="w-[215px] h-[466px] items-center justify-center flex">
                      {screenshotImgs[i] == "loading" ? (
                        <span>
                          <Loader
                            className="animate-spin opacity-50"
                            size={50}
                          />
                        </span>
                      ) : (
                        <Image
                          src={screenshotImgs[i]}
                          alt={`image -`}
                          className="h-full w-full object-cover rounded-lg"
                          width={215}
                          height={466}
                        />
                      )}
                    </span>
                  )}
                  <FormField
                    control={form.control}
                    name={`screenShots.${i}`}
                    render={({
                      field: { onChange, onBlur, value, name, ref, disabled },
                    }) => (
                      <FormItem className="space-y-0.5 hidden">
                        <FormControl>
                          <input
                            accept="image/*"
                            type="file"
                            hidden
                            onChange={(e) => {
                              onChange(e);
                              handleScreenshotChange(e.target.files?.[0], i);
                            }}
                            ref={ref}
                            disabled={disabled}
                            name={name}
                            onBlur={onBlur}
                            value={value}
                          />
                        </FormControl>
                        <FormMessage className="absolute" />
                      </FormItem>
                    )}
                  />
                </label>
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors?.screenShots?.[i]?.message as string}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setScreenshootsImgs(
                      screenshotImgs.map((item, index) =>
                        index === i ? "" : item
                      )
                    )
                  }
                  className="rounded-full size-6 text-white bg-[#8A0D0D] flex items-center justify-center absolute -right-2 -top-2 text-2xl"
                >
                  <Minus />
                </button>
              </div>
            ))}
          </div>
          <div className="">
            <p className="mb-1 text-muted-foreground">
              1290 x 2796 pixels (portrait)
            </p>
            <Separator className="w-8/12" />
          </div>
          <div className="flex gap-10">
            <div className="max-w-3xl w-full space-y-5">
              <div className="flex gap-7">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 w-full">
                      <FormControl>
                        <Input placeholder="Age rating" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="appVersion"
                  render={({ field }) => (
                    <FormItem className="space-y-0.5 w-full">
                      <FormControl>
                        <Input placeholder="App version" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="appPrivacyPolicy"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Input
                        placeholder="Privacy policy link"
                        {...field}
                        type="url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copyright"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormControl>
                      <Input placeholder="Copy right" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="loginAccess"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-row items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          className="border-black"
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal !my-0">
                        Does app have login access?
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
              {loginAccess && (
                <span className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name="appuserName"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 w-full">
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-0.5 w-full">
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </span>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between bg-gray-300 text-black hover:bg-gray-300/85"
                  >
                    Data collection questionaire
                    <ArrowRight />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-80"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuLabel>
                    <span>
                      <p>Data collection questionaire</p>
                      <p className="text-sm font-light">
                        Specify the data collected by this app.
                      </p>
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {dataCollectionQuestionaire.map((value, index: number) => {
                    return (
                      <DropdownMenuCheckboxItem
                        onSelect={(e) => e.preventDefault()}
                        key={index}
                        checked={selectedItems[index].selected}
                        onCheckedChange={() => handleSelectChange(value.value)}
                      >
                        {value.value}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  apkFile == "loading" ||
                  apkFile == "" ||
                  appLogoImg == "" ||
                  appLogoImg == "loading" ||
                  screenshotImgs.includes("loading") ||
                  screenshotImgs.includes("")
                }
                className="w-full bg-black hover:bg-black/85"
              >
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                Create app
              </Button>
            </div>
            <div className="mt-2 w-72 relative bottom-5">
              <p className="text-center w-40">Upload APK</p>
              <label
                className="grid relative items-center w-40 h-40 rounded-3xl border border-border"
                tabIndex={0}
                aria-label="Add apk file"
              >
                {!apkFile ? (
                  <p className="text-4xl text-center text-muted-foreground">
                    +
                  </p>
                ) : (
                  <span className="w-40 h-40 flex items-center justify-center">
                    {apkFile == "loading" ? (
                      <span>
                        <Loader className="animate-spin opacity-50" size={40} />
                      </span>
                    ) : (
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
                          {apkFile?.split("/")?.pop()}
                        </span>
                      </div>
                    )}
                  </span>
                )}
                <FormField
                  control={form.control}
                  name="apk"
                  render={({
                    field: { onChange, onBlur, value, name, ref, disabled },
                  }) => (
                    <FormItem className="space-y-0.5 hidden">
                      <FormControl>
                        <input
                          accept=".apk"
                          type="file"
                          hidden
                          onChange={(e) => {
                            onChange(e);
                            handleAPKUpload(e.target.files?.[0]);
                          }}
                          ref={ref}
                          disabled={disabled}
                          name={name}
                          onBlur={onBlur}
                          value={value}
                        />
                      </FormControl>
                      <FormMessage className="absolute" />
                    </FormItem>
                  )}
                />
              </label>
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors?.appLogo?.message as string}
              </p>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}

export default function Test() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
}
