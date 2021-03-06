import React from 'react'
import { graphql } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataCasesPage = ({ data }) => {
  return (
    <Layout
      title="National Data: Cases"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/cases"
      description="Numbers of new and cumulative cases for the US for each day from January 2020 to the present."
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={['positive', 'positiveIncrease']}
      />
      <h2>Case History</h2>
      <TableResponsive
        labels={[
          {
            field: 'date',
          },
          {
            field: 'positive',
            isNumeric: true,
          },

          {
            field: 'positiveIncrease',
            isNumeric: true,
          },
        ]}
        data={data.allCovidUsDaily.nodes}
      />
    </Layout>
  )
}

export default NationalDataCasesPage

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        positive
        positiveIncrease
      }
    }
    allContentfulDataDefinition(
      filter: { fieldName: { in: ["positive", "positiveIncrease"] } }
    ) {
      nodes {
        name
        fieldName
        childContentfulDataDefinitionDefinitionTextNode {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  }
`
