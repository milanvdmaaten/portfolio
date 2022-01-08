import * as React from 'react'

export const Footer = ({ owner, textColor = "text-black" }) => {
  /**
   * Component state
   */
  const links: { title: string; href: string }[] = [
    { title: "Call me", href: "tel:+31644016922" },
    { title: "Mail me", href: "mailto:milanvandermaaten@gmail.com" },
    {
      title: "Connect with me",
      href: "https://www.linkedin.com/in/milan-van-der-maaten-307a1697/",
    },
    {
      title: "CV",
      href: "https://www.figma.com/file/yydZwLT2QQjCj1olZjbd03/Portfolio-Milan?node-id=857%3A30993",
    },
  ]
  /**
   * Render
   */
  return (
    <footer id="footer" className={`bg-accent px-4 ${textColor}`}>
      <div className="container m-auto pb-12 pt-56 flex justify-between flex-col md:flex-row">
        <span className="origin-bottom-left md:translate-x-20 md:-rotate-90">
          © {new Date().getFullYear()},
          <br /> {owner}
        </span>
        <ul className="flex mt-10 flex-col md:flex-row">
          {links.map((link, index) => (
            <li key={link.href} className={index < 1 ? "" : "md:ml-16"}>
              <a
                href={link.href}
                rel="noreferrer"
                target="_blank"
                className="headline-extra-small underline"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
