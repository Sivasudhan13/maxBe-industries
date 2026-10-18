import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { toast } from 'react-hot-toast'
import { Lock, User, Loader2, Eye, EyeOff, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { SITE_CONFIG } from '../../data/siteConfig'

export default function AdminLoginPage() {
  const { login }                       = useAuth()
  const navigate                        = useNavigate()
  const [form, setForm]                 = useState({ username: '', password: '' })
  const [loading, setLoading]           = useState(false)
  const [showPw, setShowPw]             = useState(false)
  const [error, setError]               = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.username || !form.password) { setError('Please enter both username and password.'); return }
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Admin Login — MAXBE PUMPS</title></Helmet>

      <div className="min-h-screen flex" style={{ background: '#f8f9fa' }}>

        {/* ── Left panel — brand ── */}
        <div
          className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center p-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg, #1a1a1a 0%, #2d0000 50%, #dc2626 100%)' }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-5"
            style={{ background: 'radial-gradient(circle, #fff, transparent)' }} />

          <div className="relative z-10 text-center">
            <img
              src={SITE_CONFIG.logo}
              alt="MAXBE PUMPS"
              className="h-24 w-auto object-contain mx-auto mb-8 brightness-0 invert"
            />
            <h1 className="font-display font-black text-4xl text-white mb-3">Admin Portal</h1>
            <p className="text-red-200 text-lg mb-10">Manage products, enquiries &amp; settings</p>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              {[
                { label: 'Products',  icon: '📦' },
                { label: 'Enquiries', icon: '💬' },
                { label: 'Settings',  icon: '⚙️' },
                { label: 'Analytics', icon: '📊' },
              ].map(item => (
                <div key={item.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="lg:hidden text-center mb-8">
              <img src={SITE_CONFIG.logo} alt="MAXBE PUMPS" className="h-14 w-auto object-contain mx-auto mb-3" />
            </div>

            {/* Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: '#fee2e2' }}>
                  <Shield size={22} style={{ color: '#dc2626' }} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl text-gray-900">Sign In</h2>
                  <p className="text-gray-400 text-sm">MAXBE Admin Portal</p>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div role="alert"
                  className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-6">
                  <span className="text-base">⚠️</span> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Username */}
                <div className="mb-5">
                  <label htmlFor="adm-user" className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="adm-user" type="text" autoComplete="username"
                      value={form.username}
                      onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                      placeholder="Enter username"
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm
                                 placeholder-gray-400 outline-none transition-all"
                      style={{ '--tw-ring-color': '#dc2626' }}
                      onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)' }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="mb-8">
                  <label htmlFor="adm-pass" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="adm-pass" type={showPw ? 'text' : 'password'} autoComplete="current-password"
                      value={form.password}
                      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-gray-200 text-gray-900 text-sm
                                 placeholder-gray-400 outline-none transition-all"
                      onFocus={e => { e.target.style.borderColor = '#dc2626'; e.target.style.boxShadow = '0 0 0 3px rgba(220,38,38,0.1)' }}
                      onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none' }}
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPw ? 'Hide password' : 'Show password'}>
                      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
                  style={{ background: loading ? '#f87171' : '#dc2626' }}
                  onMouseOver={e => { if (!loading) e.currentTarget.style.background = '#b91c1c' }}
                  onMouseOut={e => { if (!loading) e.currentTarget.style.background = '#dc2626' }}
                >
                  {loading
                    ? <><Loader2 size={17} className="animate-spin" /> Signing in…</>
                    : 'Sign In to Dashboard'
                  }
                </button>
              </form>

              <p className="text-center text-gray-400 text-xs mt-6">
                MAXBE INDUSTRIES — Authorised Access Only
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
