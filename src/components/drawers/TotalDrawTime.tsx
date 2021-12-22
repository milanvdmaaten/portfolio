import React, { FC, useEffect, useRef, useState } from 'react'

import { TextColor } from '../../lib/types/textColor'
import { distanceCalculation } from '../../utils/drawing'
import { useConfetti } from '../providers/ConfettiProvider'
import { useDraw } from '../providers/DrawProvider'

interface TotalDrawTimeProps {
  drawTime: number
  textColor: TextColor
  localStorageKey?: string
  suffix?: string
  calculator?: (event: MouseEvent, previousEvent: MouseEvent) => number
}

export const TotalDrawTime: FC<TotalDrawTimeProps> = props => {
  /**
   * State
   */
  const { drawTime, textColor, localStorageKey, suffix, calculator } = props

  const [timeToGo, setTimeToGo] = useState(
    (localStorageKey && Number(localStorage.getItem(localStorageKey))) ??
      drawTime
  )
  const callbackFired = useRef(false)

  /**
   * Custom & 3rd party hooks
   */
  const { addDrawMethod, removeDrawMethod } = useDraw()
  const { fire } = useConfetti()

  /**
   * Hooks
   */
  useEffect(() => {
    let previousEvent: MouseEvent | undefined

    const draw = (event?: MouseEvent) => {
      setTimeToGo(prev => {
        if (calculator) return prev - calculator(event, previousEvent ?? event)

        return prev - distanceCalculation(event, previousEvent ?? event)
      })
      previousEvent = event
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
      <span className="body-medium">{suffix ?? "m"}</span>
    </div>
  )
}
