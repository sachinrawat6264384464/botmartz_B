"use client";

import { useReportWebVitals } from "next/web-vitals";

/**
 * Real User Monitoring (RUM) component utilizing `useReportWebVitals`.
 * Captures core web vitals (LCP, INP, CLS, TTFB, FCP) from real visitors
 * and pushes them directly to Google Tag Manager (`dataLayer`) and analytics.
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    try {
      // 1. Forward to Google Tag Manager / GA4 (`dataLayer`)
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "web_vitals",
          web_vitals_name: metric.name,
          web_vitals_value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          web_vitals_id: metric.id,
          web_vitals_rating: metric.rating || "good",
          web_vitals_delta: Math.round(metric.delta),
        });
      }

      // 2. Diagnostic logging in development environments
      if (process.env.NODE_ENV === "development") {
        const color = metric.rating === "good" ? "color: #00B8F0" : metric.rating === "needs-improvement" ? "color: #FF9900" : "color: #EE4C2C";
        console.log(`%c[RUM WebVitals] ${metric.name}: ${Math.round(metric.value)}ms (${metric.rating})`, color);
      }
    } catch (err) {
      console.warn("WebVitals telemetry reporting error:", err);
    }
  });

  return null;
}
