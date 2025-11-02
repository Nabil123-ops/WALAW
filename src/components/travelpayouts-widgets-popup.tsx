"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ExternalLink, Sparkles } from "lucide-react";
import ResultsModal from "@/components/results-modal";

interface TravelPayoutsWidgetsProps {
  activeTab: string;
  isDark: boolean;
}

export default function TravelPayoutsWidgetsPopup({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const interceptorRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadWidgets = () => {
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"];
      containers.forEach((id) => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = "";
      });

      setIsLoading(true);

      try {
        timeoutId = setTimeout(() => {
          if (activeTab === "Flights") loadFlightsWidget();
          else if (activeTab === "Hotels") loadHotelsWidget();
          else if (activeTab === "Rent cars") loadCarsWidget();
          else if (activeTab === "E sim") loadEsimWidget();

          setIsLoading(false);
          setTimeout(() => setupFormInterception(), 1000);
        }, 300);
      } catch (error) {
        console.error("Error loading widgets:", error);
        setIsLoading(false);
      }
    };

    const setupFormInterception = () => {
      if (interceptorRef.current) interceptorRef.current();

      const widgetContainers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"];

      const interceptForms = () => {
        widgetContainers.forEach((containerId) => {
          const container = document.getElementById(containerId);
          if (!container) return;

          // Intercept forms
          const forms = container.querySelectorAll("form");
          forms.forEach((form) => {
            if (!form.hasAttribute("data-intercepted")) {
              form.setAttribute("data-intercepted", "true");
              form.addEventListener(
                "submit",
                (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  const formData = new FormData(form);
                  const action = form.getAttribute("action") || "";
                  const method = form.getAttribute("method") || "GET";

                  let url = action;
                  if (method.toUpperCase() === "GET") {
                    const params = new URLSearchParams();
                    formData.forEach((value, key) => params.append(key, value.toString()));
                    url = action + (action.includes("?") ? "&" : "?") + params.toString();
                  }

                  setSearchUrl(url);
                  setModalTitle(getModalTitle(activeTab));
                  setModalOpen(true);
                },
                true
              );
            }
          });

          // Intercept links
          const links = container.querySelectorAll("a");
          links.forEach((link) => {
            if (!link.hasAttribute("data-intercepted")) {
              link.setAttribute("data-intercepted", "true");
              link.addEventListener(
                "click",
                (e) => {
                  const href = (link as HTMLAnchorElement).href;
                  if (
                    href &&
                    (href.includes("aviasales") ||
                      href.includes("hotellook") ||
                      href.includes("economybookings") ||
                      href.includes("travelpayouts") ||
                      href.includes("tp.media"))
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchUrl(href);
                    setModalTitle(getModalTitle(activeTab));
                    setModalOpen(true);
                  }
                },
                true
              );
            }
          });
        });
      };

      interceptForms();

      const observer = new MutationObserver(() => interceptForms());
      widgetContainers.forEach((id) => {
        const container = document.getElementById(id);
        if (container) observer.observe(container, { childList: true, subtree: true });
      });

      interceptorRef.current = () => observer.disconnect();
    };

    const getModalTitle = (tab: string) => {
      switch (tab) {
        case "Flights":
          return "Flight Search Results";
        case "Hotels":
          return "Hotel Search Results";
        case "Rent cars":
          return "Car Rental Results";
        case "E sim":
          return "eSIM Plans";
        default:
          return "Search Results";
      }
    };

    const originalOpen = window.open;
    window.open = function (url?: string | URL, target?: string, features?: string) {
      if (url && typeof url === "string") {
        const urlStr = url.toString();
        if (
          urlStr.includes("aviasales") ||
          urlStr.includes("hotellook") ||
          urlStr.includes("economybookings") ||
          urlStr.includes("travelpayouts") ||
          urlStr.includes("tp.media")
        ) {
          setSearchUrl(urlStr);
          setModalTitle(getModalTitle(activeTab));
          setModalOpen(true);
          return null;
        }
      }
      return originalOpen.call(this, url, target, features);
    };

    loadWidgets();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (interceptorRef.current) interceptorRef.current();
      window.open = originalOpen;
    };
  }, [activeTab]);

  const loadFlightsWidget = () => {
    const container = document.getElementById("tp-widget-flights");
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&border_radius=8&plain=false&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121";
    container.innerHTML = "";
    container.appendChild(script);
  };

  const loadHotelsWidget = () => {
    const container = document.getElementById("tp-widget-hotels");
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038";
    container.innerHTML = "";
    container.appendChild(script);
  };

  const loadCarsWidget = () => {
    const container = document.getElementById("tp-widget-cars");
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&bg_color=%23ffffff&font_color=%23333333&button_color=%232681ff&button_font_color=%23ffffff&button_text=Search&rounded_corners=true&benefits=false&dc_powered_by=false&supplier_logos=true&campaign_id=117&promo_id=3873";
    container.innerHTML = "";
    container.appendChild(script);
  };

  const loadEsimWidget = () => {
    const container = document.getElementById("tp-widget-esim");
    if (!container) return;
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&color_button=%232681ff&color_focused=%23030C0Dff&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=8&plain=false&no_labels=false&promo_id=8588&campaign_id=541";
    container.innerHTML = "";
    container.appendChild(script);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        <div id="tp-widget-flights" className={activeTab === "Flights" ? "block" : "hidden"} />
        <div id="tp-widget-hotels" className={activeTab === "Hotels" ? "block" : "hidden"} />
        <div id="tp-widget-cars" className={activeTab === "Rent cars" ? "block" : "hidden"} />
        <div id="tp-widget-esim" className={activeTab === "E sim" ? "block" : "hidden"} />
      </div>

      <Card
        className={`${
          isDark
            ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-gray-700"
            : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
        } shadow-lg`}
      >
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-full ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`}>
              <Sparkles className={`h-6 w-6 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                ✨ Enhanced Search Experience
              </h3>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Stay on Tzeego!</strong> When you click "Search", results open in a beautiful popup right here.
                Browse all options without leaving our site. Click any deal to finish booking with our trusted partners.
              </p>
              <div className={`mt-3 flex items-center gap-2 text-xs ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                <ExternalLink className="h-4 w-4" />
                <span>Real-time data from Travelpayouts • Secure booking • Best prices guaranteed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ResultsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        searchUrl={searchUrl}
        title={modalTitle}
        isDark={isDark}
      />
    </div>
  );
}
