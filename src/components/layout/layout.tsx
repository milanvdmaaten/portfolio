import * as React from "react"
import { Header } from "./header"
import { AnimatePresence } from "framer-motion"
import { Footer } from "./footer"

import Cursor from "custom-cursor"
import { SmoothLineDrawer } from "../SmoothLineDrawer"
import { DrawProvider } from "../provider/DrawProvider"

const Layout = ({ location, owner, children }) => {
  React.useEffect(() => {
    console.log("mount")
    new Cursor({
      hoverTargets: ["a", ".swiper-slide"], // Have interaction on 'A' elements
      browserCursor: false,
    }).mount()
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div id="layout">
        <DrawProvider>
          <SmoothLineDrawer />
          <Header />
          <main>{children}</main>
          <Footer owner={owner} />
        </DrawProvider>
      </div>
    </AnimatePresence>
  )
}

export default Layout
