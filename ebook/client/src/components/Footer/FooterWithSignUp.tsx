"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const footerLinks = [
  {
    title: "Quick Links",
    links: ["About Us", "Careers", "Contact Us"],
  },
  {
    title: "Explore",
    links: [
      "Browse Books",
      "Audiobooks",
      "Categories",
      "Authors",
      "Featured Collections",
    ],
  },
  {
    title: "Help & Support",
    links: [
      "FAQs",
      "Subscription Plans",
      "How It Works",
      "Accessibility",
      "Help Center",
    ],
  },
  {
    title: "Legal",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "Refund Policy",
    ],
  },
];

const FooterWithSignUp = () => {
  return (
    <footer className="bg-[#1f1f1f] text-[#C7C7C7] px-4 sm:px-10 pt-16 pb-10 space-y-12">
      {/* Top CTA Section */}
      <div className="text-center space-y-4">
        <p className="text-sm">
          Ready to read? Enter your email to create or restart your membership
        </p>
        <form className="flex flex-col sm:flex-row justify-center gap-3">
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-2 sm:w-[300px] bg-transparent border border-[#C7C7C7] text-white placeholder-[#C7C7C7] rounded-md focus:outline-none"
          />
          <Button className="bg-[#4CFFAB] hover:bg-[#00FF67] text-black px-6 py-2 rounded-md">
            Get Started
          </Button>
        </form>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-[#292929] px-6 py-6 rounded-md max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-white">Newsletter Signup</h4>
          <p className="text-sm text-[#B7B7B7]">
            Stay updated with new releases and special features.
          </p>
        </div>
        <form className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-2 w-full sm:w-72 bg-white/10 text-white placeholder-white/50 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          <Button className="bg-[#4CFFAB] hover:bg-[#00FF67] text-black rounded-sm px-5 py-2">
            Sign Up
          </Button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-sm">
        {footerLinks.map(({ title, links }, i) => (
          <div key={i}>
            <h5 className="font-semibold text-white mb-6">{title}</h5>
            <ul className="space-y-4">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="transition-all duration-200 hover:translate-x-2 hover:text-white cursor-pointer"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Bottom: Logo & Socials */}
      <div className="border-t border-[#2B2B2B] pt-6 flex flex-col sm:flex-row gap-4 items-center justify-between max-w-6xl mx-auto">
        <Image
          src="/logo.svg"
          alt="Stuzip Logo"
          width={100}
          height={100}
          className="w-24 grayscale"
        />
        <div className="flex items-center gap-5 text-[#C7C7C7]">
          {[FaLinkedinIn, FaInstagram, FaYoutube, FaXTwitter, FaFacebookF].map(
            (Icon, idx) => (
              <Icon key={idx} className="hover:text-white cursor-pointer" />
            )
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterWithSignUp;
