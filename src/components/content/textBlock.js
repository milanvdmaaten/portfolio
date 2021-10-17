import * as React from "react"
import ReactMarkdown from "react-markdown"
import { Grid } from "../grid"

export const TextBlock = ({ content }) => {
  const { title, body } = content
  return (
    <Grid>
      <aside className="col-start-2 col-span-2">{title}</aside>
      <ReactMarkdown className="col-span-6">{body}</ReactMarkdown>
    </Grid>
  )
}
