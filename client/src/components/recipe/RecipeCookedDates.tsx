import '../../styles/recipe/RecipeCookedDates.css'
import { Datenum } from '../../types/Aliases'

type Props = {
  dates: Datenum[]
}

const RecipeCookedDates = ({ dates }: Props) => {
  if (!dates || dates.length === 0) {
    return null
  }

  const recentDate = new Date(dates[0])
  const formattedMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(recentDate)
  const formattedYear = recentDate.getUTCFullYear()

  const totalTimes = dates.length || 1
  const suffix = totalTimes > 1 ? 'times' : 'time'
  return (
    <div className='cooked-dates'>
      Last made {formattedMonth} {formattedYear} ({totalTimes} {suffix})
    </div>
  )
}

export default RecipeCookedDates
