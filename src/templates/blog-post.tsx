import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import * as React from 'react'
import Zoom from 'react-reveal/Zoom'

import { Content } from '../components/content/content'
import { ContentSeparator } from '../components/layout/contentSeparator'
import { Grid } from '../components/layout/grid'
import { Layout } from '../components/layout/layout'
import { OtherPosts } from '../components/otherPosts'
import Seo from '../components/seo'

const BlogPostTemplate = ({ data, location }) => {
  const author = data.site.siteMetadata.author

  const { frontmatter, excerpt } = data.markdownRemark

  const image = getImage(frontmatter.featuredImage)

  const { edges } = data.allMarkdownRemark

  return (
    <Layout location={location} owner={author.name}>
      <Seo
        title={frontmatter.title}
        description={frontmatter.tagline || excerpt}
      />
      <GatsbyImage
        image={image}
        alt={frontmatter.tagline ?? ""}
        className="-mt-16 w-full max-h-screen"
      />
      <ContentSeparator />
      <Grid>
        <section className="col-start-2 col-span-10 text-center">
          <h1 className="heading-large">
            {frontmatter.title} - {frontmatter.tagline}
          </h1>
        </section>
      </Grid>
      <ContentSeparator />
      <article className="blog-post-content px-4 md:px-0">
        {frontmatter.content?.map((content, index) => (
          <React.Fragment key={index}>
            <Zoom ssrFadeout>
              <Content content={content} />
            </Zoom>
            <ContentSeparator />
          </React.Fragment>
        ))}
      </article>
      <ContentSeparator />
      <OtherPosts posts={edges.map(edge => edge.node)} author={author} />
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
      filter: { frontmatter: { hasContent: { eq: true } }, id: { ne: $id } }
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
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        textColor
        backgroundColor
        tagline
        date
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
