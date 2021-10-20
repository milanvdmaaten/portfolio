import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as React from "react"

export const Post = ({ post, author, size }) => {
  const { frontmatter, fields } = post
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
            <GatsbyImage image={image} alt={frontmatter.tagline ?? ""} />
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
      </article>
    </Link>
  )
}
