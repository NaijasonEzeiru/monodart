"use client";

import { App, dataType, Review, screenshots } from "@/app/types/data";
import DownloadCheck from "@/components/download-check";
import Footer from "@/components/footer";
import Header from "@/components/header";
import LoadingPage from "@/components/loading";
import { Progress } from "@/components/ui/progress";
import { dataCollectionQuestionaire, formatUTCDate } from "@/lib/utils";
import { apiAddress } from "@/lib/variables";
import { Star } from "lucide-react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import { Dispatch, SetStateAction } from "react";

export default function Page() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [reviews, setReviews] = useState<Review>([]);
  const [appEditID, setAppEditID] = useState<null | {
    dataCollected: string[];
    screenshots: screenshots;
    appData: App;
  }>(null);

  const { appName } = params;

  function findApp(apps: dataType) {
    const entry = apps[0]; // assuming single element in data array

    const [dataCollected] =
      entry?.dataCollected?.filter((item) => item?.appName === appName) || [];

    const { appName: _, ...rest } = dataCollected;
    console.log(_);

    const trueValues = dataCollectionQuestionaire
      .filter((item) => rest?.[item.label])
      .map((item) => item.value);

    const [screenshots] = entry?.screenshots?.filter(
      (item) => item?.appName == appName
    );

    const appData =
      entry?.updateApp?.find((item) => item?.appName === appName) ||
      entry.newApp.find((item) => item?.appName === appName)!;

    console.log({ appData });

    setAppEditID({
      dataCollected: trueValues,
      screenshots,
      appData,
    });
  }

  useEffect(() => {
    getReviews();
    fetchReviews();
  }, []);

  const getReviews = async () => {
    try {
      setLoadingReview(true);
      const res = await fetch(`${apiAddress}/fetch-apps-inreview`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("monodat_token"),
        },
      });
      const response = await res.json();
      if (res.ok) {
        console.log({ res });
        findApp(response.data);
        // setApps(response?.data);
        setLoadingReview(false);
      } else {
        // setOpenDialog(false);
      }
    } catch (err) {
      toast.error("Unable to get apps. Something went wrong", {
        description: "Please try again",
      });
      // setOpenDialog(false);
      console.error({ err });
    }
  };

  async function fetchReviews() {
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

  if (loading) {
    return <LoadingPage />;
  }

  if (!appEditID) {
    return notFound();
  }

  return (
    <>
      <Header />
      <main className="pb-20 md:pb-32">
        <section className="px-6 sm:px-28 lg:px-48 lg:text-white pt-40 lg:pt-48 rounded-lg w-full z-50 flex flex-col md:rounded-none mb-9 lg:bg-black">
          <div className="flex gap-3">
            <Image
              width={83}
              height={83}
              alt={`${appEditID.appData.appName} logo`}
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID?.appData?.appLogo}`}
              className="mb-2 border border-border rounded-md md:hidden"
            />
            <h1 className="font-semibold text-lg md:text-3xl md:font-medium">
              <span className="font-bold">{appEditID.appData.appName}</span>:{" "}
              {appEditID.appData.appCat}
            </h1>
          </div>
          <p className="text-lg text-[#29940E] mb-6">
            Tiktok inc. - contains ads
          </p>
          <div className="flex gap-10 justify-between items-start">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4 md:gap-7 mb-3.5 items-center md:mb-8 font-Russo">
                <Image
                  alt={`${appEditID.appData.appName} logo`}
                  width={75}
                  height={75}
                  src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID?.appData?.appLogo}`}
                  className="size-11 md:size-24 md:mr-5 border border-border rounded-md hidden md:block"
                />
                <span className="flex flex-col justify-between md:justify-center text-xs md:text-lg py-1 border-r border-[#9B9B9B] pr-5 md:h-fit">
                  <span className="flex gap-1 items-center">
                    4.5
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      className="w-2.5 h-2 md:w-4 md:h-3"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.00038 11.1236L3.98695 12.9162C3.84508 12.9795 3.68517 13.0079 3.52531 12.9981C3.36544 12.9883 3.21199 12.9407 3.08231 12.8607C2.95264 12.7806 2.8519 12.6714 2.79149 12.5452C2.73108 12.4191 2.71341 12.2811 2.74048 12.1469L3.50674 8.35021L0.259568 5.6607C0.144695 5.56562 0.0634474 5.44511 0.0250213 5.31281C-0.0134049 5.18052 -0.00747442 5.04173 0.0421412 4.91216C0.0917569 4.78258 0.183076 4.66739 0.305762 4.57963C0.428448 4.49187 0.5776 4.43504 0.736336 4.41558L5.22311 3.86162L7.22982 0.407235C7.30072 0.28501 7.41047 0.182087 7.54665 0.110115C7.68283 0.0381445 7.84001 0 8.00038 0C8.16076 0 8.31794 0.0381445 8.45412 0.110115C8.5903 0.182087 8.70005 0.28501 8.77094 0.407235L10.7777 3.86162L15.2644 4.41631C15.423 4.43587 15.5719 4.49272 15.6945 4.58044C15.817 4.66815 15.9082 4.78323 15.9578 4.91267C16.0074 5.04211 16.0134 5.18076 15.9751 5.31295C15.9368 5.44513 15.8558 5.56559 15.7412 5.6607L12.4932 8.35021L13.2594 12.1469C13.2864 12.281 13.2687 12.4189 13.2083 12.5449C13.1479 12.6709 13.0473 12.7801 12.9177 12.8601C12.7882 12.9401 12.6349 12.9877 12.4752 12.9976C12.3155 13.0075 12.1557 12.9793 12.0138 12.9162L8.00038 11.1236Z"
                        fill="#C7920F"
                      />
                    </svg>
                  </span>
                  <p>6.5k Reviews</p>
                </span>
                <span className="flex flex-col justify-between md:justify-center md:items-center text-xs md:text-lg py-1 border-r border-[#9B9B9B] pr-5 md:h-fit">
                  <p>200k+</p>
                  <p>Downloads</p>
                </span>
                <span className="flex flex-col justify-between md:justify-center text-xs md:text-lg py-1">
                  <p>{appEditID.appData.rating}+</p>
                  <p>Rated {appEditID.appData.rating}y+</p>
                </span>
              </div>
              <DownloadCheck />
            </div>
            <Image
              alt={`${appEditID.appData.appName} logo`}
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID?.appData?.appLogo}`}
              width={250}
              height={250}
              className="rounded-3xl border border-border hidden lg:block mt-9"
            />
          </div>
          <div id="downloadCheck"></div>
        </section>
        <section className="px-6 sm:px-28 lg:px-48">
          <p className="mb-2 text-[1.375rem] md:mb-4">
            {appEditID.appData.appName} in screenshots
          </p>
          <div className="overflow-x-auto mb-11 gap-2 md:gap-6 flex w-full">
            <Image
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID.screenshots.screenshot1}`}
              alt={`screenshot 1`}
              className="w-60 h-96 object-contain shadow rounded-[50px] flex-none"
              width={240}
              height={384}
            />
            <Image
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID.screenshots.screenshot2}`}
              alt={`screenshot 2`}
              className="w-60 h-96 object-contain shadow rounded-[50px] flex-none"
              width={240}
              height={384}
            />
            <Image
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID.screenshots.screenshot3}`}
              alt={`screenshot 3`}
              className="w-60 h-96 object-contain shadow rounded-[50px] flex-none"
              width={240}
              height={384}
            />
            <Image
              src={`https://www.huntersapp.xyz/developers.monodat.com/${appEditID.screenshots.screenshot4}`}
              alt={`screenshot 4`}
              className="w-60 h-96 object-contain shadow rounded-[50px] flex-none"
              width={240}
              height={384}
            />
          </div>
          <div className="pt-8 space-y-5 md:space-y-8 md:text-[1.375rem] md:font-medium">
            {appEditID.appData?.whatsNew && (
              <>
                <h4 className="text-lg md:text-2xl font-extrabold">
                  What&apos;s new{" "}
                  <span className="text-sm font-normal">
                    updated on {formatUTCDate(appEditID?.appData.updatedAt)}
                  </span>
                </h4>
                <p>{appEditID.appData.whatsNew}</p>
              </>
            )}

            <h4 className="text-lg md:text-2xl font-extrabold">
              About this app
            </h4>
            <p>
              Discord is designed for gaming and great for just chilling with
              friends or building a community. Customize your own space and
              gather your friends to talk while playing your favorite games, or
              just hang out.
            </p>
            <div>
              <h4 className="">GROUP CHAT THAT&apos;S ALL FUN &amp; GAMES</h4>
              <p>
                Discord is great for playing games and chilling with friends, or
                even building a worldwide community. Customize your own space to
                talk, play, and hang out in.
              </p>
            </div>
            <div>
              <h4 className="">MAKE YOUR GROUP CHATS MORE FUN</h4>
              <p>
                Create custom emoji, stickers, soundboard effects, and more to
                add your personality to voice, video, or text chat. Set your
                avatar, a custom status, and write your own profile to show up
                in chat your way.
              </p>
            </div>
            <div>
              <h4 className="">STREAM LIKE YOU&apos;RE IN THE SAME ROOM</h4>
              <p>
                High-quality and low-latency streaming makes it feel like
                you&apos;re hanging out on the couch with friends while playing
                a game, watching shows, looking at photos, or idk doing homework
                or something.
              </p>
            </div>
            <div>
              <h4 className="">
                HOP IN WHEN YOU&apos;RE FREE, NO NEED TO CALL
              </h4>
              <p>
                Easily hop in and out of voice or text chats without having to
                call or invite anyone, so you can chat with your friends before,
                during, and after your game session.
              </p>
            </div>
            <div>
              <h4 className="">SEE WHO&apos;S AROUND TO CHILL</h4>
              <p>
                See who&apos;s around, playing games, or just hanging out. For
                supported games, you can see what modes or characters your
                friends are playing and directly join up.
              </p>
            </div>
            <div>
              <h4 className="">ALWAYS HAVE SOMETHING TO DO TOGETHER</h4>
              <p>
                Watch videos, play built-in games, listen to music, or just
                scroll together and spam memes. Seamlessly text, call, video
                chat, and play games, all in one group chat.
              </p>
            </div>
            <div>
              <h4 className="">WHEREVER YOU GAME, HANG OUT HERE</h4>
              <p>
                On your PC, phone, or console, you can still hang out on
                Discord. Easily switch between devices and use tools to manage
                multiple group chats with friends.
              </p>
            </div>
          </div>
          <div className="bg-white py-5 space-y-5 md:space-y-8 md:text-[1.375rem] md:font-medium md:py-20">
            <div>
              <h4 className="md:text-2xl font-bold">Data safety</h4>
              <p>
                This app may collect the following information. The developer
                provided this information and may update it over time. This app
                may share these data types with third parties
              </p>
              <ul className="list-disc list-inside mt-2">
                This app may collect these data types
                <li>You can request that data be deleted</li>
                <li>Data is encrypted in transit</li>
                <li>{appEditID.dataCollected.join(", ")}.</li>
              </ul>
            </div>

            <div>
              <h4 className="md:text-2xl font-bold md:pt-3">
                Ratings and reviews
              </h4>
              <span className="flex items-center gap-2">
                <p>5</p> <Progress value={100} className="w-1/2 max-w-96" />
              </span>
              <span className="flex items-center gap-2">
                <p>4</p> <Progress value={80} className="w-1/2 max-w-96" />
              </span>
              <span className="flex items-center gap-2">
                <p>3</p> <Progress value={60} className="w-1/2 max-w-96" />
              </span>
              <span className="flex items-center gap-2">
                <p>2</p> <Progress value={40} className="w-1/2 max-w-96" />
              </span>
              <span className="flex items-center gap-2">
                <p>1</p> <Progress value={20} className="w-1/2 max-w-96" />
              </span>
            </div>
            {loadingReview ? (
              <p>Loading...</p>
            ) : (
              <>
                <h4 className="md:text-2xl font-bold">
                  {reviews.length} Review(s)
                </h4>
                {reviews.map((review, index) => (
                  <div key={index}>
                    <div>
                      <span className="text-sm md:text-base font-medium flex gap-2 items-center mb-2">
                        <p>{review.reviewerName}</p>
                        <span className="flex">
                          {Array.from({ length: review.rating }).map(
                            (_, index) => (
                              <Star
                                fill="#136A2F"
                                strokeWidth={0}
                                size={12}
                                key={index}
                              />
                            )
                          )}
                        </span>
                        <p className="text-[#959191] ml-3">
                          {formatUTCDate(review?.createdAt)}
                        </p>
                      </span>
                      <p className="text-sm md:text-base font-medium">
                        {review.comment}
                      </p>
                    </div>
                    {review.developerResponse && (
                      <div className="text-sm md:text-base font-medium ml-4">
                        <span className="flex gap-2 items-center mb-1">
                          <p>{appEditID.appData.appName}</p>
                          <p className="text-[#959191] ml-3">
                            October 25, 2024
                          </p>
                        </span>
                        <p>{review.developerResponse}</p>
                      </div>
                    )}
                  </div>
                ))}
                <p className="text-center text-primary">See all reviews</p>
              </>
            )}
            {/* <div>
              <h4 className="md:text-2xl font-bold">6.5k Reviews</h4>
              <span className="text-sm md:text-base font-medium flex gap-2 items-center mb-2">
                <p>Cheezy Chooter</p>
                <span className="flex">
                  <Star fill="#136A2F" strokeWidth={0} size={12} />
                  <Star fill="#136A2F" strokeWidth={0} size={12} />
                  <Star fill="#136A2F" strokeWidth={0} size={12} />
                </span>
                <p className="text-[#959191] ml-3">October 25, 2024</p>
              </span>
              <p className="text-sm md:text-base font-medium">
                it works, but there&apos;s a lot of lag and glitches on mobile.
                Sometimes, the keyboard wouldn&apos;t appear at all suddenly,
                and the only fix I found was restarting the app. Switching
                between servers is very slow, as well as between text channels
                at times. I&apos;ve got real fast 100+ MBP/s connection and a
                beefy phone, so it makes me sad that the app just runs so slowly
                at times
              </p>
            </div>
            <div className="text-sm md:text-base font-medium ml-4">
              <span className="flex gap-2 items-center mb-1">
                <p>Discord Inc.</p>
                <p className="text-[#959191] ml-3">October 25, 2024</p>
              </span>
              <p>
                If reinstalling the app and restarting your device hasn&apos;t
                helped, please check this article for more steps:
                https://support.discord.com/hc/en-us/articles/13148417007767
              </p>
            </div>
            <p className="text-center text-primary">See all reviews</p> */}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
