import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, HTMLAttributes, useEffect } from 'react'

import { disableScroll, enableScroll } from '../../utils/scrollBlocker'
import { Grid } from './grid'

interface FullscreenIntroProps extends HTMLAttributes<HTMLElement> {
  show: boolean
}

export const FullscreenIntro: FC<FullscreenIntroProps> = props => {
  /**
   * Component state
   */
  const { show, ...htmlElementProps } = props

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
            <div
              className={`bg-white absolute top-0 bottom-0 w-full h-full overflow-hidden`}
            >
              <motion.h1 className=" case__title-large top-1/4 -mt-20">
                Goodmorning
              </motion.h1>
              <div className="bottom-screen-wrapper">
                <section className="relative h-full z-10 text-white flex flex-col">
                  <motion.h1 className="case__title-large  -mt-44">
                    Goodmorning
                  </motion.h1>
                  <Grid className="w-full body-medium flex-grow px-4">
                    <div className="col-span-12 lg:col-span-6 pb-12 flex flex-col justify-end">
                      <p>My name is Milan</p>
                      <p>
                        I’m an empathic UX designer who loves to make effortless
                        experiences.
                      </p>
                    </div>
                    <div className="col-span-12 lg:col-span-6 pb-12 flex flex-col justify-end">
                      Click anywhere to continue
                    </div>
                  </Grid>
                </section>
                <motion.div
                  className="w-3 h-3 absolute top-1/2 left-1/2 bg-black"
                  animate={{
                    translateX: [-500, -400, -300, 0, 2, -5, 0, 0, 0],
                    translateY: [50, 0, -30, 0, 3, -4, 0, 0, 0],
                    background: [
                      "#000",
                      "#000",
                      "#000",
                      "#000",
                      "#D5ADF6",
                      "#D5ADF6",
                      "#D5ADF6",
                      "#D5ADF6",
                      "#D5ADF6",
                    ],
                    rotate: [0, 0, 0, 0, 0, 0, 0, 45, 90],
                    scale: [1, 1, 1, 1, 12, 12, 8, 8, 500],
                    borderRadius: [
                      "50%",
                      "50%",
                      "50%",
                      "50%",
                      "50%",
                      "50%",
                      "50%",
                      "50%",
                      "25%",
                    ],
                  }}
                  transition={{
                    delay: 1.5,
                    duration: 1.5,
                    ease: "easeInOut",
                    times: [
                      0, 0.02, 0.075, 0.2, 0.25, 0.35, 0.45, 0.5, 0.55, 1,
                    ],
                  }}
                ></motion.div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
