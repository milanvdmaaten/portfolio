import React, { FC, useEffect, useState } from 'react'
import Swiper from 'swiper'

import { TextColor } from '../../lib/types/textColor'
import { getScreenWidth } from '../../utils/screenSize'
import { useScroll } from '../providers/ScrollProvider'
import { Post } from './Post'

interface OtherPostsProps {
  posts: any[]
  author: {
    name: string
  }
  backgroundColor: string
  textColor: TextColor
}

export const OtherPosts: FC<OtherPostsProps> = props => {
  /**
   * Component state
   */
  const { posts, author, backgroundColor, textColor = "text-black" } = props

  const [titleRight, setTitleRight] = useState(2000)

  /**
   * Custom & 3th party hooks
   */
  const { addScrollListener, removeScrollListener } = useScroll()

  /**
   * Side effects
   */
  useEffect(() => {
    const listener = (scroll): void => {
      setTitleRight(scroll.pxToBottom)
    }

    const key = addScrollListener(listener)

    return () => {
      removeScrollListener(key)
    }
  }, [addScrollListener, removeScrollListener])

  /**
   * Side effects
   */
  useEffect(() => {
    const createSwiper = (): void => {
      const width = getScreenWidth()
      let slidesPerView = 1.25
      let slidesOffsetBefore = 0

      if (width > 960) {
        slidesOffsetBefore = 0
        slidesPerView = 2.25
      }
      if (width > 1200) {
        slidesOffsetBefore = 208
        slidesPerView = 3.5
      }

      new Swiper(`.swiper-other-posts`, {
        slidesPerView,
        slidesOffsetBefore,
        loop: true,
        autoplay: {
          delay: 1000 * 5,
        },
      })
    }

    setTimeout(() => {
      createSwiper()
    }, 1000 * 2)

    window.addEventListener("resize", createSwiper)

    return () => {
      window.removeEventListener("resize", createSwiper)
    }
  }, [])

  /**
   * Render
   */
  return (
    <section>
      <h3
        className="case__title whitespace-nowrap overflow-hidden"
        style={{
          marginLeft: `-${titleRight}px`,
        }}
      >
        {Array.from({ length: 20 }).map(_ => "more work ")}
      </h3>
      <nav
        className="pt-52 -mt-16 relative"
        style={{ backgroundColor: backgroundColor }}
      >
        <div className="swiper swiper-other-posts">
          <div className="swiper-wrapper">
            {[...posts, ...posts, ...posts, ...posts, ...posts, ...posts].map(
              (post, index) => (
                <div className="swiper-slide px-6 md:px-12" key={index}>
                  <Post post={post} author={author} textColor={textColor} />
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </section>
  )
}
