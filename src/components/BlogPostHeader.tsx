import React, { FC, useEffect, useState } from 'react'

import { useScroll } from './provider/ScrollProvider'

interface BlogPostHeaderProps {
  color: string
  title: string
}

export const BlogPostHeader: FC<BlogPostHeaderProps> = props => {
  /**
   * Component state
   */
  const { color, title } = props

  const [titleLeft, setTitleLeft] = useState(0)

  /**
   * Custom & 3th party hooks
   */
  const { addScrollListener, removeScrollListener } = useScroll()

  useEffect(() => {
    console.log("addScrollListener")
    const listener = (pageY: number): void => {
      console.log(pageY)
      setTitleLeft(pageY)
    }

    const key = addScrollListener(listener)

    return () => {
      removeScrollListener(key)
    }
  }, [addScrollListener, removeScrollListener])

  return (
    <section style={{ background: color ?? "#fff" }} className="pt-56">
      <h1
        className="case__title whitespace-nowrap overflow-hidden"
        style={{
          marginLeft: `-${titleLeft}px`,
        }}
      >
        {Array.from({ length: 5 }).map(_ => title)}
      </h1>
    </section>
  )
}
