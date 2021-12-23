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
    <div className="flex justify-center">
      <a
        href={href}
        target="_blank"
        className={`call_to_action ${
          textColor === "text-white" ? "inverted" : ""
        }`}
      >
        <div>{title}</div>
        <img
          src="/assets/link_arrow.svg"
          className={`ml-4 ${
            textColor === "text-white" ? "filter invert" : ""
          }`}
        />
      </a>
    </div>
  )
}
