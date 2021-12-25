import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, useEffect, useRef, useState } from 'react'

import { timeCalculation } from '../../utils/drawing'
import { DrawEvent, useDraw } from '../providers/DrawProvider'

interface TotalDrawTimeProps {
  initialValue: number
  textColor: string
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
      callbackFired.current = true
    }
  }, [countDown, callback])

  /**
   * Render
   */
  return (
    <AnimatePresence>
      {countDown > 0 && (
        <motion.div
          style={{ zIndex: 60, color: textColor }}
          className={`fixed bottom-5 right-5 heading-extra-small`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.25,
            type: "spring",
          }}
          exit={{
            scale: 0,
          }}
        >
          {Math.max(countDown, 0).toFixed(2)}
          <span className="body-medium">{suffix ?? "s"}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
