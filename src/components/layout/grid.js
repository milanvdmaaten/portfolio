import * as React from "react"

export const Grid = ({ children, className = "", gapY, fullWidth }) => {
  const gaps = `gap-x-2 lg:gap-x-16 gap-y-4 lg:gap-${gapY ?? "52"}`

  return (
    <section
      className={
        fullWidth
          ? `w-full ${className}`
          : ` grid grid-cols-12 ${gaps} max-w-screen-3xl m-auto ${className} `
      }
    >
      {children}
    </section>
  )
}
