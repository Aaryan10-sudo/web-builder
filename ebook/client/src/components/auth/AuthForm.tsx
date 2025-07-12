"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { setUser } from "@/redux/features/userSlice";

const AuthForm = () => {
  const [step, setStep] = useState<
    "sign-in" | "sign-up" | "otp" | "forgot-password" | "forgot-otp"
  >("sign-in");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [agreed, setAgreed] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    agree?: string;
  }>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      (step === "sign-in" || step === "sign-up") &&
      !validatePassword(password)
    ) {
      newErrors.password =
        "Password must be 8+ chars, include upper/lowercase, number & symbol.";
    }

    if (step === "sign-up" && !agreed) {
      newErrors.agree = "You must agree to continue.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (step === "sign-up") {
        await axios.post("http://localhost:3001/api/user/create", {
          fullName: name,
          email,
          password,
        });
        setStep("otp");
      }

      if (step === "sign-in") {
        const res = await axios.post("http://localhost:3001/api/user/login", {
          email,
          password,
        });

        const {
          token,
          name,
          email: userEmail,
          hasSubscription,
          role,
        } = res.data.data;

        // ✅ Save token in cookie
        Cookies.set("accessToken", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        // ✅ Dispatch user info to Redux
        dispatch(setUser({ name, email: userEmail, hasSubscription }));

        // ✅ Redirect
        router.push(role === "admin" ? "/admin" : "/browse");
      }

      if (step === "forgot-password") {
        setStep("forgot-otp");
      }

      if (step === "forgot-otp") {
        console.log("OTP Verified, allow to reset password.");
      }

      if (step === "otp") {
        console.log("Sign Up OTP Verified");
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bggradient.svg"
          alt="gradient"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[#616161]/[0.13] mt-16 border border-white/10 backdrop-blur-4xl rounded-xl shadow-xl w-full max-w-md px-8 py-10 space-y-6 transition-all duration-500"
      >
        <h2 className="text-xl font-semibold text-center capitalize">
          {
            {
              "sign-in": "Sign In",
              "sign-up": "Sign Up",
              otp: "Enter OTP",
              "forgot-password": "Forgot Password",
              "forgot-otp": "Enter OTP",
            }[step]
          }
        </h2>

        {step === "sign-up" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 w-full bg-white/10 text-white placeholder-white/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
        )}

        {step !== "otp" && (
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full bg-white/10 text-white placeholder-white/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            {errors.email && (
              <p className="text-sm text-[#FECACA] mt-1">{errors.email}</p>
            )}
          </div>
        )}

        {(step === "sign-in" || step === "sign-up") && (
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 w-full bg-white/10 text-white placeholder-white/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 pr-10 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-white/60"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-sm text-[#FECACA] mt-1">{errors.password}</p>
            )}
          </div>
        )}

        {(step === "otp" || step === "forgot-otp") && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-2 w-full bg-white/10 text-white placeholder-white/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setStep("sign-in")}
              className="w-full text-white"
            >
              Back to Login
            </Button>
          </>
        )}

        {step === "sign-up" && (
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => {
                setAgreed(!agreed);
                if (errors.agree) setErrors((e) => ({ ...e, agree: "" }));
              }}
              className="accent-[#4CFFAB] rounded bg-transparent border-white/20"
            />
            I agree to all Terms and Conditions.
          </label>
        )}
        {errors.agree && (
          <p className="text-sm text-[#FECACA]">{errors.agree}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-[#4CFFAB] hover:bg-[#00FF67] text-black rounded-sm"
        >
          {
            {
              "sign-in": "Sign In",
              "sign-up": "Sign Up",
              otp: "Verify OTP",
              "forgot-password": "Send OTP",
              "forgot-otp": "Verify OTP",
            }[step]
          }
        </Button>

        {step === "sign-in" && (
          <div className="text-center text-sm text-white/70">
            <button
              onClick={() => {
                setStep("forgot-password");
                setErrors({});
              }}
              type="button"
              className="hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {step !== "otp" && step !== "forgot-otp" && (
          <div className="text-sm text-white/80 text-center">
            {step === "sign-in"
              ? "New to Stuzip?"
              : step === "sign-up"
              ? "Already have an account?"
              : "Remembered your password?"}
            <button
              type="button"
              onClick={() => {
                setStep(step === "sign-in" ? "sign-up" : "sign-in");
                setErrors({});
              }}
              className="text-white font-semibold hover:underline ml-1"
            >
              {step === "sign-in" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        )}

        <p className="text-xs text-white/60 text-center mt-2">
          This page is protected by reCAPTCHA to ensure you're not a bot.
        </p>
        <div className="text-xs text-blue-500 hover:underline text-center">
          <a href="#">Learn More</a>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
