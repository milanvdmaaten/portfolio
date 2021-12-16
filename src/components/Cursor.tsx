import React, { FC } from 'react'
import AnimatedCursor from 'react-animated-cursor'

import { hexToRgb } from '../utils/color'
import { useDraw } from './provider/DrawProvider'

export const Cursor: FC = () => {
  /**
   * Custom & 3th party hooks
   */
  const { drawSize, drawColor } = useDraw()
  const { red, green, blue } = hexToRgb(drawColor)

  /**
   * Render
   */
  if (typeof window === "undefined") return null
  return (
    <AnimatedCursor
      innerSize={drawSize * 1.5}
      color={`${red}, ${green}, ${blue}`}
      outerScale={15}
    />
  )
}
