import withCSSAnimation from '../hoc/withCSSAnimation'
import PropTypes from 'prop-types'
import '../../styles/recipe/RecipeImage.css'

const ImageWithTransition = withCSSAnimation('img', {
  timeout: 500,
})

const RecipeImage = ({ imageLocation }) => {
  return (
    <div className='image-wrapper'>
      <ImageWithTransition id='recipeImage' src={imageLocation} alt='' />
    </div>
  )
}

RecipeImage.propTypes = {
  imageLocation: PropTypes.string.isRequired,
}

export default RecipeImage
