import './App.css'

import { useCallback, useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import NavBar from './components/navbar/NavBar'

import RecipeCardDeck from './components/carddeck/RecipeCardDeck'
import Recipe from './components/recipe/Recipe'
import RecipeGrid from './components/grid/RecipeGrid'
import EditForm from './components/upload/EditForm'
import UploadForm from './components/upload/UploadForm'
import NotFound from './components/NotFound'
import AlertsOverlay from './components/alerts/AlertsOverlay'
import ModalOverlay from './components/modals/ModalOverlay'
import TagRename from './components/tags/TagRename'
import ReportPage from './components/reports/ReportPage'
import GroceriesContainer from './components/groceries/GroceriesContainer'

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

const SectionRoute = (props) => {
  const sectionName = props.match.params.sectionName
  const filter = useCallback(
    (recipe) => sectionName === recipe.section,
    [sectionName]
  )
  return <RecipeCardDeck filter={filter} />
}

const TagRoute = (props) => {
  const tag = props.match.params.tagName
  const filter = useCallback(
    (recipe) => recipe.tags.includes(tag.replace(/_/g, ' ')),
    [tag]
  )

  return <RecipeCardDeck filter={filter} />
}

const App = () => {
  const renderRoutes = () => (
    <>
      <ScrollToTop />
      <Switch>
        <Route path='/recipe/:recipeName' component={RecipeRoute} />
        <Route path='/grid' component={RecipeGrid} />
        <Route path='/groceries' component={GroceriesContainer} />
        <Route path='/tags' component={TagRename} />
        <Route path='/upload' component={UploadForm} />
        <Route path='/edit' component={EditForm} />
        <Route path='/sections/:sectionName' component={SectionRoute} />
        <Route path='/tag/:tagName' component={TagRoute} />
        <Route path='/reports' component={ReportPage} />
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
