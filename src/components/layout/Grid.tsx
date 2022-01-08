import React, { FC } from 'react'

interface GridProps {
  className?: string
  fullWidth?: boolean
}

export const Grid: FC<GridProps> = props => {
  /**
   * State
   */
  const { fullWidth = false, className, children } = props
  const gaps = `gap-x-2 lg:gap-x-16 gap-y-16 md:gap-y-52`

  /**
   * Render
   */
  return (
    <section
      className={
        fullWidth
          ? `w-full ${className}`
          : `grid px-2 md:px-4 grid-cols-12 ${gaps} max-w-screen-3xl m-auto ${className}`
      }
    >
      {children}
    </section>
  )
}
