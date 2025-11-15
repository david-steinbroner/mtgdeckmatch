import posthog from "posthog-js";

export const initPostHog = () => {
  if (!import.meta.env.VITE_POSTHOG_API_KEY) {
    console.warn("PostHog API key not configured");
    return;
  }

  posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
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
