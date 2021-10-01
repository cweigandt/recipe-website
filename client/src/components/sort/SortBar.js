import { useCallback } from 'react'
import SortBubble from './SortBubble'
import { SORT_TYPES } from '../../utilities/SortUtilities'

import '../../styles/sort/SortBar.css'

const SortBar = ({ selectedType, onSortChange }) => {
  const handleClick = useCallback(
    (type) => {
      if (selectedType !== type) {
        onSortChange(type)
      }
    },
    [selectedType, onSortChange]
  )

  const renderBubble = (type, name) => {
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
