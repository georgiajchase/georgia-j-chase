import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

const TiltCard = ({
  children,
  className,
  maxTilt = 12,
  scale = 1.03,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateY = (px - 0.5) * 2 * maxTilt;
    const rotateX = -(py - 0.5) * 2 * maxTilt;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.boxShadow = "";
  };

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.boxShadow =
      "0 20px 40px -12px hsl(25 95% 53% / 0.35), 0 0 24px hsl(25 95% 53% / 0.25)";
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transition: "transform 250ms ease-out, box-shadow 300ms ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
        borderRadius: "0.75rem",
      }}
      className={cn("h-full", className)}
    >
      {children}
    </div>
  );
};

export default TiltCard;

