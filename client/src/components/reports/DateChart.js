import { Line } from 'react-chartjs-2'
import {
  Chart,
  Tooltip,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js'

Chart.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  Title,
  LineController,
  LineElement,
  PointElement
)

const allDates = window.serverData.allRecipes.map((recipe) => recipe.uploadTime)
let counts = []
allDates.forEach((date) => {
  const dateObj = new Date(date)
  const key = `${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
  const index = counts.findIndex((obj) => obj.label === key)
  if (index > -1) {
    counts[index].value = counts[index].value + 1
  } else {
    counts.push({
      label: key,
      firstOfMonth: new Date(
        `${dateObj.getMonth() + 1}/1/${dateObj.getFullYear()}`
      ).getTime(),
      value: 1,
    })
  }
})

const getMonthYearFromKey = (key) => {
  const split = key.split('/')
  return [parseInt(split[0]), parseInt(split[1])]
}

counts = counts.sort((a, b) => {
  return a.firstOfMonth - b.firstOfMonth
})

let firstObj = counts[0]
let lastObj = counts[counts.length - 1]

const [firstMonth, firstYear] = getMonthYearFromKey(firstObj.label)
const [lastMonth, lastYear] = getMonthYearFromKey(lastObj.label)

const allKeys = counts.map((c) => c.label)
for (var year = firstYear; year <= lastYear; year++) {
  const startMonth = year === firstYear ? firstMonth : 1
  const endMonth = year === lastYear ? lastMonth : 12

  for (var month = startMonth; month <= endMonth; month++) {
    if (!allKeys.includes(`${month}/${year}`)) {
      counts.push({
        label: `${month}/${year}`,
        firstOfMonth: new Date(`${month}/1/${year}`).getTime(),
        value: 0,
      })
    }
  }
}

counts = counts.sort((a, b) => {
  return a.firstOfMonth - b.firstOfMonth
})

const data = {
  labels: counts.map((c) => c.label),
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: counts.map((c) => c.value),
    },
  ],
}

const DateChart = () => {
  return <Line data={data} />
}

export default DateChart
