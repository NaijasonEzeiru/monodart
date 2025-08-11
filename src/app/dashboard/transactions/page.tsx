"use client";

import AuthContext from "@/components/auth-context";
import { Separator } from "@/components/ui/separator";
import { formatToUSD, formatUTCDate } from "@/lib/utils";
import { useContext } from "react";

export default function Page() {
  const { user } = useContext(AuthContext);
  const transactions = user?.[0]?.transactions;

  // const transaction = [
  //   {
  //     id: 2,
  //     userUid: "15dcb241-bb57-41c6-b04b-a05e02b80461",
  //     amount: 66.66666666666667,
  //     narration: "wallet funding",
  //     userEmail: "vowsnig@gmail.com",
  //     type: "wallet funding",
  //     transactionReference: "ref_1753667354578_bvjt7c0h",
  //     createdAt: "2025-07-28T02:00:44.000Z",
  //     updatedAt: "2025-07-28T02:00:44.000Z",
  //   },
  // ];
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Transactions</h1>
      <Separator />
      <div className="max-w-3xl mt-6 space-y-5">
        {transactions && transactions?.length > 0 ? (
          <>
            {transactions?.map((transaction, i) => (
              <div
                className="flex justify-between px-4 py-2 border border-border rounded"
                key={i}
              >
                <div className="flex gap-3">
                  <span className="bg-muted rounded-full items-center size-14 flex justify-center">
                    <svg
                      width="39"
                      height="55"
                      viewBox="0 0 39 55"
                      className="size-8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 35.2867H15.6V0.11828L23.439 0V35.2867H39L19.5 55L0 35.2867Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <div className="">
                    <p className="text-lg font-bold">{transaction.type}</p>
                    <p className="text-sm text-foreground/70">
                      {formatUTCDate(transaction.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="text-lg font-bold">
                    {formatToUSD(transaction.amount)}
                  </p>
                  <p className="bg-primary px-2 rounded-full text-xs text-primary-foreground">
                    successful
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center">No transactions yet.</div>
        )}
      </div>
    </div>
  );
}
