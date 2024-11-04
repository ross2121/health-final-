"use client";
import React, { useState } from "react";
import { Label } from "./label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as z from "zod";

// Zod validation schema
const signupSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignupFormDemo() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    name: "",
    hospital: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate form data using Zod
    const validation = signupSchema.safeParse(formdata);
    if (!validation.success) {
      setError(validation.error.issues[0].message); // Display first error message
      setLoading(false);
      return;
    }

    const signupdata = {
      name: formdata.name,
      email: formdata.email,
      password: formdata.password,
      hospital: formdata.hospital,
    };

    try {
      const response = await axios.post("/api/auth", signupdata);
      if (response.status === 200) {
        router.push("/admin/otp");
        localStorage.setItem("tempUserData", JSON.stringify(signupdata));
      }
    } 
    catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        const axiosError = error as { response: { data: { message: string } } };
        if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
          setError(axiosError.response.data.message); 
        } else {
          setError("Signup failed. Please try again later.");
        }
      } else {
        setError("Signup failed. Please try again later.");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto rounded-none md:rounded-2xl flex flex-col justify-center items-center p-4 md:p-8 z-10 shadow-input bg-black">
        <h2 className="font-bold text-2xl text-neutral-300 dark:text-neutral-200">
          Welcome to HealthWorld
        </h2>
        <p className="text-neutral-400 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Register yourself here so you can be yourself, speak freely, and feel close to the most important people in your life no matter where they are.
        </p>

        {error && (
          <div className="bg-red-500 text-white w-full text-center py-2 rounded-md mb-4">
            {error}
          </div>
        )}

        <form className="sm:my-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 text-white">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                value={formdata.name}
                onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                className="text-white"
                disabled={loading}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4 text-white">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={formdata.email}
              onChange={(e) => setFormdata({ ...formdata, email: e.target.value })}
              disabled={loading}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4 text-white">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={formdata.password}
              onChange={(e) => setFormdata({ ...formdata, password: e.target.value })}
              disabled={loading}
            />
          </LabelInputContainer>
         
          <LabelInputContainer className="mb-4 text-white">
            <Label htmlFor="hospital">Hospital</Label>
            <Input
              id="hospital"
              placeholder="KIMS"
              type="text"
              value={formdata.hospital}
              onChange={(e) => setFormdata({ ...formdata, hospital: e.target.value })}
              className="text-white"
              disabled={loading}
            />
          </LabelInputContainer>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing up...." : "Sign up"}
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
  
  );
}

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
