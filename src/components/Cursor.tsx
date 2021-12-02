import React, { FC } from 'react'
import AnimatedCursor from 'react-animated-cursor'

import { hexToRgb } from '../customCursor'
import { useDraw } from './provider/DrawProvider'

export const Cursor: FC = () => {
  /**
   * Custom & 3th party hooks
   */
  const { drawSize, drawColor } = useDraw()

  const { r, g, b } = hexToRgb(drawColor)

  /**
   * Render
   */
  if (typeof window === "undefined") return null
  return (
    <AnimatedCursor
      innerSize={drawSize * 1.5}
      color={`${r}, ${g}, ${b}`}
      outerScale={15}
    />
  )
}
