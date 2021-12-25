import React, { FC, useEffect, useState } from 'react'

import { useScroll } from './providers/ScrollProvider'

interface FullscreenIntroProps {
  background: string
}

export const PostProgress: FC<FullscreenIntroProps> = props => {
  /**
   * Component state
   */
  const { background } = props

  const [progress, setProgress] = useState(0)

  /**
   * Custom & 3th party hooks
   */
  const { addScrollListener, removeScrollListener } = useScroll()

  /**
   * Side effects
   */
  useEffect(() => {
    const footer = document.getElementById("footer")
    const listener = scroll => {
      setProgress(
        (scroll.position * 100) / (footer.offsetTop - footer.offsetHeight)
      )
    }

    const key = addScrollListener(listener)

    return () => {
      removeScrollListener(key)
    }
  }, [addScrollListener, removeScrollListener])

  /**
   * render
   */
  return (
    <div className="fixed w-screen h-1 top-0 z-50">
      <div
        className="relative h-full rounded-r-full"
        style={{
          background,
          width: progress + "%",
        }}
      />
    </div>
  )
}
