import React, { FC, useEffect } from 'react'
import { Fade } from 'react-awesome-reveal'
import ReactMarkdown from 'react-markdown'

import { Text } from '../../lib/types/content'
import { Grid } from '../layout/Grid'

interface TextBlockProps {
  content: Text
}

export const TextBlock: FC<TextBlockProps> = props => {
  /**
   * Component state
   */
  const { content } = props
  const { title, body } = content

  /**
   * Side effects
   */
  useEffect(() => {
    const links = document.querySelectorAll<HTMLLinkElement>(".content--text a")

    links.forEach(link => (link.target = "_blank"))
  }, [])

  /**
   * Render
   */
  return (
    <Fade fraction={1 / 3} cascade triggerOnce className="relative z-30">
      <Grid className="content--text">
        <aside className="col-span-12 md:col-start-2 2xl:col-start-3 md:col-span-2 caption-mono pt-3">
          {title}
        </aside>
        <ReactMarkdown className="col-span-12 md:col-span-6 2xl:col-span-5">
          {body}
        </ReactMarkdown>
      </Grid>
    </Fade>
  )
}
