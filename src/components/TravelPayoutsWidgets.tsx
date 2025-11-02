"use client"

import { useEffect, useState } from "react"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

export default function TravelPayoutsWidgets({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  const [iframeUrl, setIframeUrl] = useState("")

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loadWidgets = () => {
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]
      containers.forEach((id) => {
        const el = document.getElementById(id)
        if (el) el.innerHTML = ""
      })

      timeoutId = setTimeout(() => {
        if (activeTab === "Flights")
          loadWidget("tp-widget-flights", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&promo_id=4132&campaign_id=121")
        else if (activeTab === "Hotels")
          loadWidget("tp-widget-hotels", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&promo_id=4038&campaign_id=121")
        else if (activeTab === "Rent cars")
          loadWidget("tp-widget-cars", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=3873&campaign_id=117")
        else if (activeTab === "E sim")
          loadWidget("tp-widget-esim", "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&promo_id=8588&campaign_id=541")
      }, 200)
    }

    const loadWidget = (id: string, src: string) => {
      const container = document.getElementById(id)
      if (!container) return

      const script = document.createElement("script")
      script.async = true
      script.src = src
      script.charset = "utf-8"
      container.appendChild(script)

      // ⛔ Prevent redirects — catch form submission
      setTimeout(() => {
        const form = container.querySelector("form")
        if (form) {
          form.addEventListener("submit", (e) => {
            e.preventDefault()
            const formAction = (e.target as HTMLFormElement).action
            const formData = new FormData(e.target as HTMLFormElement)
            const queryString = new URLSearchParams(formData as any).toString()
            const finalUrl = `${formAction}?${queryString}`

            // Instead of redirecting, show results in iframe below
            setIframeUrl(finalUrl)
          })
        }
      }, 1500)
    }

    loadWidgets()
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [activeTab, isDark])

  return (
    <div>
      <div id="tp-widget-flights" className={activeTab === "Flights" ? "block" : "hidden"} />
      <div id="tp-widget-hotels" className={activeTab === "Hotels" ? "block" : "hidden"} />
      <div id="tp-widget-cars" className={activeTab === "Rent cars" ? "block" : "hidden"} />
      <div id="tp-widget-esim" className={activeTab === "E sim" ? "block" : "hidden"} />

      {iframeUrl && (
        <div className="mt-6 w-full h-[80vh] border rounded-xl overflow-hidden shadow-md">
          <iframe
            src={iframeUrl}
            className="w-full h-full border-0"
            title="Travel search results"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  )
}
