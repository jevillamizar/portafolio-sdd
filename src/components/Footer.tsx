import { getPerson } from '../data/resume'
import './Footer.css'

const person = getPerson()

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p>{`© ${year} ${person.fullName}`}</p>
        <ul className="site-footer__links">
          <li>
            <a href={person.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${person.email}`}>Correo</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
