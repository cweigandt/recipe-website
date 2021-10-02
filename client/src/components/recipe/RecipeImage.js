import withCSSAnimation from '../hoc/withCSSAnimation'

import '../../styles/recipe/RecipeImage.css'

const RecipeImage = ({ imageLocation }) => {
  const ImageWithTransition = withCSSAnimation('img', {
    cssPrefix: 'recipe-image',
    timeout: 500,
  })

  return (
    <div className='image-wrapper'>
      <ImageWithTransition id='recipeImage' src={imageLocation} alt='' />
    </div>
  )
}

export default RecipeImage
