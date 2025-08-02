import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import ReviewsAndRating from "./reviews";

export default async function page({
  params,
}: {
  params: Promise<{ appName: string }>;
}) {
  const { appName } = await params;

  return (
    <>
      <Link
        href="/dashboard/reviews"
        className="inline-flex items-center justify-center rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-8 w-8 absolute top-4 left-14"
      >
        <ChevronLeftIcon size={24} />
      </Link>
      <h1 className="text-xl font-bold mb-3">Reviews and ratings</h1>
      <Separator />
      <ReviewsAndRating appName={appName} />
    </>
  );
}
