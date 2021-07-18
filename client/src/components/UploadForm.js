import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useCookies } from 'react-cookie'
import { connect } from 'react-redux'

import '../styles/UploadForm.css'

import { addAlert } from '../actions/alertsActions'
import { ALERT_TYPES } from './alerts/Alert'

function UploadForm(props) {
  const [sections, setSections] = useState([])
  const [, setCookie] = useCookies(['user'])

  const formRef = useRef(null)

  useEffect(() => {
    // query api
    fetch('/request/sections')
      .then((response) => response.json())
      .then((data) => {
        setSections(data)
      })
  }, [])

  useEffect(() => {
    setCookie('bccookbook-can-edit', true, {
      path: '/',
      maxAge: 60 * 60 * 24 * 180, // 180 days
    })
  }, [setCookie])

  const handleFormSubmit = (e) => {
    e.preventDefault()

    fetch(props.formSubmitAction || '/upload-recipe', {
      method: 'POST',
      redirect: 'manual',
      body: new FormData(formRef.current),
    }).then((response) => {
      response.json().then((data) => {
        let status = ALERT_TYPES.SUCCESS
        if (response.status !== 200) {
          status = ALERT_TYPES.ERROR
          console.log(data.stack)
        } else {
          formRef.current.reset()
        }

        props.dispatch(addAlert(data.response, status))
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
      <div class='form-group'>
        <label for={id} class='form-label'>
          {title}
        </label>
        <input
          type='text'
          class='form-control'
          id={id}
          onKeyDown={(e) => {
            if (e.keyCode === 13 || e.key === 13) {
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

  return (
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

      <div class='form-group'>
        <label for='sectionInput' class='form-label'>
          Section
        </label>
        <select class='form-control' id='sectionInput' name='section'>
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

      <div class='form-group'>
        <label for='imageInput' class='form-label'>
          Image:
        </label>
        <input
          type='file'
          class='form-control-file'
          id='imageInput'
          name='image'
        />
      </div>

      <div class='form-group'>
        <label for='ingredientsInput' class='form-label'>
          Ingredients
        </label>
        <textarea
          class='form-control'
          id='ingredientsInput'
          name='ingredients'
          rows='10'
          defaultValue={
            props.recipe.ingredients ? props.recipe.ingredients.join('\n') : ''
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
            class='form-control'
            id='subIngredients1Input'
            name='subIngredients1'
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
            class='form-control'
            id='subIngredients2Input'
            name='subIngredients2'
            rows='5'
            defaultValue={
              props.recipe.subIngredients2
                ? props.recipe.subIngredients2.join('\n')
                : ''
            }
          ></textarea>
        ),
      })}

      <div class='form-group'>
        <label for='stepsInput' class='form-label'>
          Steps
        </label>
        <textarea
          class='form-control'
          id='stepsInput'
          name='steps'
          rows='12'
          defaultValue={props.recipe.steps ? props.recipe.steps.join('\n') : ''}
          required
        ></textarea>
      </div>

      {renderTextLineInput({
        id: 'tagsInput',
        title: 'Tags',
        name: 'tags',
        additionalProps: {
          placeholder: 'e.g. Desserts, Breakfast',
          defaultValue: props.recipe.tags
            ? props.recipe.tags.join(', ').trim()
            : '',
        },
      })}

      {renderTextLineInput({
        id: 'uploaderInput',
        title: 'Uploader',
        name: 'uploader',
        additionalProps: {
          defaultValue: props.recipe.uploader || 'Brittany Cormier',
        },
      })}

      <button type='submit' id='submitInput' class='btn'>
        Submit
      </button>
    </form>
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

export default connect()(UploadForm)
