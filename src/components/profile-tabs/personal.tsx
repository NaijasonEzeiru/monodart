"use client";

import { useContext } from "react";
import AuthContext from "../auth-context";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Personal() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="border border-border mt-10">
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Username</p>
          <span className="w-40">
            <p className="first-letter:capitalize">
              {user?.[0]?.firstName} {user?.[0]?.lastName}
            </p>
          </span>
        </div>
        <Separator />
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Email</p>
          <span className="w-40">
            <p>{user?.[0]?.userEmail}</p>
          </span>
        </div>
        <Separator />
        <div className="py-8 px-16 flex justify-between items-center">
          <p>Phone number</p>
          <span className="w-40">
            <p>{user?.[0]?.phoneNumber}</p>
          </span>
        </div>
      </div>
      <Button className="mt-5 ml-auto flex">Update</Button>
    </>
  );
}
