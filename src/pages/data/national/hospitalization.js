import React from 'react'
import { graphql, Link } from 'gatsby'
import TableResponsive from '~components/common/table-responsive'
import Definitions from '~components/pages/data/definitions'
import Layout from '~components/layout'

const NationalDataHospitalizationPage = ({ data }) => {
  return (
    <Layout
      title="National Data: Hospitalization"
      returnLinkTitle="Our Data"
      returnLink="/data"
      path="/data/national/hospitalization"
      description="Currently hospitalized, ICU, and ventilator numbers in the US for each day from January 2020 to the present."
      returnLinks={[
        { link: '/data' },
        { link: `/data/national`, title: 'Totals for the US' },
      ]}
    >
      <Definitions
        definitions={data.allContentfulDataDefinition.nodes}
        order={[
          'hospitalizedCurrently',
          'inIcuCurrently',
          'onVentilatorCurrently',
        ]}
      />
      <h2>Hospitalization History</h2>
      <p>
        We have{' '}
        <Link to="/about-data/faq#why-have-you-stopped-reporting-national-cumulative-hospitalizations-icu-and-ventilation-numbers-on-your-website">
          removed cumulative hospitalization data for the US. Here&apos;s why
        </Link>
        .
      </p>
      <TableResponsive
        labels={[
          {
            field: 'date',
          },
          {
            field: 'hospitalizedCurrently',
            isNumeric: true,
          },
          {
            field: 'inIcuCurrently',
            isNumeric: true,
          },
          {
            field: 'onVentilatorCurrently',
            isNumeric: true,
          },
        ]}
        data={data.allCovidUsDaily.nodes}
      />
    </Layout>
  )
}

export default NationalDataHospitalizationPage

export const query = graphql`
  {
    allCovidUsDaily(sort: { fields: date, order: DESC }) {
      nodes {
        date(formatString: "MMMM D, YYYY")
        hospitalizedCurrently
        inIcuCurrently
        onVentilatorCurrently
      }
    }
    allContentfulDataDefinition(
      sort: { fields: name }
      filter: {
        fieldName: {
          in: [
            "hospitalizedCurrently"
            "inIcuCurrently"
            "onVentilatorCurrently"
          ]
        }
      }
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
