import * as React from "react"
import { Link } from "gatsby"

export const Header = ({ location, children }) => {
  //  const rootPath = `${__PATH_PREFIX__}/`
  //  const isRootPath = location.pathname === rootPath
  //  let header

  //  if (isRootPath) {
  //    header = (
  //      <h1 className="main-heading">
  //        <Link to="/">{title}</Link>
  //      </h1>
  //    )
  //  } else {
  //    header = (
  //      <Link className="header-link-home" to="/">
  //        {title}
  //      </Link>
  //    )
  //  }

  return (
    <header className="flex container items-center justify-between m-auto py-4 px-0 z-50 sticky top-0">
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
