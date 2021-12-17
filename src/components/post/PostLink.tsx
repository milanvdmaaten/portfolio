import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FC } from 'react'

import { useDraw } from '../providers/DrawProvider'

interface PostLinkProps {
  post: any
}

export const PostLink: FC<PostLinkProps> = props => {
  /**
   * Component state
   */
  const { post } = props

  const { slug } = post.fields
  const { title, tagline, date, drawColor, featuredImage } = post.frontmatter

  const renderImage = getImage(featuredImage)

  /**
   * Custom & 3th party hooks
   */
  const { setDrawColor } = useDraw()

  /**
   * Methods
   */

  return (
    <Link
      key={slug}
      to={slug}
      onMouseEnter={() => setDrawColor(drawColor)}
      className="blog-post-link"
    >
      <GatsbyImage
        image={renderImage}
        objectFit="initial"
        alt={`alt`}
        className={`blog-post-link-image`}
      />
      <section className="flex flex-col md:flex-row">
        <h2 className="case__title">{title}</h2>
        <div className="body-small">
          <div>{tagline}</div>
          <div>{date}</div>
        </div>
      </section>
    </Link>
  )
}
