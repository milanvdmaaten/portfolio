import * as React from 'react'

import { useDraw } from './provider/DrawProvider'

// https://stackoverflow.com/a/45333834/4655177
const lineProperties = (pointA: number[], pointB: number[]) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

const controlPointCalc = (
  current: number[],
  previous: number[],
  next: number[],
  reverse?: boolean
) => {
  const c = current
  const p = previous ? previous : c
  const n = next ? next : c
  const smoothing = 0.2
  const o = lineProperties(p, n)
  const rev = reverse ? Math.PI : 0

  const x = c[0] + Math.cos(o.angle + rev) * o.length * smoothing
  const y = c[1] + Math.sin(o.angle + rev) * o.length * smoothing

  return [x, y]
}

const svgPathRender = (
  points: number[][],
  strokeWidth: number = 8,
  drawColor: string = "#000"
) => {
  const d = points.reduce((acc, e, i, a) => {
    if (i > 0) {
      const cs = controlPointCalc(a[i - 1], a[i - 2], e)
      const ce = controlPointCalc(e, a[i - 1], a[i + 1], true)
      return `${acc} C ${cs[0]},${cs[1]} ${ce[0]},${ce[1]} ${e[0]},${e[1]}`
    } else {
      return `${acc} M ${e[0]},${e[1]}`
    }
  }, "")

  const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  newPath.setAttribute("stroke", drawColor)
  newPath.setAttribute("fill", "none")
  newPath.setAttribute("stroke-width", `${strokeWidth}`)
  newPath.setAttribute("stroke-linecap", "round")

  newPath.setAttribute("d", d)

  return newPath
}

export const SmoothLineDrawer = () => {
  const { readyToDraw, svg, drawSize, drawColor, setDrawMethod } = useDraw()

  // Create the canvas
  React.useEffect(() => {
    if (!readyToDraw) return
    let currentPath: SVGPathElement
    let points = []

    const updateCurrentPath = () => {
      currentPath?.remove()

      const smoothPath = svgPathRender(points, drawSize, drawColor)
      svg.appendChild(smoothPath)
      currentPath = smoothPath
    }

    const setNewPath = () => {
      // New path
      currentPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      points = []
    }

    const draw = (event?: { x: number; y: number }) => {
      if (!event) return
      const smoothPathLength = 50
      const { x, y } = event

      const last = points[points.length - 1] ?? [0, 0]
      const length = Math.hypot(x - last[0], y - last[1])

      if (length < smoothPathLength) return

      points.push([x, y])
      updateCurrentPath()
    }

    const fadePath = (element: SVGPathElement, iteration: number = 0) => {
      const maxSteps = 15
      if (iteration > maxSteps) return element.remove()

      setTimeout(() => {
        if (element === undefined) return
        element.style.opacity = `${1 - iteration / (maxSteps - 1)}`
        fadePath(element, ++iteration)
      }, 10 * iteration)
    }

    const onMouseDown = (event: MouseEvent) => {
      const { pageX, pageY } = event

      points.push([pageX, pageY])
      updateCurrentPath()
    }

    const onMouseUp = (event: MouseEvent) => {
      const { pageX, pageY } = event

      points.push([pageX, pageY])
      updateCurrentPath()

      // Start fading
      fadePath(currentPath)

      setNewPath()
    }

    setDrawMethod(draw)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      fadePath(currentPath)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [readyToDraw, svg, drawSize, setDrawMethod])

  return null
}
