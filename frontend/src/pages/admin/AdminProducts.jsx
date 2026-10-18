import React, { useEffect, useState, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Search, X, Loader2, Image as ImageIcon, Package } from 'lucide-react'
import { CATEGORIES } from '../../data/products'

const EMPTY = {
  name: '', model: '', category: 'monoblock', shortDesc: '', description: '',
  images: [], specs: '{}', features: '', applications: '', brochure: '',
}

function Field({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
        {label}{required && <span style={{ color: '#dc2626' }}> *</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function inputStyle(err) {
  return {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: `1.5px solid ${err ? '#f87171' : '#e5e7eb'}`,
    fontSize: '14px', outline: 'none', color: '#111',
    transition: 'border-color 0.15s',
  }
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [query, setQuery]       = useState('')
  const [modal, setModal]       = useState(null)
  const [current, setCurrent]   = useState(null)
  const [form, setForm]         = useState(EMPTY)
  const [saving, setSaving]     = useState(false)
  const [errors, setErrors]     = useState({})
  const [catFilter, setCatFilter] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/admin/products')
      setProducts(data.products || [])
    } catch { toast.error('Could not load products') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  function openAdd() { setForm(EMPTY); setCurrent(null); setErrors({}); setModal('add') }
  function openEdit(p) {
    setForm({
      name: p.name || '', model: p.model || '', category: p.category || 'monoblock',
      shortDesc: p.shortDesc || '', description: p.description || '',
      images: p.images || [],
      specs: JSON.stringify(p.specs || {}, null, 2),
      features: (p.features || []).join('\n'),
      applications: (p.applications || []).join('\n'),
      brochure: p.brochure || '',
    })
    setCurrent(p); setErrors({}); setModal('edit')
  }
  function openDelete(p) { setCurrent(p); setModal('delete') }

  function validate() {
    const e = {}
    if (!form.name.trim())  e.name  = 'Required'
    if (!form.model.trim()) e.model = 'Required'
    try { JSON.parse(form.specs) } catch { e.specs = 'Must be valid JSON' }
    return e
  }

  async function handleSave(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        specs: JSON.parse(form.specs),
        features: form.features.split('\n').map(s => s.trim()).filter(Boolean),
        applications: form.applications.split('\n').map(s => s.trim()).filter(Boolean),
      }
      if (modal === 'add') {
        await axios.post('/api/admin/products', payload)
        toast.success('Product added')
      } else {
        await axios.put(`/api/admin/products/${current._id}`, payload)
        toast.success('Product updated')
      }
      setModal(null); load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    setSaving(true)
    try {
      await axios.delete(`/api/admin/products/${current._id}`)
      toast.success('Product deleted')
      setModal(null); load()
    } catch { toast.error('Delete failed') }
    finally { setSaving(false) }
  }

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'all' || p.category === catFilter
    const matchQ   = !query ||
      p.name?.toLowerCase().includes(query.toLowerCase()) ||
      p.model?.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  const inputFocus = e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)' }
  const inputBlur  = e => { e.target.style.borderColor = e.target.dataset.err ? '#f87171' : '#e5e7eb'; e.target.style.boxShadow = 'none' }

  return (
    <>
      <Helmet><title>Products — MAXBE Admin</title></Helmet>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-black text-2xl text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} products in catalogue</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-opacity hover:opacity-90 shadow-md"
          style={{ background: '#dc2626', boxShadow: '0 4px 14px rgba(220,38,38,0.3)' }}>
          <Plus size={17} /> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products…"
            className="pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 outline-none w-full"
            onFocus={inputFocus} onBlur={inputBlur}
          />
          {query && <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14} /></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...CATEGORIES.map(c => c.id)].map(cat => {
            const label = cat === 'all' ? 'All' : CATEGORIES.find(c => c.id === cat)?.label
            return (
              <button key={cat} onClick={() => setCatFilter(cat)}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all border"
                style={{
                  background: catFilter === cat ? '#dc2626' : 'white',
                  color: catFilter === cat ? 'white' : '#9ca3af',
                  borderColor: catFilter === cat ? '#dc2626' : '#e5e7eb',
                }}>
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="aspect-video bg-gray-100 rounded-xl mb-4" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          <Package size={36} className="mx-auto mb-3 opacity-20" />
          <p className="font-semibold text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => {
            const cat = CATEGORIES.find(c => c.id === p.category)
            return (
              <motion.div key={p._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
              >
                {/* Image */}
                <div className="aspect-video bg-gray-50 relative overflow-hidden">
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-3"
                        onError={e => e.currentTarget.style.display = 'none'} />
                    : <div className="flex items-center justify-center h-full">
                        <ImageIcon size={28} className="text-gray-200" />
                      </div>
                  }
                  {/* Category badge */}
                  <span className="absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: '#fee2e2', color: '#dc2626' }}>
                    {cat?.label}
                  </span>
                  {/* Actions overlay */}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(p)}
                      className="w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                      aria-label="Edit">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => openDelete(p)}
                      className="w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors"
                      aria-label="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-wider mb-1" style={{ color: '#dc2626' }}>
                    {p.model}
                  </p>
                  <p className="font-display font-bold text-gray-900 text-sm leading-snug">{p.name}</p>
                  {p.shortDesc && <p className="text-gray-400 text-xs mt-1.5 line-clamp-2">{p.shortDesc}</p>}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(modal === 'add' || modal === 'edit') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8"
              role="dialog" aria-modal="true">
              {/* Modal header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#fee2e2' }}>
                    <Package size={17} style={{ color: '#dc2626' }} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-gray-900">
                    {modal === 'add' ? 'Add Product' : 'Edit Product'}
                  </h2>
                </div>
                <button onClick={() => setModal(null)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSave} className="px-7 py-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Product Name" required error={errors.name}>
                    <input value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))}
                      style={inputStyle(errors.name)} placeholder="MAXBE Monoblock Pump"
                      onFocus={inputFocus} onBlur={inputBlur} />
                  </Field>
                  <Field label="Model" required error={errors.model}>
                    <input value={form.model} onChange={e => setForm(p => ({...p, model: e.target.value}))}
                      style={inputStyle(errors.model)} placeholder="MB-1HP"
                      onFocus={inputFocus} onBlur={inputBlur} />
                  </Field>
                </div>

                <Field label="Category">
                  <select value={form.category} onChange={e => setForm(p => ({...p, category: e.target.value}))}
                    style={inputStyle()} onFocus={inputFocus} onBlur={inputBlur}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </Field>

                <Field label="Short Description">
                  <input value={form.shortDesc} onChange={e => setForm(p => ({...p, shortDesc: e.target.value}))}
                    style={inputStyle()} placeholder="One-line summary for product card"
                    onFocus={inputFocus} onBlur={inputBlur} />
                </Field>

                <Field label="Full Description">
                  <textarea value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))}
                    style={{...inputStyle(), resize: 'none'}} rows={3}
                    onFocus={inputFocus} onBlur={inputBlur} />
                </Field>

                <Field label="Image Paths (one per line)">
                  <textarea
                    value={form.images.join('\n')}
                    onChange={e => setForm(p => ({...p, images: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)}))}
                    style={{...inputStyle(), resize: 'none', fontFamily: 'monospace', fontSize: '12px'}}
                    rows={3} placeholder={'/images/products/canvas.png\n/images/products/mb-1hp-1.jpg'}
                    onFocus={inputFocus} onBlur={inputBlur} />
                  <p className="text-gray-400 text-xs mt-1">Relative to /public — one path per line</p>
                </Field>

                <Field label="Technical Specs (JSON)" error={errors.specs}>
                  <textarea value={form.specs} onChange={e => setForm(p => ({...p, specs: e.target.value}))}
                    style={{...inputStyle(errors.specs), resize: 'none', fontFamily: 'monospace', fontSize: '12px'}}
                    rows={5} placeholder={'{\n  "Motor Power": "1 HP",\n  "Voltage": "220V"\n}'}
                    onFocus={inputFocus} onBlur={inputBlur} />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Features (one per line)">
                    <textarea value={form.features} onChange={e => setForm(p => ({...p, features: e.target.value}))}
                      style={{...inputStyle(), resize: 'none'}} rows={3}
                      placeholder={"Self-priming\nThermal protection"}
                      onFocus={inputFocus} onBlur={inputBlur} />
                  </Field>
                  <Field label="Applications (one per line)">
                    <textarea value={form.applications} onChange={e => setForm(p => ({...p, applications: e.target.value}))}
                      style={{...inputStyle(), resize: 'none'}} rows={3}
                      placeholder={"Domestic water\nAgriculture"}
                      onFocus={inputFocus} onBlur={inputBlur} />
                  </Field>
                </div>

                <div className="flex gap-3 pt-3 border-t border-gray-100">
                  <button type="button" onClick={() => setModal(null)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-opacity"
                    style={{ background: '#dc2626', opacity: saving ? 0.7 : 1 }}>
                    {saving ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : 'Save Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Modal */}
      <AnimatePresence>
        {modal === 'delete' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center"
              role="dialog" aria-modal="true">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: '#fee2e2' }}>
                <Trash2 size={28} style={{ color: '#dc2626' }} />
              </div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-2">Delete Product?</h2>
              <p className="text-gray-500 text-sm mb-7">
                <strong>{current?.name} ({current?.model})</strong> will be permanently deleted.
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setModal(null)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleDelete} disabled={saving}
                  className="flex-1 py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                  style={{ background: '#dc2626', opacity: saving ? 0.7 : 1 }}>
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
