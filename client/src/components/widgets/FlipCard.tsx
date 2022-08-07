import '../../styles/widgets/FlipCard.css'

type Props = {
  front: React.ReactNode
  back: React.ReactNode
  classes: string
}
function FlipCard({ front, back, classes }: Props) {
  return (
    <div className={`flip-card ${classes}`}>
      <div className='flip-card-inner'>
        <div className='flip-card-front'>{front}</div>
        <div className='flip-card-back'>{back}</div>
      </div>
    </div>
  )
}

export default FlipCard
