import '../../styles/modals/Modal.css'

type Props = {
  children: React.ReactNode
  class: string
}

const Modal = (props: Props) => {
  return (
    <div className='modal-bg'>
      <div className={`modal ${props.class}`}>{props.children}</div>
    </div>
  )
}

export default Modal
