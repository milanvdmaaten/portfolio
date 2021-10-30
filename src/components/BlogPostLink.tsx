import { Link } from 'gatsby'
import React, { FC } from 'react'

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
  const { title, tagline, date, drawColor } = post.frontmatter

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
      className="md:col-start-2 col-span-12 md:col-span-11 flex z-10"
    >
      <h2 className="case__title">{title}</h2>
      <div className="body-small">
        <div>{tagline}</div>
        <div>{date}</div>
      </div>
    </Link>
  )
}
