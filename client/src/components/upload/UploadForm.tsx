import React, { Fragment, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import Tags from '@yaireo/tagify/dist/react.tagify'

import '../../styles/upload/UploadForm.css'
import '@yaireo/tagify/dist/tagify.css'
import confetti from 'canvas-confetti'

import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../../constants/AlertTypes'
import { showModal } from '../../actions/modalActions'
import * as ModalTypes from '../../constants/ModalTypes'

import { getAllTags } from '../../utilities/RecipesUtilities'
import withRecipes from '../hoc/withRecipes'
import { FullRecipe, PartialRecipe } from '../../types/RecipeTypes'
import { Dispatch } from 'redux'
import Tagify from '@yaireo/tagify'
import { RootState } from '../../reducers'
import { FormEventHandler } from 'react'

type Props = {
  recipes: PartialRecipe[]
  isLoginUpToDate: boolean
  isLoggedIn: boolean
  dispatch: Dispatch
  formSubmitAction?: string
  recipe?: FullRecipe
}

const EmptyRecipe = {
  name: undefined,
  section: undefined,
  servings: undefined,
  time: undefined,
  ingredients: undefined,
  subIngredients1Name: undefined,
  subIngredients1: undefined,
  subIngredients2Name: undefined,
  subIngredients2: undefined,
  steps: undefined,
  tags: undefined,
  uploader: undefined,
}

function UploadForm(props: Props) {
  const { recipe = EmptyRecipe, recipes } = props
  const [sections, setSections] = useState([])

  const tagifyRef = useRef<Tagify | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const allTags = getAllTags(recipes)

  if (props.isLoginUpToDate && !props.isLoggedIn) {
    props.dispatch(showModal(ModalTypes.LOGIN))
  }

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data)
      })
  }, [])

  const handleUploadSuccess = () => {
    if (!formRef.current) {
      return
    }

    formRef.current.reset()
    window.scrollTo(0, 0)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  // @ts-expect-error window
  window.confetti = handleUploadSuccess

  const handleFormSubmit: FormEventHandler = (e) => {
    const { dispatch, formSubmitAction, recipe } = props
    e.preventDefault()

    const formData = new FormData(formRef.current!)
    if (recipe && recipe.name !== formData.get('name')) {
      formData.set('oldName', recipe.name)
    }
    if (recipe && recipe.uploadTime) {
      formData.set('uploadTime', `${recipe.uploadTime}`)
    }
    if (recipe && recipe.visits) {
      formData.set('visits', `${recipe.visits}`)
    }
    if (recipe && recipe.cookedDates) {
      formData.set('cookedDates', JSON.stringify(recipe.cookedDates))
    }

    dispatch(addAlert('Uploading', ALERT_TYPES.STATUS))

    fetch(formSubmitAction || '/upload-recipe', {
      method: 'POST',
      redirect: 'manual',
      body: formData,
    }).then((response) => {
      response.json().then((data) => {
        let status = ALERT_TYPES.SUCCESS
        if (response.status !== 200) {
          status = ALERT_TYPES.ERROR
          console.log(data.stack)
        } else {
          handleUploadSuccess()
        }

        dispatch(addAlert(data.response, status))
      })
    })
    return false
  }

  const renderTextLineInput = ({
    id,
    title,
    name,
    additionalProps = {},
    children = null,
  }: {
    id: string
    title: string
    name: string
    additionalProps?: {}
    children?: React.ReactNode
  }) => {
    return (
      <div className='form-group'>
        <label htmlFor={id} className='form-label'>
          {title}
        </label>
        <input
          type='text'
          className='form-control'
          data-test-id={`upload-field-${name}`}
          id={id}
          onKeyDown={(e) => {
            if (e.keyCode === 13 || e.key === 'Enter') {
              e.preventDefault()
              return false
            }
          }}
          name={name}
          {...additionalProps}
        />
        {children}
      </div>
    )
  }

  if (recipes.length === 0) {
    return null
  }

  return (
    <Fragment>
      <form
        id='formWrapper'
        name='uploadForm'
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        {renderTextLineInput({
          id: 'nameInput',
          title: 'Recipe Name',
          name: 'name',
          additionalProps: {
            required: true,
            placeholder: 'Recipe',
            defaultValue: recipe.name || '',
          },
        })}

        <div className='form-group'>
          <label htmlFor='sectionInput' className='form-label'>
            Section
          </label>
          <select
            className='form-control'
            id='sectionInput'
            name='section'
            data-test-id='upload-field-section'
          >
            {sections.map((section) => (
              <option
                value={section}
                selected={recipe.section === section ? true : false}
              >
                {section}
              </option>
            ))}
          </select>
        </div>

        {renderTextLineInput({
          id: 'servingsInput',
          title: 'Servings',
          name: 'servings',
          additionalProps: { defaultValue: recipe.servings || '' },
        })}

        {renderTextLineInput({
          id: 'timeInput',
          title: 'Time',
          name: 'time',
          additionalProps: {
            placeholder: 'e.g. 1h 30m',
            defaultValue: recipe.time || '',
          },
        })}

        <div className='form-group'>
          <label htmlFor='imageInput' className='form-label'>
            Image:
          </label>
          <input
            type='file'
            className='form-control-file'
            id='imageInput'
            name='image'
            data-test-id='upload-field-image'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='ingredientsInput' className='form-label'>
            Ingredients
          </label>
          <textarea
            className='form-control'
            id='ingredientsInput'
            name='ingredients'
            data-test-id='upload-field-ingredients'
            rows={10}
            defaultValue={
              recipe.ingredients ? recipe.ingredients.join('\n') : ''
            }
            required
          ></textarea>
        </div>

        {renderTextLineInput({
          id: 'subIngredients1Name',
          title: 'Sub Ingredients 1',
          name: 'subIngredients1Name',
          additionalProps: {
            placeholder: 'Name',
            defaultValue: recipe.subIngredients1Name || '',
          },
          children: (
            <textarea
              className='form-control'
              id='subIngredients1Input'
              name='subIngredients1'
              data-test-id='upload-field-subIngredients1'
              rows={5}
              defaultValue={
                recipe.subIngredients1 ? recipe.subIngredients1.join('\n') : ''
              }
            ></textarea>
          ),
        })}

        {renderTextLineInput({
          id: 'subIngredients2Name',
          title: 'Sub Ingredients 2',
          name: 'subIngredients2Name',
          additionalProps: {
            placeholder: 'Name',
            defaultValue: recipe.subIngredients2Name || '',
          },
          children: (
            <textarea
              className='form-control'
              id='subIngredients2Input'
              name='subIngredients2'
              data-test-id='upload-field-subIngredients2'
              rows={5}
              defaultValue={
                recipe.subIngredients2 ? recipe.subIngredients2.join('\n') : ''
              }
            ></textarea>
          ),
        })}

        <div className='form-group'>
          <label htmlFor='stepsInput' className='form-label'>
            Steps
          </label>
          <textarea
            className='form-control'
            id='stepsInput'
            name='steps'
            data-test-id='upload-field-steps'
            rows={12}
            defaultValue={recipe.steps ? recipe.steps.join('\n') : ''}
            required
          ></textarea>
        </div>

        <div className='form-group'>
          <label htmlFor='tags' className='form-label'>
            Tags
          </label>
          <Tags
            tagifyRef={tagifyRef}
            name='tags'
            className='tagsInput'
            value={recipe.tags ? recipe.tags.join(', ').trim() : ''}
            settings={{
              whitelist: allTags,
              placeholder: 'e.g. Desserts, Breakfast',
              originalInputValueFormat: (valuesArr) =>
                valuesArr.map((item) => item.value).join(','),
              dropdown: {
                maxItems: 60,
                classname: 'tags-look',
                enabled: 1,
                closeOnSelect: false,
              },
            }}
          ></Tags>
        </div>

        {renderTextLineInput({
          id: 'uploaderInput',
          title: 'Uploader',
          name: 'uploader',
          additionalProps: {
            defaultValue: recipe.uploader || 'Brittany Weigandt',
          },
        })}

        <button
          type='submit'
          id='submitInput'
          className='btn'
          data-test-id='upload-submit'
        >
          Submit
        </button>
      </form>
    </Fragment>
  )
}

export default connect((state: RootState) => ({
  isLoggedIn: state.login.isLoggedIn,
  isLoginUpToDate: state.login.isUpToDate,
}))(withRecipes(UploadForm))
