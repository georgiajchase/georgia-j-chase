import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Sticky 50/50 A/B variant assignment, persisted in localStorage.
 * Fires a GA4 event the first time a visitor is bucketed into a test.
 */
export function useABTest(testName: string): "A" | "B" {
  const [variant, setVariant] = useState<"A" | "B">("A");

  useEffect(() => {
    const key = `ab_${testName}`;
    let v = localStorage.getItem(key) as "A" | "B" | null;
    let isNew = false;
    if (v !== "A" && v !== "B") {
      v = Math.random() < 0.5 ? "A" : "B";
      localStorage.setItem(key, v);
      isNew = true;
    }
    setVariant(v);

    if (isNew && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "ab_test_assigned", {
        test_name: testName,
        variant: v,
      });
    }
  }, [testName]);

  return variant;
}

export function trackABConversion(testName: string, variant: "A" | "B", action: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "ab_test_conversion", {
      test_name: testName,
      variant,
      action,
    });
  }
}
