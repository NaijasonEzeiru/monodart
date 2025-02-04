import { Separator } from "../ui/separator";

export default function Bank() {
  return (
    <div className="border border-border mt-10">
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Bank name</p>
        <span className="w-40">
          <p>axis bank limited</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Account Number</p>
        <span className="w-40">
          <p>66789098778</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>sort code</p>
        <span className="w-40">
          <p>34563</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
    </div>
  );
}
