import React, { Fragment, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Tags from '@yaireo/tagify/dist/react.tagify'

import '../../styles/upload/UploadForm.css'
import '@yaireo/tagify/dist/tagify.css'
import confetti from 'canvas-confetti'

import { addAlert } from '../../actions/alertsActions'
import { ALERT_TYPES } from '../alerts/Alert'
import { showModal } from '../../actions/modalActions'
import * as ModalTypes from '../modals/ModalTypes'

import { getAllTags } from '../../utilities/RecipesUtilities'
import useRecipes from '../../hooks/useRecipes'

function UploadForm(props) {
  const [sections, setSections] = useState([])
  const recipes = useRecipes()

  const tagifyRef = useRef(null)
  const formRef = useRef(null)
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
    formRef.current.reset()
    window.scrollTo(0, 0)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  window.confetti = handleUploadSuccess

  const handleFormSubmit = (e) => {
    const { dispatch, formSubmitAction, recipe } = props
    e.preventDefault()

    const formData = new FormData(formRef.current)
    if (recipe && recipe.name !== formData.get('name')) {
      formData.set('oldName', recipe.name)
    }
    if (recipe && recipe.uploadTime) {
      formData.set('uploadTime', recipe.uploadTime)
    }
    if (recipe && recipe.visits) {
      formData.set('visits', recipe.visits)
    }
    if (recipe && recipe.cookedDates) {
      formData.set('cookedDates', recipe.cookedDates)
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
  }) => {
    return (
      <div className='form-group'>
        <label for={id} className='form-label'>
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
            defaultValue: props.recipe.name || '',
          },
        })}

        <div className='form-group'>
          <label for='sectionInput' className='form-label'>
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
                selected={props.recipe.section === section ? true : false}
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
          additionalProps: { defaultValue: props.recipe.servings || '' },
        })}

        {renderTextLineInput({
          id: 'timeInput',
          title: 'Time',
          name: 'time',
          additionalProps: {
            placeholder: 'e.g. 1h 30m',
            defaultValue: props.recipe.time || '',
          },
        })}

        <div className='form-group'>
          <label for='imageInput' className='form-label'>
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
          <label for='ingredientsInput' className='form-label'>
            Ingredients
          </label>
          <textarea
            className='form-control'
            id='ingredientsInput'
            name='ingredients'
            data-test-id='upload-field-ingredients'
            rows='10'
            defaultValue={
              props.recipe.ingredients
                ? props.recipe.ingredients.join('\n')
                : ''
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
            defaultValue: props.recipe.subIngredients1Name || '',
          },
          children: (
            <textarea
              className='form-control'
              id='subIngredients1Input'
              name='subIngredients1'
              data-test-id='upload-field-subIngredients1'
              rows='5'
              defaultValue={
                props.recipe.subIngredients1
                  ? props.recipe.subIngredients1.join('\n')
                  : ''
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
            defaultValue: props.recipe.subIngredients2Name || '',
          },
          children: (
            <textarea
              className='form-control'
              id='subIngredients2Input'
              name='subIngredients2'
              data-test-id='upload-field-subIngredients2'
              rows='5'
              defaultValue={
                props.recipe.subIngredients2
                  ? props.recipe.subIngredients2.join('\n')
                  : ''
              }
            ></textarea>
          ),
        })}

        <div className='form-group'>
          <label for='stepsInput' className='form-label'>
            Steps
          </label>
          <textarea
            className='form-control'
            id='stepsInput'
            name='steps'
            data-test-id='upload-field-steps'
            rows='12'
            defaultValue={
              props.recipe.steps ? props.recipe.steps.join('\n') : ''
            }
            required
          ></textarea>
        </div>

        <div className='form-group'>
          <label for={'tags'} className='form-label'>
            Tags
          </label>
          <Tags
            tagifyRef={tagifyRef}
            name='tags'
            className='tagsInput'
            value={props.recipe.tags ? props.recipe.tags.join(', ').trim() : ''}
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
            defaultValue: props.recipe.uploader || 'Brittany Weigandt',
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

UploadForm.propTypes = {
  formSubmitAction: PropTypes.string,
  recipe: PropTypes.shape({
    name: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
    servings: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    ingredients: PropTypes.array.isRequired,
    subIngredients1Name: PropTypes.string.isRequired,
    subIngredients1: PropTypes.array.isRequired,
    subIngredients2Name: PropTypes.string.isRequired,
    subIngredients2: PropTypes.array.isRequired,
    steps: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    uploader: PropTypes.string.isRequired,
  }),
}

UploadForm.defaultProps = {
  recipe: {},
}

export default connect((state) => ({
  isLoggedIn: state.login.isLoggedIn,
  isLoginUpToDate: state.login.isUpToDate,
}))(UploadForm)
