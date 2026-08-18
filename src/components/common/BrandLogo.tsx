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
    sm: "h-16 sm:h-20",
    md: "h-22 sm:h-26 lg:h-30",
    lg: "h-28 sm:h-34 lg:h-38",
    xl: "h-36 sm:h-44",
  };

  const maxWidths = {
    sm: "max-w-[320px]",
    md: "max-w-[440px] sm:max-w-[520px] lg:max-w-[600px]",
    lg: "max-w-[540px] sm:max-w-[660px]",
    xl: "max-w-[800px]",
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <img
        src={logoImg}
        alt="Indian Alliance Services - Aviation Careers & Training"
        className={`${heights[size]} ${maxWidths[size]} w-auto object-contain`}
      />
    </div>
  );
}
