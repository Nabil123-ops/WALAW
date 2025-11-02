"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ExternalLink } from "lucide-react"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

export default function TravelPayoutsWidgetsEnhanced({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const loadWidgets = () => {
      // Clear any existing content first
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]
      containers.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.innerHTML = ""
        }
      })

      setShowResults(false)
      setIsLoading(true)

      try {
        // Load the appropriate widget based on active tab
        timeoutId = setTimeout(() => {
          if (activeTab === "Flights") {
            loadFlightsWidget()
          } else if (activeTab === "Hotels") {
            loadHotelsWidget()
          } else if (activeTab === "Rent cars") {
            loadCarsWidget()
          } else if (activeTab === "E sim") {
            loadEsimWidget()
          }
          setIsLoading(false)
        }, 300)
      } catch (error) {
        console.error("Error loading widgets:", error)
        setIsLoading(false)
      }
    }

    const loadFlightsWidget = () => {
      const container = document.getElementById("tp-widget-flights")
      if (!container) return

      try {
        // Create script element for flights widget with iframe mode
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&border_radius=8&plain=false&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121&target=_self"
        script.charset = "utf-8"

        // Intercept widget initialization to keep results in-page
        const interceptScript = document.createElement("script")
        interceptScript.textContent = `
          (function() {
            const originalOpen = window.open;
            window.open = function(url, target, features) {
              if (url && url.includes('travelpayouts') || url && url.includes('aviasales')) {
                // Open in iframe or new section instead
                const resultsContainer = document.getElementById('tp-results-container');
                if (resultsContainer) {
                  resultsContainer.innerHTML = '<iframe src="' + url + '" style="width:100%;height:800px;border:none;border-radius:8px;" allowfullscreen></iframe>';
                  resultsContainer.style.display = 'block';
                  resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  return null;
                }
              }
              return originalOpen.call(this, url, target, features);
            };
          })();
        `

        container.innerHTML = ""
        document.head.appendChild(interceptScript)
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading flights widget:", error)
      }
    }

    const loadHotelsWidget = () => {
      const container = document.getElementById("tp-widget-hotels")
      if (!container) return

      try {
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038&target=_self"
        script.charset = "utf-8"

        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading hotels widget:", error)
      }
    }

    const loadCarsWidget = () => {
      const container = document.getElementById("tp-widget-cars")
      if (!container) return

      try {
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&bg_color=%23ffffff&font_color=%23333333&button_color=%232681ff&button_font_color=%23ffffff&button_text=Search&rounded_corners=true&benefits=false&dc_powered_by=false&supplier_logos=true&campaign_id=117&promo_id=3873&target=_self"
        script.charset = "utf-8"

        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading cars widget:", error)
      }
    }

    const loadEsimWidget = () => {
      const container = document.getElementById("tp-widget-esim")
      if (!container) return

      try {
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&color_button=%232681ff&color_focused=%23030C0Dff&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=8&plain=false&no_labels=false&promo_id=8588&campaign_id=541&target=_self"
        script.charset = "utf-8"

        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading esim widget:", error)
      }
    }

    loadWidgets()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [activeTab])

  return (
    <div className="space-y-6">
      {/* Widget Container */}
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

      {/* Results Container - This will display search results within the page */}
      <div
        id="tp-results-container"
        className={`${showResults ? "block" : "hidden"} transition-all duration-300`}
      >
        <Card className={isDark ? "bg-gray-800 border-gray-700" : "bg-white"}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                Search Results
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResults(false)}
                className={isDark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}
              >
                Close
              </Button>
            </div>
            <div id="tp-results-content" className="min-h-[400px]">
              {/* Results will be injected here */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className={`${isDark ? "bg-gradient-to-r from-blue-900/50 to-red-900/50 border-gray-700" : "bg-gradient-to-r from-blue-50 to-red-50 border-blue-200"}`}>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <ExternalLink className={`h-5 w-5 mt-0.5 ${isDark ? "text-blue-400" : "text-blue-600"}`} />
            <div>
              <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                <strong>Stay on Tzeego:</strong> When you search, results will appear right here on this page. 
                Click on any offer to view more details or complete your booking with our trusted partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
