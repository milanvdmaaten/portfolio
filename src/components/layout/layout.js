import * as React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

import Cursor from "custom-cursor"
import { BackgroundDrawer } from "../backgroundDrawer"

const Layout = ({ location, owner, children }) => {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`

  const [drawColor, setDrawColor] = React.useState(
    getComputedStyle(document.documentElement).getPropertyPriority(
      "--mouse-color"
    )
  )

  React.useEffect(() => {
    // new Cursor({
    //   hoverTargets: ["a"], // Have interaction on 'A' elements
    // }).mount()
    // https://stackoverflow.com/questions/3783419/smooth-user-drawn-lines-in-canvas
  }, [])

  return (
    <div data-is-root-path={isRootPath} id="layout">
      <BackgroundDrawer />
      <Header />
      <main>{children}</main>
      <Footer owner={owner} />
    </div>
  )
}

export default Layout
