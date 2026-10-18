import React, { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../../data/siteConfig'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about',    label: 'About Us' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname }            = useLocation()
  const mobileMenuRef           = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300
        ${scrolled ? 'shadow-md border-b border-gray-100' : 'shadow-sm border-b border-gray-200'}`}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center group shrink-0"
            aria-label="MAXBE PUMPS Home"
          >
            <img
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.logoAlt}
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
            />
          </Link>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-brand-red'
                      : 'text-gray-700 hover:bg-red-50 hover:text-brand-red'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-brand-red transition-colors"
              aria-label="Call us"
            >
              <Phone size={14} style={{ color: '#dc2626' }} />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <Link to="/contact" className="btn-primary text-sm px-5 py-2.5">
              Get a Quote
            </Link>
          </div>

          {/* ── Mobile toggle ─────────────────────────────────── */}
          <button
            onClick={() => setOpen(v => !v)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <nav className="container-custom py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-semibold text-gray-800 transition-colors ${
                      isActive ? 'bg-red-50 text-brand-red' : 'hover:bg-red-50 hover:text-brand-red'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="btn-outline justify-center text-sm"
                >
                  <Phone size={15} />
                  {SITE_CONFIG.phone}
                </a>
                <Link to="/contact" className="btn-primary justify-center text-sm">
                  Get a Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
