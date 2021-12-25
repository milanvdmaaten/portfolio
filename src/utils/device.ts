export enum Device {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

// https://attacomsian.com/blog/javascript-detect-mobile-device
export const getDeviceType = () => {
  const userAgent = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent))
    return Device.Tablet

  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      userAgent
    )
  )
    return Device.Mobile

  return Device.Desktop
}
