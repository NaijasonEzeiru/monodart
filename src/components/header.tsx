"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

function Header() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <header className="fixed lg:bg-black w-full bg-background backdrop-blur-sm z-40 text-center py-8">
      <nav className="mx-auto px-7 sm:px-16 lg:px-24">
        <div className="flex h-16 items-center justify-between lg:justify-normal">
          <Link href="/" className="text-white">
            <svg
              width="65"
              height="48"
              viewBox="0 0 65 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:hidden"
            >
              <rect width="65" height="48" fill="currentColor" />
              <path
                d="M31.7754 16.8767C31.7754 12.5179 28.2419 8.98438 23.883 8.98438V8.98438C19.5242 8.98438 15.9907 12.5179 15.9907 16.8767V48.0008H31.7754V16.8767Z"
                fill="black"
              />
              <path
                d="M33.5 16.5666C33.5 12.379 36.8947 8.98438 41.0822 8.98438V8.98438C45.2697 8.98438 48.6644 12.379 48.6644 16.5666V48.0008H33.5V16.5666Z"
                fill="black"
              />
              <path
                d="M43.6437 42.1176L32.8262 32L32.741 48H49.9043L43.6437 42.1176Z"
                fill="currentColor"
              />
              <path
                d="M21.489 42.0347L32.6542 32L32.7421 47.8689H15.0273L21.489 42.0347Z"
                fill="currentColor"
              />
              <rect
                x="3.37695"
                y="37.5703"
                width="55.8325"
                height="10.4262"
                fill="currentColor"
              />
            </svg>
            <svg
              width="65"
              height="48"
              viewBox="0 0 65 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hidden lg:block text-black"
            >
              <rect width="65" height="48" fill="currentColor" />
              <path
                d="M31.7754 16.8767C31.7754 12.5179 28.2419 8.98438 23.883 8.98438V8.98438C19.5242 8.98438 15.9907 12.5179 15.9907 16.8767V48.0008H31.7754V16.8767Z"
                fill="white"
              />
              <path
                d="M33.5 16.5666C33.5 12.379 36.8947 8.98438 41.0822 8.98438V8.98438C45.2697 8.98438 48.6644 12.379 48.6644 16.5666V48.0008H33.5V16.5666Z"
                fill="white"
              />
              <path
                d="M43.6437 42.1176L32.8262 32L32.741 48H49.9043L43.6437 42.1176Z"
                fill="currentColor"
              />
              <path
                d="M21.489 42.0347L32.6542 32L32.7421 47.8689H15.0273L21.489 42.0347Z"
                fill="currentColor"
              />
              <rect
                x="3.37695"
                y="37.5703"
                width="55.8325"
                height="10.4262"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpenNav(!openNav)}
            aria-expanded={openNav}
            className="lg:hidden"
          >
            <svg
              width="9"
              height="34"
              viewBox="0 0 9 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.417969 16.9987C0.417969 18.1038 0.848177 19.1636 1.61395 19.945C2.37972 20.7264 3.41833 21.1654 4.5013 21.1654C5.58427 21.1654 6.62288 20.7264 7.38865 19.945C8.15443 19.1636 8.58463 18.1038 8.58463 16.9987C8.58463 15.8936 8.15443 14.8338 7.38865 14.0524C6.62288 13.271 5.58427 12.832 4.5013 12.832C3.41833 12.832 2.37972 13.271 1.61395 14.0524C0.848177 14.8338 0.417969 15.8936 0.417969 16.9987ZM0.417969 4.4987C0.417969 5.60377 0.848177 6.66357 1.61395 7.44498C2.37972 8.22638 3.41833 8.66536 4.5013 8.66536C5.58427 8.66536 6.62288 8.22638 7.38865 7.44498C8.15443 6.66357 8.58463 5.60377 8.58463 4.4987C8.58463 3.39363 8.15443 2.33382 7.38865 1.55242C6.62288 0.771018 5.58427 0.332031 4.5013 0.332031C3.41833 0.332031 2.37972 0.771018 1.61395 1.55242C0.848177 2.33382 0.417969 3.39363 0.417969 4.4987ZM0.417969 29.4987C0.417969 30.6038 0.848177 31.6636 1.61395 32.445C2.37972 33.2264 3.41833 33.6654 4.5013 33.6654C5.58427 33.6654 6.62288 33.2264 7.38865 32.445C8.15443 31.6636 8.58463 30.6038 8.58463 29.4987C8.58463 28.3936 8.15443 27.3338 7.38865 26.5524C6.62288 25.771 5.58427 25.332 4.5013 25.332C3.41833 25.332 2.37972 25.771 1.61395 26.5524C0.848177 27.3338 0.417969 28.3936 0.417969 29.4987Z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <div
            className={`${
              !openNav && "-translate-y-full"
            } flex bg-background text-foreground lg:pl-52 lg:pr-0 lg:justify-between items-center justify-center lg:h-auto bg-customRed py-6 px-14 lg:gap-6 w-full left-0 fixed h-screen text-xl gap-12 transition-transform top-0 lg:static lg:translate-y-0 lg:py-0 lg:text-lg flex-col lg:flex-row z-50 duration-500 lg:bg-black lg:text-white`}
          >
            <button
              aria-expanded={openNav}
              onClick={() => setOpenNav((prev) => !prev)}
              id="close"
              className="text-4xl right-12 top-12 fixed lg:hidden"
            >
              X
            </button>
            <span className="flex flex-col lg:flex-row gap-12 lg:gap-4">
              <Link href="/dashboard" className="px-3 hover:opacity-65">
                Developers
              </Link>
              <Link
                href="https://monodat.com"
                className="px-3 hover:opacity-65"
              >
                Monodat
              </Link>
              {/* <Link href="#" className="px-3 hover:opacity-65">
                Payments
              </Link> */}
              {/* <Link href="#" className="px-3 hover:opacity-65">
                Categories
              </Link> */}
            </span>
            <span className="flex flex-col lg:flex-row gap-12 lg:gap-4">
              <Link
                href="#"
                className="bg-blue-600 rounded-full text-white px-8 py-2 hover:bg-blue-700 transition-colors lg:w-fit w-full text-center hover:no-underline"
              >
                Download
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
}

// function AuthButton() {
//   const { user, signingOut, authChecking, signout } = useContext(AuthContext);
//   // TODO: design disabled button

//   if (authChecking) {
//     return (
//       <Button
//         disabled
//         className="bg-[#D9D9D9] hover:bg-gray-300 text-black rounded-full px-8 py-2 transition-colors lg:w-fit w-full text-center hover:no-underline"
//       >
//         <Loader className="animate-spin" />
//       </Button>
//     );
//   } else if (user) {
//     return (
//       <button className="bg-[#D9D9D9] hover:bg-gray-300 text-black rounded-full px-8 py-2 transition-colors lg:w-fit w-full text-center hover:no-underline">
//         Log out
//       </button>
//     );
//   } else if (!user) {
//     return (
//       <Link
//         href="/auth/login"
//         className="bg-[#D9D9D9] hover:bg-gray-300 text-black rounded-full px-8 py-2 transition-colors lg:w-fit w-full text-center hover:no-underline"
//       >
//         Sign in
//       </Link>
//     );
//   } else {
//     return <p>How</p>;
//   }
// }

export default Header;
