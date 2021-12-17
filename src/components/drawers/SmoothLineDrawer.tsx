import React, { FC, useEffect } from 'react'

import { controlPointCalc } from '../../utils/lineDrawer'
import { useDraw } from '../providers/DrawProvider'

const svgPathRender = (
  points: number[][],
  strokeWidth: number = 8,
  drawColor: string = "#000"
) => {
  const drawPath = points.reduce((path, point, index, _points) => {
    if (index > 0) {
      const cs = controlPointCalc(_points[index - 1], _points[index - 2], point)
      const ce = controlPointCalc(
        point,
        _points[index - 1],
        _points[index + 1],
        true
      )
      return `${path} C ${cs[0]},${cs[1]} ${ce[0]},${ce[1]} ${point[0]},${point[1]}`
    }

    return `${path} M ${point[0]},${point[1]}`
  }, "")

  const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  newPath.setAttribute("stroke", drawColor)
  newPath.setAttribute("fill", "none")
  newPath.setAttribute("stroke-width", `${strokeWidth}`)
  newPath.setAttribute("stroke-linecap", "round")

  newPath.setAttribute("d", drawPath)

  return newPath
}

export const SmoothLineDrawer: FC = () => {
  /**
   * Custom hooks
   */
  const { svg, drawSize, drawColor, addDrawMethod, removeDrawMethod } =
    useDraw()

  /**
   * Side effects
   */
  // Create the canvas
  useEffect(() => {
    let currentPath: SVGPathElement
    let points = []

    const updateCurrentPath = (path: number[][]) => {
      currentPath?.remove()

      const smoothPath = svgPathRender(path, drawSize, drawColor)
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
      const minimalPathLength = 20
      const { x, y } = event

      const last = points[points.length - 1] ?? [0, 0]
      const length = Math.hypot(x - last[0], y - last[1])

      if (length < minimalPathLength) return
      points.push([x, y])
      updateCurrentPath(points)
    }

    const fadePath = (element: SVGPathElement, iteration: number = 0) => {
      const fadingSteps = 15
      if (iteration > fadingSteps) return element.remove()

      setTimeout(() => {
        if (element === undefined) return
        element.style.opacity = `${1 - iteration / (fadingSteps - 1)}`
        fadePath(element, ++iteration)
      }, 10 * iteration)
    }

    const onMouseDown = (event: MouseEvent) => {
      const { pageX, pageY } = event

      points.push([pageX, pageY])
      updateCurrentPath(points)
    }

    const onMouseUp = (event: MouseEvent) => {
      const { pageX, pageY } = event

      points.push([pageX, pageY])
      updateCurrentPath(points)

      // Start fading
      fadePath(currentPath)

      // Clear the previous points
      setNewPath()
    }

    const drawer = addDrawMethod(draw)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)

    return () => {
      fadePath(currentPath)
      removeDrawMethod(drawer)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
    }
  }, [svg, drawSize, addDrawMethod, removeDrawMethod])

  /**
   * Render
   */
  return null
}
