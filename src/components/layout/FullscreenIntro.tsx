import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, HTMLAttributes, useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

import { disableScroll, enableScroll } from '../../utils/scrollBlocker'
import { Grid } from './grid'

interface FullscreenIntroProps extends HTMLAttributes<HTMLElement> {
  show: boolean
  title: string
  header: string
  subheader: string
}

export const FullscreenIntro: FC<FullscreenIntroProps> = props => {
  /**
   * Component state
   */
  const { show, title, header, subheader, ...htmlElementProps } = props

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
    const headerEl = document.getElementById("header")
    const subheaderEl = document.getElementById("subheader")

    const headerWriter = new Typewriter(headerEl, {
      loop: false,
      delay: 50,
      cursor: "",
    })

    const subheaderWriter = new Typewriter(subheaderEl, {
      loop: false,
      delay: 50,
      cursor: "",
    })

    headerWriter.pauseFor(1750).typeString(header).start()
    subheaderWriter.pauseFor(3000).typeString(subheader).start()
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
            <motion.div
              className={`bg-white absolute top-0 bottom-0 w-full h-full overflow-hidden`}
              exit={{
                top: ["0vh", "-100vh"],
                opacity: [1, 0],
              }}
              transition={{
                delay: 4.5,
                duration: 0.6,
                ease: "backOut",
              }}
            >
              <motion.div
                className="case__title-large top-1/3"
                initial={{ left: "-200vw" }}
                animate={{ left: "0" }}
                transition={{
                  duration: 0.3,
                  delay: 1,
                  type: "spring",
                }}
              >
                {title}
              </motion.div>
              <motion.div
                className="bottom-screen-wrapper"
                exit={{
                  top: "100vh",
                }}
                transition={{
                  delay: 4.2,
                  duration: 0.3,
                }}
              >
                <section className="relative h-full z-10 text-white flex flex-col">
                  <motion.div
                    className="case__title-large"
                    initial={{ left: "200vw" }}
                    animate={{ left: "0" }}
                    transition={{
                      duration: 0.3,
                      delay: 1,
                      type: "spring",
                    }}
                  >
                    {title}
                  </motion.div>
                  <Grid className="w-10/12">
                    <section className="col-span-12 body-large flex-grow flex flex-col justify-end pb-8">
                      <h1 id="header"></h1>
                      <p id="subheader"></p>
                    </section>
                  </Grid>
                </section>
                <motion.div
                  className="w-3 h-3 absolute bg-accent"
                  animate={{
                    left: ["90%", "55%", "50%"],
                    top: ["90%", "65%", "50%"],
                    rotate: [45, 90, 135],
                    scale: [0, 250, 1000],
                    borderRadius: ["50%", "30%", "0%"],
                  }}
                  transition={{
                    duration: 0.33,
                    delay: 0.75,
                    type: "tween",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
