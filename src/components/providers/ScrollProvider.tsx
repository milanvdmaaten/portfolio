import React, { createContext, FC, useContext, useEffect, useRef, useState } from 'react'

import { getScreenHeight } from '../../utils/screenSize'

type scrollListener = (scrollPos: {
  position: number
  pxToBottom: number
}) => void

interface ScrollContextState {
  addScrollListener: (listener: scrollListener) => number
  removeScrollListener: (key: number) => void
}

const initialState: ScrollContextState = {
  addScrollListener: listener => -1,
  removeScrollListener: console.log,
}

export const ScrollContext = createContext<ScrollContextState>(initialState)

export const ScrollProvider: FC = props => {
  /**
   * Component state
   */
  const { children } = props

  const scrollListeners = useRef<{ [index: number]: scrollListener }>({})

  /**
   * Methods
   */
  const addScrollListener = (listener: scrollListener): number => {
    const key = performance.now()
    scrollListeners.current[key] = listener

    const position = window.scrollY
    const pxToBottom = getScreenHeight() - position
    listener({ position, pxToBottom })

    return key
  }

  const removeScrollListener = (key: number): void => {
    delete scrollListeners.current[key]
  }

  /**
   * Side effects
   */
  useEffect(() => {
    const scrollEvent = (_: Event) => {
      Object.keys(scrollListeners.current).forEach(key => {
        const listener = scrollListeners.current[key] as scrollListener

        if (typeof listener !== "function") {
          delete scrollListeners.current[key]
          return
        }

        const position = window.scrollY
        const pxToBottom = getScreenHeight() - position
        listener({ position, pxToBottom })
      })
    }

    const wheelEvent =
      "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"
    window.addEventListener("scroll", scrollEvent)
    window.addEventListener("DOMMouseScroll", scrollEvent) // older FF
    window.addEventListener(wheelEvent, scrollEvent) // modern desktop
    window.addEventListener("touchmove", scrollEvent) // mobile
    window.addEventListener("keydown", scrollEvent)

    return () => {
      window.removeEventListener("scroll", scrollEvent)
      window.removeEventListener("DOMMouseScroll", scrollEvent) // older FF
      window.removeEventListener(wheelEvent, scrollEvent) // modern desktop
      window.removeEventListener("touchmove", scrollEvent) // mobile
      window.removeEventListener("keydown", scrollEvent)
    }
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        addScrollListener,
        removeScrollListener,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => {
  /**
   * State
   */
  const context = useContext(ScrollContext)
  if (!context)
    throw new Error(`useScroll must be used within a ScrollProvider`)

  /**
   * Side effects
   */

  /**
   * Return
   */
  return context
}
