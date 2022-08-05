import WordCloud from 'react-d3-cloud'
import { withRouter } from 'react-router'
import { getAllTagCounts } from '../../utilities/RecipesUtilities'

import '../../styles/reports/TagWordCloud.css'
import useRecipes from '../../hooks/useRecipes'

const TagWordCloud = ({ history }) => {
  const recipes = useRecipes()

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  const vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) - 52 // navbar height

  if (vw <= 0 || vh <= 0) {
    return <div>Error calculating dimensions</div>
  }

  // On mobile, where width < height, limit font size more
  const maxFontSize = vw > vh ? 64 : 32

  const tags = getAllTagCounts(recipes)

  const data = Object.keys(tags)
    .map((key) => ({
      text: key,
      value: tags[key],
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 400)

  return (
    <div className='word-cloud'>
      <WordCloud
        data={data}
        width={vw / 2}
        height={vh / 2}
        padding={1}
        fontSize={(word) => Math.min(word.value * 1.5, maxFontSize)}
        rotate={(word) => (word.value % 90) - 45}
        onWordClick={(event, word) => {
          history.push('/tag/' + word.text.replace(/ /g, '_'))
        }}
      />
    </div>
  )
}

export default withRouter(TagWordCloud)
