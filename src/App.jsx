import { useEffect, useState } from 'react'
import Portfolio from './components/Portfolio.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

const STORAGE_KEY = 'portfolio-theme'

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'dark' || stored === 'light') return stored
    } catch {
      /* ignore */
    }
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return (
    <>
      <a href="#portfolio-main" className="skip-link">
        Skip to content
      </a>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      />
      <Portfolio />
      <Footer />
    </>
  )
}
