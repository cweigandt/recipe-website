import '../../styles/widgets/Badge.css'

type Props = {
  children?: React.ReactNode
}

const Badge = (props: Props) => {
  return <div className='badge badge-primary'>{props.children}</div>
}

export default Badge
