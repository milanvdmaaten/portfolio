export type Point2D = { x: number; y: number }

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
  event: MouseEvent,
  previousEvent: MouseEvent
): number => {
  const pointDistance = getPathLength(
    { x: event.pageX, y: event.pageY },
    { x: previousEvent.pageX, y: previousEvent.pageY }
  )

  // We only want to calculate if the user "actually" draws something
  if (pointDistance > 50) return 0

  // https://www.unitconverters.net/typography/pixel-x-to-meter.htm
  return pointDistance * 0.0002645833
}

export const timeCalculation = (
  event: MouseEvent,
  previousEvent: MouseEvent
) => {}
