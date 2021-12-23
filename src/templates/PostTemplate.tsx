import { AnimatePresence, motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FC, Fragment, useEffect, useState } from 'react'
import Modal from 'react-modal'

import { CallToActionBlock } from '../components/content/CallToActionBlock'
import { Content } from '../components/content/Content'
import { TotalDrawTime } from '../components/drawers/TotalDrawTime'
import { ContentSeparator } from '../components/layout/ContentSeparator'
import { Grid } from '../components/layout/Grid'
import { Layout } from '../components/layout/Layout'
import { OtherPosts } from '../components/post/OtherPosts'
import { PostHeader } from '../components/post/PostHeader'
import { useConfetti } from '../components/providers/ConfettiProvider'
import Seo from '../components/seo'
import { TextColor } from '../lib/types/textColor'
import { timeCalculation } from '../utils/drawing'
import { disableScroll, enableScroll } from '../utils/scrollBlocker'

interface PostTemplateProps {
  data: any
}

interface DrawerProps {
  textColor: TextColor
}

// TODO: move to a separate file?
// Wee need this to be able to have access to `useConfetti`
const EmailTrigger: FC<DrawerProps> = props => {
  /**
   * Component state
   */
  const { textColor = "text-black" } = props

  const [modelOpened, setModelOpened] = useState(false)
  /**
   * Custom & 3th party hooks
   */
  const { fire } = useConfetti()

  /**
   * Methods
   */
  const closeModel = (): void => {
    enableScroll()
    setModelOpened(false)
  }

  const drawCallback = () => {
    disableScroll()
    const base = { origin: { x: 1, y: 1 }, angle: 135 }

    fire({
      ...base,
      spread: 26,
      startVelocity: 55,
      particleRatio: 0.25,
    })
    fire({ ...base, spread: 60 })
    fire({
      ...base,
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      particleRatio: 0.35,
    })
    fire({
      ...base,
      spread: 120,
      startVelocity: 45,
    })

    setTimeout(() => {
      setModelOpened(true)
    }, 500)
  }

  /**
   * Render
   */
  return (
    <Fragment>
      <Modal
        isOpen={modelOpened}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={closeModel}
        style={{
          overlay: {
            zIndex: 70,
          },
          content: {
            zIndex: 71,
            background: textColor === "text-black" ? "#fff" : "#000",
          },
        }}
      >
        <article
          className={`text-center p-10 flex flex-col justify-between h-full ${textColor}`}
        >
          <h1 className="heading-large">Hi there,</h1>
          <section className="body-large">
            <p className="mb-2">Your drawings looked beautiful 🎨</p>
            <p>In just another 10 seconds we could arrange a chat!</p>
          </section>
          <div className="flex justify-center">
            <CallToActionBlock
              content={{
                title: "Let's chat",
                href: "mailto:mail@sanderboer.nl?subject=Let's talk&body=Hi, I'd like to talk about your work,",
              }}
              textColor={textColor}
            />
          </div>
        </article>

        <button
          onClick={closeModel}
          className={`underline absolute top-4 right-4 ${textColor}`}
        >
          close
        </button>
      </Modal>
      <TotalDrawTime
        textColor={textColor}
        initialValue={10}
        suffix={"s"}
        calculator={timeCalculation}
        callback={drawCallback}
      />
    </Fragment>
  )
}
const PostTemplate: FC<PostTemplateProps> = props => {
  /**
   * Component state
   */
  const { data } = props

  const author = data.site.siteMetadata.author

  const { frontmatter, id } = data.markdownRemark
  const {
    tagline,
    title,
    content,
    featuredImage,
    drawColor,
    backgroundColor,
    headerColor,
    textColor,
  } = frontmatter

  const image = getImage(featuredImage)

  const { edges } = data.allMarkdownRemark

  const nodes = edges.map(({ node }) => node)

  const posts = nodes.filter(node => node.fileAbsolutePath.includes("/blog/"))
  const pages = nodes.filter(node => node.fileAbsolutePath.includes("/page/"))

  const [entryAnimation, setEntryAnimation] = useState(true)

  /**
   * Side effects
   */
  useEffect(() => {
    setTimeout(() => {
      setEntryAnimation(false)
    }, 600)
  }, [])

  /**
   * Render
   */
  return (
    <Layout
      pages={pages}
      owner={author.name}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <Seo title={title} description={tagline} />
      <EmailTrigger textColor={textColor} />
      <AnimatePresence>
        {entryAnimation && (
          <section className="z-40 fixed w-full bottom-0 top-0">
            <motion.div
              className="bg-white fixed w-full bottom-0 top-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                type: "tween",
                delay: 0.15,
              }}
            />
            <motion.div
              className="fixed w-full bottom-0 top-0"
              initial={{ top: "100vh", bottom: "0vh", opacity: 1 }}
              animate={{ top: "0vh" }}
              transition={{
                duration: 0.25,
                delay: 0,
              }}
              exit={{ bottom: "100vh" }}
              style={{ background: headerColor }}
            />
          </section>
        )}
      </AnimatePresence>
      <PostHeader
        title={title}
        headerColor={headerColor}
        drawColor={drawColor}
        textColor={textColor}
      />
      <GatsbyImage
        image={image}
        alt={tagline ?? ""}
        className="-mt-16 w-full max-h-screen"
      />
      <ContentSeparator />
      <Grid>
        <section className="col-start-2 col-span-10 text-center">
          <h2 className="heading-large">{tagline}</h2>
        </section>
      </Grid>
      <ContentSeparator />
      <article className="blog-post-content px-4 md:px-0">
        {content?.map((content, index) => (
          <React.Fragment key={index}>
            <Content content={content} textColor={textColor} />
            <ContentSeparator />
          </React.Fragment>
        ))}
      </article>
      <ContentSeparator />
      <OtherPosts
        textColor={textColor}
        backgroundColor={headerColor}
        posts={posts.filter(post => post.id !== id)}
        author={author}
      />
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  fragment ImagesBlock on Content {
    type
    images {
      image {
        childImageSharp {
          gatsbyImageData
        }
      }
      alt
      title
      titlePosition
    }
    size
    carrousel
  }

  fragment TextBlock on Content {
    type
    title
    body
  }

  fragment CallToActionBlock on Content {
    type
    title
    href
  }

  query BlogPostBySlug($id: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            tagline
            featuredImage {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        textColor
        headerColor
        backgroundColor
        tagline
        date
        drawColor
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        content {
          ...ImagesBlock
          ...TextBlock
          ...CallToActionBlock
        }
      }
    }
  }
`
