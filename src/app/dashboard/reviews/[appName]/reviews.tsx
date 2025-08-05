"use client";

import { Review } from "@/app/types/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { timeAgo } from "@/lib/utils";
import { apiAddress } from "@/lib/variables";
import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ReviewsAndRating({ appName }: { appName: string }) {
  const [reviews, setReviews] = useState<Review>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    const token = localStorage.getItem("monodat_token");
    try {
      const res = await fetch(`${apiAddress}/fetch-app-reviews`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appName }),
      });
      const data = await res.json();

      if (res.ok && data?.data) {
        setReviews(data.data);
      } else {
        // localStorage.removeItem("monodat_token");
      }
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mt-6 space-y-5">
      {!!loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div className="flex justify-between gap-7 items-center" key={i}>
            <div className="w-9/12">
              <div className="flex justify-between gap-4 items-center mb-2.5">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-36" />
              </div>
              <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))
      ) : (
        <>
          {reviews.map((review, index) => (
            <Card className="mt-5 border-border" key={index}>
              <CardHeader className="flex justify-between flex-row">
                <span className="flex items-center gap-2">
                  {/* <UserIcon
                    size={44}
                    className="rounded-full shadow-md p-1 border-border"
                  /> */}
                  <span>
                    <p className="text-lg font-medium">{review.reviewerName}</p>
                    <p className="text-sm opacity-70">
                      {timeAgo(review.createdAt)}
                    </p>
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  <p className="text-lg">{review.rating}</p>
                  <span className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        size={16}
                        className="text-yellow-500"
                        fill={i < review.rating ? "gold" : "none"}
                      />
                    ))}
                  </span>
                </span>
              </CardHeader>
              <CardContent>{review.comment}</CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-destructive ml-auto">
                      Respond
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Respond as a developer</DialogTitle>
                    </DialogHeader>
                    <Textarea placeholder="Type response here............" />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Send response</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
            // <div
            //   className="flex justify-between gap-7 items-center"
            //   key={index}
            // >
            //   <div className="w-9/12">
            //     <div className="flex justify-between gap-2 items-center mb-1">
            //       <p className="text-lg font-bold">{review.reviewerName}</p>{" "}
            //       <p className="text-sm opacity-50">
            //         Created on {formatUTCDate(review?.createdAt)}
            //       </p>
            //       <span className="flex items-center gap-1">
            //         <p className="text-lg">{review.rating}</p>
            //         <span className="flex gap-0.5">
            //           {Array.from({ length: 5 }).map((_, i) => (
            //             <StarIcon
            //               key={i}
            //               size={16}
            //               className="text-yellow-500"
            //               fill={i < review.rating ? "gold" : "none"}
            //             />
            //           ))}
            //         </span>
            //       </span>
            //     </div>
            //     <p>{review.comment}</p>
            //   </div>
            //   <Dialog>
            //     <DialogTrigger asChild>
            //       <button className="text-destructive">Respond</button>
            //     </DialogTrigger>
            //     <DialogContent className="sm:max-w-[425px]">
            //       <DialogHeader>
            //         <DialogTitle>Respond as a developer</DialogTitle>
            //       </DialogHeader>
            //       <Textarea placeholder="Type response here............" />
            //       <DialogFooter>
            //         <DialogClose asChild>
            //           <Button variant="outline">Cancel</Button>
            //         </DialogClose>
            //         <Button type="submit">Send response</Button>
            //       </DialogFooter>
            //     </DialogContent>
            //   </Dialog>
            // </div>
          ))}
        </>
      )}
    </div>
  );
}
