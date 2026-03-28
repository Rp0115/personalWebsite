import { useCallback, useEffect, useId, useState } from 'react'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'career', label: 'Career' },
  { id: 'projects', label: 'Projects' },
]

/** Dark mode → sun (go light). Light mode → moon (go dark). */
function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg
        className="nav__theme-icon nav__theme-icon--sun"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }
  return (
    <svg className="nav__theme-icon nav__theme-icon--moon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      />
    </svg>
  )
}

export default function Header({ theme, onToggleTheme }) {
  const menuId = useId()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => setMenuOpen(false)
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  const handleSectionNav = useCallback((e, id) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <a href="#portfolio-main" className="logo" onClick={(e) => handleSectionNav(e, 'portfolio-main')}>
          Riju Pant
        </a>
        <nav className="nav" aria-label="Primary">
          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`} id={menuId}>
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => handleSectionNav(e, id)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__right">
          <button
            type="button"
            className="nav__theme"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            type="button"
            className="nav__toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  )
}
