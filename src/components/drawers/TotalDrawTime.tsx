import React, { FC, useEffect, useRef, useState } from 'react'

import { TextColor } from '../../lib/types/textColor'
import { useConfetti } from '../providers/ConfettiProvider'
import { useDraw } from '../providers/DrawProvider'

interface TotalDrawTimeProps {
  drawTime: number
  textColor: TextColor
  localStorageKey?: string
  suffix?: string
}

export const TotalDrawTime: FC<TotalDrawTimeProps> = props => {
  /**
   * State
   */
  const { drawTime, textColor, localStorageKey, suffix } = props

  const [timeToGo, setTimeToGo] = useState(
    (localStorageKey && Number(localStorage.getItem(localStorageKey))) ??
      drawTime
  )
  const drawThreshold = useRef(25)
  const callbackFired = useRef(false)

  /**
   * Custom & 3rd party hooks
   */
  const { addDrawMethod, removeDrawMethod } = useDraw()
  const { fire } = useConfetti()

  /**
   * Methods
   */
  const calculation = (
    event?: { x: number; y: number },
    previousEvent?: { prevX: number; prevY: number }
  ): number => {
    const { x = 0, y = 0 } = event
    const { prevX = 0, prevY = 0 } = previousEvent

    const pointDistance = Math.hypot(x - prevX, y - prevY)

    // We only want to calculate if the user "actually" draws something

    if (pointDistance <= drawThreshold.current) return 0

    // https://www.unitconverters.net/typography/pixel-x-to-meter.htm
    return pointDistance * 0.0002645833
  }

  /**
   * Hooks
   */
  useEffect(() => {
    let previousEvent = { prevX: 0, prevY: 0 }

    const draw = (event?: { x: number; y: number }) => {
      const { x, y } = event

      setTimeToGo(prev => prev - calculation(event, previousEvent))

      previousEvent = { prevX: x, prevY: y }

      // if (totalDrawLength > drawTime && !firedConfetti) {
      //   firedConfetti = true
      //   fire({ origin: { x: 0, y: 1 }, angle: 20, spread: 150 })
      //   fire({ origin: { x: 0.5, y: 0.5 }, angle: -20, spread: 150 })
      // }
    }

    const drawer = addDrawMethod(draw)

    return () => {
      removeDrawMethod(drawer)
    }
  }, [addDrawMethod, removeDrawMethod, drawTime])

  useEffect(() => {
    if (callbackFired.current) return

    if (timeToGo <= 0) {
      fire({ origin: { x: 0, y: 1 }, angle: 20, spread: 150 })
      fire({ origin: { x: 0.5, y: 0.5 }, angle: -20, spread: 150 })
      callbackFired.current = true
    }
  }, [timeToGo])

  /**
   * Render
   */
  return (
    <div
      className={`fixed z-50 bottom-5 right-5 heading-extra-small ${textColor}`}
    >
      {Math.max(timeToGo, 0).toFixed(2)}
      <span className="body-medium">{suffix ?? "s"}</span>
    </div>
  )
}
