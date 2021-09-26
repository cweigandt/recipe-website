import './App.css'

import { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import NavBar from './components/navbar/NavBar'

import RecipeCardDeck from './components/carddeck/RecipeCardDeck'
import Recipe from './components/recipe/Recipe'
import RecipeGrid from './components/grid/RecipeGrid'
import EditForm from './components/upload/EditForm'
import UploadForm from './components/upload/UploadForm'
import TagsList from './components/TagsList'
import NotFound from './components/NotFound'
import AlertsOverlay from './components/alerts/AlertsOverlay'
import ModalOverlay from './components/modals/ModalOverlay'

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  return null
})

const RecipeRoute = (props) => (
  <Recipe urlName={props.match.params.recipeName} />
)

const SectionRoute = (props) => (
  <RecipeCardDeck
    filter={(recipe) => props.match.params.sectionName === recipe.section}
  />
)

const TagRoute = (props) => (
  <RecipeCardDeck
    filter={(recipe) => {
      return recipe.tags.includes(props.match.params.tagName.replace(/_/g, ' '))
    }}
  />
)

const App = () => {
  const renderRoutes = () => (
    <>
      <ScrollToTop />
      <Switch>
        <Route path='/recipe/:recipeName' component={RecipeRoute} />
        <Route path='/grid' component={RecipeGrid} />
        <Route path='/tags' component={TagsList} />
        <Route path='/upload' component={UploadForm} />
        <Route path='/edit' component={EditForm} />
        <Route path='/sections/:sectionName' component={SectionRoute} />
        <Route path='/tag/:tagName' component={TagRoute} />
        <Route exact path='/' component={RecipeCardDeck} />
        <Route component={NotFound} />
      </Switch>
    </>
  )
  return (
    <div className='App'>
      <NavBar title='B+C Cookbook'></NavBar>
      {renderRoutes()}
      <ModalOverlay />
      <AlertsOverlay />
    </div>
  )
}

export default App
