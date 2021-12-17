// https://stackoverflow.com/a/45333834/4655177
export const lineProperties = (pointA: number[], pointB: number[]) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

export const controlPointCalc = (
  current: number[],
  previous: number[],
  next: number[],
  reverse?: boolean
) => {
  const smoothing = 0.2
  const o = lineProperties(previous, next)
  const rev = reverse ? Math.PI : 0

  const x = current[0] + Math.cos(o.angle + rev) * o.length * smoothing
  const y = current[1] + Math.sin(o.angle + rev) * o.length * smoothing

  return [x, y]
}
