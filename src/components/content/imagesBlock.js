import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ContentSeparator } from "../contentSeparator"
import Swiper from "swiper/bundle"
import { Grid } from "../Grid"

export const ImagesBlock = ({ content }) => {
  const { images, size, carrousel } = content
  console.log(content)
  const swiperIdentifier = React.useRef(images[0].alt.replace(" ", "-"))

  let imageColsClass = ""

  switch (size) {
    case "small":
      imageColsClass = "col-start-3 col-span-8"
      break
    case "medium":
      imageColsClass = "col-start-2 col-span-10"
      break
    case "large":
      imageColsClass = "col-span-12"
      break
    case "fullWidth":
      imageColsClass = "w-full"
      break
    default:
      imageColsClass = "w-full"
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
    <Grid fullWidth={size === "fullWidth"}>
      <div className={`${imageColsClass}`}>
        <div
          className={
            carrousel ? `swiper swiper-${swiperIdentifier.current}` : "w-full"
          }
        >
          <div
            className={`${
              carrousel ? "swiper-wrapper" : "grid grid-cols-12 gap-y-20"
            }`}
          >
            {images.map(({ image, alt }, index) => {
              const renderImage = getImage(image)
              return (
                <div
                  className={`${carrousel ? "swiper-slide" : "col-span-12"}`}
                >
                  <GatsbyImage
                    image={renderImage}
                    alt={alt}
                    className="h-full w-full"
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
