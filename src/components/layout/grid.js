import * as React from "react"

export const Grid = ({ children, className = "", fullWidth = false }) => {
  const gaps = `gap-x-2 lg:gap-x-16 gap-y-16 md:gap-y-52}`

  return (
    <section
      className={
        fullWidth
          ? `w-full ${className}`
          : `grid px-4 grid-cols-12 ${gaps} max-w-screen-3xl m-auto ${className}`
      }
    >
      {children}
    </section>
  )
}
