import * as React from 'react'

export const Footer = ({ owner, textColor = "text-black" }) => {
  /**
   * Component state
   */
  const links: { title: string; href: string }[] = [
    { title: "Phone", href: "tel:+31636548880" },
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
      <div className="container m-auto pb-12 pt-56 flex justify-between flex-col md:flex-row">
        <span className="transform origin-bottom-left md:translate-x-20 md:-rotate-90">
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
