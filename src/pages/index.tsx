import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'

import { ContentSeparator } from '../components/layout/ContentSeparator'
import { FullscreenIntro } from '../components/layout/FullscreenIntro'
import { Grid } from '../components/layout/Grid'
import { Layout } from '../components/layout/Layout'
import { PostLink } from '../components/post/PostLink'
import { useDraw } from '../components/providers/DrawProvider'
import Seo from '../components/seo'

const BlogIndex = ({ data }) => {
  /**
   * Component state
   */
  const { site, allMarkdownRemark } = data
  const { siteMetadata } = site
  const { author, description } = siteMetadata
  const { nodes } = allMarkdownRemark
  const posts = nodes.filter(node => node.fileAbsolutePath.includes("/blog/"))
  const pages = nodes.filter(node => node.fileAbsolutePath.includes("/page/"))

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof localStorage === "undefined") return
    return true
    const lastVisit = localStorage.getItem("lastVisit")

    localStorage.setItem("lastVisit", new Date().toUTCString())
    if (!lastVisit) return true

    const date1 = new Date(lastVisit)
    const date2 = new Date()
    // @ts-ignore
    const diffTime = Math.abs(date2 - date1)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return diffDays > 1
  })

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

    let text = "`"
    if (time < 6 || time >= 20) text += "evening"
    else if (time >= 12) text += "afternoon"
    else if (time >= 6) text += "morning"

    return text
  }

  const closeIntro = (): void => setShowIntro(false)

  /**
   * Side effects
   */

  /**
   * Render
   */
  return (
    <Layout owner={author.name} pages={pages}>
      <Seo title={description} />
      <FullscreenIntro
        title={timeOfDay()}
        header={`My name is ${name},`}
        subheader={author.summary}
        show={showIntro}
        close={closeIntro}
      />
      {!showIntro && (
        <Grid className="pt-60 md:pt-44">
          {posts?.map((post, index) => (
            <PostLink post={post} key={index} />
          ))}
        </Grid>
      )}
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
        fileAbsolutePath
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
