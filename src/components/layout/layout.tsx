import Cursor from 'custom-cursor'
import { AnimatePresence } from 'framer-motion'
import * as React from 'react'

import { DrawProvider } from '../provider/DrawProvider'
import { SmoothLineDrawer } from '../SmoothLineDrawer'
import { Footer } from './footer'
import { Header } from './header'

const Layout = ({ location, owner, children }) => {
  React.useEffect(() => {
    console.log("init Cursor")
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
