import * as React from 'react'

export const Footer = ({ owner, textColor = "text-black" }) => {
  /**
   * Component state
   */
  const links: { title: string; href: string }[] = [
    { title: "Phone", href: "tel:+1-816-831-9077" },
    { title: "Email", href: "mailto:mail@sanderboer.nl" },
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/in/sander-boer-653110a5/",
    },
    {
      title: "CV",
      href: "https://www.figma.com/file/yydZwLT2QQjCj1olZjbd03/?node-id=0%3A1",
    },
  ]
  /**
   * Render
   */
  return (
    <footer className={`bg-accent px-4 ${textColor}`}>
      <div className="container m-auto pb-12 pt-56 flex justify-between">
        <span className="transform origin-bottom-left translate-x-20 -rotate-90">
          © {new Date().getFullYear()},
          <br /> {owner}
        </span>
        <ul className="flex">
          {links.map((link, index) => (
            <li key={link.href} className={index < 1 ? "" : "ml-16"}>
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
