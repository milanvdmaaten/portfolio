import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'

import { BlogPostHeader } from '../components/BlogPostHeader'
import { Content } from '../components/content/content'
import { ContentSeparator } from '../components/layout/contentSeparator'
import { Grid } from '../components/layout/grid'
import { Layout } from '../components/layout/Layout'
import { OtherPosts } from '../components/OtherPosts'
import Seo from '../components/seo'

const BlogPostTemplate = ({ data }) => {
  /**
   * Component state
   */
  const author = data.site.siteMetadata.author

  const { frontmatter } = data.markdownRemark
  const {
    tagline,
    title,
    content,
    featuredImage,
    drawColor,
    backgroundColor,
    headerColor,
    textColor,
  } = frontmatter

  const image = getImage(featuredImage)

  const { edges } = data.allMarkdownRemark

  /**
   * Side effects
   */

  /**
   * Render
   */
  return (
    <Layout
      owner={author.name}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <Seo title={title} description={tagline} />
      <BlogPostHeader
        title={title}
        headerColor={headerColor}
        drawColor={drawColor}
        textColor={textColor}
      />
      <GatsbyImage
        image={image}
        alt={tagline ?? ""}
        className="-mt-16 w-full max-h-screen"
      />
      <ContentSeparator />
      <Grid>
        <section className="col-start-2 col-span-10 text-center">
          <h2 className="heading-large">{tagline}</h2>
        </section>
      </Grid>
      <ContentSeparator />
      <article className="blog-post-content px-4 md:px-0">
        {content?.map((content, index) => (
          <React.Fragment key={index}>
            <Content content={content} textColor={textColor} />
            <ContentSeparator />
          </React.Fragment>
        ))}
      </article>
      <ContentSeparator />
      <OtherPosts
        textColor={textColor}
        backgroundColor={headerColor}
        posts={edges.map(edge => edge.node)}
        author={author}
      />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  fragment ImagesBlock on Content {
    type
    images {
      image {
        childImageSharp {
          gatsbyImageData
        }
      }
      alt
      title
      titlePosition
    }
    size
    carrousel
  }

  fragment TextBlock on Content {
    type
    title
    body
  }

  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    allMarkdownRemark(
      filter: { id: { ne: $id } }
      fileAbsolutePath: { regex: "/blog/" }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
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
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        textColor
        headerColor
        backgroundColor
        tagline
        date
        drawColor
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        content {
          ...ImagesBlock
          ...TextBlock
        }
      }
    }
  }
`
