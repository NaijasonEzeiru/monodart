import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Bank() {
  return (
    <>
      <div className="border border-border mt-10">
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Bank name</p>
          <span className="w-40">
            <p>axis bank limited</p>
          </span>
        </div>
        <Separator />
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Account Number</p>
          <span className="w-40">
            <p>66789098778</p>
          </span>
        </div>
        <Separator />
        <div className="py-8 px-16 flex justify-between items-center">
          <p>sort code</p>
          <span className="w-40">
            <p>34563</p>
          </span>
        </div>
      </div>
      <Button className="mt-5 ml-auto flex">Update</Button>
    </>
  );
}
