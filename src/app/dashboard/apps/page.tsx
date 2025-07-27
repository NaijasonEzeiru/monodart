"use client";

import { App, dataCollected, screenshots } from "@/app/types/data";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import type { appData, dataCollected, screenshots } from "@/lib/types";
import { apiAddress } from "@/lib/variables";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Filter from "./filter";
import UpdateApp from "./update-app";

export default function Page() {
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
      <Tabs defaultValue="all" className="w-full mt-8">
        <TabsList className="flex justify-between bg-transparent">
          <TabsTrigger
            className="text-xl font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:size-3 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-1 data-[state=active]:after:rounded-full"
            value="all"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            className="text-xl font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:size-3 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-1 data-[state=active]:after:rounded-full"
            value="Pending Review"
          >
            Pending Review
          </TabsTrigger>
          <TabsTrigger
            className="text-xl font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:size-3 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-1 data-[state=active]:after:rounded-full"
            value="Active"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            className="text-xl font-medium text-black data-[state=active]:after:content-[''] data-[state=active]:after:size-3 data-[state=active]:after:bg-primary relative data-[state=active]:after:absolute data-[state=active]:after:-bottom-1 data-[state=active]:after:rounded-full"
            value="Rejected"
          >
            Rejected
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Filter setAppEditID={setAppEditID} />
        </TabsContent>
        <TabsContent value="Pending Review">
          <Filter setAppEditID={setAppEditID} filter="Pending Review" />
        </TabsContent>
        <TabsContent value="Active">
          <Filter setAppEditID={setAppEditID} filter="Active" />
        </TabsContent>
        <TabsContent value="Rejected">
          <Filter setAppEditID={setAppEditID} filter="Rejected" />
        </TabsContent>
      </Tabs>
    </>
  );
}
