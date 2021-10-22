import { AnimatePresence, motion } from "framer-motion"
import React, { FC, HTMLAttributes, useEffect } from "react"
import { disableScroll, enableScroll } from "../../utils/scrollBlocker"

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
          <motion.div
            style={{ zIndex: 100 }}
            key="intro"
            id="intro"
            className="w-screen h-screen top-0 bottom-0 fixed"
            exit={{ bottom: "100vh" }}
            transition={{ duration: 1 }}
          >
            <motion.div
              key="backdrop"
              className="bg-white absolute top-0 bottom-0 w-full"
              initial={{ height: "100%" }}
              exit={{ height: "0" }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            <motion.div
              key="color"
              className="bg-red-100 absolute top-0 bottom-0 w-full"
              initial={{ height: "0" }}
              animate={{ height: "100vh" }}
              exit={{ height: "0" }}
              transition={{ duration: 0.4 }}
            ></motion.div>
            <motion.div
              key="color"
              className="bg-red-300 absolute top-0 bottom-0 w-full"
              initial={{ height: "0" }}
              animate={{ height: "100vh" }}
              exit={{ height: "0" }}
              transition={{ duration: 0.35 }}
            ></motion.div>
            <motion.div
              key="color"
              className="bg-red-500 absolute top-0 bottom-0 w-full"
              initial={{ height: "0" }}
              animate={{ height: "100vh" }}
              exit={{ height: "0" }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
