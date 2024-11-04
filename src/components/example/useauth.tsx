"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DecodedToken {
  role: string;
}

export function withAuth<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>,
  requiredRole: string
) {
  return function AuthenticatedComponent(props: T) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authtoken");

      if (!token) {
        router.push("/admin/signup");
        return;
      }

      try {
        const decodedToken: DecodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.role;
        console.log(userRole);

        if (userRole === requiredRole) {
          setIsAuthorized(true);
        } else {
          router.push("/admin/signup");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/admin/signup");
      }
    }, [router]);

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
}
