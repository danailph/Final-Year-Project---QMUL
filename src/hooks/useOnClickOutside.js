import { useEffect } from 'react'

export const useOnClickOutside = (ref, handler, isOpen = true, buttonRef) => {
  useEffect(() => {
    if (!isOpen) return
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return
      if (buttonRef && buttonRef.contains(event.target)) return
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler, isOpen, buttonRef])
}
