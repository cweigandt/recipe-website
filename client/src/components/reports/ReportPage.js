import WordCloud from 'react-d3-cloud'
import { withRouter } from 'react-router'
import { getAllTagCounts } from '../../utilities/RecipesUtilities'

import '../../styles/reports/WordCloud.css'

const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
)
const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
)

const ReportPage = ({ history }) => {
  const tags = getAllTagCounts()

  const data = Object.keys(tags)
    .map((key) => ({
      text: key,
      value: tags[key],
    }))
    .sort((a, b) => a.value - b.value)
    .slice(-200)

  return (
    <div className='word-cloud'>
      <WordCloud
        data={data}
        width={vw / 2}
        height={vh / 2}
        padding={2}
        fontSize={(word) => word.value * 1.5}
        rotate={(word) => (word.value % 90) - 45}
        onWordClick={(event, word) => {
          history.push('/tag/' + word.text.replace(/ /g, '_'))
        }}
      />
    </div>
  )
}

export default withRouter(ReportPage)
