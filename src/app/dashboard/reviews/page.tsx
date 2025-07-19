import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <>
      <div className="flex justify-between mb-3">
        <h1 className="text-xl font-bold">App Review</h1>
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
            <i className="text-[#CF8B0D]">Under review</i>
          </span>
          <p className="text-[#D00808]">Cancel submission</p>
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
            <i className="text-[#CF8B0D]">Under review</i>
          </span>
          <p className="text-[#D00808]">Cancel submission</p>
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
            <i className="text-[#CF8B0D]">Under review</i>
          </span>
          <p className="text-[#D00808]">Cancel submission</p>
        </div>
      </div>
    </>
  );
}
