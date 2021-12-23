import React, { FC, useEffect, useRef, useState } from 'react'

import { TextColor } from '../../lib/types/textColor'
import { distanceCalculation, timeCalculation } from '../../utils/drawing'
import { useConfetti } from '../providers/ConfettiProvider'
import { DrawEvent, useDraw } from '../providers/DrawProvider'

interface TotalDrawTimeProps {
  initialValue: number
  textColor: TextColor
  localStorageKey?: string
  suffix?: string
  calculator?: (event: DrawEvent, previousEvent: DrawEvent) => number
  callback?: () => void
}

export const TotalDrawTime: FC<TotalDrawTimeProps> = props => {
  /**
   * State
   */
  const {
    initialValue,
    textColor,
    localStorageKey,
    suffix,
    calculator,
    callback,
  } = props

  const [countDown, setCountdown] = useState(
    (localStorageKey && Number(localStorage.getItem(localStorageKey))) ??
      initialValue
  )
  const callbackFired = useRef(false)

  /**
   * Custom & 3rd party hooks
   */
  const { addDrawMethod, removeDrawMethod } = useDraw()

  /**
   * Hooks
   */
  useEffect(() => {
    let previousEvent: DrawEvent | undefined

    const draw = (event?: DrawEvent) => {
      setCountdown(prev => {
        if (calculator) return prev - calculator(event, previousEvent ?? event)

        return prev - timeCalculation(event, previousEvent ?? event)
      })
      previousEvent = event
    }

    const drawer = addDrawMethod(draw)

    return () => {
      removeDrawMethod(drawer)
    }
  }, [addDrawMethod, removeDrawMethod, calculator])

  useEffect(() => {
    if (callbackFired.current) return

    if (countDown <= 0) {
      callback && callback()
      // callback({ origin: { x: 0, y: 1 }, angle: 20, spread: 150 })
      // callback({ origin: { x: 0.5, y: 0.5 }, angle: -20, spread: 150 })
      callbackFired.current = true
    }
  }, [countDown, callback])

  /**
   * Render
   */
  return (
    <div
      style={{ zIndex: 1000 }}
      className={`fixed bottom-5 right-5 heading-extra-small ${textColor}`}
    >
      {Math.max(countDown, 0).toFixed(2)}
      <span className="body-medium">{suffix ?? "s"}</span>
    </div>
  )
}
