import { useCallback } from 'react'
import '../../styles/widgets/SlantToggle.css'

type Side = 'A' | 'B'

type Props = {
  AComponent: React.ReactNode
  BComponent: React.ReactNode
  colorA: string
  colorB: string
  onChange: (side: Side) => void
  selectedSide: Side
}

const SlantToggle = ({
  AComponent,
  BComponent,
  colorA,
  colorB,
  onChange,
  selectedSide,
}: Props) => {
  const handleClick = useCallback(
    (side: Side) => {
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
        data-test-id={`slant-toggle-A${
          selectedSide === 'A' ? ' toggle-on' : ''
        }`}
      >
        {AComponent}
      </div>
      <div
        className='toggle-slant'
        style={{
          backgroundColor: selectedSide === 'A' ? colorA : '#444',
        }}
        onClick={() => handleClick('A')}
        data-test-id={`slant-toggle-slant${
          selectedSide === 'A' ? ' toggle-on' : ''
        }`}
      ></div>
      <div
        className='slant-toggle-B'
        style={{ backgroundColor: selectedSide === 'B' ? colorB : '#444' }}
        onClick={() => handleClick('B')}
        data-test-id={`slant-toggle-B${
          selectedSide === 'B' ? ' toggle-on' : ''
        }`}
      >
        {BComponent}
      </div>
    </div>
  )
}

export default SlantToggle
