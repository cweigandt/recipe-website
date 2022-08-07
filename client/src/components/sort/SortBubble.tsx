import { MouseEventHandler } from 'react'
import '../../styles/sort/SortBubble.css'

type Props = {
  isSelected: boolean
  name: string
  onClick: MouseEventHandler
}

const SortBubble = ({ isSelected, name, onClick }: Props) => {
  let clazz = `sort-bubble ${isSelected ? 'selected' : ''}`
  return (
    <div
      className={clazz}
      onClick={onClick}
      data-test-id={`sort-bubble-${name}`}
    >
      {name}
    </div>
  )
}

export default SortBubble
