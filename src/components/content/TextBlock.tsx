import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import ReactMarkdown from 'react-markdown'

import { Grid } from '../layout/grid'

interface TextBlockProps {
  content: {
    title: string
    body: string
  }
}

export const TextBlock: FC<TextBlockProps> = props => {
  const { content } = props
  const { title, body } = content
  return (
    <Fade fraction={1 / 3} cascade triggerOnce className="relative z-50">
      <Grid>
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
