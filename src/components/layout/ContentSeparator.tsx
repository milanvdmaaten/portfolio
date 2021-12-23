import React, { FC } from 'react'

interface ContentSeparatorProps {
  className?: string
}

export const ContentSeparator: FC<ContentSeparatorProps> = props => {
  /**
   * State
   */
  const { className } = props

  /**
   * Render
   */
  return <div className={className ?? "mb-40 md:mb-52"}></div>
}
