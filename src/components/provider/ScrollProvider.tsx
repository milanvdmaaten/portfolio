import React, { createContext, FC, useContext, useEffect, useRef, useState } from 'react'

type scrollListener = (pageY: number) => void

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

  const scrollListeners = useRef<{ [index: number]: Function }>({})

  /**
   * Methods
   */
  const addScrollListener = (listener: scrollListener): number => {
    const key = performance.now()
    scrollListeners.current[key] = listener
    console.log("addListener")
    listener(window.scrollY)

    return key
  }

  const removeScrollListener = (key: number): void => {
    scrollListeners.current[key] = undefined
  }

  /**
   * Side effects
   */
  useEffect(() => {
    const scrollEvent = (_: Event) => {
      Object.values(scrollListeners.current).forEach(listener => {
        listener(window.scrollY)
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
  const context = useContext(ScrollContext)

  return context
}
