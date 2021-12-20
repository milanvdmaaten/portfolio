export type Text = {
  title: string
  body: string
}

export type Images = {
  size: string
  carrousel: boolean
  images: any[]
}

export type CallToAction = {
  title: string
  href: string
}

export type Content = { type: string } & (Text | Images | CallToAction)
