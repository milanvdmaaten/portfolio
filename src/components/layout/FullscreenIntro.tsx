import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, HTMLAttributes, useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

import { disableScroll, enableScroll } from '../../utils/scrollBlocker'
import { useDraw } from '../providers/DrawProvider'
import { Grid } from './Grid'

interface FullscreenIntroProps extends HTMLAttributes<HTMLElement> {
  show: boolean
  title: string
  header: string
  subheader: string
  close: () => void
}

export const FullscreenIntro: FC<FullscreenIntroProps> = props => {
  /**
   * Component state
   */
  const { show, title, header, subheader, close, ...htmlElementProps } = props

  /**
   * Custom & 3th party hooks
   */
  const { setDrawColor } = useDraw()

  /**
   * Side effects
   */
  useEffect(() => {
    if (show) {
      disableScroll()
      return
    }

    enableScroll()
  }, [show])

  useEffect(() => {
    setDrawColor("#fff")
  }, [])

  useEffect(() => {
    const headerEl = document.getElementById("header")
    const subheaderEl = document.getElementById("subheader")
    const waitForAnimation = 2000

    const headerWriter = new Typewriter(headerEl, {
      loop: false,
      delay: 50,
      cursor: "",
    })

    const subheaderWriter = new Typewriter(subheaderEl, {
      loop: false,
      delay: 35,
      cursor: "",
    })

    headerWriter.pauseFor(waitForAnimation).typeString(header).start()
    subheaderWriter
      .pauseFor(waitForAnimation + header.length * 55 + 750)
      .typeString(subheader)
      .start()
  }, [header, subheader])

  /**
   * render
   */
  return (
    <section {...htmlElementProps}>
      <AnimatePresence>
        {show && (
          <div
            style={{ zIndex: 100 }}
            className="w-screen h-screen top-0 bottom-0 fixed"
          >
            <motion.div className="bg-white absolute top-0 bottom-0 w-full h-full overflow-hidden">
              <motion.div
                className="bg-black w-full bottom-0 absolute"
                initial={{ top: "100vh" }}
                animate={{ top: "0vh" }}
                transition={{
                  duration: 0.45,
                  delay: 0.5,
                }}
              ></motion.div>
              <motion.div
                className="case__title-large text-white"
                initial={{ top: "75vh", opacity: 0 }}
                animate={{ top: "50vh", opacity: 1 }}
                transition={{
                  duration: 0.75,
                  delay: 0.7,
                }}
              >
                {title}
              </motion.div>
              <motion.div
                className="bg-black w-full bottom-0 absolute"
                initial={{ top: "100vh" }}
                animate={{ top: "51vh" }}
                transition={{
                  duration: 1.3,
                  delay: 0.9,
                  type: "spring",
                }}
              >
                <section className="relative h-full z-10 text-white flex flex-col">
                  <Grid className="w-10/12">
                    <section className="col-span-12 body-large flex-grow flex flex-col justify-end pb-8">
                      <h1 id="header" />
                      <p id="subheader" />
                      <p id="drawIndicator" />
                    </section>
                  </Grid>
                </section>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
