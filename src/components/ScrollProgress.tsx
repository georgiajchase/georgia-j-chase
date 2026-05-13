import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: `${pct}%`,
        backgroundColor: "#22c55e",
        boxShadow: "0 0 10px rgba(34,197,94,0.6)",
        zIndex: 9999,
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }}
    />
  );
};

export default ScrollProgress;
