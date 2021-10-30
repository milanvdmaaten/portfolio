import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'

import { BlogPostLink } from '../components/BlogPostLink'
import { ContentSeparator } from '../components/layout/contentSeparator'
import { FullscreenIntro } from '../components/layout/FullscreenIntro'
import { Grid } from '../components/layout/grid'
import { Layout } from '../components/layout/Layout'
import Seo from '../components/seo'

const BlogIndex = ({ data }) => {
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
   * Custom & 3th party hooks
   */

  /**
   * Methods
   */
  const timeOfDay = (): string => {
    const time = new Date().getHours()

    let text = "good"
    if (time < 6 || time >= 20) text += "evening"
    else if (time >= 12) text += "afternoon"
    else if (time >= 6) text += "morning"

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
    <Layout owner={author.name}>
      <Seo title={description} />
      <FullscreenIntro
        title={timeOfDay()}
        header={`My name is ${name}`}
        subheader={author.summary}
        show={showIntro}
        onMouseDownCapture={closeIntro}
      />
      <Grid className="pt-24">
        {posts?.map((post, index) => (
          <BlogPostLink post={post} key={index} />
        ))}
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
          headerColor
          backgroundColor
          textColor
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
