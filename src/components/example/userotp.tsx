"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {cn} from "@/lib/utils"
// import { useRecoilState } from "recoil";
// import { authState } from "../atoms/atutomath";
import { Input } from "../ui/input";
 // Correct import

const OTPPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [user, setuser] = useState({ value: null });
//   const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const tempUserData = localStorage.getItem("tempUserData");
      if (!tempUserData) {
        throw new Error("No user data found in localStorage.");
      }
      const parsedData = JSON.parse(tempUserData);
      const { name, email, password ,Pincode} = parsedData;

      // Validate that required fields are present
      if (!name || !email || !password) {
        throw new Error("Incomplete user data.");
      }
      // localStorage.clear();
      // Make the API call for OTP verification
      const response = await axios.post(
        "/api/userotp",
        {
          code: otp,
          name,
          email,
          Pincode,
          password,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        // const decodedToken = jwtDecode<{ role: string }>(token);
        // const user=response.data.user;
        // setAuth({
        //   isAuthenticated: true,
        //   role: decodedToken.role,
        //   user: response.data.user,
        //   token: token,
        // });
        localStorage.setItem("authtoken", token);
        localStorage.setItem("user", email);
        localStorage.removeItem("tempUserData");
        console.log(user.role);
        router.push("/");
      } else {
        setError(
          response.data.message || "OTP verification failed. Please try again."
        );
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl flex flex-col justify-center items-center p-4 md:p-8 z-10 shadow-input bg-black">
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <h1 className="text-3xl font-semibold text-white">
          OTP Verification
        </h1>
      </div>
      <div className="space-y-4 mt-5">
        <LabelInputContainer>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className=" placeholder:text-xs text-white placeholder:text-gray-400 w-full inline-block"
            maxLength={6}
            required
            disabled={loading}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Login &rarr;
          <BottomGradient />
        </button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  </div>
  );
  
};
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default OTPPage;