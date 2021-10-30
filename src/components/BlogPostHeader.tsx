import React, { FC, useEffect, useState } from 'react'

import { setCursorColor } from '../customCursor'
import { useDraw } from './provider/DrawProvider'
import { useScroll } from './provider/ScrollProvider'

interface BlogPostHeaderProps {
  headerColor: string
  drawColor: string
  textColor: string
  title: string
}

export const BlogPostHeader: FC<BlogPostHeaderProps> = props => {
  /**
   * Component state
   */
  const { headerColor, drawColor, textColor, title } = props

  const [titleLeft, setTitleLeft] = useState(0)

  /**
   * Custom & 3th party hooks
   */
  const { addScrollListener, removeScrollListener } = useScroll()
  const { setDrawColor } = useDraw()

  useEffect(() => {
    const listener = (pageY: number): void => {
      setTitleLeft(pageY)
    }

    const key = addScrollListener(listener)
    setDrawColor(drawColor)
    setCursorColor(drawColor)

    return () => {
      setDrawColor("#fff")
      setCursorColor("#fff")
      removeScrollListener(key)
    }
  }, [drawColor, addScrollListener, removeScrollListener])

  return (
    <section
      style={{ background: headerColor ?? "#fff" }}
      className={`pt-64 ${textColor}`}
    >
      <h1
        className="case__title whitespace-nowrap overflow-hidden"
        style={{
          marginLeft: `-${titleLeft}px`,
        }}
      >
        {Array.from({ length: 20 }).map(_ => `${title} `)}
      </h1>
    </section>
  )
}
