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
    <header className="flex container justify-between m-auto py-4">
      <div>
        <Link to="/">logo</Link>
      </div>
      <nav>
        <ul className="flex">
          <li className="font-bold px-2">
            <Link to="/">Work</Link>
          </li>
          <li className="font-bold pl-2">
            <Link to="/">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
