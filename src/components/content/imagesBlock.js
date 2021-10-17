import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ContentSeparator } from "../contentSeparator"
import Swiper from "swiper/bundle"

export const ImagesBlock = ({ content }) => {
  const { images, fullWidth, carrousel } = content
  console.log(content)
  const swiperIdentifier = React.useRef(
    Array.from({ length: 10 }).reduce(
      (previousValue, currentValue) => `${previousValue}` + currentValue,
      ""
    )
  )

  const width = fullWidth ? "max-w-full p-0" : "max-w-5xl"

  const swiper = carrousel ? `swiper swiper-${swiperIdentifier.current}` : ""
  console.log(carrousel, swiper)
  React.useEffect(() => {
    setTimeout(() => {
      new Swiper(`.swiper-${swiperIdentifier.current}`, {
        // Optional parameters
        slidesPerView: 1,
        loop: true,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })
    }, 1000 * 5)
  }, [swiperIdentifier])

  return (
    <section className={`container m-auto ${width} ${swiper}`}>
      <div className={`${carrousel ? "swiper-wrapper" : "grid grid-cols-12"}`}>
        {images.map(({ image, alt }, index) => {
          const renderImage = getImage(image)
          return (
            <React.Fragment>
              <GatsbyImage
                image={renderImage}
                alt={alt}
                className={`${carrousel ? "swiper-slide" : "col-span-12"}`}
              />
              {index < images.length - 1 && (
                <ContentSeparator size="mb-20 col-span-12" />
              )}
            </React.Fragment>
          )
        })}
        {carrousel && (
          <React.Fragment>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </React.Fragment>
        )}
      </div>
    </section>
  )
}
