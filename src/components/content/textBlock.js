import * as React from "react"
import ReactMarkdown from "react-markdown"
import { Grid } from "../layout/grid"

export const TextBlock = ({ content }) => {
  const { title, body } = content
  return (
    <Grid>
      <aside className="col-span-12 md:col-start-2 md:col-span-2 caption-mono">
        {title}
      </aside>
      <ReactMarkdown className="col-span-12 md:col-span-6">
        {body}
      </ReactMarkdown>
    </Grid>
  )
}
