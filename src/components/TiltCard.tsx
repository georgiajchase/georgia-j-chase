import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** kept for backwards compatibility, unused */
  maxTilt?: number;
  /** kept for backwards compatibility, unused */
  scale?: number;
}

/**
 * Simple hover wrapper. Mouse-tracking 3D tilt has been removed sitewide.
 * Cards now use plain CSS hover: scale 1.03 + subtle orange border glow.
 */
const TiltCard = ({ children, className }: TiltCardProps) => {
  return (
    <div
      className={cn(
        "h-full rounded-xl transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:shadow-[0_0_24px_hsl(25_95%_53%/0.35)]",
        "hover:ring-1 hover:ring-primary/50",
        className
      )}
    >
      {children}
    </div>
  );
};

export default TiltCard;
