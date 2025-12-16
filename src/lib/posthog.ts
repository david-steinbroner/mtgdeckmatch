import posthog from "posthog-js";

export const initPostHog = () => {
  const apiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  if (!apiKey) {
    console.warn("PostHog API key not configured");
    return;
  }

  posthog.init(apiKey, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    defaults: '2025-05-24',
    capture_exceptions: true,
    debug: import.meta.env.MODE === "development",
    person_profiles: "identified_only",
    capture_pageview: false, // We'll manually capture pageviews with react-router
    capture_pageleave: true,
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.opt_out_capturing(); // Disable in development
      }
    },
  });
};

export { posthog };