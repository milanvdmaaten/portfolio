import * as React from "react"

export const Grid = ({ children, gapX, gapY, className = "", fullWidth }) => {
  const gaps = `gap-x-${gapX ?? 16} gap-y-${gapY ?? 52}`

  return (
    <section
      className={
        fullWidth
          ? `w-full ${className}`
          : `grid grid-cols-12 ${gaps} max-w-screen-xl m-auto ${className}`
      }
    >
      {children}
    </section>
  )
}
