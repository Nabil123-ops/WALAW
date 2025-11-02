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
      // Clear any existing content first
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]
      containers.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.innerHTML = ""
        }
      })

      // Hide loading state
      const loadingElement = document.getElementById("widget-loading")
      if (loadingElement) {
        loadingElement.style.display = "none"
      }


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
        }, 100)
      } catch (error) {
        console.error("Error loading widgets:", error)
        showFallbackContent()
      }
    }

    const loadFlightsWidget = () => {
      const container = document.getElementById("tp-widget-flights")
      if (!container) return

      try {
        // Create script element for flights widget
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&border_radius=0&plain=true&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121"
        script.charset = "utf-8"

        // Clear container and add script
        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading flights widget:", error)
        showFallbackFlightForm(container)
      }
    }

    const loadHotelsWidget = () => {
      const container = document.getElementById("tp-widget-hotels")
      if (!container) return

      try {
        // Create script element for hotels widget
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038"
        script.charset = "utf-8"

        // Clear container and add script
        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading hotels widget:", error)
        showFallbackHotelForm(container)
      }
    }

    const loadCarsWidget = () => {
  const container = document.getElementById("tp-widget-cars")
  if (!container) return

  try {
    // Create script element for cars widget
    const script = document.createElement("script")
    script.async = true
    script.src =
      "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&bg_color=%23fad130&font_color=%23333333&button_color=%2300a200&button_font_color=%23ffffff&button_text=Search&rounded_corners=false&benefits=false&dc_powered_by=false&supplier_logos=false&campaign_id=117&promo_id=3873"
    script.charset = "utf-8" // set charset here

    // Clear container and add script
    container.innerHTML = ""
    container.appendChild(script)
  } catch (error) {
    console.error("Error loading cars widget:", error)
    showFallbackCarForm(container)
  }
} // <-- this was missing

    const loadEsimWidget = () => {
      const container = document.getElementById("tp-widget-esim")
      if (!container) return

      try {
        // Create script element for e-sim widget
        const script = document.createElement("script")
        script.async = true
        script.src =
          "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&color_button=%230A4D73ff&color_focused=%23030C0Dff&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=27&plain=false&no_labels=true&promo_id=8588&campaign_id=541"
        script.charset = "utf-8"

        // Clear container and add script
        container.innerHTML = ""
        container.appendChild(script)
      } catch (error) {
        console.error("Error loading esim widget:", error)
        showFallbackEsimForm(container)
      }
    }

    const showFallbackFlightForm = (container: HTMLElement) => {
      container.innerHTML = `
        <div class="space-y-4 p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">From</label>
              <input type="text" placeholder="Departure city" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">To</label>
              <input type="text" placeholder="Destination city" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Departure</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Return</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Passengers</label>
            <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>4+ Adults</option>
            </select>
          </div>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Search Flights
          </button>
        </div>
      `
    }

    const showFallbackHotelForm = (container: HTMLElement) => {
      container.innerHTML = `
        <div class="space-y-4 p-4">
          <div>
            <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Destination</label>
            <input type="text" placeholder="City or hotel name" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Check-in</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Check-out</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Rooms</label>
              <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
                <option>1 Room</option>
                <option>2 Rooms</option>
                <option>3+ Rooms</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Guests</label>
              <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
          </div>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Search Hotels
          </button>
        </div>
      `
    }

    const showFallbackCarForm = (container: HTMLElement) => {
      container.innerHTML = `
        <div class="space-y-4 p-4">
          <div>
            <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Pick-up Location</label>
            <input type="text" placeholder="City or airport" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Pick-up Date</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Drop-off Date</label>
              <input type="date" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Pick-up Time</label>
              <input type="time" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Drop-off Time</label>
              <input type="time" class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}" />
            </div>
          </div>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Search Cars
          </button>
        </div>
      `
    }

    const showFallbackEsimForm = (container: HTMLElement) => {
      container.innerHTML = `
        <div class="space-y-4 p-4">
          <div>
            <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Destination Country</label>
            <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
              <option>Select Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>France</option>
              <option>Germany</option>
              <option>Japan</option>
              <option>Australia</option>
              <option>Canada</option>
            </select>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Data Plan</label>
              <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
                <option>1GB - 7 Days</option>
                <option>3GB - 15 Days</option>
                <option>5GB - 30 Days</option>
                <option>10GB - 30 Days</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}">Duration</label>
              <select class="w-full p-3 border rounded-lg ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}">
                <option>7 Days</option>
                <option>15 Days</option>
                <option>30 Days</option>
                <option>60 Days</option>
              </select>
            </div>
          </div>
          <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Search E-SIM Plans
          </button>
        </div>
      `
    }

    const showFallbackContent = () => {
      const containers = ["tp-widget-flights", "tp-widget-hotels", "tp-widget-cars", "tp-widget-esim"]
      containers.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          element.innerHTML = `
            <div class="text-center py-8">
              <p class="${isDark ? "text-gray-400" : "text-gray-600"}">Loading search widget...</p>
              <p class="text-sm ${isDark ? "text-gray-500" : "text-gray-500"} mt-2">Please wait a moment</p>
            </div>
          `
        }
      })
    }

    // Load widgets with a small delay
    const delayedLoad = setTimeout(loadWidgets, 100)

    return () => {
      clearTimeout(delayedLoad)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [activeTab, isDark])

  return null
}
