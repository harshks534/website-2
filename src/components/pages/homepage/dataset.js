import React from 'react'
import Img from 'gatsby-image'
import datasetStyles from './dataset.module.scss'

export default ({ image, title, children, flip }) => (
  <div className={`${datasetStyles.dataset} ${flip && datasetStyles.flip}`}>
    <div className={datasetStyles.info}>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
    <div className={datasetStyles.image}>
      <Img fluid={image} alt="" />
    </div>
  </div>
)
