import * as React from "react"

export const Footer = ({ owner }) => {
  return (
    <footer className="bg-black text-white">
      <div className="container m-auto p-6 pt-12 flex justify-between mt-32">
        <span>
          © {new Date().getFullYear()}, {owner}
        </span>
        <ul className="flex">
          {["CV", "LinkedIn"].map((link, index) => (
            <li key={link} className={index < 1 ? "mx-2" : "ml-2"}>
              <a href={`#${link}`} target="_blank" className="underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
