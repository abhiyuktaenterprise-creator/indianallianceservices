import React from "react";
import logoImg from "@/assets/logo.png";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function BrandLogo({
  size = "md",
  className = "",
}: BrandLogoProps) {
  const heights = {
    sm: "h-14 sm:h-16",
    md: "h-18 sm:h-22 lg:h-26",
    lg: "h-24 sm:h-28 lg:h-32",
    xl: "h-28 sm:h-36",
  };

  const maxWidths = {
    sm: "max-w-[280px]",
    md: "max-w-[380px] sm:max-w-[460px] lg:max-w-[540px]",
    lg: "max-w-[480px] sm:max-w-[580px]",
    xl: "max-w-[700px]",
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="Airport Career Services (ACS) - Aviation Careers & Training"
        className={`${heights[size]} ${maxWidths[size]} w-auto object-contain`}
      />
    </div>
  );
}
