import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, HTMLAttributes, useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

import { distanceCalculation } from '../../utils/drawing'
import { disableScroll, enableScroll } from '../../utils/scrollBlocker'
import { TotalDrawTime } from '../drawers/TotalDrawTime'
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
   * Methods
   */
  const closeHandler = () => {
    setDrawColor("#000")
    close && close()
    enableScroll()
  }

  /**
   * Side effects
   */
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        document.getElementById("drawSvg").style.zIndex = "100"
        console.log(document.getElementById("drawSvg"))
      }, 1)
      return disableScroll()
    }

    setDrawColor("#000")
    document.getElementById("drawSvg").style.zIndex = "0"
    enableScroll()
  }, [show])

  useEffect(() => {
    setDrawColor("#fff")
  }, [])

  useEffect(() => {
    const headerEl = document.getElementById("header")
    const subheaderEl = document.getElementById("subheader")
    const drawIndicatorEl = document.getElementById("drawIndicator")

    const waitForAnimation = 1850

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

    const drawIndicatorWriter = new Typewriter(drawIndicatorEl, {
      loop: false,
      delay: 50,
      cursor: "",
    })

    headerWriter.pauseFor(waitForAnimation).typeString(header).start()
    subheaderWriter
      .pauseFor(waitForAnimation + header.length * 55 + 750)
      .typeString(subheader)
      .start()
    drawIndicatorWriter.pauseFor(100).typeString("Draw to continue").start()
  }, [header, subheader])

  /**
   * render
   */
  return (
    <section {...htmlElementProps}>
      <TotalDrawTime
        initialValue={2}
        textColor="text-white"
        suffix="m"
        calculator={distanceCalculation}
        callback={closeHandler}
      />
      <AnimatePresence>
        {show && (
          <div className="w-screen h-screen top-0 bottom-0 fixed z-50">
            <motion.div
              className="bg-white absolute top-0 bottom-0 w-full h-full overflow-hidden"
              initial={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.7,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <motion.div
                className="bg-black w-full bottom-0 absolute"
                initial={{ top: "100vh" }}
                animate={{ top: "0vh" }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                }}
                exit={{
                  top: "100vh",
                }}
              />
              <motion.div
                className="case__title-large text-white"
                initial={{ top: "80vh", opacity: 0.1 }}
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
                  duration: 1.25,
                  delay: 0.85,
                  type: "spring",
                }}
                exit={{
                  top: "100vh",
                }}
              >
                <section className="relative h-full z-10 text-white flex flex-col">
                  <Grid className="w-10/12">
                    <section className="col-span-12 body-large flex-grow flex flex-col justify-end pb-8">
                      <h1 id="header" />
                      <p id="subheader" />
                      <p
                        id="drawIndicator"
                        className="caption-handwritten absolute bottom-16 right-16 transform -rotate-12"
                      />
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
