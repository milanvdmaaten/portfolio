import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'

import { Cursor } from '../Cursor'
import { DrawProvider } from '../provider/DrawProvider'
import { ScrollProvider } from '../provider/ScrollProvider'
import { SmoothLineDrawer } from '../SmoothLineDrawer'
import { Footer } from './Footer'
import { Header } from './Header'

export const Layout = ({ owner, children }) => {
  /**
   * Component state
   */
  // eslint-disable-next-line no-useless-escape
  const name = owner?.match(/^([\w\-]+)/)[0]

  /**
   * Side effects
   */

  /**
   * Render
   */
  return (
    <AnimatePresence exitBeforeEnter>
      <div id="layout">
        <ScrollProvider>
          <DrawProvider>
            <Cursor />
            <SmoothLineDrawer />
            <Header owner={name} />
            <main>{children}</main>
            <Footer owner={owner} />
          </DrawProvider>
        </ScrollProvider>
      </div>
    </AnimatePresence>
  )
}
