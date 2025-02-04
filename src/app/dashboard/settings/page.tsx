import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-3">Settings</h1>
      <Separator />
      <div className="border border-border mt-10">
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Password</p>
          <p>Update</p>
        </div>
      </div>
    </>
  );
}
