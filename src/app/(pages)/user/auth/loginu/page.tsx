import LoginForm from "@/components/example/userlogin";
import { BackgroundLines } from "@/components/example/background-lines";
import React from "react";

const page = () => {
  return (
    <div className="">
      <BackgroundLines className="h-screen w-screen flex justify-center items-center">
        <LoginForm />
      </BackgroundLines>
    </div>
  );
};

export default page;
