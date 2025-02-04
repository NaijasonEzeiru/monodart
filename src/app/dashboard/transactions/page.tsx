import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-3">Transactions</h1>
      <Separator />
      <div className="">No transactions yet.</div>
    </div>
  );
}
