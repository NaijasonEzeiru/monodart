"use client";

import { useContext } from "react";
import AuthContext from "../auth-context";
import { Separator } from "../ui/separator";

export default function Personal() {
  const { user } = useContext(AuthContext);
  return (
    <div className="border border-border mt-10">
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Username</p>
        <span className="w-40">
          <p className="first-letter:capitalize">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Email</p>
        <span className="w-40">
          <p>{user?.userEmail}</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
      <Separator />
      <div className="py-8 px-16 flex justify-between items-center">
        <p>Phone number</p>
        <span className="w-40">
          <p>{user?.phoneNumber}</p>
          <p className="text-right text-[#0C710C] font-semibold">Change</p>
        </span>
      </div>
    </div>
  );
}
