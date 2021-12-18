import React, { FC } from 'react'

interface ContentSeparatorProps {
  size?: string
}

export const ContentSeparator: FC<ContentSeparatorProps> = props => {
  /**
   * State
   */
  const { size } = props

  /**
   * Render
   */
  return <div className={size ?? "mb-40 md:mb-52"}></div>
}
