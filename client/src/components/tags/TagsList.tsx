import '../../styles/widgets/Badge.css'
import { PartialRecipe } from '../../types/RecipeTypes'
import { getAllTagCounts } from '../../utilities/RecipesUtilities'
import withRecipes from '../hoc/withRecipes'

type Props = {
  onBadgeClick: (tag: string) => void
  recipes: PartialRecipe[]
}

function TagsList({ onBadgeClick, recipes }: Props) {
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

export default withRecipes(TagsList)
