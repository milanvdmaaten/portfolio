import * as React from "react"
import ReactMarkdown from "react-markdown"
import { Grid } from "../layout/grid"

export const TextBlock = ({ content }) => {
  const { title, body } = content
  return (
    <Grid>
      <aside className="col-span-12 md:col-start-2 2xl:col-start-3 md:col-span-2 caption-mono pt-3">
        {title}
      </aside>
      <ReactMarkdown className="col-span-12 md:col-span-6 2xl:col-span-5">
        {body}
      </ReactMarkdown>
    </Grid>
  )
}
