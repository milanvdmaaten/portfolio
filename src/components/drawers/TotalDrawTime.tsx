import { FC, useEffect } from 'react'

import { useConfetti } from '../providers/ConfettiProvider'
import { useDraw } from '../providers/DrawProvider'

export const TotalDrawTime: FC = () => {
  /**
   * State
   */

  /**
   * Custom & 3rd party hooks
   */
  const { addDrawMethod, removeDrawMethod } = useDraw()
  const { fire } = useConfetti()

  /**
   * Hooks
   */
  useEffect(() => {
    let prev = { x: 0, y: 0 }
    let totalDrawLength = 0
    let firedConfetti = false

    const draw = (event?: { x: number; y: number }) => {
      const { x, y } = event

      // https://www.unitconverters.net/typography/pixel-x-to-meter.htm
      const pointDistance = Math.hypot(x - prev.x, y - prev.y)
      // Prevent jumps in the screen
      // We only want to calculate if the user "actually" draws something
      if (pointDistance <= 50) totalDrawLength += pointDistance * 0.0002645833

      prev = { x, y }

      if (totalDrawLength > 10 && !firedConfetti) {
        firedConfetti = true
        fire({ origin: { x: 0, y: 1 }, angle: 20, spread: 150 })
        fire({ origin: { x: 0.5, y: 0.5 }, angle: -20, spread: 150 })
      }
    }

    const drawer = addDrawMethod(draw)

    return () => {
      removeDrawMethod(drawer)
    }
  }, [addDrawMethod, removeDrawMethod])
  /**
   * Render
   */
  return null
}
