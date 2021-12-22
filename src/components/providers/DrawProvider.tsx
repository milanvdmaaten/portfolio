import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { getScreenHeight, getScreenWidth } from '../../utils/screenSize'
import { uuid } from '../../utils/uuid'

export type DrawEvent = MouseEvent | TouchEvent
type Draw = (event: DrawEvent, size: number, color: string) => void

interface DrawContextState {
  readyToDraw: boolean
  svg?: SVGSVGElement
  drawColor: string
  drawSize: number
  addDrawMethod?: (callback: Draw) => string
  removeDrawMethod?: (key: string) => void
  setDrawSize?: (size: number) => void
  setDrawColor?: (color: string) => void
}

const initialState: DrawContextState = {
  drawColor: "#000",
  drawSize: 8,
  readyToDraw: false,
}

export const DrawContext = createContext<DrawContextState>(initialState)

export const DrawProvider: React.FC = props => {
  /**
   * Component state
   */
  const { children } = props

  const [svg] = useState(() => {
    try {
      const el = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      return el
    } catch (e) {}
  })
  const [readyToDraw, setReadyToDraw] = useState(false)
  const drawMethods = useRef<Map<string, Draw>>(new Map())
  const [drawColor, setStateDrawColor] = useState("#000")
  const [drawSize, setDrawSize] = useState(8)

  /**
   * Custom & 3rd party hooks
   */

  /**
   * Methods
   */
  const addDrawMethod = (method: Draw): string => {
    const key = uuid()
    drawMethods.current.set(key, method)
    return key
  }

  const removeDrawMethod = (key: string): void => {
    drawMethods.current.delete(key)
  }

  const setDrawColor = (color: string): void => {
    setStateDrawColor(color)
    document.documentElement.style.setProperty("--mouse-color", color)
  }

  const setSvgDimensions = (_svg: SVGSVGElement): void => {
    const width = getScreenWidth()
    const height = getScreenHeight()
    _svg.setAttribute("width", `${width}`)
    _svg.setAttribute("height", `${height}`)
    _svg.setAttribute("viewBox", `0,0,${width}, ${height}`)

    _svg.style.zIndex = "0"
    _svg.style.height = height + "px"
    _svg.style.position = "absolute"
    _svg.style.width = "100%"
    _svg.style.top = "0"
  }

  const createSvg = () => {
    const layout = document.getElementById("layout")

    try {
      svg.remove()
    } catch (e) {}

    setTimeout(() => {
      setSvgDimensions(svg)

      svg.id = "drawSvg"

      layout.appendChild(svg)
    }, 1000 * 2.5) // Wait a bit so carrousels are initialized correctly
  }

  /**
   * Side effects
   */
  // Add drawing plane to the layout
  useEffect(() => {
    let isDrawing = false

    const onStart = () => (isDrawing = true)
    const onStop = () => (isDrawing = false)

    const onDraw = (event: DrawEvent): void => {
      try {
        window.getSelection().removeAllRanges()
        // @ts-ignore
        document.selection.empty()
      } catch (e) {}

      if (!isDrawing) return

      drawMethods.current.forEach(draw => draw(event, drawSize, drawColor))
    }

    window.addEventListener("resize", createSvg)
    window.addEventListener("mousemove", onDraw)
    window.addEventListener("mousedown", onStart)
    window.addEventListener("mouseup", onStop)
    window.addEventListener("touchmove", onDraw)
    window.addEventListener("touchstart", onStart)
    window.addEventListener("touchend", onStop)

    createSvg()
    setReadyToDraw(true)

    return () => {
      window.removeEventListener("resize", createSvg)
      window.removeEventListener("mousemove", onDraw)
      window.removeEventListener("mousedown", onStart)
      window.removeEventListener("mousedown", onStop)
      window.removeEventListener("touchmove", onDraw)
      window.removeEventListener("touchstart", onStart)
      window.removeEventListener("touchend", onStop)
      svg.remove()
    }
  }, [getScreenHeight, getScreenWidth, setReadyToDraw])

  /**
   * Render
   */
  return (
    <DrawContext.Provider
      value={{
        readyToDraw,
        svg,
        drawColor,
        drawSize,
        setDrawSize,
        setDrawColor,
        addDrawMethod,
        removeDrawMethod,
      }}
    >
      {children}
    </DrawContext.Provider>
  )
}

interface UseDrawProps {
  color?: string
  size?: number
  drawMethod?: (event: DrawEvent) => void
}

export const useDraw = (props: UseDrawProps = {}) => {
  /**
   * State
   */
  const { color, size, drawMethod } = props

  const context = useContext(DrawContext)
  if (!context) throw new Error(`useDraw must be used within a DrawProvider`)

  if (size && context.setDrawSize) context.setDrawSize(size)
  if (color && context.setDrawColor) context.setDrawColor(color)
  if (drawMethod && context.addDrawMethod) context.addDrawMethod(drawMethod)

  /**
   * Methods
   */
  return context
}
