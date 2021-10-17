import * as React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

const Layout = ({ location, owner, children }) => {
  const isRootPath = location.pathname === `${__PATH_PREFIX__}/`

  return (
    <div data-is-root-path={isRootPath}>
      <Header />
      <main>{children}</main>
      <Footer owner={owner} />
    </div>
  )
}

export default Layout
