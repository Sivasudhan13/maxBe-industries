import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Save, Loader2, Lock, Shield, Eye, EyeOff, Info } from 'lucide-react'
import { SITE_CONFIG } from '../../data/siteConfig'

function inputStyle(err) {
  return {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: `1.5px solid ${err ? '#f87171' : '#e5e7eb'}`,
    fontSize: '14px', outline: 'none', color: '#111',
  }
}
const iFocus = e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.08)' }
const iBlur  = e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none' }

export default function AdminSettings() {
  const [pw, setPw]       = useState({ current: '', newPw: '', confirm: '' })
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState({})
  const [show, setShow]   = useState({ current: false, newPw: false, confirm: false })

  function validate() {
    const e = {}
    if (!pw.current)              e.current = 'Required'
    if (!pw.newPw || pw.newPw.length < 8) e.newPw = 'Minimum 8 characters'
    if (pw.newPw !== pw.confirm)  e.confirm = 'Passwords do not match'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSaving(true)
    try {
      await axios.post('/api/admin/change-password', {
        currentPassword: pw.current,
        newPassword:     pw.newPw,
      })
      toast.success('Password changed successfully!')
      setPw({ current: '', newPw: '', confirm: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password')
    } finally { setSaving(false) }
  }

  const PW_FIELDS = [
    { key: 'current', label: 'Current Password', ac: 'current-password' },
    { key: 'newPw',   label: 'New Password',     ac: 'new-password' },
    { key: 'confirm', label: 'Confirm Password', ac: 'new-password' },
  ]

  return (
    <>
      <Helmet><title>Settings — MAXBE Admin</title></Helmet>

      <div className="mb-8">
        <h1 className="font-display font-black text-2xl text-gray-900">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your admin account and configuration.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 max-w-4xl">

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fee2e2' }}>
              <Lock size={18} style={{ color: '#dc2626' }} />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-gray-900">Change Password</h2>
              <p className="text-gray-400 text-xs">Use a strong, unique password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-4">
            {PW_FIELDS.map(({ key, label, ac }) => (
              <div key={key}>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <input
                    type={show[key] ? 'text' : 'password'}
                    autoComplete={ac}
                    value={pw[key]}
                    onChange={e => setPw(p => ({ ...p, [key]: e.target.value }))}
                    style={{ ...inputStyle(errors[key]), paddingRight: '44px' }}
                    onFocus={iFocus} onBlur={iBlur}
                  />
                  <button type="button"
                    onClick={() => setShow(s => ({ ...s, [key]: !s[key] }))}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Toggle visibility">
                    {show[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
              </div>
            ))}

            <button type="submit" disabled={saving}
              className="w-full py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 mt-2 transition-opacity"
              style={{ background: '#dc2626', opacity: saving ? 0.7 : 1 }}>
              {saving
                ? <><Loader2 size={16} className="animate-spin" /> Saving…</>
                : <><Save size={16} /> Update Password</>
              }
            </button>
          </form>
        </div>

        {/* Site info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fee2e2' }}>
                <Info size={18} style={{ color: '#dc2626' }} />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-gray-900">Site Configuration</h2>
                <p className="text-gray-400 text-xs">Contact details &amp; brand info</p>
              </div>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[
                { label: 'Company',    value: SITE_CONFIG.companyName },
                { label: 'Brand',      value: SITE_CONFIG.brandName },
                { label: 'Phone',      value: SITE_CONFIG.phone },
                { label: 'Email',      value: SITE_CONFIG.email },
                { label: 'Website',    value: SITE_CONFIG.website },
                { label: 'Est.',       value: SITE_CONFIG.established },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</span>
                  <span className="text-sm font-semibold text-gray-700">{value}</span>
                </div>
              ))}
            </div>
            <div className="px-6 pb-5">
              <div className="p-4 rounded-xl text-xs leading-relaxed" style={{ background: '#fff5f5', color: '#7f1d1d' }}>
                <strong>To update contact details:</strong> edit{' '}
                <code className="font-mono bg-red-100 px-1 rounded">frontend/src/data/siteConfig.js</code>
              </div>
            </div>
          </div>

          {/* Security info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#fee2e2' }}>
                <Shield size={18} style={{ color: '#dc2626' }} />
              </div>
              <h2 className="font-display font-bold text-base text-gray-900">Security</h2>
            </div>
            <ul className="space-y-2">
              {[
                'Sessions expire after 7 days',
                'JWT-secured API endpoints',
                'Bcrypt password hashing',
                'Rate limited login (10 attempts / 15 min)',
              ].map(tip => (
                <li key={tip} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#16a34a' }} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
