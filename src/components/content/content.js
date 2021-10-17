import * as React from "react"

import { TextBlock } from "./textblock"

export const Content = ({ content }) => {
  switch (content.type) {
    case "textBlock":
      return <TextBlock content={content} />
  }
}
