import * as React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

import Cursor from "custom-cursor"

const Layout = ({ location, owner, children }) => {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`

  React.useEffect(() => {
    new Cursor({
      hoverTargets: ["a"],
      // hoverTargets: [".link-button", "#hero-text", "p"], // default = null
      // browserCursor: false, // default = true
    }).mount()
  }, [])

  return (
    <div data-is-root-path={isRootPath}>
      <Header />
      <main>{children}</main>
      <Footer owner={owner} />
    </div>
  )
}

export default Layout
