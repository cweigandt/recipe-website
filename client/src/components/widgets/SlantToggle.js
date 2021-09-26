import { useCallback } from 'react'
import '../../styles/widgets/SlantToggle.css'

const SlantToggle = ({
  AComponent,
  BComponent,
  colorA,
  colorB,
  onChange,
  selectedSide,
}) => {
  const handleClick = useCallback(
    (side) => {
      if (side !== selectedSide) {
        onChange(side)
      }
    },
    [onChange, selectedSide]
  )

  return (
    <div className='slant-toggle-wrapper'>
      <div
        className='slant-toggle-A'
        style={{ backgroundColor: selectedSide === 'A' ? colorA : '#444' }}
        onClick={() => handleClick('A')}
      >
        {AComponent}
      </div>
      <div
        className='toggle-slant'
        style={{
          backgroundColor: selectedSide === 'A' ? colorA : '#444',
        }}
        onClick={() => handleClick('A')}
      ></div>
      <div
        className='slant-toggle-B'
        style={{ backgroundColor: selectedSide === 'B' ? colorB : '#444' }}
        onClick={() => handleClick('B')}
      >
        {BComponent}
      </div>
    </div>
  )
}

export default SlantToggle
