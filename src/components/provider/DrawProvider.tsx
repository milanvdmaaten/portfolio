import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"

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
  const drawColor = useRef("#000")
  const drawSize = useRef(8)

  /**
   * Methods
   */
  const setDrawMethod = (method: Draw): void => {
    drawMethod.current = method
  }
  const setDrawColor = (color: string): void => {
    drawColor.current = color
  }
  const setDrawSize = (size: number): void => {
    drawSize.current = size
  }

  const getScreenHeight = (): number =>
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    )

  const getScreenWidth = (): number =>
    Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth
    )

  const setSvgSize = () => {
    const width = getScreenWidth()
    const height = getScreenHeight()
    svg.setAttribute("width", `${width}`)
    svg.setAttribute("height", `${height}`)
    svg.setAttribute("viewBox", `0,0,${width}, ${height}`)

    svg.style.zIndex = "-1"
    svg.style.height = height + "px"
    svg.style.position = "absolute"
    svg.style.width = "100%"
    svg.style.top = "0"
  }

  /**
   * Side effects
   */
  // Add drawing plane to the layout
  useEffect(() => {
    let isDrawing = false

    const layout = document.getElementById("layout")

    layout.appendChild(svg)

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
        drawMethod.current(
          { x: pageX, y: pageY },
          drawSize.current,
          drawColor.current
        )
    }

    window.onresize = setSvgSize
    window.onmousemove = onMouseMove
    window.onmousedown = onMouseDown
    window.onmouseup = onMouseUp

    setSvgSize()
    console.log("setReadyToDraw")
    setReadyToDraw(true)
  }, [getScreenHeight, getScreenWidth, setReadyToDraw])

  /**
   * Render
   */
  console.log(readyToDraw)
  return (
    <DrawContext.Provider
      value={{
        readyToDraw,
        svg,
        drawColor: drawColor.current,
        drawSize: drawSize.current,
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
