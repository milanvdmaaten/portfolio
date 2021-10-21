import * as React from "react"

export const BackgroundDrawer = () => {
  const context = React.useRef()

  // https://stackoverflow.com/a/45333834/4655177
  const lineProperties = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    }
  }

  const controlPointCalc = (current, previous, next, reverse) => {
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

  const svgPathRender = points => {
    const d = points.reduce((acc, e, i, a) => {
      if (i > 0) {
        const cs = controlPointCalc(a[i - 1], a[i - 2], e)
        const ce = controlPointCalc(e, a[i - 1], a[i + 1], true)
        return `${acc} C ${cs[0]},${cs[1]} ${ce[0]},${ce[1]} ${e[0]},${e[1]}`
      } else {
        return `${acc} M ${e[0]},${e[1]}`
      }
    }, "")

    const newPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    )
    newPath.setAttribute("stroke", "black")
    newPath.setAttribute("fill", "none")
    newPath.setAttribute("stroke-width", "8px")
    newPath.setAttribute("stroke-linecap", "round")

    newPath.setAttribute("d", d)

    return newPath
  }

  // Create the canvas
  React.useEffect(() => {
    const body = document.body
    const html = document.documentElement
    let isDrawing = false
    let currentPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    )
    let points = []
    let moveEventCounter = 0

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )

    const width = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    )

    const main = document.getElementById("layout")
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")

    svg.setAttribute("width", width)
    svg.setAttribute("height", height)
    svg.setAttribute("viewBox", `0,0,${width}, ${height}`)

    svg.style.zIndex = -1
    svg.style.height = height + "px"
    svg.style.position = "absolute"
    svg.style.width = "100%"
    svg.style.top = 0

    const drawLine = (from, to) => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      )
      line.setAttribute("id", "line")
      line.setAttribute("x1", from.x)
      line.setAttribute("x2", to.x)
      line.setAttribute("y1", from.y)
      line.setAttribute("y2", to.y)
      line.setAttribute("stroke", "black")

      svg.appendChild(line)
    }

    drawLine({ x: 0, y: 0 }, { x: width, y: height })

    main.appendChild(svg)

    const onresize = () => {
      svg.setAttribute(
        "viewBox",
        `0,0,${window.innerWidth}, ${window.innerHeight}`
      )
    }

    const onMouseMove = event => {
      window?.getSelection()?.removeAllRanges()
      document?.selection?.empty()

      const { pageX, pageY } = event

      if (!isDrawing) return

      const last = points[points.length - 1] ?? [0, 0]

      const length = Math.hypot(pageX - last[0], pageY - last[1])

      if (length > 50) {
        currentPath.setAttribute(
          "d",
          `${currentPath.getAttribute("d")} L${pageX}, ${pageY}`
        )
        points.push([pageX, pageY])
      }
    }

    const onMouseDown = event => {
      console.log("mouseDown")

      const { pageX, pageY } = event

      isDrawing = true
      currentPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      currentPath.setAttribute("stroke", "green")
      currentPath.setAttribute("fill", "none")
      currentPath.setAttribute("d", `M${pageX},${pageY}`)

      svg.appendChild(currentPath)
    }

    const onMouseUp = event => {
      console.log("mouseUp")

      const { pageX, pageY } = event

      isDrawing = false
      points.push([pageX, pageY])

      const smoothPath = svgPathRender(points)
      svg.appendChild(smoothPath)

      currentPath.remove()
      points = []
    }

    window.onresize = onresize
    window.onmousemove = onMouseMove
    window.onmousedown = onMouseDown
    window.onmouseup = onMouseUp
    return () => {
      svg.remove()
    }
  }, [])

  return null
}
