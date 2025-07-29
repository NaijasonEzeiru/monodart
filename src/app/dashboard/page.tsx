"use client";

import AuthContext from "@/components/auth-context";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatToUSD } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { useContext } from "react";
import { FundWallet } from "./fund-wallet";

export default function Page() {
  const { user } = useContext(AuthContext);

  return (
    <div className="mb-14">
      <div className="flex justify-between font-semibold mb-10">
        <p className="text-xl font-bold">Dashboard</p>
        <div className="flex items-center space-x-2">
          <Label htmlFor="airplane-mode" className="text-primary text-xl">
            Account is live
          </Label>
          {/* <Switch
            id="airplane-mode"
            defaultChecked={true}
            disabled
            className="disabled:opacity-100"
          /> */}
        </div>
      </div>
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 mt-10">
        <Card className="bg-sidebar-foreground">
          <CardHeader>
            <CardDescription>Collection wallet</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {formatToUSD(user?.[0]?.balance?.balance2)}
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
              {formatToUSD(user?.[0]?.balance?.balance1)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex justify-between flex-col items-start sm:items-center sm:flex-row">
            <div className="">
              <CardTitle className="text-base font-semibold tabular-nums">
                Add funds easily
              </CardTitle>
              <CardDescription>Top up your balance</CardDescription>
            </div>
            <FundWallet />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
