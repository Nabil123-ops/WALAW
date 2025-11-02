"use client"

import { useEffect, useRef, useState } from "react"
import { Globe } from "lucide-react"

export default function GoogleTranslate() {
  const initialized = useRef(false)
  const [dropdownReady, setDropdownReady] = useState(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Poll for Google Translate dropdown
    const interval = setInterval(() => {
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
      if (selectEl) {
        setDropdownReady(true)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // When user clicks globe, focus on dropdown to open language list
  const handleClick = () => {
    const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
    if (selectEl) {
      selectEl.focus()
      selectEl.click() // Some browsers require click() to open dropdown
    } else {
      alert("Google Translate dropdown not ready yet, please wait a moment.")
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!dropdownReady}
      aria-label="Translate Website"
      title={dropdownReady ? "Choose Language" : "Loading languages..."}
      className={`p-1 bg-white rounded-full shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{ width: 28, height: 28 }}
    >
      <Globe className="w-5 h-5 text-gray-700" />
    </button>
  )
}
