import { Separator } from "@/components/ui/separator";

export default function page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Transactions</h1>
      <Separator />
      <div className="text-center mt-4">No transactions yet.</div>
    </div>
  );
}
