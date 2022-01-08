import { AnimatePresence, motion } from 'framer-motion'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FC, useEffect, useState } from 'react'

import { Content } from '../components/content/Content'
import { EmailTrigger } from '../components/drawers/EmailTrigger'
import { ContentSeparator } from '../components/layout/ContentSeparator'
import { Grid } from '../components/layout/Grid'
import { Layout } from '../components/layout/Layout'
import { OtherPosts } from '../components/post/OtherPosts'
import { PostHeader } from '../components/post/PostHeader'
import { PostProgress } from '../components/PostProgress'
import Seo from '../components/seo'
import { TextColor } from '../lib/types/textColor'
import { isMobile } from '../utils/device'

interface PostTemplateProps {
  data: {
    markdownRemark: {
      frontmatter: {
        tagline: string
        title: string
        content: any
        featuredImage: any
        drawColor: string
        backgroundColor: string
        textColor: TextColor
        headerColor: string
        password: {
          enabled: boolean
          passwords: {
            valid: string
            password: string
            title: string
          }[]
        }
      }
      id: string
    }
    site: any
    allMarkdownRemark: any
  }
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
    password,
  } = frontmatter

  const image = getImage(featuredImage)

  const { edges } = data.allMarkdownRemark

  const nodes = edges.map(({ node }) => node)

  const posts = nodes.filter(node => node.fileAbsolutePath.includes("/blog/"))
  const pages = nodes.filter(node => node.fileAbsolutePath.includes("/page/"))

  const [entryAnimation, setEntryAnimation] = useState(true)
  const [hasEnteredPassword, setHasEnteredPassword] = useState(
    !password.enabled
  )

  /**
   * Side effects
   */
  useEffect(() => {
    setTimeout(() => {
      setEntryAnimation(false)
    }, 600)
  }, [])

  useEffect(() => {
    if (!password.enabled) return

    const _activePasswords = password.passwords
      .filter(_password => new Date() < new Date(_password.valid))
      .map(_password => _password.password)
    const enteredPassword = prompt(`Enter password to visit ${title}`, "")

    if (!_activePasswords.includes(enteredPassword)) {
      alert("Incorrect password or password is not valid anymore")
      return self.location.assign(self.location.origin)
    }

    setHasEnteredPassword(true)
  }, [password])

  /**
   * Render
   */
  if (!hasEnteredPassword) return null

  return (
    <Layout
      pages={pages}
      owner={author.name}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <Seo title={title} description={tagline} />
      {!isMobile() && (
        <EmailTrigger textColor={textColor} drawColor={drawColor} />
      )}
      <PostProgress background={headerColor} />
      <AnimatePresence>
        {entryAnimation && (
          <section className="z-40 fixed w-full bottom-0 top-0">
            <motion.div
              className="bg-white fixed w-full bottom-0 top-0"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.3,
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
        className="-mt-8 md:-mt-16 w-full max-h-screen"
      />
      <ContentSeparator />
      <Grid>
        <section className="col-start-2 col-span-10 text-center">
          <h2 className="heading-large">{tagline}</h2>
        </section>
      </Grid>
      <ContentSeparator />
      <article className="blog-post-content md:px-4 md:px-0">
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
        password {
          enabled
          passwords {
            password
            valid
          }
        }
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
