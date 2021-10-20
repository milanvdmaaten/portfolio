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
      imageColsClass += " w-full"
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
            {images.map(({ image, alt, title, titlePosition }, index) => {
              const renderImage = getImage(image)
              let arrowPosition = "transform justify-"
              let titleSpacing = "transform"
              switch (titlePosition) {
                case "left":
                  titleSpacing += " translate-x-1/4"
                  arrowPosition += "start translate-x-1/4"
                  break
                case "right":
                  titleSpacing += " -translate-x-1/4"
                  arrowPosition += "end -translate-x-1/4"
                  break
                default:
                  arrowPosition += "center"
              }
              return (
                <div
                  key={index}
                  className={`${carrousel ? "swiper-slide" : ""}`}
                >
                  {title && (
                    <div className="overflow-hidden">
                      <h3
                        className={`caption-handwritten text-${titlePosition} ${titleSpacing}`}
                      >
                        {title}
                      </h3>
                      <div
                        className={`imagesBlock-arrow pb-4 pt-2 flex ${arrowPosition}`}
                      >
                        <img
                          src="/assets/arrow.svg"
                          alt={`arrow pointing towards ${alt}`}
                        />
                      </div>
                    </div>
                  )}
                  <GatsbyImage
                    image={renderImage}
                    objectFit={"initial"}
                    alt={alt}
                    className={`h-full w-full ${
                      !isFullWidth ? "filter drop-shadow-milan rounded-2xl" : ""
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
