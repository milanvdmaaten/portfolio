// https://stackoverflow.com/a/4770179/4655177
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 }

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true
      },
    })
  )
} catch (e) {}

const wheelOpt = supportsPassive
  ? ({ passive: false } as EventListenerOptions)
  : false
let wheelEvent = "mousewheel"

try {
  wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel"
} catch (e) {}

const preventDefault = (e: any) => {
  e.preventDefault()
}

const preventDefaultForScrollKeys = (e: any) => {
  if (keys[e.keyCode]) {
    preventDefault(e)
    return false
  }
}
// call this to Disable
export const disableScroll = () => {
  try {
    window.addEventListener("DOMMouseScroll", preventDefault, false) // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt) // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt) // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false)
    document.querySelector("body").style.maxHeight = "100vh"
    document.querySelector("body").style.overflow = "hidden"
  } catch (e) {
    console.log(e)
  }
}

// call this to Enable
export const enableScroll = () => {
  try {
    window.removeEventListener("DOMMouseScroll", preventDefault, false)
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt)
    window.removeEventListener("touchmove", preventDefault, wheelOpt)
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false)
    document.querySelector("body").style.removeProperty("maxHeight")
    document.querySelector("body").style.removeProperty("overflow")
  } catch (e) {}
}
