import { useState, useEffect, useRef, useCallback } from 'react'

export const useCollapsable = (ref, open = false) => {
    const [isOpen, setIsOpen] = useState(open)
    const handleCollapse = useCallback(() => {
        const elem = ref.current
        if (!elem) return
        elem.style.height = ''
        elem.style.transition = 'none'
        const startHeight = window.getComputedStyle(elem).height
        elem.classList.toggle('active')
        const height = window.getComputedStyle(elem).height
        elem.style.height = startHeight
        requestAnimationFrame(() => {
            elem.style.transition = ''
            requestAnimationFrame(() => (elem.style.height = height))
        })
        elem.addEventListener('transitionend', () => (elem.style.height = ''))
    }, [ref])

    const firstRender = useRef(true)
    useEffect(() => {
        if (firstRender.current) firstRender.current = false
        else handleCollapse()
    }, [isOpen, handleCollapse])

    return [isOpen, setIsOpen]
}