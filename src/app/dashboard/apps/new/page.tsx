"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, Minus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const dataCollectionQuestionaire = [
  { value: "Location service" },
  { value: "Personal information" },
  { value: "Payment information" },
  { value: "Device information" },
  { value: "GPS tracking" },
  { value: "Images data" },
  { value: "Biometrics data" },
  { value: "User contacts " },
];

export default function Page() {
  const form = useForm<z.infer<typeof NewAppSchema>>({
    resolver: zodResolver(NewAppSchema),
  });

  const [appLogoImg, setAppLogoImg] = useState("");
  const [screenshotImgs, setScreenshootsImgs] = useState(["", "", "", ""]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAppLogoChange = (img: File | undefined) => {
    if (img) {
      const validate = z
        .any()
        .refine((files) => files.size <= 2000000, "Max image size is 2MB.")
        .safeParse(img);
      if (validate?.error) {
        form.setError("appLogo", {
          type: "server",
          message: validate.error?.issues[0].message,
        });
      }
      setAppLogoImg(URL.createObjectURL(img));
    }
  };

  const handleScreenshotChange = (img: File | undefined, i: number) => {
    if (img) {
      const validate = z
        .any()
        .refine((files) => files.size <= 5000000, "Max image size is 5MB.")
        .safeParse(img);
      if (validate?.error) {
        form.setError("screenShots", {
          type: "server",
          message: validate.error?.issues[0].message,
        });
      }
      const items = [...screenshotImgs];
      items[i] = URL.createObjectURL(img);
      setScreenshootsImgs(items);
    }
  };

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value) ? true : false;
  };

  async function onSubmit(body: z.infer<typeof NewAppSchema>) {
    console.log({ body });
  }

  return (
    <>
      <h1 className="text-4xl font-bold mb-3">Create new Application</h1>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 mt-6 mb-16"
        >
          <div className="grid gap-3 md:grid-cols-2 items-end">
            <FormField
              control={form.control}
              name="appVersion"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormLabel>Enter app version</FormLabel>
                  <FormControl>
                    <Input placeholder="New app version" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatIsNew"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormControl>
                    <Input
                      placeholder="Whats new in this version?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-7 items-end">
            <div className="mt-2">
              App logo
              <label
                className="grid relative items-center w-[132px] h-[132px] rounded-lg border border-border"
                tabIndex={0}
                aria-label="Add image"
              >
                {!appLogoImg ? (
                  <p className="text-4xl text-center text-muted-foreground">
                    +
                  </p>
                ) : (
                  <span className="w-[132px] h-[132px]">
                    <Image
                      src={appLogoImg}
                      alt={`image -`}
                      className="h-full w-full object-cover rounded-lg"
                      width={132}
                      height={132}
                    />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
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
                    <span className="w-[215px] h-[466px]">
                      <Image
                        src={screenshotImgs[i]}
                        alt={`image -`}
                        className="h-full w-full object-cover rounded-lg"
                        width={215}
                        height={466}
                      />
                    </span>
                  )}
                  <input
                    accept="image/*"
                    type="file"
                    hidden
                    onChange={(e) => {
                      handleScreenshotChange(e.target.files?.[0], i);
                    }}
                  />
                </label>
                <p className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors?.screenShots?.[i]?.root
                      ?.message as string
                  }
                </p>
                <button
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
            <Separator />
          </div>
          <div className="max-w-5xl space-y-5">
            <div className="flex gap-7">
              <FormField
                control={form.control}
                name="ageRating"
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
                      <Input placeholder="Age version" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="privacyPolicyLink"
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
              name="copyRight"
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <FormControl>
                    <Input placeholder="Copy right" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-gray-300 text-black hover:bg-gray-300/85"
                  type="button"
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
                      checked={isOptionSelected(value.value)}
                      onCheckedChange={() => handleSelectChange(value.value)}
                    >
                      {value.value}
                    </DropdownMenuCheckboxItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              disabled={form.formState.isSubmitting}
              className="w-full bg-black hover:bg-black/85"
            >
              {form.formState.isSubmitting && (
                <Loader className="animate-spin" />
              )}
              Create app
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
