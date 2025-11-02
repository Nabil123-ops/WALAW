"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, ExternalLink, Sparkles } from "lucide-react"
import ResultsModal from "@/components/results-modal"

interface TravelPayoutsWidgetsProps {
  activeTab: string
  isDark: boolean
}

export default function TravelPayoutsWidgetsPopup({ activeTab, isDark }: TravelPayoutsWidgetsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchUrl, setSearchUrl] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const interceptorRef = useRef<(() => void) | null>(null)

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
          
          // Set up interception after widget loads
          setTimeout(() => {
            setupFormInterception()
          }, 1000)
        }, 300)
      } catch (error) {
        console.error("Error loading widgets:", error)
        setIsLoading(false)
      }
    }

    const setupFormInterception = () => {
      // Clean up previous interceptor
      if (interceptorRef.current) {
        interceptorRef.current()
      }

      // Intercept all forms in widgets
      const widgetContainers = ['tp-widget-flights', 'tp-widget-hotels', 'tp-widget-cars', 'tp-widget-esim']
      
      const interceptForms = () => {
        widgetContainers.forEach(containerId => {
          const container = document.getElementById(containerId)
          if (!container) return

          // Find all forms
          const forms = container.querySelectorAll('form')
          forms.forEach((form) => {
            if (!form.hasAttribute('data-intercepted')) {
              form.setAttribute('data-intercepted', 'true')
              
              // Intercept form submission
              form.addEventListener('submit', (e) => {
                e.preventDefault()
                e.stopPropagation()
                
                const formData = new FormData(form)
                const action = form.getAttribute('action') || ''
                const method = form.getAttribute('method') || 'GET'
                
                // Build URL with form data
                let url = action
                if (method.toUpperCase() === 'GET') {
                  const params = new URLSearchParams()
                  formData.forEach((value, key) => {
                    params.append(key, value.toString())
                  })
                  url = action + (action.includes('?') ? '&' : '?') + params.toString()
                }
                
                // Open in modal
                setSearchUrl(url)
                setModalTitle(getModalTitle(activeTab))
                setModalOpen(true)
              }, true)
            }
          })

          // Intercept all links
          const links = container.querySelectorAll('a')
          links.forEach((link) => {
            if (!link.hasAttribute('data-intercepted')) {
              link.setAttribute('data-intercepted', 'true')
              
              link.addEventListener('click', (e) => {
                const href = (link as HTMLAnchorElement).href
                if (href && (
                  href.includes('aviasales') || 
                  href.includes('hotellook') || 
                  href.includes('economybookings') || 
                  href.includes('travelpayouts') ||
                  href.includes('tp.media')
                )) {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  setSearchUrl(href)
                  setModalTitle(getModalTitle(activeTab))
                  setModalOpen(true)
                }
              }, true)
            }
          })

          // Intercept buttons that might trigger navigation
          const buttons = container.querySelectorAll('button[type="submit"], button:not([type])')
          buttons.forEach((button) => {
            if (!button.hasAttribute('data-intercepted')) {
              button.setAttribute('data-intercepted', 'true')
              
              button.addEventListener('click', (e) => {
                // Let form submission handler deal with it
                const form = button.closest('form')
                if (form && form.hasAttribute('data-intercepted')) {
                  // Form handler will take care of it
                  return
                }
              }, true)
            }
          })
        })
      }

      // Initial interception
      interceptForms()

      // Watch for DOM changes and re-intercept
      const observer = new MutationObserver(() => {
        interceptForms()
      })

      widgetContainers.forEach(containerId => {
        const container = document.getElementById(containerId)
        if (container) {
          observer.observe(container, {
            childList: true,
            subtree: true
          })
        }
      })

      // Store cleanup function
      interceptorRef.current = () => {
        observer.disconnect()
      }
    }

    const getModalTitle = (tab: string) => {
      switch (tab) {
        case "Flights": return "Flight Search Results"
        case "Hotels": return "Hotel Search Results"
        case "Rent cars": return "Car Rental Results"
        case "E sim": return "eSIM Plans"
        default: return "Search Results"
      }
    }

    // Override window.open globally
    const originalOpen = window.open
    window.open = function(url?: string | URL, target?: string, features?: string) {
      if (url && typeof url === 'string') {
        const urlStr = url.toString()
        if (urlStr.includes('aviasales') || 
            urlStr.includes('hotellook') || 
            urlStr.includes('economybookings') || 
            urlStr.includes('travelpayouts') ||
            urlStr.includes('tp.media')) {
          setSearchUrl(urlStr)
          setModalTitle(getModalTitle(activeTab))
          setModalOpen(true)
          return null
        }
      }
      return originalOpen.call(this, url, target, features)
    }

    loadWidgets()

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      if (interceptorRef.current) {
        interceptorRef.current()
      }
      window.open = originalOpen
    }
  }, [activeTab])

  const loadFlightsWidget = () => {
    const container = document.getElementById("tp-widget-flights")
    if (!container) return

    try {
      const script = document.createElement("script")
      script.async = true
      script.src =
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&curr=USD&powered_by=true&border_radius=8&plain=false&color_button=%232681ff&color_button_text=%23ffffff&color_border=%232681ff&promo_id=4132&campaign_id=121"
      script.charset = "utf-8"

      container.innerHTML = ""
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
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&lang=www&layout=S4279&powered_by=true&campaign_id=121&promo_id=4038"
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
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&bg_color=%23ffffff&font_color=%23333333&button_color=%232681ff&button_font_color=%23ffffff&button_text=Search&rounded_corners=true&benefits=false&dc_powered_by=false&supplier_logos=true&campaign_id=117&promo_id=3873"
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
        "https://trpwdg.com/content?trs=446445&shmarker=661130.661130&locale=en&powered_by=true&color_button=%232681ff&color_focused=%23030C0Dff&secondary=%23FFFFFF&dark=%2311100f&light=%23FFFFFF&special=%23C4C4C4&border_radius=8&plain=false&no_labels=false&promo_id=8588&campaign_id=541"
      script.charset = "utf-8"

      container.innerHTML = ""
      container.appendChild(script)
    } catch (error) {
      console.error("Error loading esim widget:", error)
    }
  }

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

      {/* Info Card */}
      <Card className={`${isDark ? "bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-gray-700" : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"} shadow-lg`}>
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
                <strong>Stay on Tzeego!</strong> When you click "Search", results will open in a beautiful popup window right here. 
                Browse all options without leaving our site. Click on any deal to complete your booking with our trusted partners.
              </p>
              <div className={`mt-3 flex items-center gap-2 text-xs ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                <ExternalLink className="h-4 w-4" />
                <span>Real-time data from Travelpayouts • Secure booking • Best prices guaranteed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Modal */}
      <ResultsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        searchUrl={searchUrl}
        title={modalTitle}
        isDark={isDark}
      />
    </div>
  )
}
