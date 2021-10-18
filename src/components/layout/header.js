import * as React from "react"
import { Link } from "gatsby"

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 z-50 sticky top-0">
      <div>
        <Link to="/">logo</Link>
      </div>
      <nav>
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
