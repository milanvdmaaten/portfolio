import React, { FC, useEffect, useState } from 'react'
import Swiper from 'swiper'

import { BlogPostHeader } from './BlogPostHeader'
import { Post } from './post'
import { useScroll } from './provider/ScrollProvider'

interface OtherPostsProps {
  posts: any[]
  author: string
  backgroundColor: string
}

export const OtherPosts: FC<OtherPostsProps> = props => {
  /**
   * Component state
   */
  const { posts, author, backgroundColor } = props

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
                <div className="swiper-slide px-12" key={index}>
                  <Post post={post} author={author} />
                </div>
              )
            )}
          </div>
        </div>
      </nav>
    </section>
  )
}
