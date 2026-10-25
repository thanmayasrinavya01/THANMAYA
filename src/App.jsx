import { useEffect, useState } from 'react'
import './App.css'

const profilePhoto = `${import.meta.env.BASE_URL}profile-photo.jpeg`
const resumeFile = `${import.meta.env.BASE_URL}thanmaya-resume.pdf`
const currentYear = new Date().getFullYear()

const projects = [
  {
    number: '01',
    title: 'Agriguard-AI',
    category: 'AI-powered agriculture project',
    description: 'An AI-powered agriculture platform created to support smarter farming. Agriguard-AI brings helpful digital insights together to help users explore crop care, recognize potential issues, and make more informed decisions for healthier, more sustainable growing.',
    tags: ['Agriculture', 'Artificial Intelligence', 'Smart Farming'],
    link: 'https://thanmayasrinavya-ui.github.io/agriguard_aI/',
  },
]

const skillGroups = [
  { label: 'Website', details: ['Create, manage, and optimize WordPress websites'] },
  {
    label: 'SEO',
    details: [
      'Develop SEO strategies to improve conversions',
      'Keyword research and competitor analysis',
      'On-page optimization',
      'Link-building strategies',
      'Reporting and rank tracking',
    ],
  },
  {
    label: 'Social Media',
    details: [
      'Facebook marketing and advertising',
      'Instagram, Pinterest, and SlideShare',
      'Quora',
    ],
  },
  { label: 'Email Marketing', details: ['Execute email marketing campaigns using Mailchimp'] },
  {
    label: 'Digital Analytics',
    details: [
      'Implement Google Analytics tracking',
      'Generate website reports',
      'Track on-site conversions',
    ],
  },
  { label: 'Content Writing', details: ['Write content on a variety of topics'] },
]

