import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (event) => setMatches(event.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export function useResponsive() {
  const isSmallerDevice = useMediaQuery('(max-width: 1023px)')
  const isMobile = useMediaQuery('(max-width: 480px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1000px)')
  return { isSmallerDevice, isMobile, isTablet }
}
