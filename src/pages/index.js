import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

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
      <Seo title={author.summary} />
      <div className="container m-auto py-32">
        <h1 className="font-bold text-7xl text-center mb-5">
          Good {timeOfDay()} <br /> my name is {name}
        </h1>
        <h2 className="text-center text-2xl">{description}</h2>
      </div>
      <ol>
        {posts?.map(post => {
          console.log(post)
          const image = getImage(post.frontmatter.featuredImage)
          return (
            <li key={post.fields.slug}>
              <Link to={post.fields.slug} itemProp="url">
                <article itemScope itemType="http://schema.org/Article">
                  <header>
                    <figure>
                      <GatsbyImage
                        image={image}
                        alt={post.frontmatter.tagline}
                      />
                      <figcaption className="hidden" itemProp="headline">
                        {post.frontmatter.title} | {post.frontmatter.tagline}
                      </figcaption>
                    </figure>
                    {/* <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small> */}
                  </header>
                  <p itemProp="datePublished" className="hidden">
                    {post.frontmatter.date}
                  </p>
                  <p itemProp="author" className="hidden">
                    {author.name}
                  </p>
                  {/* <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section> */}
                </article>
              </Link>
            </li>
          )
        })}
      </ol>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          fullWidth
          tagline
          featuredImage {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
