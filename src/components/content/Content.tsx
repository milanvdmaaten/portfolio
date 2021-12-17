import React, { FC } from 'react'

import { ImagesBlock } from './ImagesBlock'
import { TextBlock } from './textBlock'

type TextBlockType = {
  title: string
  body: string
}

type ImagesBlockType = {
  size: string
  carrousel: boolean
  images: any[]
}

type Content = { type: string } & (TextBlockType | ImagesBlockType)

interface ContentProps {
  textColor: "text-black" | "text-white"
  content: Content
}

export const Content: FC<ContentProps> = props => {
  const { content, textColor = "text-black" } = props

  switch (content.type) {
    case "textBlock":
      return <TextBlock content={content as TextBlockType} />
    case "imagesBlock":
      return (
        <ImagesBlock
          content={content as ImagesBlockType}
          textColor={textColor}
        />
      )
    default:
      return null
  }
}
