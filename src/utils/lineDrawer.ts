// https://stackoverflow.com/a/45333834/4655177
export const lineProperties = (pointA: number[], pointB: number[]) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  }
}

export const controlPoint = (
  current: number[],
  previous: number[],
  next: number[],
  reverse?: boolean
) => {
  const smoothing = 0.2
  const line = lineProperties(previous ?? current, next ?? current)
  const rev = reverse ? Math.PI : 0

  const x = current[0] + Math.cos(line.angle + rev) * line.length * smoothing
  const y = current[1] + Math.sin(line.angle + rev) * line.length * smoothing

  return [x, y]
}
