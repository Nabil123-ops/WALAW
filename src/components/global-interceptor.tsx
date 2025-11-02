"use client"

import { useEffect } from 'react'

export default function GlobalInterceptor() {
  useEffect(() => {
    // Store original window.open
    const originalOpen = window.open

    // Override window.open
    window.open = function(url?: string | URL, target?: string, features?: string) {
      if (url && typeof url === 'string') {
        const urlStr = url.toString()
        if (urlStr.includes('aviasales') || 
            urlStr.includes('hotellook') || 
            urlStr.includes('economybookings') || 
            urlStr.includes('travelpayouts') ||
            urlStr.includes('tp.media')) {
          // Dispatch custom event that modal can listen to
          window.dispatchEvent(new CustomEvent('travelpayouts-search', {
            detail: { url: urlStr }
          }))
          return null
        }
      }
      return originalOpen.call(this, url, target, features)
    }

    // Intercept all clicks on the page
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check if it's a link
      const link = target.closest('a')
      if (link) {
        const href = link.href
        if (href && (
          href.includes('aviasales') || 
          href.includes('hotellook') || 
          href.includes('economybookings') || 
          href.includes('travelpayouts') ||
          href.includes('tp.media')
        )) {
          e.preventDefault()
          e.stopPropagation()
          window.dispatchEvent(new CustomEvent('travelpayouts-search', {
            detail: { url: href }
          }))
        }
      }
    }

    // Intercept all form submissions
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement
      const action = form.getAttribute('action') || ''
      
      if (action && (
        action.includes('aviasales') || 
        action.includes('hotellook') || 
        action.includes('economybookings') || 
        action.includes('travelpayouts') ||
        action.includes('tp.media')
      )) {
        e.preventDefault()
        e.stopPropagation()
        
        const formData = new FormData(form)
        const method = form.getAttribute('method') || 'GET'
        
        let url = action
        if (method.toUpperCase() === 'GET') {
          const params = new URLSearchParams()
          formData.forEach((value, key) => {
            params.append(key, value.toString())
          })
          url = action + (action.includes('?') ? '&' : '?') + params.toString()
        }
        
        window.dispatchEvent(new CustomEvent('travelpayouts-search', {
          detail: { url }
        }))
      }
    }

    // Add event listeners with capture phase
    document.addEventListener('click', handleClick, true)
    document.addEventListener('submit', handleSubmit, true)

    // Cleanup
    return () => {
      window.open = originalOpen
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('submit', handleSubmit, true)
    }
  }, [])

  return null
}
