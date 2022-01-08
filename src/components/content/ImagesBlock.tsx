import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import Swiper from 'swiper'

import { Images } from '../../lib/types/content'
import { TextColor } from '../../lib/types/textColor'
import { uuid } from '../../utils/uuid'
import { ContentSeparator } from '../layout/ContentSeparator'
import { Grid } from '../layout/Grid'
import { useScroll } from '../providers/ScrollProvider'

interface ImagesBlockProps {
  textColor: TextColor
  content: Images
}

export const ImagesBlock: FC<ImagesBlockProps> = props => {
  /**
   * Component state
   */
  const { content, textColor } = props
  const { images, size, carrousel } = content

  const uniqueIdentifier = useRef(uuid())
  const invertImageArrowPointers = useRef<Map<number, boolean>>(new Map())

  const imageColsClass = useRef("col-start-0 col-span-12")
  const isFullWidth = useRef(false)

  switch (size) {
    case "extra-small":
      imageColsClass.current += " md:col-start-5 md:col-end-9"
      break
    case "small":
      imageColsClass.current += " md:col-start-3 md:col-end-11"
      break
    case "medium":
      imageColsClass.current += " md:col-start-2 md:col-end-12"
      break
    case "large":
      imageColsClass.current += " col-span-12"
      break
    case "fullWidth":
      isFullWidth.current = true
      imageColsClass.current += " w-full"
      break
    default:
      imageColsClass.current += " w-full"
      break
  }

  /**
   * Side effects
   */
  useEffect(() => {
    new Swiper(`.swiper-${uniqueIdentifier.current}`, {
      slidesPerView: 1,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
      },
      autoplay: {
        delay: 1000 * 2.5,
      },
    })
  }, [uniqueIdentifier])

  /**
   * Render
   */
  return (
    <Grid fullWidth={isFullWidth.current} className="content--images">
      <div className={imageColsClass.current} id={uniqueIdentifier.current}>
        <div
          className={
            carrousel ? `swiper swiper-${uniqueIdentifier.current}` : "w-full"
          }
        >
          <div className={`${carrousel ? "swiper-wrapper" : "w-full"}`}>
            {images.map(({ image, alt, title, titlePosition }, index) => {
              const renderImage = getImage(image)
              let arrowPosition = ""
              let titleSpacing = ""
              let inverted = false
              switch (titlePosition) {
                case "left":
                  titleSpacing += " md:translate-x-1/4"
                  arrowPosition += " justify-start translate-x-1/4 ml-4"
                  break
                case "right":
                  inverted = true
                  titleSpacing += " md:-translate-x-1/4"
                  arrowPosition += " justify-end -translate-x-1/4 mr-4"
                  break
                default:
                  if (!invertImageArrowPointers.current.get(index)) {
                    invertImageArrowPointers.current.set(
                      index,
                      Math.random() > 2 / 3
                    )
                  }

                  inverted = invertImageArrowPointers.current.get(index)
                  arrowPosition += " justify-center"
              }

              return (
                <div
                  key={index}
                  className={`${carrousel ? "swiper-slide" : ""}`}
                >
                  {title && (
                    <Fade triggerOnce className="overflow-hidden">
                      <h3
                        className={`caption-handwritten text-${titlePosition} ${titleSpacing}`}
                      >
                        {title}
                      </h3>
                      <div
                        className={`imagesBlock-arrow pb-4 pt-2 flex ${arrowPosition} ${
                          inverted && "inverted"
                        }`}
                      >
                        <img
                          src="/assets/arrow.svg"
                          alt={`arrow pointing towards ${alt}`}
                          className={textColor === "text-white" ? "invert" : ""}
                        />
                      </div>
                    </Fade>
                  )}
                  <Fade
                    fraction={1 / 4}
                    cascade
                    triggerOnce
                    className={uniqueIdentifier.current}
                  >
                    <GatsbyImage
                      image={renderImage}
                      objectFit="initial"
                      alt={alt}
                      className={`h-full w-full ${uniqueIdentifier.current} ${
                        !isFullWidth.current
                          ? "drop-shadow-smooth rounded-2xl"
                          : ""
                      }`}
                    />
                  </Fade>
                  {index < images.length - 1 && (
                    <ContentSeparator className="mb-20" />
                  )}
                </div>
              )
            })}
          </div>
          {carrousel && (
            <div className="">
              <div className="swiper-pagination"></div>
              <div className="swiper-button-prev"></div>
              <div className="swiper-button-next"></div>
            </div>
          )}
        </div>
      </div>
    </Grid>
  )
}
