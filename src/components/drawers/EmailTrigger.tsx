import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, Fragment, useEffect, useState } from 'react'
import Modal from 'react-modal'

import { TextColor } from '../../lib/types/textColor'
import { timeCalculation } from '../../utils/drawing'
import { disableScroll, enableScroll } from '../../utils/scrollBlocker'
import { CallToActionBlock } from '../content/CallToActionBlock'
import { useConfetti } from '../providers/ConfettiProvider'
import { TotalDrawTime } from './TotalDrawTime'

interface EmailTriggerProps {
  textColor: TextColor
  drawColor: string
}

export const EmailTrigger: FC<EmailTriggerProps> = props => {
  /**
   * Component state
   */
  const { textColor = "text-black", drawColor = "#000" } = props

  const [modalOpened, setModalOpened] = useState(false)

  const drawTime = 10
  /**
   * Custom & 3th party hooks
   */
  const { fire } = useConfetti()

  /**
   * Methods
   */
  const closeModal = (_: any): void => {
    enableScroll()
    setModalOpened(false)
  }

  const drawCallback = () => {
    disableScroll()

    const confetti = (options: any) => {
      fire({
        ...options,
        spread: 26,
        startVelocity: 55,
        particleRatio: 0.25,
      })
      fire({ ...options, spread: 60 })
      fire({
        ...options,
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        particleRatio: 0.35,
      })
      fire({
        ...options,
        spread: 120,
        startVelocity: 45,
      })
    }

    setModalOpened(true)

    setTimeout(() => {
      const boundingBox = document
        .getElementById("confetti")
        .getBoundingClientRect()

      confetti({
        origin: {
          x: (boundingBox.left * 100) / window.innerWidth / 100,
          y: (boundingBox.top * 100) / window.innerHeight / 100,
        },
        angle: 45,
      })
    }, 1000)
  }

  useEffect(() => {
    if (!modalOpened) return

    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal(e)
    }

    window.addEventListener("keydown", keyListener)

    return () => window.removeEventListener("keydown", keyListener)
  }, [modalOpened])

  /**
   * Render
   */
  return (
    <Fragment>
      <AnimatePresence>
        {modalOpened && (
          <motion.div
            className={`modal ${textColor === "text-white" ? "dark" : ""}`}
          >
            <motion.div
              className="modal__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.6 } }}
              transition={{
                duration: 0.5,
              }}
              onClick={closeModal}
            />
            <motion.div
              className="modal__content"
              initial={{ top: "10vh", scale: 0.1 }}
              animate={{ top: 0, scale: 1 }}
              exit={{ top: "60vh", scale: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.7,
                type: "spring",
              }}
            >
              <article
                className={`text-center flex flex-col justify-between h-full ${textColor}`}
              >
                <h1 className="heading-large">Woaaauw,</h1>
                <section className="body-medium">
                  <p className="mb-2">
                    Your drawings looked beautiful <span id="confetti">🎉</span>
                  </p>
                  <p>
                    In just another {drawTime} seconds we could arrange a chat!
                  </p>
                </section>
                <div className="flex justify-center">
                  <CallToActionBlock
                    content={{
                      title: "Let's chat",
                      href: "mailto:mail@sanderboer.nl?subject=Let's talk&body=Hi, I'd like to talk about your work,",
                    }}
                    textColor={textColor}
                  />
                </div>
              </article>

              <button
                onClick={closeModal}
                className={`underline absolute top-4 right-6 ${textColor}`}
              >
                close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <TotalDrawTime
        textColor={drawColor}
        initialValue={drawTime}
        suffix={"s"}
        calculator={timeCalculation}
        callback={drawCallback}
      />
    </Fragment>
  )
}
