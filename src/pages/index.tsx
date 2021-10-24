import { motion } from 'framer-motion'
import { graphql, Link } from 'gatsby'
import React, { Fragment, useEffect, useState } from 'react'

import { ContentSeparator } from '../components/layout/contentSeparator'
import { FullscreenIntro } from '../components/layout/fullscreenIntro'
import { Grid } from '../components/layout/grid'
import { Layout } from '../components/layout/layout'
import Seo from '../components/seo'
import { onHoverLink } from '../customCursor'

const BlogIndex = ({ data, location }) => {
  /**
   * Component state
   */
  const author = data.site.siteMetadata.author
  const description = data.site.siteMetadata.description
  const posts = data.allMarkdownRemark.nodes

  const [showIntro, setShowIntro] = useState(true)

  // eslint-disable-next-line no-useless-escape
  const name = author?.name.match(/^([\w\-]+)/)[0]

  /**
   * Methods
   */
  const timeOfDay = (): string => {
    const time = new Date().getHours()

    let text = "good"
    if (time < 6 || time >= 20) text += "evening"
    if (time >= 12) text += "afternoon"
    if (time >= 6) text += "morning"

    return text
  }

  const closeIntro = (): void => {
    console.log("TODO: uncomment close intro")
    setShowIntro(false)
  }

  /**
   * Side effects
   */
  useEffect(() => {
    setTimeout(closeIntro, 1000 * 5)
  }, [closeIntro])

  /**
   * Render
   */
  return (
    <Layout location={location} owner={author.name}>
      <Seo title={description} />
      <FullscreenIntro
        title={timeOfDay()}
        header={`My name is ${name}`}
        subheader={author.summary}
        show={showIntro}
        onMouseDownCapture={closeIntro}
      />
      <Grid className="pt-24">
        {posts?.map(post => {
          const { slug } = post.fields
          const { title, tagline, date, drawColor } = post.frontmatter
          return (
            <Link
              key={slug}
              to={slug}
              onMouseEnter={() => onHoverLink(drawColor)}
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
          drawColor
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
