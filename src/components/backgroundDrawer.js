import * as React from "react"

export const BackgroundDrawer = () => {
  const context = React.useRef()

  // Create the canvas
  React.useEffect(() => {
    const body = document.body
    const html = document.documentElement
    let isDrawing = false
    let currentPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    )

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
      const { pageX, pageY } = event

      if (!isDrawing) return

      const line = currentPath.getAttribute("d")
      if (!line) currentPath.setAttribute("d", `M${pageX},${pageY}`)
      console.log(currentPath, currentPath.getAttribute("d"))

      currentPath.setAttribute(
        "d",
        `${currentPath.getAttribute("d")} L${pageX}, ${pageY}`
      )
    }

    const onMouseDown = () => {
      console.log("mouseDown")
      isDrawing = true
      currentPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      )
      currentPath.setAttribute("stroke", "black")

      svg.appendChild(currentPath)
    }

    const onMouseUp = () => {
      isDrawing = false
      console.log("mouseUp")
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
