import useRecipes from '../../hooks/useRecipes'
import '../../styles/widgets/Badge.css'
import { getAllTagCounts } from '../../utilities/RecipesUtilities'

function TagsList({ onBadgeClick }) {
  const recipes = useRecipes()

  const tagCounts = getAllTagCounts(recipes)
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
