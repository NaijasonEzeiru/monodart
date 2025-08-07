import { Facebook, Instagram, Mail, Youtube } from "lucide-react";
import Image from "next/image";
import React from "react";

function Footer() {
  return (
    <>
      <footer className="hidden sm:block bg-black text-white pt-16 sm:pt-24 lg:pt-32 pb-24 px-10 sm:px-16 lg:px-24">
        <span className="flex flex-col md:flex-row sm:mb-20 lg:mb-32 gap-5 md:gap-14">
          <p className="text-2xl font-medium md:font-semibold">Monodat inc.</p>
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
        <div className="[&_h4]:text-[22px] [&_h4]:font-semibold [&_h4]:mb-2 sm:[&_h4]:mb-5 lg:[&_h4]:mb-9 [&_a]:text-lg grid gap-10 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-4 justify-between">
          <span className="flex flex-col gap-3 sm:gap-4 lg:gap-6">
            <h4>Monodat</h4>
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
            <a href="/dashboard">Developers</a>
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
      <div className="sm:hidden fixed -translate-x-1/2 left-1/2 bottom-0 bg-white gap-3 flex justify-evenly py-4 rounded-t-2xl shadow w-screen border-t border-border">
        <button
          // href={link.href}
          // {...(activeLink.endsWith(link.href.toLowerCase())
          //   ? { "data-active": "" }
          //   : { "data-inactive": "" })}
          className="flex items-center flex-col text-xs data-[active]:text-primary data-[active]:scale-110 data-[active]:font-medium"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.83594C0 8.2695 0.622264 6.76723 1.7299 5.65959C2.83754 4.55195 4.33982 3.92969 5.90625 3.92969H17.7188C19.2852 3.92969 20.7875 4.55195 21.8951 5.65959C23.0027 6.76723 23.625 8.2695 23.625 9.83594V23.6172C23.625 24.6615 23.2102 25.663 22.4717 26.4014C21.7333 27.1398 20.7318 27.5547 19.6875 27.5547H3.9375C2.89321 27.5547 1.89169 27.1398 1.15327 26.4014C0.414842 25.663 0 24.6615 0 23.6172V9.83594Z"
              fill="url(#paint0_linear_6536_5691)"
            />
            <path
              d="M37.4062 23.6172C38.9727 23.6172 40.475 24.2395 41.5826 25.3471C42.6902 26.4547 43.3125 27.957 43.3125 29.5234V41.3359C43.3125 42.9024 42.6902 44.4047 41.5826 45.5123C40.475 46.6199 38.9727 47.2422 37.4062 47.2422H23.625C22.5807 47.2422 21.5792 46.8273 20.8408 46.0889C20.1023 45.3505 19.6875 44.349 19.6875 43.3047V27.5547C19.6875 26.5104 20.1023 25.5089 20.8408 24.7705C21.5792 24.032 22.5807 23.6172 23.625 23.6172H37.4062Z"
              fill="url(#paint1_linear_6536_5691)"
            />
            <path
              d="M23.625 43.3047C23.625 44.349 23.2102 45.3505 22.4717 46.0889C21.7333 46.8273 20.7318 47.2422 19.6875 47.2422H5.90625C4.33982 47.2422 2.83754 46.6199 1.7299 45.5123C0.622264 44.4047 0 42.9024 0 41.3359V27.5547C0 26.5104 0.414842 25.5089 1.15327 24.7705C1.89169 24.032 2.89321 23.6172 3.9375 23.6172H19.6875C20.7318 23.6172 21.7333 24.032 22.4717 24.7705C23.2102 25.5089 23.625 26.5104 23.625 27.5547V43.3047Z"
              fill="url(#paint2_linear_6536_5691)"
            />
            <path
              d="M30.28 1.73124C30.8285 1.18239 31.4798 0.747002 32.1966 0.449948C32.9134 0.152895 33.6817 0 34.4577 0C35.2336 0 36.0019 0.152895 36.7188 0.449948C37.4356 0.747002 38.0869 1.18239 38.6354 1.73124L45.5339 8.62974C46.6411 9.73732 47.2631 11.2393 47.2631 12.8055C47.2631 14.3716 46.6411 15.8736 45.5339 16.9812L38.6432 23.8718C37.5358 24.9778 36.0346 25.5991 34.4695 25.5991C32.9043 25.5991 31.4032 24.9778 30.2957 23.8718L23.3972 16.9654C22.29 15.8578 21.668 14.3558 21.668 12.7897C21.668 11.2236 22.29 9.72157 23.3972 8.61399L30.28 1.73124Z"
              fill="url(#paint3_linear_6536_5691)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_6536_5691"
                x1="0"
                y1="3.92969"
                x2="23.625"
                y2="27.5547"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#B9C0C7" />
                <stop offset="1" stopColor="#889096" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_6536_5691"
                x1="43.3125"
                y1="45.553"
                x2="21.3767"
                y2="23.6172"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#63686E" />
                <stop offset="1" stopColor="#889096" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_6536_5691"
                x1="0"
                y1="23.6172"
                x2="23.625"
                y2="38.8041"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#55595E" />
                <stop offset="1" stopColor="#383B3D" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_6536_5691"
                x1="42.9115"
                y1="19.9146"
                x2="28.264"
                y2="1.84543"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#2764E7" />
                <stop offset="1" stopColor="#36DFF1" />
              </linearGradient>
            </defs>
          </svg>{" "}
          Apps
        </button>
        <button className="flex items-center flex-col text-xs data-[active]:text-primary gap-1 relative top-1 data-[active]:scale-110 data-[active]:font-medium">
          <svg
            width="25"
            height="17"
            viewBox="0 0 25 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.59375 0C6.31455 0 4.12869 0.895533 2.51705 2.48959C0.905411 4.08365 0 6.24566 0 8.5C0 10.7543 0.905411 12.9163 2.51705 14.5104C4.12869 16.1045 6.31455 17 8.59375 17H16.4062C18.6855 17 20.8713 16.1045 22.483 14.5104C24.0946 12.9163 25 10.7543 25 8.5C25 6.24566 24.0946 4.08365 22.483 2.48959C20.8713 0.895533 18.6855 0 16.4062 0H8.59375ZM6.25 5.40909C6.25 5.20415 6.33231 5.0076 6.47882 4.86269C6.62534 4.71778 6.82405 4.63636 7.03125 4.63636C7.23845 4.63636 7.43716 4.71778 7.58368 4.86269C7.73019 5.0076 7.8125 5.20415 7.8125 5.40909V7.72727H10.1562C10.3635 7.72727 10.5622 7.80868 10.7087 7.9536C10.8552 8.09851 10.9375 8.29506 10.9375 8.5C10.9375 8.70494 10.8552 8.90149 10.7087 9.0464C10.5622 9.19132 10.3635 9.27273 10.1562 9.27273H7.8125V11.5909C7.8125 11.7958 7.73019 11.9924 7.58368 12.1373C7.43716 12.2822 7.23845 12.3636 7.03125 12.3636C6.82405 12.3636 6.62534 12.2822 6.47882 12.1373C6.33231 11.9924 6.25 11.7958 6.25 11.5909V9.27273H3.90625C3.69905 9.27273 3.50034 9.19132 3.35382 9.0464C3.20731 8.90149 3.125 8.70494 3.125 8.5C3.125 8.29506 3.20731 8.09851 3.35382 7.9536C3.50034 7.80868 3.69905 7.72727 3.90625 7.72727H6.25V5.40909ZM20.3125 6.18182C20.3125 6.5917 20.1479 6.98479 19.8549 7.27462C19.5618 7.56445 19.1644 7.72727 18.75 7.72727C18.3356 7.72727 17.9382 7.56445 17.6451 7.27462C17.3521 6.98479 17.1875 6.5917 17.1875 6.18182C17.1875 5.77194 17.3521 5.37885 17.6451 5.08902C17.9382 4.79919 18.3356 4.63636 18.75 4.63636C19.1644 4.63636 19.5618 4.79919 19.8549 5.08902C20.1479 5.37885 20.3125 5.77194 20.3125 6.18182ZM15.625 12.3636C15.2106 12.3636 14.8132 12.2008 14.5201 11.911C14.2271 11.6212 14.0625 11.2281 14.0625 10.8182C14.0625 10.4083 14.2271 10.0152 14.5201 9.72538C14.8132 9.43555 15.2106 9.27273 15.625 9.27273C16.0394 9.27273 16.4368 9.43555 16.7299 9.72538C17.0229 10.0152 17.1875 10.4083 17.1875 10.8182C17.1875 11.2281 17.0229 11.6212 16.7299 11.911C16.4368 12.2008 16.0394 12.3636 15.625 12.3636Z"
              fill="black"
            />
          </svg>
          Games
        </button>
        {/* <button
          className="flex items-center flex-col text-xs data-[active]:text-primary
        data-[active]:scale-110 data-[active]:font-medium"
        >
          <UserIcon className="size-6" />
          Profile
        </button> */}
      </div>
    </>
  );
}

export default Footer;
