import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { Grid } from "../components/layout/grid"
import { ContentSeparator } from "../components/layout/contentSeparator"
import { Content } from "../components/content/content"

const BlogPostTemplate = ({ data, location }) => {
  const author = data.site.siteMetadata.author

  const { frontmatter, excerpt } = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const image = getImage(frontmatter.featuredImage)

  return (
    <Layout location={location} title={siteTitle} owner={author.name}>
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
            <Content content={content} />
            <ContentSeparator />
          </React.Fragment>
        ))}
      </article>
      <ContentSeparator />
      <nav className="bg-yellow-50">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
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
    }
    size
    carrousel
  }

  fragment TextBlock on Content {
    type
    title
    body
  }

  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
