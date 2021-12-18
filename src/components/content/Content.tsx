import React, { FC } from 'react'

import { Content as ContentType, Images, Text } from '../../lib/types/content'
import { TextColor } from '../../lib/types/textColor'
import { ImagesBlock } from './ImagesBlock'
import { TextBlock } from './TextBlock'

interface ContentProps {
  textColor: TextColor
  content: ContentType
}

export const Content: FC<ContentProps> = props => {
  const { content, textColor = "text-black" } = props

  switch (content.type) {
    case "textBlock":
      return <TextBlock content={content as Text} />
    case "imagesBlock":
      return <ImagesBlock content={content as Images} textColor={textColor} />
    default:
      return null
  }
}
