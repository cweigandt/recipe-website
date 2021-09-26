import SlantToggle from '../widgets/SlantToggle'

import { ReactComponent as MoonSVG } from '../../svg/moon.svg'
import { ReactComponent as SunSVG } from '../../svg/sun.svg'
import { useCallback, useEffect, useRef, useState } from 'react'

import '../../styles/navbar/DarkThemeToggle.css'

const DarkThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(true)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
    } else {
      document.body.classList.toggle('dark-theme')
    }
  }, [isDarkMode])

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
