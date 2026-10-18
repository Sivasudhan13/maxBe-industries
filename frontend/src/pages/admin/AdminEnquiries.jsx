import React, { useEffect, useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, X, Loader2, Trash2, MessageSquare,
  Phone, Mail, Calendar, Tag, ChevronDown,
} from 'lucide-react'

const STATUS_OPTIONS = ['new', 'inProgress', 'resolved', 'closed']
const STATUS_STYLES  = {
  new:        { bg: '#dbeafe', color: '#1d4ed8', label: 'New' },
  inProgress: { bg: '#fef3c7', color: '#d97706', label: 'In Progress' },
  resolved:   { bg: '#dcfce7', color: '#15803d', label: 'Resolved' },
  closed:     { bg: '#f3f4f6', color: '#6b7280', label: 'Closed' },
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading]     = useState(true)
  const [query, setQuery]         = useState('')
  const [selected, setSelected]   = useState(null)
  const [updating, setUpdating]   = useState(false)
  const [deleting, setDeleting]   = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/admin/enquiries?sort=-createdAt')
      setEnquiries(data.enquiries || [])
    } catch { toast.error('Could not load enquiries') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id, status) {
    setUpdating(true)
    try {
      await axios.patch(`/api/admin/enquiries/${id}`, { status })
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status } : e))
      if (selected?._id === id) setSelected(p => ({ ...p, status }))
      toast.success('Status updated')
    } catch { toast.error('Failed to update') }
    finally { setUpdating(false) }
  }

  async function deleteEnquiry(id) {
    setDeleting(id)
    try {
      await axios.delete(`/api/admin/enquiries/${id}`)
      setEnquiries(prev => prev.filter(e => e._id !== id))
      if (selected?._id === id) setSelected(null)
      toast.success('Deleted')
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(null) }
  }

  const filtered = enquiries.filter(e => {
    const matchStatus = filterStatus === 'all' || e.status === filterStatus
    const matchQuery  = !query ||
      e.name?.toLowerCase().includes(query.toLowerCase()) ||
      e.phone?.includes(query) ||
      e.productInterest?.toLowerCase().includes(query.toLowerCase())
    return matchStatus && matchQuery
  })

  return (
    <>
      <Helmet><title>Enquiries — MAXBE Admin</title></Helmet>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-gray-900">Enquiries</h1>
          <p className="text-gray-400 text-sm mt-0.5">{enquiries.length} total — {enquiries.filter(e => e.status === 'new').length} new</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search name, phone, product…"
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none"
            onFocus={e => e.target.style.borderColor = '#dc2626'}
            onBlur={e => e.target.style.borderColor = '#e5e7eb'}
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...STATUS_OPTIONS].map(s => {
            const style = s !== 'all' ? STATUS_STYLES[s] : { bg: '#1a1a1a', color: '#fff', label: 'All' }
            const isActive = filterStatus === s
            return (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
                style={{
                  background: isActive ? style.bg : 'white',
                  color: isActive ? style.color : '#9ca3af',
                  borderColor: isActive ? style.bg : '#e5e7eb',
                }}>
                {style.label || (s.charAt(0).toUpperCase() + s.slice(1))}
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <MessageSquare size={32} className="mx-auto mb-3 opacity-20" />
              <p className="font-semibold text-gray-500">No enquiries found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(enq => {
                const s = STATUS_STYLES[enq.status] || STATUS_STYLES.new
                return (
                  <button key={enq._id} onClick={() => setSelected(enq)}
                    className={`w-full flex items-center gap-4 px-5 py-4 transition-colors text-left ${
                      selected?._id === enq._id ? 'bg-red-50' : 'hover:bg-gray-50'
                    }`}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
                      style={{ background: '#dc2626' }}>
                      {enq.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{enq.name}</p>
                      <p className="text-gray-400 text-xs truncate mt-0.5">
                        {enq.productInterest || 'General enquiry'}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    <span className="text-gray-300 text-xs shrink-0 hidden sm:block">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center text-gray-400">
                <MessageSquare size={36} className="mx-auto mb-3 opacity-20" />
                <p className="font-semibold text-gray-500 text-sm">Select an enquiry to view details</p>
              </motion.div>
            ) : (
              <motion.div key={selected._id}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-50 flex items-start justify-between"
                  style={{ background: 'linear-gradient(135deg, #fff5f5, #fff)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white"
                      style={{ background: '#dc2626' }}>
                      {selected.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selected.name}</p>
                      <p className="text-gray-400 text-xs">
                        {new Date(selected.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => deleteEnquiry(selected._id)} disabled={!!deleting}
                    className="p-2 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="Delete">
                    {deleting === selected._id
                      ? <Loader2 size={15} className="animate-spin" />
                      : <Trash2 size={15} />}
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Contact details */}
                  <div className="space-y-2">
                    <a href={`tel:${selected.phone}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors group">
                      <Phone size={15} style={{ color: '#dc2626' }} className="shrink-0" />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-red">{selected.phone}</span>
                    </a>
                    {selected.email && (
                      <a href={`mailto:${selected.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors group">
                        <Mail size={15} style={{ color: '#dc2626' }} className="shrink-0" />
                        <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-red truncate">{selected.email}</span>
                      </a>
                    )}
                    {selected.productInterest && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                        <Tag size={15} style={{ color: '#dc2626' }} className="shrink-0" />
                        <span className="text-sm font-semibold text-gray-700">{selected.productInterest}</span>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {selected.message && (
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-4">
                        {selected.message}
                      </p>
                    </div>
                  )}

                  {/* Status update */}
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Update Status</p>
                    <div className="grid grid-cols-2 gap-2">
                      {STATUS_OPTIONS.map(s => {
                        const style = STATUS_STYLES[s]
                        const isActive = selected.status === s
                        return (
                          <button key={s} disabled={updating} onClick={() => updateStatus(selected._id, s)}
                            className="px-3 py-2.5 rounded-xl text-xs font-bold transition-all border"
                            style={{
                              background: isActive ? style.bg : 'white',
                              color: isActive ? style.color : '#9ca3af',
                              borderColor: isActive ? style.color + '40' : '#e5e7eb',
                              boxShadow: isActive ? `0 0 0 2px ${style.color}30` : 'none',
                            }}>
                            {style.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
