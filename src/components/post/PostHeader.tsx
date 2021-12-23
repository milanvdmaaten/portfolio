import { motion } from 'framer-motion'
import React, { FC, useEffect, useState } from 'react'

import { useDraw } from '../providers/DrawProvider'
import { useScroll } from '../providers/ScrollProvider'

interface PostHeaderProps {
  headerColor: string
  drawColor: string
  textColor: string
  title: string
}

export const PostHeader: FC<PostHeaderProps> = props => {
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

  /**
   * Side effects
   */
  useEffect(() => {
    const listener = (scroll): void => {
      setTitleLeft(scroll.position)
    }

    const key = addScrollListener(listener)
    setDrawColor(drawColor)
    document.documentElement.style.setProperty("--accent-color", headerColor)

    return () => {
      setDrawColor("#000000")
      document.documentElement.style.setProperty("--accent-color", "#D5ADF6")
      removeScrollListener(key)
    }
  }, [drawColor, headerColor, addScrollListener, removeScrollListener])

  /**
   * Render
   */
  return (
    <section
      style={{ background: headerColor ?? "#fff" }}
      className={`pt-64 ${textColor} overflow-hidden`}
    >
      <motion.h1
        className="case__title whitespace-nowrap overflow-hidden uppercase relative"
        initial={{ opacity: 0, left: "15vw" }}
        animate={{ opacity: 1, left: "0vw" }}
        transition={{
          duration: 0.25,
          delay: 0.8,
        }}
        style={{
          marginLeft: `-${titleLeft}px`,
        }}
      >
        {Array.from({ length: 20 }).map(_ => `${title} `)}
      </motion.h1>
    </section>
  )
}
