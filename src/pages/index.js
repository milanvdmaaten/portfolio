import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { Grid } from "../components/layout/grid"
import { ContentSeparator } from "../components/layout/contentSeparator"
import { Link } from "gatsby"

import { onHoverLink } from "../customCursor"

const BlogIndex = ({ data, location }) => {
  const author = data.site.siteMetadata.author
  const description = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.nodes

  // eslint-disable-next-line no-useless-escape
  const name = author?.name.match(/^([\w\-]+)/)[0]

  const timeOfDay = () => {
    const time = new Date().getHours()

    if (time < 6 || time >= 20) return "evening"
    if (time >= 12) return "afternoon"
    if (time >= 6) return "morning"

    return "evening"
  }

  return (
    <Layout location={location} owner={author.name}>
      <Seo title={description} />
      <Grid>
        <section className="py-64 col-span-12 text-center ">
          <h1 className="heading-large mb-5">
            Good {timeOfDay()} <br /> my name is {name}
          </h1>
          <h2 className="body-large max-w-3xl m-auto">{author.summary}</h2>
        </section>
      </Grid>
      <Grid className="px-4 " gapY="32">
        {posts?.map(post => {
          const { slug } = post.fields
          const { title, tagline, date, backgroundColor } = post.frontmatter
          return (
            <Link
              key={slug}
              to={slug}
              onMouseEnter={() => onHoverLink(backgroundColor)}
              className="md:col-start-2 col-span-12 md:col-span-11 flex"
            >
              <h2 className="case__title">{title}</h2>
              <div className="body-small">
                <div>{tagline}</div>
                <div>{date}</div>
              </div>
            </Link>
          )
        })}
      </Grid>
      <ContentSeparator />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
          summary
        }
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___displayPosition], order: ASC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY")
          title
          fullWidth
          backgroundColor
          hasContent
          tagline
          featuredImage {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`
