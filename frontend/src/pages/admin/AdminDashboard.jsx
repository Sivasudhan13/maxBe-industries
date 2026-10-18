import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import {
  Package, MessageSquare, CheckCircle2, Clock,
  ArrowRight, TrendingUp, ChevronRight,
} from 'lucide-react'

const STATUS_STYLES = {
  new:        { bg: '#dbeafe', color: '#1d4ed8', label: 'New' },
  inProgress: { bg: '#fef3c7', color: '#d97706', label: 'In Progress' },
  resolved:   { bg: '#dcfce7', color: '#15803d', label: 'Resolved' },
  closed:     { bg: '#f3f4f6', color: '#6b7280', label: 'Closed' },
}

function StatCard({ label, value, icon: Icon, color, bg, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
          <Icon size={22} style={{ color }} />
        </div>
        <TrendingUp size={16} className="text-green-400" />
      </div>
      <p className="font-display font-black text-3xl text-gray-900 mb-1">
        {value ?? <span className="w-10 h-7 bg-gray-100 rounded animate-pulse inline-block" />}
      </p>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats]     = useState(null)
  const [recent, setRecent]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      axios.get('/api/admin/stats'),
      axios.get('/api/admin/enquiries?limit=6&sort=-createdAt'),
    ])
      .then(([s, e]) => { setStats(s.data); setRecent(e.data.enquiries || []) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const CARDS = [
    { label: 'Total Products',  value: stats?.products,          icon: Package,        color: '#dc2626', bg: '#fee2e2' },
    { label: 'Total Enquiries', value: stats?.enquiries,         icon: MessageSquare,  color: '#7c3aed', bg: '#ede9fe' },
    { label: 'New / Unread',    value: stats?.newEnquiries,      icon: Clock,          color: '#d97706', bg: '#fef3c7' },
    { label: 'Resolved',        value: stats?.resolvedEnquiries, icon: CheckCircle2,   color: '#15803d', bg: '#dcfce7' },
  ]

  return (
    <>
      <Helmet><title>Dashboard — MAXBE Admin</title></Helmet>

      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back — here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CARDS.map((c, i) => <StatCard key={c.label} {...c} delay={i * 0.08} />)}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
            <div>
              <h2 className="font-display font-bold text-lg text-gray-900">Recent Enquiries</h2>
              <p className="text-gray-400 text-xs mt-0.5">Latest customer enquiries</p>
            </div>
            <Link to="/admin/enquiries"
              className="flex items-center gap-1 text-sm font-semibold transition-colors"
              style={{ color: '#dc2626' }}>
              View All <ChevronRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <MessageSquare size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No enquiries yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recent.map(enq => {
                const s = STATUS_STYLES[enq.status] || STATUS_STYLES.new
                return (
                  <div key={enq._id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
                      style={{ background: '#dc2626' }}>
                      {enq.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{enq.name}</p>
                      <p className="text-gray-400 text-xs truncate">{enq.productInterest || 'General enquiry'}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: s.bg, color: s.color }}>
                      {s.label}
                    </span>
                    <p className="text-gray-300 text-xs shrink-0 hidden sm:block">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-display font-bold text-lg text-gray-900 mb-5">Quick Actions</h2>
            <div className="space-y-3">
              {[
                { to: '/admin/products', label: 'Add New Product', icon: Package,       color: '#dc2626', bg: '#fee2e2' },
                { to: '/admin/enquiries',label: 'View Enquiries',   icon: MessageSquare, color: '#7c3aed', bg: '#ede9fe' },
                { to: '/admin/settings', label: 'Settings',         icon: Package,       color: '#374151', bg: '#f3f4f6' },
              ].map(({ to, label, icon: Icon, color, bg }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: bg }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 flex-1">
                    {label}
                  </span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Brand card */}
          <div className="rounded-2xl p-6 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #dc2626, #7f1d1d)' }}>
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10"
              style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
            <p className="font-display font-black text-xl mb-1">MAXBE PUMPS</p>
            <p className="text-red-200 text-sm mb-4">Low Voltage King</p>
            <a href="/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white text-sm font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
              style={{ color: '#dc2626' }}>
              View Website <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
