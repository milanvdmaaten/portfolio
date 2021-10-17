import * as React from "react"
import ReactMarkdown from "react-markdown"

export const TextBlock = ({ content }) => {
  const { title, body } = content
  return (
    <section className="container max-w-5xl m-auto grid grid-cols-12 gap-10">
      <aside className="col-span-2">{title}</aside>
      <ReactMarkdown className="col-span-10">{body}</ReactMarkdown>
    </section>
  )
}
