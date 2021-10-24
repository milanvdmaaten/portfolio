import * as React from 'react'

export const Footer = ({ owner }) => {
  return (
    <footer className="text-black bg-primary px-4">
      <div className="container m-auto pb-12 pt-96 flex justify-between">
        <span className="transform origin-bottom-left -rotate-90">
          © {new Date().getFullYear()},
          <br /> {owner}
        </span>
        <ul className="flex">
          {["Phone", "Mail", "LinkedIn", "CV"].map((link, index) => (
            <li key={link} className={index < 1 ? "" : "ml-16"}>
              <a
                href={`#${link}`}
                rel="noreferrer"
                target="_blank"
                className="headline-extra-small"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
