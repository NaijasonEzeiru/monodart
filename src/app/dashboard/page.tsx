// "use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TrendingUp } from "lucide-react";

export default function Page() {
  return (
    <div className="mb-14">
      <div className="flex justify-between font-semibold mb-10">
        <p className="text-xl font-bold">Dashboard</p>
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode" className="text-primary text-xl">
            Account is live
          </Label>
          <Switch
            id="airplane-mode"
            defaultChecked={true}
            disabled
            className="disabled:opacity-100"
          />
        </div>
      </div>
      {/* <div className="flex gap-6 flex-col lg:flex-row text-white">
        <div className="w-full h-96 rounded-[40px] bg-black flex flex-col items-center gap-11 justify-center text-4xl px-3 py-16">
          <h5 className="font-medium">Collection wallet</h5>
          <p className="font-bold">$ 0.00</p>
        </div>
        <div className="w-full h-96 rounded-[40px] bg-black flex flex-col items-center gap-11 justify-center text-4xl px-3 py-16">
          <h5 className="font-medium">Main wallet</h5>
          <p className="font-bold">$ 0.00</p>
        </div>
      </div>
      <div className="mx-auto rounded-[50px] border mt-20 w-3/5 flex items-center justify-between py-14 flex-col gap-12 text-3xl border-black">
        <p>Fund wallet</p>
        <Button className="lg:w-60 lg:h-20 px-10 py-8 bg-black hover:bg-black/85 text-3xl rounded-[50px]">
          Fund
        </Button>
      </div> */}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 mt-10">
        <Card className="bg-sidebar-foreground">
          <CardHeader>
            <CardDescription>Collection wallet</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              This is the total funds accumumlated from your users
            </div>
          </CardFooter>
        </Card>
        <Card className="bg-sidebar-foreground">
          <CardHeader>
            <CardDescription>Main wallet</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between flex-col items-start sm:items-center sm:flex-row">
            <div className="">
              <CardTitle className="text-base font-semibold tabular-nums">
                Add funds easily
              </CardTitle>
              <CardDescription>Top up your balance</CardDescription>
            </div>
            <Button className="self-end">Fund wallet</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
