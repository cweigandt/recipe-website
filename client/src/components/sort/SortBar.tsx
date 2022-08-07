import { useCallback } from 'react'
import SortBubble from './SortBubble'
import { SortType, SORT_TYPES } from '../../constants/SortTypes'

import '../../styles/sort/SortBar.css'

type Props = {
  selectedType: SortType
  onSortChange: (sortType: SortType) => void
}

const SortBar = ({ selectedType, onSortChange }: Props) => {
  const handleClick = useCallback(
    (type: SortType) => {
      if (selectedType !== type) {
        onSortChange(type)
      }
    },
    [selectedType, onSortChange]
  )

  const renderBubble = (type: SortType, name: string) => {
    return (
      <SortBubble
        isSelected={selectedType === type}
        name={name}
        onClick={() => handleClick(type)}
      />
    )
  }

  return (
    <div className='sort-bar'>
      Sort by:
      {renderBubble(SORT_TYPES.UPLOAD, 'Upload')}
      {renderBubble(SORT_TYPES.VISITS, 'Visits')}
      {renderBubble(SORT_TYPES.COOKED_DATES, 'Cooked')}
    </div>
  )
}

export default SortBar
