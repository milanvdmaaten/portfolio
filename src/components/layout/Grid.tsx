import * as React from 'react'

interface GridProps {
  className?: string
}

export const Grid: React.FC<GridProps> = props => {
  /**
   * State
   */
  const { className, children } = props

  /**
   * Render
   */
  return (
    <section
      className={`grid px-4 grid-cols-12 gap-x-2 lg:gap-x-16 gap-y-16 md:gap-y-52 max-w-screen-3xl m-auto ${className}`}
    >
      {children}
    </section>
  )
}
