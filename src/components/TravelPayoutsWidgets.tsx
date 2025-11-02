"use client"

import { useEffect } from "react"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  useEffect(() => {
    const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]

    // Clear old content
    containers.forEach((id) => {
      const el = document.getElementById(id)
      if (el) el.innerHTML = ""
    })

    const loadWidget = (id: string, src: string) => {
      const container = document.getElementById(id)
      if (!container) return

      const script = document.createElement("script")
      script.async = true
      script.src = src
      script.charset = "utf-8"
      container.appendChild(script)

      // ✅ MutationObserver — detects when widget creates new <a> links
      const observer = new MutationObserver(() => {
        const links = container.querySelectorAll("a")
        links.forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault()
            e.stopPropagation()

            const url = (e.currentTarget as HTMLAnchorElement).href
            if (url) {
              localStorage.setItem("travelpayouts_link", url)
              const modalEvent = new CustomEvent("openTravelModal", { detail: url })
              window.dispatchEvent(modalEvent)
            }
          })
        })
      })

      observer.observe(container, {
        childList: true,
        subtree: true,
      })
    }

    if (activeTab === "Flights")
      loadWidget("tp-widget-flights", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&promo_id=4132&campaign_id=121")
    else if (activeTab === "Hotels")
      loadWidget("tp-widget-hotels", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&promo_id=4038&campaign_id=121")
    else if (activeTab === "Rent cars")
      loadWidget("tp-widget-cars", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=3873&campaign_id=117")
    else if (activeTab === "E sim")
      loadWidget("tp-widget-esim", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=8588&campaign_id=541")

    return () => {
      containers.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.innerHTML = ""
      })
    }
  }, [activeTab, isDark])

  return (
    <>
      <div id="tp-widget-flights" style={{ display: activeTab === "Flights" ? "block" : "none" }} />
      <div id="tp-widget-hotels" style={{ display: activeTab === "Hotels" ? "block" : "none" }} />
      <div id="tp-widget-cars" style={{ display: activeTab === "Rent cars" ? "block" : "none" }} />
      <div id="tp-widget-esim" style={{ display: activeTab === "E sim" ? "block" : "none" }} />
    </>
  )
}
