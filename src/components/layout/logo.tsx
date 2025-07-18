import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-8 h-8", className)}
  >
    <path d="M3 6l9 4.5L21 6" />
    <path d="M3 12l9 4.5L21 12" />
    <path d="M12 3v18" />
  </svg>
);

export default Logo;
