import { Grid } from "./layout/grid"
import { Post } from "./post"
import * as React from "react"

export const otherPosts = ({ posts, author }) => {
  return (
    <section className="bg-yellow-50">
      <Grid>
        {posts.map(post => (
          <Post post={post} author={author} size="6" />
        ))}
      </Grid>
    </section>
  )
}
