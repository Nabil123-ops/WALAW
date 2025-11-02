"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, ExternalLink } from "lucide-react"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  searchUrl: string
  title: string
  isDark: boolean
}

export default function ResultsModal({ isOpen, onClose, searchUrl, title, isDark }: ResultsModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [internalOpen, setInternalOpen] = useState(isOpen)
  const [internalUrl, setInternalUrl] = useState(searchUrl)
  const [internalTitle, setInternalTitle] = useState(title)

  useEffect(() => {
    setInternalOpen(isOpen)
    setInternalUrl(searchUrl)
    setInternalTitle(title)
  }, [isOpen, searchUrl, title])

  // ✅ NEW CODE — listens to popup open event (no redirect)
  useEffect(() => {
    const handleOpen = (e: CustomEvent) => {
      const link = e.detail || localStorage.getItem("travelpayouts_link")
      if (link) {
        setInternalUrl(link)
        setInternalTitle(getModalTitleFromUrl(link))
        setInternalOpen(true)
        setIsLoading(true)
      }
    }

    window.addEventListener("openTravelModal", handleOpen as EventListener)
    return () => window.removeEventListener("openTravelModal", handleOpen as EventListener)
  }, [])

  const getModalTitleFromUrl = (url: string) => {
    if (url.includes("aviasales")) return "Flight Search Results"
    if (url.includes("hotellook")) return "Hotel Search Results"
    if (url.includes("economybookings")) return "Car Rental Results"
    if (url.includes("esim")) return "eSIM Deals"
    return "Search Results"
  }

  useEffect(() => {
    if (internalOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [internalOpen, internalUrl])

  const handleClose = () => {
    setInternalOpen(false)
    onClose()
  }

  return (
    <Dialog open={internalOpen} onOpenChange={handleClose}>
      <DialogContent className={`max-w-[95vw] w-full h-[90vh] p-0 ${isDark ? "bg-gray-900 border-gray-700" : "bg-white"}`}>
        <DialogHeader className={`p-6 pb-4 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <DialogTitle className={`text-2xl font-bold flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            <ExternalLink className="h-6 w-6 text-blue-600" />
            {internalTitle}
          </DialogTitle>
          <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Browse results and click on any offer to complete your booking
          </p>
        </DialogHeader>

        <div className="relative w-full h-[calc(90vh-120px)]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <p className={`text-lg font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
                Loading search results...
              </p>
              <p className={`text-sm mt-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Please wait while we fetch the best deals for you
              </p>
            </div>
          )}

          {internalUrl && (
            <iframe
              key={internalUrl}
              src={internalUrl}
              className="w-full h-full border-0 rounded-b-lg"
              title={internalTitle}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
