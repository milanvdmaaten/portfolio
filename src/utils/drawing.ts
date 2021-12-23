import { DrawEvent } from '../components/providers/DrawProvider'

export type Point2D = { x: number; y: number }

export const getPointsFromEvent = (event: MouseEvent | TouchEvent): Point2D => {
  const { pageX, pageY } = event as MouseEvent
  const { targetTouches } = event as TouchEvent

  const x = pageX ?? targetTouches[0].pageX
  const y = pageY ?? targetTouches[0].pageY

  return { x, y }
}

export const getPathLength = (a: Point2D, b: Point2D) =>
  Math.hypot(a.x - b.x, a.y - b.y)

// https://stackoverflow.com/a/45333834/4655177
const lineProperties = (a: Point2D, b: Point2D) => {
  const lengthX = b.x - a.x
  const lengthY = b.y - a.y
  return {
    length: getPathLength(a, b), //Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

const controlPoint = (
  current: Point2D,
  previous: Point2D,
  next: Point2D,
  reverse?: boolean
): Point2D => {
  const smoothing = 0.2
  const line = lineProperties(previous ?? current, next ?? current)
  const rev = reverse ? Math.PI : 0

  const x = current.x + Math.cos(line.angle + rev) * line.length * smoothing
  const y = current.y + Math.sin(line.angle + rev) * line.length * smoothing

  return { x, y }
}

// Check if the user "actually" draws something
const poorMansDrawValidator = (pathLength: number): boolean => {
  return pathLength < 150
}

export const smoothSvgPath = (
  points: Point2D[],
  strokeWidth: number = 8,
  drawColor: string = "#000"
) => {
  const drawPath = points.reduce((path, point, index, _points) => {
    if (index <= 0) return `${path} M ${point.x},${point.y}`

    const cs = controlPoint(_points[index - 1], _points[index - 2], point)
    const ce = controlPoint(point, _points[index - 1], _points[index + 1], true)

    return `${path} C ${cs.x},${cs.y} ${ce.x},${ce.y} ${point.x},${point.y}`
  }, "")

  const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  newPath.setAttribute("stroke", drawColor)
  newPath.setAttribute("fill", "none")
  newPath.setAttribute("stroke-width", `${strokeWidth}`)
  newPath.setAttribute("stroke-linecap", "round")

  newPath.setAttribute("d", drawPath)

  return newPath
}

export const distanceCalculation = (
  event: DrawEvent,
  previousEvent: DrawEvent
): number => {
  const pathLength = getPathLength(
    getPointsFromEvent(event),
    getPointsFromEvent(previousEvent)
  )

  if (!poorMansDrawValidator(pathLength)) return 0

  // https://www.unitconverters.net/typography/pixel-x-to-meter.htm
  return pathLength * 0.0002645833
}

export const timeCalculation = (event: DrawEvent, previousEvent: DrawEvent) => {
  const pathLength = getPathLength(
    getPointsFromEvent(event),
    getPointsFromEvent(previousEvent)
  )

  if (!poorMansDrawValidator(pathLength)) return 0

  const { timeStamp } = event
  const { timeStamp: previousTimeStamp } = previousEvent

  const timeDiff = (timeStamp - previousTimeStamp) / 1000
  if (timeDiff > 0.02) return 0

  // Return difference in seconds
  return timeDiff
}
