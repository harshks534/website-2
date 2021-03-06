/* eslint-disable no-underscore-dangle,react/no-array-index-key */
import React from 'react'
import marked from 'marked'
import { Link } from 'gatsby'
import Container from '~components/common/container'
import blogFootnotesStyle from './blog-footnotes.module.scss'

const Footnote = ({ number, footnote }) => (
  <p id={`footnote-${number}`}>
    <Link to={`#original-footnote-${number}`}>
      <strong>{number}</strong>
    </Link>{' '}
    <span
      dangerouslySetInnerHTML={{
        __html: marked.inlineLexer(footnote, []),
      }}
    />
  </p>
)

const Footnotes = ({ footnoteText, contentBlocks }) => {
  const footnotes = contentBlocks.filter(
    block => block.__typename === 'ContentfulContentBlockFootnote',
  )
  return (
    <Container centered>
      {footnoteText && (
        <div
          id="footnotes"
          className={blogFootnotesStyle.footnotes}
          dangerouslySetInnerHTML={{ __html: footnoteText }}
        />
      )}
      {footnotes.length > 0 && (
        <div className={blogFootnotesStyle.footnotes}>
          {footnotes.map(({ footnote }, index) => (
            <Footnote
              key={`footnote-${index}`}
              number={index + 1}
              footnote={footnote.footnote}
            />
          ))}
        </div>
      )}
    </Container>
  )
}

export default Footnotes
