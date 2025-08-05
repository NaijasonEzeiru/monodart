import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatToUSD(amount: number | undefined) {
  if (amount == undefined) {
    return undefined;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatUTCDate(isoString: string | null): string {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}

export function timeAgo(isoString: string): string {
  const past = new Date(isoString);

  if (isNaN(past.getTime())) {
    throw new Error("Invalid ISO date string");
  }

  const now = new Date();
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export const convertToWebP = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Optional: resize image (max width)
        const maxWidth = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to WebP and compress
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject("Conversion failed");
            const webpFile = new File([blob], "image.webp", {
              type: "image/webp",
            });
            resolve(webpFile);
          },
          "image/webp",
          0.7 // Compression level: 0 (high compression) - 1 (low compression)
        );
      };

      img.onerror = reject;
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const dataCollectionQuestionaire = [
  { value: "Location service", selected: false, label: "location" },
  { value: "Personal information", selected: false, label: "personalInfo" },
  { value: "Payment information", selected: false, label: "paymentInfo" },
  { value: "Device information", selected: false, label: "deviceInfo" },
  { value: "GPS tracking", selected: false, label: "gps" },
  { value: "Images data", selected: false, label: "phot" },
  { value: "Biometrics data", selected: false, label: "biometric" },
  { value: "User contacts", selected: false, label: "contacts" },
] as const;
