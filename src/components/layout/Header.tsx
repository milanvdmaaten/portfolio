import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'gatsby'
import React, { FC, useState } from 'react'

import { TextColor } from '../../lib/types/textColor'
import { disableScroll, enableScroll } from '../../utils/scrollBlocker'

interface HeaderProps {
  owner: string
  textColor: TextColor
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
  /**
   * Component state
   */
  const { owner, pages, textColor } = props

  const [isOpen, setIsOpen] = useState(false)

  /**
   * Methods
   */
  const toggleMenu = () => {
    if (!isOpen) disableScroll()
    else enableScroll()

    setIsOpen(!isOpen)
  }

  /**
   * Render
   */
  return (
    <header className="header">
      <div className="heading-small">
        <Link className="absolute mt-2" to="/">
          {owner}
        </Link>
      </div>
      <nav className="float-right hidden md:block">
        <ul className="flex text-2xl">
          <li>
            <Link to="/" className="p-2 underline">
              Work
            </Link>
          </li>
          {pages?.map((page, index) => (
            <li key={index}>
              <Link to={page.fields.slug} className="p-2 ml-10 underline">
                {page.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="fixed top-4 right-4 block md:hidden">
        <img
          src="/assets/menu.svg"
          alt="menu"
          className={`menu__button w-8 h-8 ${
            textColor === "text-white" ? "filter invert" : ""
          }`}
          onClick={toggleMenu}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="fixed top-0 z-50 bg-black h-screen w-screen text-white"
            initial={{
              left: "100vw",
            }}
            animate={{
              left: "0",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <ul className="flex flex-col text-white w-screen h-screen justify-center items-center text-6xl">
              <motion.li
                className="my-6 transform"
                initial={{
                  y: "30px",
                  opacity: 0,
                }}
                animate={{
                  y: "0",
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                }}
              >
                <Link to="/" className="underline p-4">
                  Work
                </Link>
              </motion.li>
              {pages?.map((page, index) => (
                <motion.li
                  key={index}
                  className="my-6"
                  initial={{
                    y: "30px",
                    opacity: 0,
                  }}
                  animate={{
                    y: "0",
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.4 + 0.2 * (index + 1),
                  }}
                >
                  <Link to={page.fields.slug} className="underline p-4">
                    {page.frontmatter.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div
              className="underline absolute text-center bottom-4 text-2xl w-screen p-2"
              onClick={toggleMenu}
            >
              close
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
