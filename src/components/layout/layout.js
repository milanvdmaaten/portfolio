import * as React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

import Cursor from "custom-cursor"
import { BackgroundDrawer } from "../backgroundDrawer"

const Layout = ({ location, owner, children }) => {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`

  const [drawColor, setDrawColor] = React.useState(
    typeof window !== "undefined"
      ? window
          .getComputedStyle(document.documentElement)
          .getPropertyPriority("--mouse-color")
      : "#000"
  )

  React.useEffect(() => {
    new Cursor({
      hoverTargets: ["a"], // Have interaction on 'A' elements
    }).mount()
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
