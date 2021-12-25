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
  const waitForAnimation = 1850
  const waitForTyping =
    waitForAnimation + (header.length + subheader.length) * 55 + 1250

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
    const setDrawSvgZIndex = (zIndex: string) => {
      setTimeout(() => {
        const svg = document.getElementById("drawSvg")

        if (!svg) return
        svg.style.zIndex = zIndex
      }, 100)
    }

    if (show) {
      setDrawColor("#fff")
      setDrawSvgZIndex("100")
      return disableScroll()
    }

    setDrawColor("#000")
    setDrawSvgZIndex("0")
    enableScroll()
  }, [show])

  useEffect(() => {
    const headerEl = document.getElementById("header")
    const subheaderEl = document.getElementById("subheader")

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
                <section className="relative h-full z-10  flex flex-col">
                  <Grid className="w-10/12">
                    <section className="col-span-12 body-large flex-grow flex flex-col justify-end pb-8 text-white">
                      <h1 id="header" />
                      <p id="subheader" />
                    </section>
                    <section className="absolute bottom-0 right-0">
                      <motion.div
                        className="bg-white w-96 h-96 p-8 rounded-full"
                        initial={{
                          opacity: 0,
                          scale: 0,
                          x: "250px",
                          y: "250px",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: "175px",
                          y: "175px",
                        }}
                        transition={{
                          duration: 0.25,
                          delay: waitForTyping / 1000,
                          type: "spring",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-16 right-8 w-24"
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: waitForTyping / 1000,
                        }}
                      >
                        <span className="caption-handwritten">
                          Draw to continue
                        </span>
                        <TotalDrawTime
                          initialValue={2}
                          textColor="#000"
                          suffix="m"
                          calculator={distanceCalculation}
                          callback={closeHandler}
                        />
                      </motion.div>
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
