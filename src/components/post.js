import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as React from "react"

export const Post = ({ post, author }) => {
  const { frontmatter, fields } = post
  const { slug } = fields
  const { featuredImage, tagline, title, date, fullWidth, hasContent } =
    frontmatter

  console.log(hasContent)
  const size = fullWidth ? "12" : "6"

  const image = getImage(featuredImage)

  return (
    <Link
      to={slug}
      itemProp="url"
      key={slug}
      className={`col-span-${size ?? 12}`}
    >
      <article itemScope itemType="http://schema.org/Article">
        <header className="mb-4">
          <figure>
            <GatsbyImage
              style={{ width: "100%" }}
              image={image}
              alt={tagline ?? ""}
              objectFit="initial"
            />
            <figcaption className="hidden" itemProp="headline">
              {title} | {tagline}
            </figcaption>
          </figure>
        </header>
        <p className="body-small flex items-center">
          <strong className="border-r-2 border-black pr-2 mr-2">{title}</strong>
          {tagline}
        </p>
        <p itemProp="datePublished" className="sr-only">
          {date}
        </p>
        <p itemProp="author" className="sr-only">
          {author.name}
        </p>
      </article>
    </Link>
  )
}
