import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
  headingLevel?: "h1" | "h2" | "h3";
}

export default function SectionHeading({
  badge,
  title,
  highlight,
  description,
  align = "center",
  theme = "light",
  className = "",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const alignmentClasses = align === "center" ? "text-center mx-auto" : "text-left";
  const HeadingTag = headingLevel;

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            {badge}
          </span>
        </div>
      )}

      <HeadingTag
        className={`text-3xl sm:text-4xl font-heading font-extrabold tracking-tight leading-tight ${
          isDark ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {title} {highlight && <span className="text-secondary">{highlight}</span>}
      </HeadingTag>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
