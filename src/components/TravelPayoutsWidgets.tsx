"use client";

import { useEffect } from "react";

interface TravelPayoutsWidgetsProps {
  activeTab: string;
  isDark: boolean;
}

const TRACKED_HOSTS = [
  "aviasales",
  "hotellook",
  "economybookings",
  "travelpayouts",
  "tp.media",
  "trpwdg",
];

function isTrackedUrl(url: string | null | undefined) {
  if (!url) return false;
  return TRACKED_HOSTS.some((h) => url.includes(h));
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  useEffect(() => {
    const containers = [
      "tp-widget-flights",
      "tp-widget-hotels",
      "tp-widget-cars",
      "tp-widget-esim",
    ];

    // clean old
    containers.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = "";
    });

    // helper: dispatch open event for ResultsModal to pick up
    const openInModal = (url: string) => {
      try {
        localStorage.setItem("travelpayouts_link", url);
      } catch (err) {}
      const modalEvent = new CustomEvent("openTravelModal", { detail: url });
      window.dispatchEvent(modalEvent);
      console.log("[TP] intercepted -> openTravelModal:", url);
    };

    // Global overrides (backup)
    const originalOpen = window.open;
    const originalAssign = (window.location as any).assign;
    window.open = function (url?: string | URL | undefined, target?: string, features?: string) {
      try {
        const urlStr = typeof url === "string" ? url : url?.toString?.();
        if (isTrackedUrl(urlStr)) {
          openInModal(urlStr as string);
          return null;
        }
      } catch (e) {}
      return originalOpen.call(window, url as any, target as any, features as any);
    };
    (window.location as any).assign = function (url: string) {
      try {
        if (isTrackedUrl(url)) {
          openInModal(url);
          return;
        }
      } catch (e) {}
      return originalAssign.call(window.location, url);
    };

    // Interceptor attached at container level using capture so it runs before widget handlers
    const attachCaptureInterceptors = (container: HTMLElement) => {
      if (!container) return;

      // Click capture - catches <a> click and buttons before other listeners
      const clickHandler = (e: Event) => {
        const evt = e as MouseEvent;
        const target = evt.target as HTMLElement | null;
        if (!target) return;

        // find closest anchor
        const anchor = target.closest("a") as HTMLAnchorElement | null;
        if (anchor && anchor.href) {
          const href = anchor.href;
          if (isTrackedUrl(href)) {
            e.preventDefault();
            e.stopImmediatePropagation?.();
            e.stopPropagation();
            openInModal(href);
            return;
          }
        }

        // check buttons that submit forms (type=submit)
        const button = target.closest("button, input[type='submit']") as HTMLButtonElement | HTMLInputElement | null;
        if (button) {
          // If button belongs to a form, let submit handler deal with it
          const form = button.closest("form") as HTMLFormElement | null;
          if (form) {
            // no action here; submit handler (below) will intercept
          }
        }
      };

      // Submit capture - intercept form submissions
      const submitHandler = (e: Event) => {
        const ev = e as SubmitEvent;
        const form = ev.target as HTMLFormElement | null;
        if (!form) return;
        try {
          // build final url for GET forms (or use action for POST — open action)
          const action = form.getAttribute("action") || "";
          const method = (form.getAttribute("method") || "GET").toUpperCase();
          const formData = new FormData(form);
          let finalUrl = action;
          if (method === "GET") {
            const params = new URLSearchParams();
            formData.forEach((value, key) => params.append(key, String(value)));
            finalUrl = action + (action.includes("?") ? "&" : "?") + params.toString();
          } else {
            // For POST, we still try to open action (widget usually uses GET for search)
            finalUrl = action || "";
          }

          if (isTrackedUrl(finalUrl)) {
            e.preventDefault();
            e.stopImmediatePropagation?.();
            e.stopPropagation();
            openInModal(finalUrl);
          }
        } catch (err) {
          // fallback - do nothing
          console.error("[TP] submitHandler error", err);
        }
      };

      // Add listeners with capture = true so they run before widget's listeners
      container.addEventListener("click", clickHandler, true);
      container.addEventListener("submit", submitHandler, true);

      // Return cleanup
      return () => {
        container.removeEventListener("click", clickHandler, true);
        container.removeEventListener("submit", submitHandler, true);
      };
    };

    // Attach widgets and observer
    const observers: MutationObserver[] = [];
    const cleanupFns: Array<() => void> = [];

    const loadWidget = (id: string, src: string) => {
      const container = document.getElementById(id);
      if (!container) return;

      // clear existing
      container.innerHTML = "";

      // attach capture interceptors immediately (even before script loads)
      const cleanup = attachCaptureInterceptors(container);
      if (cleanup) cleanupFns.push(cleanup);

      // append widget script
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.charset = "utf-8";
      container.appendChild(script);

      // Mutation observer as extra safety: if widget injects links later, we still have capture listener
      const observer = new MutationObserver(() => {
        // nothing needed here because capture click catches them,
        // but keep observer to allow additional logic or logging if desired
      });
      observer.observe(container, { childList: true, subtree: true });
      observers.push(observer);
    };

    if (activeTab === "Flights")
      loadWidget(
        "tp-widget-flights",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&border_radius=8&plain=false&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121"
      );
    else if (activeTab === "Hotels")
      loadWidget(
        "tp-widget-hotels",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038"
      );
    else if (activeTab === "Rent cars")
      loadWidget(
        "tp-widget-cars",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&bg_color=%23ffffff&font_color=%23333333&button_color=%232681ff&button_font_color=%23ffffff&button_text=Search&rounded_corners=true&benefits=false&dc_powered_by=false&supplier_logos=true&campaign_id=117&promo_id=3873"
      );
    else if (activeTab === "E sim")
      loadWidget(
        "tp-widget-esim",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&color_button=%232681ff&color_focused=%23030C0Dff&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=8&plain=false&no_labels=false&promo_id=8588&campaign_id=541"
      );

    // cleanup on unmount / tab change
    return () => {
      try {
        observers.forEach((o) => o.disconnect());
        cleanupFns.forEach((fn) => fn && fn());
        containers.forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.innerHTML = "";
        });
        // restore originals
        window.open = originalOpen;
        (window.location as any).assign = originalAssign;
      } catch (err) {}
    };
  }, [activeTab, isDark]);

  // visible containers in DOM
  return (
    <>
      <div id="tp-widget-flights" style={{ display: activeTab === "Flights" ? "block" : "none" }} />
      <div id="tp-widget-hotels" style={{ display: activeTab === "Hotels" ? "block" : "none" }} />
      <div id="tp-widget-cars" style={{ display: activeTab === "Rent cars" ? "block" : "none" }} />
      <div id="tp-widget-esim" style={{ display: activeTab === "E sim" ? "block" : "none" }} />
    </>
  );
}
