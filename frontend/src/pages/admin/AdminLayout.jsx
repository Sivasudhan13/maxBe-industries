import React, { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Package, MessageSquare, Settings,
  LogOut, Menu, X, ExternalLink, ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { SITE_CONFIG } from '../../data/siteConfig'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/products',  icon: Package,          label: 'Products' },
  { to: '/admin/enquiries', icon: MessageSquare,    label: 'Enquiries' },
  { to: '/admin/settings',  icon: Settings,         label: 'Settings' },
]

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products':  'Products',
  '/admin/enquiries': 'Enquiries',
  '/admin/settings':  'Settings',
}

function SidebarContent({ onClose, user, onLogout }) {
  return (
    <div className="flex flex-col h-full" style={{ background: '#1a1a1a', color: '#fff' }}>

      {/* Logo */}
      <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link to="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 group" onClick={onClose}>
          <img src={SITE_CONFIG.logo} alt="MAXBE PUMPS"
            className="h-10 w-auto object-contain brightness-0 invert group-hover:opacity-80 transition-opacity" />
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Admin Portal</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
        <p className="text-xs font-bold uppercase tracking-widest px-3 mb-3"
          style={{ color: 'rgba(255,255,255,0.25)' }}>
          Menu
        </p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'text-white shadow-lg'
                  : 'hover:text-white'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: '#dc2626', color: '#fff' }
              : { color: 'rgba(255,255,255,0.55)' }
            }
          >
            {({ isActive }) => (
              <>
                <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                  isActive ? 'bg-white/20' : 'bg-white/5'
                }`}>
                  <Icon size={16} />
                </span>
                {label}
                {isActive && <ChevronRight size={14} className="ml-auto opacity-60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* View site */}
      <div className="px-3 pb-3">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
          style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.04)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          <ExternalLink size={15} />
          View Website
        </a>
      </div>

      {/* User + logout */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
            style={{ background: '#dc2626' }}>
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.username || 'Admin'}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Administrator</p>
          </div>
        </div>
        <button onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)' }}
          onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(220,38,38,0.2)' }}
          onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const { pathname }     = useLocation()
  const [sideOpen, setSideOpen] = useState(false)

  function handleLogout() { logout(); navigate('/admin') }
  const pageTitle = PAGE_TITLES[pathname] || 'Admin'

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:block w-64 shrink-0 h-screen">
        <SidebarContent onClose={() => {}} user={user} onLogout={handleLogout} />
      </div>

      {/* ── Mobile sidebar overlay ── */}
      <AnimatePresence>
        {sideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSideOpen(false)}
              className="md:hidden fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
            >
              <SidebarContent onClose={() => setSideOpen(false)} user={user} onLogout={handleLogout} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shrink-0 shadow-sm">
          {/* Mobile hamburger */}
          <button onClick={() => setSideOpen(true)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Open menu">
            <Menu size={20} />
          </button>

          {/* Page title */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-gray-300 text-sm">/</span>
              <span className="text-sm font-semibold text-gray-900">{pageTitle}</span>
            </div>
            <span className="md:hidden text-base font-bold text-gray-900">{pageTitle}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3 ml-auto">
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-red-300 hover:text-brand-red transition-all">
              <ExternalLink size={12} /> View Site
            </a>
            {/* User chip */}
            <div className="flex items-center gap-2 pl-3 border-l border-gray-100">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black"
                style={{ background: '#dc2626' }}>
                {user?.username?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="hidden sm:block text-sm font-semibold text-gray-700">
                {user?.username || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6" id="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
