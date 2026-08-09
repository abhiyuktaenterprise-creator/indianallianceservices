import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  theme?: "on-dark" | "on-light" | "auto";
  className?: string;
}

export default function Breadcrumbs({
  items,
  theme = "on-dark",
  className = "",
}: BreadcrumbsProps) {
  const isOnDark = theme === "on-dark" || theme === "auto";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-2 text-xs sm:text-sm flex items-center flex-wrap gap-1.5 ${className}`}
    >
      <Link
        to="/"
        className={`flex items-center gap-1.5 font-medium transition-colors ${
          isOnDark
            ? "text-secondary hover:text-secondary-foreground"
            : "text-secondary hover:text-primary"
        }`}
      >
        <div className="rounded-md bg-secondary/20 p-1">
          <Home className="h-3.5 w-3.5 text-secondary" />
        </div>
        <span className={isOnDark ? "text-primary-foreground/90 hover:text-secondary" : "text-foreground hover:text-secondary"}>
          Home
        </span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.label} className="flex items-center gap-1.5">
            <ChevronRight
              className={`h-3.5 w-3.5 shrink-0 ${
                isOnDark ? "text-primary-foreground/45" : "text-muted-foreground/60"
              }`}
            />
            {item.href && !isLast ? (
              <Link
                to={item.href}
                className={`font-medium transition-colors ${
                  isOnDark
                    ? "text-primary-foreground/80 hover:text-secondary"
                    : "text-foreground/80 hover:text-secondary"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`font-bold px-2 py-0.5 rounded-md text-xs sm:text-sm truncate max-w-[220px] sm:max-w-none ${
                  isOnDark
                    ? "text-primary-foreground bg-primary-foreground/15 border border-primary-foreground/20 shadow-sm"
                    : "text-foreground bg-muted border border-border"
                }`}
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
