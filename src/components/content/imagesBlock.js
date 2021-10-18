import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ContentSeparator } from "../layout/contentSeparator"
import Swiper from "swiper/bundle"
import { Grid } from "../layout/grid"

export const ImagesBlock = ({ content }) => {
  const { images, size, carrousel } = content
  const swiperIdentifier = React.useRef(images[0].alt.replace(" ", "-"))

  let imageColsClass = "col-start-0 col-span-12"
  let isFullWidth = false

  switch (size) {
    case "small":
      imageColsClass += " md:col-start-3 md:col-span-8"
      break
    case "medium":
      imageColsClass += " md:col-start-2 md:col-span-10"
      break
    case "large":
      imageColsClass += " col-span-12"
      break
    case "fullWidth":
      isFullWidth = true
      imageColsClass += " w-screen"
      break
    default:
      imageColsClass += " w-full"
      break
  }

  React.useEffect(() => {
    setTimeout(() => {
      new Swiper(`.swiper-${swiperIdentifier.current}`, {
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
          pauseOnMouseEnter: true,
          delay: 1000 * 2.5,
        },
      })
    }, 1000 * 2)
  }, [swiperIdentifier])

  return (
    <Grid fullWidth={isFullWidth}>
      <div className={imageColsClass}>
        <div
          className={
            carrousel ? `swiper swiper-${swiperIdentifier.current}` : "w-full"
          }
        >
          <div className={`${carrousel ? "swiper-wrapper" : "w-full"}`}>
            {images.map(({ image, alt, title }, index) => {
              const renderImage = getImage(image)
              return (
                <div
                  key={index}
                  className={`${carrousel ? "swiper-slide" : ""}`}
                >
                  {title && <h3 className="text-center font-bold">{title}</h3>}
                  <GatsbyImage
                    image={renderImage}
                    objectFit={isFullWidth ? "contain" : "cover"}
                    alt={alt}
                    className={`h-full w-full drop-shadow ${
                      !isFullWidth
                        ? "drop-shadow-xl rounded-r-2xl bg-red-400"
                        : ""
                    }`}
                  />
                  {index < images.length - 1 && (
                    <ContentSeparator size="mb-20" />
                  )}
                </div>
              )
            })}
          </div>
          {carrousel && (
            <div className="-mb-20">
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
