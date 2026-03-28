import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="section__inner site-footer__inner">
        <p>© {currentYear} Riju Pant</p>
      </div>
    </footer>
  )
}

export default Footer
