import { connect } from 'react-redux'

import { ModalType, LOGIN, ARE_YOU_SURE } from '../../constants/ModalTypes'

import SignInModal from './SignInModal'
import AreYouSureModal from './AreYouSureModal'
import { RootState } from '../../reducers'

type Props = {
  modal?: ModalType
  id?: number
  additionalText?: string
}

const ModalOverlay = ({ modal, id, additionalText }: Props) => {
  var renderModal = () => {
    // switch on modal type to show LoginModal, etc.
    if (modal === LOGIN) {
      return <SignInModal id={id!} />
    }

    if (modal === ARE_YOU_SURE) {
      return <AreYouSureModal id={id!} additionalText={additionalText} />
    }
  }

  return <div className='modal-overlay'>{renderModal()}</div>
}

const mapModalToProps = (state: RootState) => {
  return {
    ...state.modal,
  }
}

export default connect(mapModalToProps)(ModalOverlay)
