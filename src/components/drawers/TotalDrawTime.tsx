import { FC, useEffect } from 'react'

import { useDraw } from '../providers/DrawProvider'

export const TotalDrawTime: FC = () => {
  /**
   * State
   */

  /**
   * Custom & 3rd party hooks
   */
  const { addDrawMethod, removeDrawMethod } = useDraw()

  /**
   * Hooks
   */
  useEffect(() => {
    const draw = (event?: { x: number; y: number }) => {
      console.log(event)
    }

    const drawer = addDrawMethod(draw)

    return () => {
      removeDrawMethod(drawer)
    }
  }, [addDrawMethod, removeDrawMethod])
  /**
   * Render
   */
  return null
}
