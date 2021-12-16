import * as React from 'react'

interface ContentSeparatorProps {
  size?: string
}

export const ContentSeparator: React.FC<ContentSeparatorProps> = props => {
  /**
   * State
   */
  const { size } = props

  /**
   * Render
   */
  return <div className={size ?? "mb-40 md:mb-52"}></div>
}
