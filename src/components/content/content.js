import * as React from "react"
import { ImagesBlock } from "./imagesBlock"

import { TextBlock } from "./textBlock"

export const Content = ({ content }) => {
  switch (content.type) {
    case "textBlock":
      return <TextBlock content={content} />
    case "imagesBlock":
      return <ImagesBlock content={content} />
    default:
      return null
  }
}
