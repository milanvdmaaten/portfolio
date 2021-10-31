import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FC, useState } from 'react'

import { setCursorColor } from '../customCursor'
import { useDraw } from './provider/DrawProvider'

interface BlogPostLinkProps {
  post: any
}

export const BlogPostLink: FC<BlogPostLinkProps> = props => {
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
  const hoverPortfolioItem = (color: string): void => {
    setCursorColor(color)
    setDrawColor(color)
  }

  return (
    <Link
      key={slug}
      to={slug}
      onMouseEnter={() => hoverPortfolioItem(drawColor)}
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
