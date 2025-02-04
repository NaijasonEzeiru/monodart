import { Separator } from "../ui/separator";

export default function Business() {
  return (
    <div className="border border-border mt-10">
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Business name</p>
        <span className="w-40">
          <p>Real beccans limited</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Business certificate</p>
        <span className="w-40">
          <p>docs.x</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Logo.dcs</p>
        <span className="w-40">
          <p>Real beccans limited</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
    </div>
  );
}
