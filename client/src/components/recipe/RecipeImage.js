import withCSSAnimation from '../hoc/withCSSAnimation'

import '../../styles/recipe/RecipeImage.css'

const RecipeImage = ({ imageLocation }) => {
  const ImageWithTransition = withCSSAnimation(
    <img id='recipeImage' src={imageLocation} alt='' />
  )

  return (
    <div className='image-wrapper'>
      <ImageWithTransition cssPrefix='recipe-image' timeout={500} />
    </div>
  )
}

export default RecipeImage
