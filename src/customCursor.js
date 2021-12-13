// https://stackoverflow.com/a/35970186/4655177
export const hexToRgb = hex => {
  hex = hex ?? "#000"
  if (hex.indexOf("#") === 0) hex = hex.slice(1)

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  if (hex.length !== 6) throw new Error("Invalid HEX color.")

  const r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16)

  return { r, g, b }
}

export const invertColor = (hex, bw) => {
  let { r, g, b } = hexToRgb(hex)

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186
      ? { r: 0, g: 0, b: 0 }
      : { r: 255, g: 255, b: 255 }
  }
  // invert color components
  r = 255 - r
  g = 255 - g
  b = 255 - b

  // pad each with zeros and return
  return { r, g, b }
}

export const setCursorColor = color => {
  document.documentElement.style.setProperty("--mouse-color", color)

  const { r, g, b } = invertColor(color, true)
  document.documentElement.style.setProperty(
    "--mouse-border-color",
    `rgb(${r},${g},${b})`
  )
}
