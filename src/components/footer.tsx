import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white pt-16 sm:pt-24 lg:pt-32 pb-24 px-10 sm:px-16 lg:px-24">
      <span className="flex flex-col md:flex-row sm:mb-20 lg:mb-32 gap-5 md:gap-14">
        <p className="text-2xl font-medium md:font-semibold">Monodart inc.</p>
        <p className="text-xs font-semibold mb-4 md:text-2xl">
          Lekki, lagos - Nigeria.
        </p>
      </span>
      <span className="md:hidden mb-8 flex gap-2 items-center justify-end">
        <Image
          alt="tiktok icon"
          src="/tiktok-logo.png"
          width={20}
          height={20}
          className="border-2 border-white rounded-full"
        />
        <Instagram className="size-5" />
        <Instagram className="size-5" />
        <Facebook className="size-5" />
      </span>
      <div className="[&_h4]:text-[22px] [&_h4]:font-semibold [&_h4]:mb-2 sm:[&_h4]:mb-5 lg:[&_h4]:mb-9 [&_a]:text-lg grid gap-10 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-5 justify-between">
        <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
          <h4>Monodart</h4>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Community</a>
          <a href="#">Products</a>
        </span>
        <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
          <h4>Store</h4>
          <a href="#">About monostore</a>
          <a href="#">Legal</a>
          <a href="#">Refund policy</a>
        </span>
        <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
          <h4>Developers</h4>
          <a href="#">Payments</a>
          <a href="#">Documentation</a>
          <a href="#">Developers</a>
        </span>
        <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
          <h4>We are social</h4>
          <a href="#">Payments</a>
          <a href="#">Documentation</a>
          <a href="#">Developers</a>
        </span>
        <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
          <h4 className="whitespace-nowrap">Connect with us</h4>
          <span className="mb-8 flex gap-2 sm:gap-4 lg:gap-6 items-center">
            <Youtube className="size-7 lg:size-8" />
            <Facebook className="size-7 lg:size-8" />
            <Instagram className="size-7 lg:size-8" />
            <Mail fill="white" className="size-7 lg:size-8 text-black" />
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
