import React, { useEffect, useRef, useContext } from 'react'
import classnames from 'classnames'
import closeIcon from '~images/icons/close-x.svg'
import definitionsPanelStyles from './definitions-panel.module.scss'

const DefinitionPanelContext = React.createContext()
const AnnotationPanelContext = React.createContext()

const Definition = ({ key, definition, highlighted }) => {
  const definitionRef = useRef(false)
  useEffect(() => {
    if (highlighted) {
      definitionRef.current.focus()
    }
  })

  return (
    <div
      key={key}
      ref={definitionRef}
      tabIndex="-1"
      className={classnames(
        definitionsPanelStyles.definition,
        highlighted && definitionsPanelStyles.highlight,
      )}
    >
      <h3 className={definitionsPanelStyles.title}>{definition.name}:</h3>{' '}
      <span
        className={definitionsPanelStyles.content}
        dangerouslySetInnerHTML={{
          __html:
            definition.childContentfulDataDefinitionDefinitionTextNode
              .childMarkdownRemark.html,
        }}
      />
    </div>
  )
}

const Annotation = ({ key, annotation, highlighted }) => {
  const annotationRef = useRef(false)
  useEffect(() => {
    if (highlighted) {
      annotationRef.current.focus()
    }
  })

  return (
    <div
      key={key}
      ref={annotationRef}
      tabIndex="-1"
      className={classnames(
        definitionsPanelStyles.definition,
        highlighted && definitionsPanelStyles.highlight,
      )}
    >
      <h3 className={definitionsPanelStyles.title}>{annotation.field}</h3>
      {annotation.htmlFormat ? (
        <div dangerouslySetInnerHTML={{ __html: annotation.warning }} />
      ) : (
        <p>{annotation.warning}</p>
      )}
      {annotation.lastChecked && <p>Last updated {annotation.lastChecked}</p>}
    </div>
  )
}

const DefinitionPanel = ({
  onHide,
  highlightedDefinition,
  title,
  definitions = false,
  annotations = false,
}) => {
  return (
    <div
      className={definitionsPanelStyles.definitionsPanel}
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      aria-labelledby="definitionsDialogLabel"
    >
      <div
        role="presentation"
        onKeyDown={event => {
          if (event.key === 'Escape') {
            onHide()
          }
        }}
      >
        <div className={definitionsPanelStyles.header}>
          <h2 id="definitionsDialogLabel">{title}</h2>
          <div className={definitionsPanelStyles.closePanelContainer}>
            <button
              type="button"
              className={definitionsPanelStyles.closePanel}
              onClick={onHide}
            >
              <img src={closeIcon} alt="Close panel." />
            </button>
          </div>
        </div>
        {definitions && (
          <>
            {Object.keys(definitions).map(key => (
              <Definition
                key={key}
                highlighted={
                  definitions[key].fieldName === highlightedDefinition
                }
                definition={definitions[key]}
              />
            ))}
          </>
        )}
        {annotations && (
          <>
            {annotations.map(annotation => (
              <Annotation
                annotation={annotation}
                key={annotation.airtable_id}
                highlighted={annotation.field === highlightedDefinition}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const AnnotationButton = ({ field, children }) => {
  const annotationContext = useContext(AnnotationPanelContext)
  if (!annotationContext || !annotationContext.annotations) {
    return null
  }
  if (
    annotationContext.annotations.filter(
      annotation => annotation.field === field,
    ).length > 0
  ) {
    return children
  }
  return null
}

export {
  DefinitionPanel,
  DefinitionPanelContext,
  AnnotationPanelContext,
  AnnotationButton,
}
