"use client"

import { useEffect } from "react"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loadWidgets = () => {
      // Clear old content
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]
      containers.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.innerHTML = ""
      })

      try {
        timeoutId = setTimeout(() => {
          if (activeTab === "Flights") loadFlightsWidget()
          else if (activeTab === "Hotels") loadHotelsWidget()
          else if (activeTab === "Rent cars") loadCarsWidget()
          else if (activeTab === "E sim") loadEsimWidget()
        }, 100)
      } catch (error) {
        console.error("Error loading TravelPayouts widgets:", error)
      }
    }

    const loadFlightsWidget = () => {
      const container = document.getElementById("tp-widget-flights")
      if (!container) return
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&promo_id=4132&campaign_id=121"
      container.appendChild(script)
    }

    const loadHotelsWidget = () => {
      const container = document.getElementById("tp-widget-hotels")
      if (!container) return
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&promo_id=4038&campaign_id=121"
      container.appendChild(script)
    }

    const loadCarsWidget = () => {
      const container = document.getElementById("tp-widget-cars")
      if (!container) return
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&promo_id=3873&campaign_id=117"
      container.appendChild(script)
    }

    const loadEsimWidget = () => {
      const container = document.getElementById("tp-widget-esim")
      if (!container) return
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&promo_id=8588&campaign_id=541"
      container.appendChild(script)
    }

    const delayedLoad = setTimeout(loadWidgets, 100)
    return () => {
      clearTimeout(delayedLoad)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [activeTab, isDark])

  return null
}
