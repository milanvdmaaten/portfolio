import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

interface Point2D {
  x: number
  y: number
}

type Draw = (point: Point2D) => void

interface DrawContextProps {
  drawColor: string
  svg: SVGSVGElement
  setDrawCallback: (callback: Draw) => void
  setDrawingColor: (color: string) => void
}

export const DrawContext = createContext<DrawContextProps>({
  svg: undefined,
  drawColor: "#000",
  setDrawCallback: console.log,
  setDrawingColor: console.log,
})

export const DrawProvider: React.FC = props => {
  /**
   * Component state
   */
  const { children } = props

  const svg = useRef(
    document.createElementNS("http://www.w3.org/2000/svg", "svg")
  )
  const drawMethod = useRef<Draw>()
  const [drawColor, setDrawColor] = useState("#000")

  /**
   * Methods
   */
  const getScreenHeight = (height?: number): number =>
    Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      height ?? 0
    )

  const getScreenWidth = (width?: number): number =>
    Math.max(
      document.body.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.clientWidth,
      document.documentElement.scrollWidth,
      document.documentElement.offsetWidth,
      width ?? 0
    )

  const setDrawCallback = (method: Draw) => (drawMethod.current = method)
  const setDrawingColor = (color?: string) => setDrawColor(color)

  /**
   * Side effects
   */
  // Add drawing plane to the layout
  useEffect(() => {
    let isDrawing = false
    const width = getScreenWidth()
    const height = getScreenHeight()
    svg.current.setAttribute("width", `${width}`)
    svg.current.setAttribute("height", `${height}`)
    svg.current.setAttribute("viewBox", `0,0,${width}, ${height}`)

    svg.current.style.zIndex = "-1"
    svg.current.style.height = height + "px"
    svg.current.style.position = "absolute"
    svg.current.style.width = "100%"
    svg.current.style.top = "0"

    const layout = document.getElementById("layout")

    layout.appendChild(svg.current)

    const onresize = () => {
      svg.current.setAttribute(
        "viewBox",
        `0,0,${getScreenWidth()}, ${getScreenHeight()}`
      )
    }

    const onMouseDown = () => (isDrawing = true)
    const onMouseUp = () => (isDrawing = false)

    const onMouseMove = event => {
      window?.getSelection()?.removeAllRanges()
      // @ts-ignore
      document?.selection?.empty()

      const { pageX, pageY } = event

      if (!isDrawing) return
      drawMethod.current({ x: pageX, y: pageY })
    }

    window.onresize = onresize
    window.onmousemove = onMouseMove
    window.onmousedown = onMouseDown
    window.onmouseup = onMouseUp

    return svg.current.remove
  }, [getScreenHeight, getScreenWidth])

  /**
   * Render
   */
  return (
    <DrawContext.Provider
      value={{
        svg: svg.current,
        drawColor,
        setDrawCallback,
        setDrawingColor,
      }}
    >
      {children}
    </DrawContext.Provider>
  )
}

interface UseDrawProps {
  initialColor?: string
  onDraw?: (point: Point2D) => void
}

export const useDraw = (props: UseDrawProps = {}) => {
  /**
   * State
   */
  const { initialColor, onDraw } = props

  const context = useContext(DrawContext)

  if (initialColor) context.setDrawingColor(initialColor)
  if (onDraw) context.setDrawCallback(onDraw)

  /**
   * Methods
   */
  const updateDrawMethod = (callback: Draw) => context.setDrawCallback(callback)
  const updateDrawColor = (color: string) => context.setDrawingColor(color)

  return {
    svg: context.svg,
    updateDrawColor,
    updateDrawMethod,
  }
}
