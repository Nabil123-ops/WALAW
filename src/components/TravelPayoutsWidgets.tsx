"use client";

import { useEffect, useState } from "react";
import ResultsModal from "@/components/results-modal";
import { Loader2 } from "lucide-react";

interface TravelPayoutsWidgetsProps {
  activeTab: string;
  isDark: boolean;
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchUrl, setSearchUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadWidgets = () => {
      setIsLoading(true);
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"];
      containers.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = "";
      });

      timeoutId = setTimeout(() => {
        if (activeTab === "Flights")
          loadWidget(
            "tp-widget-flights",
            "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&promo_id=4132&campaign_id=121"
          );
        else if (activeTab === "Hotels")
          loadWidget(
            "tp-widget-hotels",
            "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&promo_id=4038&campaign_id=121"
          );
        else if (activeTab === "Rent cars")
          loadWidget(
            "tp-widget-cars",
            "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=3873&campaign_id=117"
          );
        else if (activeTab === "E sim")
          loadWidget(
            "tp-widget-esim",
            "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=8588&campaign_id=541"
          );

        setIsLoading(false);
      }, 400);
    };

    const loadWidget = (id: string, src: string) => {
      const container = document.getElementById(id);
      if (!container) return;

      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      script.charset = "utf-8";
      container.appendChild(script);

      // Intercept widget link clicks and open popup
      setTimeout(() => {
        const links = container.querySelectorAll("a");
        links.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const url = (e.currentTarget as HTMLAnchorElement).href;
            if (url) {
              localStorage.setItem("travelpayouts_link", url);
              const modalEvent = new CustomEvent("openTravelModal", { detail: url });
              window.dispatchEvent(modalEvent);
            }
          });
        });
      }, 2000);
    };

    loadWidgets();
    return () => clearTimeout(timeoutId);
  }, [activeTab, isDark]);

  // Listen for openTravelModal events to actually open the popup
  useEffect(() => {
    const handleModalOpen = (e: CustomEvent) => {
      const url = e.detail || localStorage.getItem("travelpayouts_link");
      if (url) {
        setSearchUrl(url);
        setModalTitle(getTitleFromUrl(url));
        setModalOpen(true);
      }
    };

    window.addEventListener("openTravelModal", handleModalOpen as EventListener);
    return () => window.removeEventListener("openTravelModal", handleModalOpen as EventListener);
  }, []);

  const getTitleFromUrl = (url: string) => {
    if (url.includes("aviasales")) return "Flight Search Results";
    if (url.includes("hotellook")) return "Hotel Search Results";
    if (url.includes("economybookings")) return "Car Rental Results";
    if (url.includes("esim")) return "eSIM Deals";
    return "Search Results";
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}

      {/* Visible widget containers */}
      <div id="tp-widget-flights" className={activeTab === "Flights" ? "block" : "hidden"} />
      <div id="tp-widget-hotels" className={activeTab === "Hotels" ? "block" : "hidden"} />
      <div id="tp-widget-cars" className={activeTab === "Rent cars" ? "block" : "hidden"} />
      <div id="tp-widget-esim" className={activeTab === "E sim" ? "block" : "hidden"} />

      {/* Popup modal for results */}
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
