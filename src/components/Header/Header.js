import { useState, useEffect, useRef } from "react"
import { tabs, options } from 'config/constants'
import { useQuery, useOnClickOutside } from 'hooks'
import "./styles.scss"

const Header = ({ toggleOverlay }) => {
    const { initQuery, tab, option, handleUrlChange } = useQuery()
    useEffect(() => {
        initQuery({
            tab: tabs.filter(({ value }) => value === tab || value === "data-structures"),
            option: options[tab || "data-structures"]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let tabsRef = useRef({})
    let activeTabRef = useRef({})
    let optionsRef = useRef({})
    let activeOptionRef = useRef({})

    const subheaderRef = useRef()
    const [showSubheader, setShowSubheader] = useState(null)
    useOnClickOutside(subheaderRef, () => setShowSubheader(null), showSubheader, tabsRef.current[showSubheader])
    useEffect(() => {
        setShowSubheader(null)
    }, [option])

    useEffect(() => {
        setTimeout(() => detectRoute(tab, option), 50)
    }, [tab, option, showSubheader])

    const detectRoute = (tab, option) => {
        let currentTab, currentOption
        currentTab = tabsRef?.current?.[tab] || tabsRef?.current?.['data-structures']
        currentOption = optionsRef?.current?.[option] || (optionsRef?.current?.[options[tab]?.at(0)?.value])

        const left = currentTab.offsetLeft
        const { width } = currentTab.getBoundingClientRect()
        activeTabRef?.current?.setAttribute('style', `left: ${left}px; width: ${width}px;`)
        if (currentOption) {
            const subLeft = currentOption.offsetLeft
            const { width: subWidth } = currentOption.getBoundingClientRect()
            activeOptionRef?.current?.setAttribute('style', `left: ${subLeft}px; width: ${subWidth}px;`)
        } else activeOptionRef?.current?.setAttribute('style', `left: ${left}px; width: 0px;`)
    }

    return <div className="header-container row">
        <div className="logo-container row">
            <img alt="Logo" src={require('../../assets/images/logo.png')} />
        </div>
        <div className="tabs-container row">
            {tabs?.map(({ label, value }) => (
                <p
                    key={value}
                    className={`row ${(tab || 'data-structures') === value && 'active'}`}
                    ref={(ref) => { tabsRef.current[value] = ref }}
                    onClick={() => setShowSubheader(showSubheader ? null : value)}
                >
                    {label}
                    <span className="icon icon-arrow-down" />
                </p>
            ))}
            <div
                ref={(ref) => { activeTabRef.current = ref }}
                className="active-route-selector"
            />
        </div>
        <div className="settings-container row">
            <div className="icon icon-settings" onClick={toggleOverlay} />
        </div>
        <div
            ref={subheaderRef}
            className={`options-container tabs-container row ${showSubheader && 'active'}`}
        >
            {options[showSubheader].map(({ label, value }) => (
                <p
                    key={value}
                    className={`${option === value && 'active'}`}
                    ref={(ref) => { optionsRef.current[value] = ref }}
                    onClick={() => handleUrlChange({ tab: showSubheader, option: value })}
                >
                    {label}
                </p>
            ))}
            <div ref={(ref) => { activeOptionRef.current = ref }}
                className="active-route-selector"
            />
        </div>
    </div>
}

export default Header