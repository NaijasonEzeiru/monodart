import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex justify-between mb-3">
        <h1 className="text-4xl font-bold">Applications</h1>
        <Button className="bg-[#14720C] rounded-full" asChild>
          <Link
            href="/dashboard/apps/new
          "
            className="hover:no-underline"
          >
            Create new
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="mt-8 space-y-5">
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#DF7104]">Under review</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#14720C]">Active</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#DF7104]">Under review</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#14720C]">Active</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#9E0707]">Removed</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="grid">
            <p className="font-bold">Amadiet . V3.0.4</p>
            <i className="text-muted-foreground text-sm">
              Created on 23 july 2026
            </i>
          </span>
          <span className="grid justify-items-center">
            <p className="font-medium">Status</p>
            <i className="text-[#DF7104]">Under review</i>
          </span>
          <div className="w-24">
            <Button
              className="bg-[#14720C] rounded-full mx-auto block text-3xl"
              size="icon"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
