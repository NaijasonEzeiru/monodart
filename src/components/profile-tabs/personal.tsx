import { Separator } from "../ui/separator";

export default function Personal() {
  return (
    <div className="border border-border mt-10">
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Username</p>
        <span className="w-40">
          <p>Michael adeniyi </p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Email</p>
        <span className="w-40">
          <p>vowsnig@gmail.com</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Phone number</p>
        <span className="w-40">
          <p>07062466015</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
    </div>
  );
}
