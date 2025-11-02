"use client"

import { useEffect } from "react"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

const TRACKED_HOSTS = [
  "aviasales",
  "hotellook",
  "economybookings",
  "travelpayouts",
  "tp.media",
  "trpwdg",
]

function isTrackedUrl(url: string | null | undefined) {
  if (!url) return false
  return TRACKED_HOSTS.some((h) => url.includes(h))
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  useEffect(() => {
    const containers = [
      "tp-widget-flights",
      "tp-widget-hotels",
      "tp-widget-cars",
      "tp-widget-esim",
    ]

    containers.forEach((id) => {
      const el = document.getElementById(id)
      if (el) el.innerHTML = ""
    })

    // helper to open popup
    const openInModal = (url: string) => {
      try {
        localStorage.setItem("travelpayouts_link", url)
      } catch (err) {}
      const modalEvent = new CustomEvent("openTravelModal", { detail: url })
      window.dispatchEvent(modalEvent)
      console.log("[TP] open modal:", url)
    }

    const loadWidget = (id: string, src: string) => {
      const container = document.getElementById(id)
      if (!container) return
      container.innerHTML = ""

      const script = document.createElement("script")
      script.async = true
      script.src = src
      script.charset = "utf-8"
      container.appendChild(script)

      // Add transparent overlay to capture clicks
      const overlay = document.createElement("div")
      overlay.style.position = "absolute"
      overlay.style.inset = "0"
      overlay.style.zIndex = "10"
      overlay.style.cursor = "pointer"
      overlay.style.background = "transparent"

      overlay.addEventListener("click", () => {
        // open modal with last known URL (or fallback)
        const last = localStorage.getItem("travelpayouts_link")
        const defaultUrl = src.replace("content?", "redirect?")
        openInModal(last || defaultUrl)
      })

      // make sure container is positioned
      container.style.position = "relative"
      container.appendChild(overlay)
    }

    if (activeTab === "Flights")
      loadWidget(
        "tp-widget-flights",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&promo_id=4132&campaign_id=121"
      )
    else if (activeTab === "Hotels")
      loadWidget(
        "tp-widget-hotels",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&promo_id=4038&campaign_id=121"
      )
    else if (activeTab === "Rent cars")
      loadWidget(
        "tp-widget-cars",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=3873&campaign_id=117"
      )
    else if (activeTab === "E sim")
      loadWidget(
        "tp-widget-esim",
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=8588&campaign_id=541"
      )
  }, [activeTab, isDark])

  return (
    <>
      <div id="tp-widget-flights" style={{ display: activeTab === "Flights" ? "block" : "none", position: "relative" }} />
      <div id="tp-widget-hotels" style={{ display: activeTab === "Hotels" ? "block" : "none", position: "relative" }} />
      <div id="tp-widget-cars" style={{ display: activeTab === "Rent cars" ? "block" : "none", position: "relative" }} />
      <div id="tp-widget-esim" style={{ display: activeTab === "E sim" ? "block" : "none", position: "relative" }} />
    </>
  )
}
