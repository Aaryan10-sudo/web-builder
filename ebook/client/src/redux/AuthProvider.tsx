"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser, setAuthStatus } from "@/redux/features/userSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthStatus("loading"));

    axios
      .get("http://localhost:3001/api/user/get", {
        // The browser will automatically send the accessToken cookie with this request.
        // Your server should be configured to read the token from the cookie.
        withCredentials: true,
      })
      .then((res) => {
        dispatch(
          setUser({
            email: res.data.email,
            name: res.data.name,
            hasSubscription: res.data.hasSubscription ?? false,
          })
        );
      })
      .catch(() => {
        dispatch(clearUser());
      });
  }, [dispatch]);

  return <>{children}</>;
}
