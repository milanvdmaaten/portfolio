import { Link } from 'gatsby'
import React, { FC } from 'react'

interface HeaderProps {
  owner: string
}

export const Header: FC<HeaderProps> = props => {
  const { owner } = props

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
          <li>
            <Link to="/" className="ml-10 p-2">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
