import { Search } from "lucide-react";
import Image from "next/image";
import TopApps from "./top-apps";
import { Input } from "./ui/input";

function Hero() {
  return (
    <section className="bg-background lg:bg-black px-10 sm:px-16 lg:px-24 pt-32 lg:pb-60 text-white">
      <div className="mt-6 mb-4 relative">
        <Input
          placeholder="Search store..."
          className="bg-border/10 w-full lg:w-44 rounded-full placeholder:text-center lg:placeholder:text-right text-sm border-gray-500 h-10 lg:border-none"
        />
        <Search className="absolute lg:opacity-70 bottom-2 lg:left-2 right-3 text-gray-600" />
      </div>
      <div className="flex gap-24">
        <div className="bg-gradient-to-tr from-[#8F3308] to-[#741954] rounded-[30px] pl-16 pr-8 pt-12 lg:pt-32 lg:pb-20 pb-20 relative w-full">
          <Image
            alt="computer codes"
            src="/code.png"
            width={274}
            height={188}
            className="w-20 h-16 lg:w-64 lg:h-44"
          />
          <Image
            alt="computer codes"
            src="/coding.png"
            width={86}
            height={94}
            className="hidden xl:block absolute left-[57%] top-36 -translate-x-1/2"
          />
          <p className="text-xl sm:text-3xl lg:text-4xl xl::text-[70px] mt-11 lg:leading-tight">
            Software <br /> for everyone <br /> and everything.
          </p>
          <Image
            alt="computer codes"
            src="/robot.png"
            width={435}
            height={403}
            className="w-20 h-24 sm:w-40 sm:h-48 md:w-52 md:h-72 xl:w-[435px] xl:h-[403px] absolute right-9 bottom-14"
          />
        </div>
        <div className="hidden lg:flex flex-col w-max justify-between gap-2">
          <TopApps />
          <TopApps />
          <TopApps />
          <TopApps />
          <TopApps />
        </div>
      </div>
    </section>
  );
}

export default Hero;
