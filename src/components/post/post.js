import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import * as React from "react"

export const Post = ({ post, author, textColor = "text-black" }) => {
  const { frontmatter, fields } = post
  const { slug } = fields
  const { featuredImage, tagline, title, date } = frontmatter

  const image = getImage(featuredImage)

  return (
    <Link to={slug} itemProp="url" key={slug} className={`col-span-12`}>
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
        <p className="body-small flex items-start">
          <strong className="mr-2">{title}</strong>
          <span
            className={`border-l-2 pl-2 ${
              textColor.includes("black") ? "border-black" : "border-white"
            }`}
          >
            {tagline}
          </span>
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
