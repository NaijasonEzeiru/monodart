"use client";

import AuthContext from "@/components/auth-context";
import { Separator } from "@/components/ui/separator";
import { formatUTCDate } from "@/lib/utils";
import Link from "next/link";
import { useContext } from "react";

export default function Page() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold">App Review</h1>
      </div>
      <Separator />
      <div className="mt-8 space-y-5">
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
                  <i className="text-[#CF8B0D]">{app?.status}</i>
                </span>
                <Link
                  href={`/dashboard/reviews/${app?.appName}`}
                  className="rounded-full bg-primary text-primary-foreground px-3 py-1"
                >
                  see reviews
                </Link>
              </div>
            ))}
      </div>
    </>
  );
}
