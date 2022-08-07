import withCSSAnimation from '../hoc/withCSSAnimation'
import '../../styles/recipe/RecipeImage.css'

const ImageWithTransition = withCSSAnimation('img', {
  timeout: 500,
})

type Props = {
  imageLocation: string
}

const RecipeImage = ({ imageLocation }: Props) => {
  return (
    <div className='image-wrapper'>
      <ImageWithTransition id='recipeImage' src={imageLocation} alt='' />
    </div>
  )
}

export default RecipeImage
