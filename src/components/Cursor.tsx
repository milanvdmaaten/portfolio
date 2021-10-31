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
  try {
    // We need to try because AnimatedCursor needs window
    // Which is not available in CI/CD pipeline
    return (
      <AnimatedCursor
        innerSize={drawSize}
        color={`${r}, ${g}, ${b}`}
        outerScale={15}
      />
    )
  } catch {
    return null
  }
}
