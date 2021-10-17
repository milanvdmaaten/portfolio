import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { ContentSeparator } from "../contentSeparator"
import Swiper from "swiper/bundle"

export const ImagesBlock = ({ content }) => {
  const { images, fullWidth, carrousel } = content
  console.log(content)
  const swiperIdentifier = React.useRef(images[0].alt.replace(" ", "-"))

  const width = fullWidth ? "max-w-full p-0" : "max-w-5xl"

  const swiper = carrousel
    ? `swiper swiper-${swiperIdentifier.current} w-full`
    : ""
  console.log(carrousel, swiper)

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
    <section className={`container m-auto ${width} ${swiper}`}>
      <div className={`${carrousel ? "swiper-wrapper" : "grid grid-cols-12"}`}>
        {images.map(({ image, alt }, index) => {
          const renderImage = getImage(image)
          return (
            <div className={`${carrousel ? "swiper-slide" : "col-span-12"}`}>
              <GatsbyImage image={renderImage} alt={alt} className="w-full" />
              {index < images.length - 1 && (
                <ContentSeparator size="mb-20 col-span-12" />
              )}
            </div>
          )
        })}
      </div>
      {carrousel && (
        <React.Fragment>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </React.Fragment>
      )}
    </section>
  )
}
