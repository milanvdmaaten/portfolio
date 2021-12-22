import React, { FC, useEffect } from 'react'

import { getPathLength, getPointsFromEvent, Point2D, smoothSvgPath } from '../../utils/drawing'
import { DrawEvent, useDraw } from '../providers/DrawProvider'

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
    let points: Point2D[] = []
    let currentPath: SVGPathElement

    const updateCurrentPath = (path: Point2D[]) => {
      currentPath?.remove()

      const smoothPath = smoothSvgPath(path, drawSize, drawColor)
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

    const draw = (event?: DrawEvent) => {
      if (!event) return
      const minimalPathLength = 20
      const { x, y } = getPointsFromEvent(event)

      const last = points[points.length - 1] ?? { x: 0, y: 0 }
      const length = getPathLength(last, { x, y })

      if (length < minimalPathLength) return
      points.push({ x, y })
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

    const onMouseDown = (event: DrawEvent) => {
      points.push(getPointsFromEvent(event))
      updateCurrentPath(points)
    }

    const onMouseUp = (event: DrawEvent) => {
      points.push(getPointsFromEvent(event))
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
