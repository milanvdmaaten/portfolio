import Cursor from 'custom-cursor'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'

import { DrawProvider } from '../provider/DrawProvider'
import { SmoothLineDrawer } from '../SmoothLineDrawer'
import { Footer } from './footer'
import { Header } from './header'

export const Layout = ({ location, owner, children }) => {
  /**
   * Side effects
   */
  useEffect(() => {
    console.log("init Cursor")
    const cursor = new Cursor({
      hoverTargets: ["a", ".swiper-slide"], // Have interaction on 'A' elements
      browserCursor: false,
    })

    cursor.mount()

    return () => {
      console.log("reset cursor")
      document.querySelector("body").className = ""
    }
  }, [])

  /**
   * Render
   */
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
