import React, { FC } from 'react'

import { CallToAction, Content as ContentType, Images, Text } from '../../lib/types/content'
import { TextColor } from '../../lib/types/textColor'
import { CallToActionBlock } from './CallToActionBlock'
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
    case "callToAction":
      return (
        <CallToActionBlock
          content={content as CallToAction}
          textColor={textColor}
        />
      )
    default:
      return null
  }
}
