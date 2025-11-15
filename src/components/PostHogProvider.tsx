import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { posthog } from "@/lib/posthog";

export const PostHogPageView = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.VITE_POSTHOG_API_KEY && import.meta.env.PROD) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
      });
    }
  }, [location]);

  return null;
};
