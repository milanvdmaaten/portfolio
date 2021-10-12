import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { ContentSeparator } from "../components/contentSeparator"

const BlogPostTemplate = ({ data, location }) => {
  const author = data.site.siteMetadata.author

  const { frontmatter, excerpt } = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  console.log(data)
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
        className="-mt-16 w-full"
      />
      <ContentSeparator />
      <section className="container m-auto">
        <h1 className="font-bold text-5xl text-center">
          {frontmatter.title} - {frontmatter.tagline}
        </h1>
      </section>
      {/* <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article> */}
      <nav>
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
    imagesBlocks {
      images {
        image {
          childImageSharp {
            gatsbyImageData
          }
        }
        alt
      }
    }
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
