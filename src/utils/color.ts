type Color = {
  red: number
  green: number
  blue: number
}

export const hexToRgb = (hex: string): Color => {
  hex = hex ?? "#000"
  if (hex.indexOf("#") === 0) hex = hex.slice(1)

  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  if (hex.length !== 6) throw new Error("Invalid HEX color.")

  const red = parseInt(hex.slice(0, 2), 16),
    green = parseInt(hex.slice(2, 4), 16),
    blue = parseInt(hex.slice(4, 6), 16)

  return { red, green, blue }
}

export const invertColor = (hex: string, bw: boolean): Color => {
  let { red, green, blue } = hexToRgb(hex)

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return red * 0.299 + green * 0.587 + blue * 0.114 > 186
      ? { red: 0, green: 0, blue: 0 }
      : { red: 255, green: 255, blue: 255 }
  }
  // invert color components
  red = 255 - red
  green = 255 - green
  blue = 255 - blue

  return { red, green, blue }
}
