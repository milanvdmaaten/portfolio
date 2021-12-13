import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

import { setCursorColor } from '../../customCursor'
import { getScreenHeight, getScreenWidth } from '../../utils/screenSize'

interface Point2D {
  x: number
  y: number
}

type Draw = (point: Point2D, size: number, color: string) => void

interface DrawContextState {
  readyToDraw: boolean
  svg?: SVGSVGElement
  drawColor: string
  drawSize: number
  setDrawMethod?: (callback: Draw) => void
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
  const drawMethod = useRef<Draw>()
  const [drawColor, setStateDrawColor] = useState("#000")
  const [drawSize, setDrawSize] = useState(8)

  /**
   * Methods
   */
  const setDrawMethod = (method: Draw): void => {
    drawMethod.current = method
  }

  const setDrawColor = (color: string): void => {
    setStateDrawColor(color)
    setCursorColor(color)
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
    }, 1000 * 5) // Wait a bit so carrousels are initialized correctly
  }

  /**
   * Side effects
   */
  // Add drawing plane to the layout
  useEffect(() => {
    let isDrawing = false

    const onMouseDown = () => (isDrawing = true)
    const onMouseUp = () => (isDrawing = false)

    const onMouseMove = (event: MouseEvent): void => {
      try {
        window.getSelection().removeAllRanges()
        // @ts-ignore
        document.selection.empty()
      } catch (e) {}

      const { pageX, pageY } = event

      if (!isDrawing) return
      drawMethod.current &&
        drawMethod.current({ x: pageX, y: pageY }, drawSize, drawColor)
    }

    window.addEventListener("resize", createSvg)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    createSvg()
    setReadyToDraw(true)

    return () => {
      window.removeEventListener("resize", createSvg)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousedown", onMouseUp)
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
        setDrawMethod,
        setDrawColor,
      }}
    >
      {children}
    </DrawContext.Provider>
  )
}

interface UseDrawProps {
  color?: string
  size?: number
  drawMethod?: (point: Point2D) => void
}

export const useDraw = (props: UseDrawProps = {}) => {
  /**
   * State
   */
  const { color, size, drawMethod } = props

  const context = useContext(DrawContext)

  if (size && context.setDrawSize) context.setDrawSize(size)
  if (color && context.setDrawColor) context.setDrawColor(color)
  if (drawMethod && context.setDrawMethod) context.setDrawMethod(drawMethod)

  /**
   * Methods
   */
  return context
}
