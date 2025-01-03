import { useState, useEffect } from 'react'

/**
 * Hook that returns true if the current viewport matches the provided media query
 * @param query - The media query to check against
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Initial check
    setMatches(media.matches)

    // Update matches when viewport changes
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    media.addEventListener('change', listener)
    
    return () => media.removeEventListener('change', listener)
  }, [query])

  return matches
}