import { Post } from "./post"
import * as React from "react"
import Swiper from "swiper/bundle"

export const OtherPosts = ({ posts, author }) => {
  React.useEffect(() => {
    setTimeout(() => {
      new Swiper(`.swiper-other-posts`, {
        slidesPerView: 3.5,
        slidesOffsetBefore: 208,
        loop: true,
        autoplay: {
          delay: 1000 * 5,
        },
      })
    }, 1000 * 2)
  }, [])

  return (
    <nav className="bg-yellow-50 py-32">
      <div className="swiper swiper-other-posts">
        <div className="swiper-wrapper">
          {[...posts, ...posts, ...posts, ...posts, ...posts, ...posts].map(
            post => (
              <div className="swiper-slide px-12" key={post.fields.slug}>
                <Post post={post} author={author} />
              </div>
            )
          )}
        </div>
      </div>
    </nav>
  )
}
