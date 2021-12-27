import { AnimatePresence } from 'framer-motion'
import React, { FC } from 'react'

import { TextColor } from '../../lib/types/textColor'
import { Cursor } from '../Cursor'
import { SmoothLineDrawer } from '../drawers/SmoothLineDrawer'
import { ConfettiProvider } from '../providers/ConfettiProvider'
import { DrawProvider } from '../providers/DrawProvider'
import { ScrollProvider } from '../providers/ScrollProvider'
import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
  owner: string
  backgroundColor?: string
  textColor?: TextColor
  pages: any[]
}

export const Layout: FC<LayoutProps> = props => {
  /**
   * Component state
   */
  const {
    owner,
    backgroundColor = "#fff",
    textColor = "text-black",
    children,
    pages,
  } = props
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
      <div
        id="layout"
        className={textColor}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <ConfettiProvider>
          <ScrollProvider>
            <DrawProvider>
              <Cursor />
              <SmoothLineDrawer />
              <Header owner={name} pages={pages} textColor={textColor} />
              <main>{children}</main>
              <Footer owner={owner} textColor={textColor} />
            </DrawProvider>
          </ScrollProvider>
        </ConfettiProvider>
      </div>
    </AnimatePresence>
  )
}
