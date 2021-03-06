import '../../styles/sort/SortBubble.css'

const SortBubble = ({ isSelected, name, onClick }) => {
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
