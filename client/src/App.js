import './App.css'

import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'

import RecipeCardDeck from './components/carddeck/RecipeCardDeck'
import Recipe from './components/recipe/Recipe'
import RecipeGrid from './components/grid/RecipeGrid'
import EditForm from './components/upload/EditForm'
import UploadForm from './components/upload/UploadForm'
import TagsList from './components/TagsList'
import NotFound from './components/NotFound'
import AlertsOverlay from './components/alerts/AlertsOverlay'

function App() {
  return (
    <div className='App'>
      <NavBar title='B+C Cookbook'></NavBar>
      <Switch>
        <Route
          path='/recipe/:recipeName'
          render={(props) => (
            <Recipe urlName={props.match.params.recipeName}></Recipe>
          )}
        ></Route>
        <Route path='/grid' component={RecipeGrid} />
        <Route path='/tags' component={TagsList} />
        <Route path='/upload' component={UploadForm} />
        <Route path='/edit' component={EditForm} />
        <Route
          path='/sections/:sectionName'
          render={(props) => (
            <RecipeCardDeck
              filter={(recipe) =>
                props.match.params.sectionName === recipe.section
              }
            ></RecipeCardDeck>
          )}
        ></Route>
        <Route
          path='/tag/:tagName'
          render={(props) => (
            <RecipeCardDeck
              filter={(recipe) => {
                return recipe.tags.includes(
                  props.match.params.tagName.replace(/_/g, ' ')
                )
              }}
            ></RecipeCardDeck>
          )}
        ></Route>
        <Route
          exact
          path='/'
          render={(props) => (
            <RecipeCardDeck filter={(recipe) => true}></RecipeCardDeck>
          )}
        />
        <Route component={NotFound} />
      </Switch>
      <AlertsOverlay />
    </div>
  )
}

export default App
