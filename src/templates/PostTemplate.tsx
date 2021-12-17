import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'

import { Content } from '../components/content/Content'
import { ContentSeparator } from '../components/layout/ContentSeparator'
import { Grid } from '../components/layout/Grid'
import { Layout } from '../components/layout/Layout'
import { OtherPosts } from '../components/post/OtherPosts'
import { PostHeader } from '../components/post/PostHeader'
import Seo from '../components/seo'

const PostTemplate = ({ data }) => {
  /**
   * Component state
   */
  const author = data.site.siteMetadata.author

  const { frontmatter, id } = data.markdownRemark
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

  const nodes = edges.map(({ node }) => node)

  const posts = nodes.filter(node => node.fileAbsolutePath.includes("/blog/"))
  const pages = nodes.filter(node => node.fileAbsolutePath.includes("/page/"))

  /**
   * Side effects
   */

  /**
   * Render
   */
  return (
    <Layout
      pages={pages}
      owner={author.name}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <Seo title={title} description={tagline} />
      <PostHeader
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
        posts={posts.filter(post => post.id !== id)}
        author={author}
      />
    </Layout>
  )
}

export default PostTemplate

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
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          fileAbsolutePath
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
