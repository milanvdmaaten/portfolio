import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout/layout"
import Seo from "../components/seo"
import { Grid } from "../components/layout/grid"
import { ContentSeparator } from "../components/layout/contentSeparator"

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
      <Grid>
        {posts?.map(post => {
          const { frontmatter, fields } = post

          const size = frontmatter.fullWidth ? "12" : "6"
          const image = getImage(frontmatter.featuredImage)
          return (
            <Link
              to={fields.slug}
              itemProp="url"
              key={fields.slug}
              className={`col-span-${size}`}
            >
              <article itemScope itemType="http://schema.org/Article">
                <header className="mb-2">
                  <figure>
                    <GatsbyImage
                      image={image}
                      alt={frontmatter.tagline ?? ""}
                    />
                    <figcaption className="hidden" itemProp="headline">
                      {frontmatter.title} | {frontmatter.tagline}
                    </figcaption>
                  </figure>
                </header>
                <p className="body-medium flex items-center">
                  <strong className="border-r-2 border-black pr-2 mr-2">
                    {frontmatter.title}
                  </strong>
                  {frontmatter.tagline}
                </p>
                <p itemProp="datePublished" className="sr-only">
                  {frontmatter.date}
                </p>
                <p itemProp="author" className="sr-only">
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
          date(formatString: "MMMM DD, YYYY")
          title
          fullWidth
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
