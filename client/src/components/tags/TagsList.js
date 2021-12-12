import '../../styles/widgets/Badge.css'
import { getAllTagCounts } from '../../utilities/RecipesUtilities'

function TagsList({ onBadgeClick }) {
  const tagCounts = getAllTagCounts()
  const sortedTags = Object.keys(tagCounts).sort()

  return (
    <div className='badge-list'>
      {sortedTags.map((tag) => {
        return (
          <div
            className='badge badge-primary tags-list-badge'
            onClick={() => onBadgeClick(tag)}
            style={{ display: 'block', float: 'left', clear: 'left' }}
          >
            {`${tag} - ${tagCounts[tag]}`}
          </div>
        )
      })}
    </div>
  )
}

export default TagsList
