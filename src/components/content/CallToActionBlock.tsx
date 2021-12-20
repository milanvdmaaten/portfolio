import { Link } from 'gatsby'
import React, { FC } from 'react'

import { CallToAction } from '../../lib/types/content'

interface CallToActionBlockProps {
  content: CallToAction
}

export const CallToActionBlock: FC<CallToActionBlockProps> = props => {
  /**
   * Component state
   */
  const { title, href } = props.content

  /**
   * Render
   */
  return (
    <Link to={href} target="_blank">
      {title}
    </Link>
  )
}
