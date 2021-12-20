import { Link } from 'gatsby'
import React, { FC } from 'react'

import { CallToAction } from '../../lib/types/content'
import { TextColor } from '../../lib/types/textColor'

interface CallToActionBlockProps {
  content: CallToAction
  textColor: TextColor
}

export const CallToActionBlock: FC<CallToActionBlockProps> = props => {
  /**
   * Component state
   */
  const { content, textColor } = props
  const { title, href } = content

  /**
   * Render
   */
  return (
    <div className="w-full text-center">
      <Link
        to={href}
        target="_blank"
        className={`call_to_action ${
          textColor.includes("black") ? "border-gray-600" : "border-gray-200"
        }`}
      >
        {title}
      </Link>
    </div>
  )
}
