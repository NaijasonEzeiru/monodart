"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { useRouter } from "next/navigation";

export type TUser = {
  // userUid: string;
  // id: number;
  // lastLoginCode: number;
  accountType: "user";
  // profileStatus: boolean;
  firstName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  // updatedAt: string;
  // createdAt: string;
} | null;

interface IContext {
  user: TUser;
  signingOut: boolean;
  setUser: Dispatch<SetStateAction<TUser>>;
  authChecking: boolean;
  signout?: () => Promise<void>;
  checkUserLoggedIn?: () => Promise<void>;
}

const AuthContext = createContext<IContext>({
  user: null,
  signingOut: false,
  authChecking: true,
  setUser: () => null,
  // checkUserLoggedIn: () => await new Promise,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser>(null);
  const [signingOut, setSigningOut] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const router = useRouter();

  const signout = async () => {
    setSigningOut(true);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setSigningOut(false);
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    // "use cache";
    // cacheTag("me");
    try {
      const res = await fetch("/api/auth/login", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
      setAuthChecking(false);
      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        console.log("failed");
        setUser(null);
      }
    } catch (error) {
      setAuthChecking(false);
      setUser(null);
      console.log("Auth check failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signingOut,
        authChecking,
        setUser,
        signout,
        checkUserLoggedIn,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export default AuthContext;
