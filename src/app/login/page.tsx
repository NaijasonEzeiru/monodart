import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium text-white"
        >
          <svg
            width="65"
            height="48"
            viewBox="0 0 65 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
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
          Monodat
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
