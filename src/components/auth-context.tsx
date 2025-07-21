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
import { apiAddress } from "@/lib/variables";
import { dataType } from "@/app/@types/data";

// export type TUser = {
//   // id: 2;
//   userUid: string;
//   accountType: string;
//   profileStatus: boolean;
//   firstName: string;
//   lastName: string;
//   userEmail: string;
//   phoneNumber: string;
// } | null;

interface IContext {
  user: dataType | null;
  signingOut: boolean;
  setUser: Dispatch<SetStateAction<dataType | null>>;
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
  const [user, setUser] = useState<dataType | null>(null);
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
    const token = localStorage.getItem("monodat_token");
    if (!token) {
      return;
    }
    try {
      // const res = await fetch(`${apiAddress}/get-user-details`, {
      const res = await fetch(`${apiAddress}/fetch-myapps`, {
        method: "GET",
        // credentials: "include",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await res.json();
      console.log("🚀 ~ file: AuthContext.tsx:56 ~ data:", data);
      setAuthChecking(false);
      if (res.ok && data?.data) {
        setUser(data.data);
      } else {
        localStorage.removeItem("monodat_token");
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
