const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createPosts({ graphql, actions, reporter, collection: `blog` })
  await createPosts({ graphql, actions, reporter, collection: `page` })
}

const createPosts = async ({ graphql, actions, reporter, collection }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/PostTemplate.tsx`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/${collection}/" } }
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes, createFieldExtension } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }

    type MarkdownRemark {
      frontmatter: Frontmatter
      fields: Fields
    }

    type CallToActionBlock @infer {
      title: String
      href: String
    }

    type TextBlock @infer {
      title: String
      body: String
    }

    type Images @infer {
      image: File
      alt: String
      title: String
      titlePosition: String
    }

    type ImagesBlock @infer {
      images: [Images]
      size: String
      carrousel: Boolean
    }

    type Content {
      type: String
      imagesBlocks: [ImagesBlock]
      textBlocks: [TextBlock]
      callToActions: [CallToActionBlock]
    }

    type Passwords {
      password: String
      name: String
      valid: Date
    }

    type Password {
      enabled: Boolean
      passwords: [Passwords]
    }

    type Frontmatter @infer {
      title: String
      tagline: String
      textColor: String
      headerColor: String
      backgroundColor: String
      drawColor: String
      displayPosition: Int
      date: Date @dateformat
      featuredImage: File @fileByRelativePath
      content: [Content]
      password: Password
    }

    type Fields {
      slug: String
    }
  `)
}
