import confetti from 'canvas-confetti'
import React, { createContext, useContext } from 'react'

interface ConfettiContextState {
  fire?: (
    options?: confetti.Options & { particleRatio?: number }
  ) => Promise<void>
}

const initialState: ConfettiContextState = {}

export const ConfettiContext = createContext<ConfettiContextState>(initialState)

export const ConfettiProvider: React.FC = props => {
  /**
   * Component state
   */
  const { children } = props

  /**
   * Methods
   */
  const fire = (
    options: confetti.Options & { particleRatio?: number } = {}
  ): Promise<void> => {
    const { particleRatio = 1, particleCount = 200 } = options

    return new Promise((resolve, reject) => {
      confetti({
        particleCount: particleCount * particleRatio,
        ...options,
      })
        .then(resolve)
        .catch(reject)
    })
  }

  /**
   * Render
   */
  return (
    <ConfettiContext.Provider
      value={{
        fire,
      }}
    >
      <canvas id="canvas-confetti" />
      {children}
    </ConfettiContext.Provider>
  )
}

export const useConfetti = () => {
  /**
   * State
   */
  const context = useContext(ConfettiContext)
  if (!context)
    throw new Error(`useConfetti must be used within a ConfettiProvider`)

  return context
}
