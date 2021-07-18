import './App.css'

import { Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'

import RecipeCardDeck from './components/RecipeCardDeck'
import Recipe from './components/Recipe'
import RecipeGrid from './components/RecipeGrid'
import EditForm from './components/EditForm'
import UploadForm from './components/UploadForm'
import TagsList from './components/TagsList'
import NotFound from './components/NotFound'

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
              requestURL={'/request/recipes/' + props.match.params.sectionName}
            ></RecipeCardDeck>
          )}
        ></Route>
        <Route
          path='/tag/:tagName'
          render={(props) => (
            <RecipeCardDeck
              requestURL={
                '/request/tag/' + props.match.params.tagName.replace(/_/g, ' ')
              }
            ></RecipeCardDeck>
          )}
        ></Route>
        <Route
          exact
          path='/'
          render={(props) => (
            <RecipeCardDeck requestURL='/request/all-recipes'></RecipeCardDeck>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}

export default App
