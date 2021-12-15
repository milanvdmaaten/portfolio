import { Link } from 'gatsby'
import React, { FC } from 'react'

interface HeaderProps {
  owner: string
  pages?: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      tagline: string
    }
  }[]
}

export const Header: FC<HeaderProps> = props => {
  const { owner, pages } = props

  return (
    <header className="px-12 pt-6 -mb-14 z-50 sticky top-0 overflow-hidden">
      <div className="heading-small">
        <Link className="absolute mt-2" to="/">
          {owner}
        </Link>
      </div>
      <nav className="float-right">
        <ul className="flex text-2xl">
          <li>
            <Link to="/" className="p-2">
              Work
            </Link>
          </li>
          {pages?.map((page, index) => (
            <li key={index}>
              <Link to={page.fields.slug} className="p-2 ml-10">
                {page.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