const contactLinks = [
  {
    icon: '@',
    label: 'Email',
    value: 'thanmayasrinavya@gmail.com',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=thanmayasrinavya%40gmail.com&su=Project%20idea&body=Hello%2C%0A%0AI%20would%20like%20to%20discuss%20an%20idea%20with%20you.%0A%0A',
  },
  { icon: 'in', label: 'LinkedIn', value: 'thanmaya-sri-navya', href: 'https://www.linkedin.com/in/thanmaya-sri-navya-5875b6338?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { icon: '⌘', label: 'GitHub', value: 'thanmayasrinavya-ui', href: 'https://github.com/thanmayasrinavya-ui' },
  { icon: '◎', label: 'Instagram', value: '@thanmayasrinavya', href: 'https://www.instagram.com/thanmayasrinavya?obrf=MW5qYmQ2aDU2YnBpaw==' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [loadProgress, setLoadProgress] = useState(1)
  const [contactStatus, setContactStatus] = useState('')

  async function handleContactSubmit(event) {
    event.preventDefault()
    setContactStatus('Sending your message…')

    const formElement = event.currentTarget
    const message = Object.fromEntries(new FormData(formElement).entries())

    try {
      const response = await fetch('https://formsubmit.co/ajax/thanmayasrinavya@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (!response.ok) throw new Error('Message could not be sent')

      setContactStatus('Thanks! Your message has been sent.')
      formElement.reset()
    } catch {
      setContactStatus('Sorry, your message could not be sent. Please email me directly.')
    }
  }

  useEffect(() => {
    let progress = 1
    let closeTimer
    const progressTimer = window.setInterval(() => {
      progress = Math.min(progress + 1, 100)
      setLoadProgress(progress)

      if (progress === 100) {
        window.clearInterval(progressTimer)
        closeTimer = window.setTimeout(() => {
          setIntroLeaving(true)
          closeTimer = window.setTimeout(() => setIntroVisible(false), 700)
        }, 250)
      }
    }, 28)

    return () => {
      window.clearInterval(progressTimer)
      window.clearTimeout(closeTimer)
    }
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    const revealTargets = document.querySelectorAll('.reveal, .reveal-item, .project-card, .contact-card')
    revealTargets.forEach((element) => revealObserver.observe(element))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <div className="site-shell">
      {introVisible && (
        <div
          className={introLeaving ? 'intro-loader is-leaving' : 'intro-loader'}
          role="status"
          aria-label={`Loading portfolio: ${loadProgress}%`}
        >
          <div className="intro-loader-content">
            <span className="intro-loader-kicker">Welcome to my portfolio</span>
            <p className="intro-loader-name">THANMAYA SRI <em>NAVYA</em></p>
            <div className="intro-loader-roles">
              <span>Electrical &amp; Electronics Engineering Student</span>
            </div>
            <div className="intro-progress-row">
              <span>Loading experience</span>
              <strong>{loadProgress}<small>%</small></strong>
            </div>
            <div className="intro-progress-track" aria-hidden="true">
              <span style={{ width: `${loadProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      <nav className="section-nav" aria-label="Section navigation">
        {[
          ['Home', '#home'],
          ['About', '#about'],
          ['Skills', '#skills'],
          ['Projects', '#projects'],
          ['Contact', '#contact'],
        ].map(([label, href]) => (
          <a href={href} key={label} aria-label={`Go to ${label}`}>
            <span>{label}</span>
            <i aria-hidden="true" />
          </a>
        ))}
      </nav>

      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Thanmaya Sri Navya home">
          <span className="wordmark-bracket">&lt;</span> TSN <span className="wordmark-bracket">/&gt;</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href={resumeFile} className="nav-resume" download>
            Resume <span>↓</span>
          </a>
          <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <span>↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow hero-load-item">
              <span className="status-dot" /> B.Tech Electrical &amp; Electronics Engineering Student
            </p>
            <h1 className="hero-load-item">
              THANMAYA SRI
              <br />
              <em>NAVYA</em>
            </h1>
            <h2 className="hero-tagline hero-load-item">Exploring circuits, power systems &amp; practical engineering.</h2>
            <p className="hero-intro hero-load-item">
              I&apos;m an Electrical and Electronics Engineering student interested in how electrical systems work and how engineering can solve everyday problems.
            </p>
            <div className="hero-actions hero-load-item">
              <a className="primary-action" href="#projects"><span>↗</span> View my projects</a>
              <a className="secondary-action" href={resumeFile} download><span>↓</span> Download resume</a>
            </div>
            <div className="hero-socials hero-load-item">
              <span>Find me on</span>
              <a href="https://github.com/thanmayasrinavya-ui" target="_blank" rel="noreferrer" aria-label="GitHub profile">⌘</a>
              <a href="https://www.linkedin.com/in/thanmaya-sri-navya-5875b6338?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">in</a>
            </div>
          </div>

          <div className="hero-visual hero-load-item">
            <div className="portrait-frame">
              <img
                src={profilePhoto}
                alt="Thanmaya Sri Navya"
                loading="eager"
                onError={(event) => {
                  event.currentTarget.style.display = 'none'
                  event.currentTarget.nextElementSibling.style.display = 'grid'
                }}
              />
              <div className="portrait-fallback">TSN</div>
              <div className="portrait-caption">
                <strong>THANMAYA SRI NAVYA</strong>
                <span>B.Tech · Electrical &amp; Electronics</span>
              </div>
            </div>
            <div className="visual-note note-top">
              01
              <br />
              <small>
                curious
                <br />
                by nature
              </small>
            </div>
            <div className="visual-note note-bottom">
              Scroll to
              <br />
              discover <span>↓</span>
            </div>
          </div>
        </section>

        <section className="intro-section reveal" id="about">
          <div className="section-index reveal-item">01 / 04</div>
          <div className="intro-content">
            <p className="eyebrow reveal-item">A little about me</p>
            <h2 className="reveal-item">
              I like the space
              <br />
              where <em>technology</em>
              <br />
              meets empathy.
            </h2>
            <p className="body-copy reveal-item">
              I&apos;m a goal-driven B.Tech Electrical and Electronics Engineering student at PSCMR College of Engineering and Technology, Vijayawada. I&apos;m interested in electrical circuits, power systems, and emerging technologies. I enjoy connecting classroom concepts with practical applications while continuing to grow my engineering and problem-solving skills.
            </p>
            <div className="about-stats reveal-item">
              <span>
                <strong>2nd</strong> year student
              </span>
              <span>
                <strong>01</strong> certification
              </span>
              <span>
                <strong>∞</strong> things to learn
              </span>
            </div>
          </div>
        </section>

        <section className="skills-section reveal" id="skills">
          <div className="section-heading">
            <div className="section-index reveal-item">02 / 04</div>
            <p className="eyebrow reveal-item">My toolkit</p>
            <h2 className="reveal-item">
              Digital marketing
              <br />
              <em>skills.</em>
            </h2>
          </div>

          <div className="skill-list">
            {skillGroups.map(({ label, details }, groupIndex) => (
              <div className="skill-row reveal-item" key={label}>
                <span className="skill-label">0{groupIndex + 1} / {label}</span>
                <div className="skill-details">
                  {details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="projects-section reveal" id="projects">
          <div className="section-heading projects-heading">
            <div className="section-index reveal-item">03 / 04</div>
            <p className="eyebrow reveal-item">Selected work</p>
            <h2 className="reveal-item">
              Ideas, made
              <br />
              <em>interactive.</em>
            </h2>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <a className="project-card reveal-item" href={project.link} target="_blank" rel="noreferrer" key={project.number}>
                <span className="project-number">{project.number}</span>
                <div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="project-arrow">↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-section reveal" id="contact">
          <div className="section-index reveal-item">04 / 04</div>
          <p className="eyebrow reveal-item">Have a good idea?</p>
          <h2 className="reveal-item">
            Let&apos;s make
            <br />
            <em>something useful.</em>
          </h2>

          <div className="contact-grid">
            {contactLinks.map((contact) => (
              <a className="contact-card reveal-item" href={contact.href} target="_blank" rel="noreferrer" key={contact.label}>
                <span className="contact-icon">{contact.icon}</span>
                <span>
                  <small>{contact.label}</small>
                  <strong>{contact.value}</strong>
                </span>
                <span className="contact-arrow">↗</span>
              </a>
            ))}
          </div>

          <form className="contact-form reveal-item" onSubmit={handleContactSubmit}>
            <h3>Send me a message</h3>
            <p>I&apos;ll get back to you as soon as I can.</p>
            <div className="contact-form-fields">
              <label>
                Your name
                <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </label>
              <label className="contact-message-field">
                Message
                <textarea name="message" rows="5" placeholder="Tell me a little about what you have in mind…" required />
              </label>
            </div>
            <button className="contact-submit" type="submit">Send message <span aria-hidden="true">↗</span></button>
            <p className="contact-status" role="status" aria-live="polite">{contactStatus}</p>
          </form>
        </section>
      </main>

      <footer>
        <span>© {currentYear} Thanmaya Sri Navya</span>
        <div>
          <a href="https://github.com/thanmayasrinavya-ui" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/thanmaya-sri-navya-5875b6338?utm_source=share_via&amp;utm_content=profile&amp;utm_medium=member_android" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.instagram.com/thanmayasrinavya?obrf=MW5qYmQ2aDU2YnBpaw==" target="_blank" rel="noreferrer">Instagram</a>
        </div>
        <span>Made with curiosity</span>
      </footer>

      <a
        className="whatsapp-fab"
        href="https://wa.me/919014101919"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Thanmaya on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 29l6.8-1.8A12.8 12.8 0 1 0 16 3.2Zm0 23.3c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4 .1 1.1-3.8-.3-.4a10.5 10.5 0 1 1 8.9 5.8Zm5.8-7.9c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      </a>
    </div>
  )
}

export default App