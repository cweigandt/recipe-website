import SlantToggle from '../widgets/SlantToggle'
import { useCookies } from 'react-cookie'

import { ReactComponent as MoonSVG } from '../../svg/moon.svg'
import { ReactComponent as SunSVG } from '../../svg/sun.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

import '../../styles/navbar/DarkThemeToggle.css'

const DarkThemeToggle = () => {
  const isInitialMount = useRef(true)
  const [cookies, setCookie] = useCookies(['user'])
  const [isDarkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (
      cookies['light-mode-enabled'] &&
      cookies['light-mode-enabled'] === 'true'
    ) {
      setDarkMode(false)
    }
  }, [cookies])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      document.body.classList.toggle('dark-theme', isDarkMode)
      setCookie('light-mode-enabled', !isDarkMode, {
        maxAge: 60 * 60 * 24 * 365 * 1000, // yearly
      })
    }
  }, [isDarkMode, setCookie])

  const handleChange = useCallback((side) => {
    setDarkMode(side === 'A')
  }, [])

  return (
    <SlantToggle
      AComponent={
        <MoonSVG
          className={`dark-theme-toggle-svg ${
            isDarkMode ? 'toggle-on' : 'toggle-off'
          }`}
        />
      }
      BComponent={
        <SunSVG
          className={`dark-theme-toggle-svg right ${
            isDarkMode ? 'toggle-off' : 'toggle-on'
          }`}
        />
      }
      colorA={'#1976d2'}
      colorB={'#f57c00'}
      onChange={handleChange}
      selectedSide={isDarkMode ? 'A' : 'B'}
    />
  )
}

export default DarkThemeToggle
