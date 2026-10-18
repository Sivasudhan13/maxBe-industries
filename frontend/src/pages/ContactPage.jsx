import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {
  Phone, Mail, MapPin, Clock, Instagram, Facebook,
  Send, Loader2, ExternalLink, Globe, Building2,
} from 'lucide-react'
import { SITE_CONFIG, getWhatsAppUrl } from '../data/siteConfig'
import { CATEGORIES } from '../data/products'

const WA_SVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2 22l4.985-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"/>
  </svg>
)

const INITIAL = { name: '', phone: '', email: '', productInterest: '', message: '' }

export default function ContactPage() {
  const [form, setForm]       = useState(INITIAL)
  const [errors, setErrors]   = useState({})
  const [sending, setSending] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.phone.trim())   e.phone   = 'Phone number is required'
    if (!form.message.trim()) e.message = 'Message is required'
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSending(true)
    try {
      await axios.post('/api/enquiries', { ...form, source: 'contact-page' })
      toast.success("Message sent! We'll get back to you shortly.")
      setForm(INITIAL)
    } catch {
      toast.error('Unable to send. Please call or WhatsApp us directly.')
    } finally {
      setSending(false)
    }
  }

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  return (
    <>
      <Helmet>
        <title>Contact MAXBE INDUSTRIES — MAXBE PUMPS Coimbatore</title>
        <meta name="description" content={`Contact MAXBE INDUSTRIES for MAXBE PUMPS enquiries. Call ${SITE_CONFIG.phone} | ${SITE_CONFIG.phoneMobile2} | ${SITE_CONFIG.phoneLandline}. Address: ${SITE_CONFIG.address}`} />
        <link rel="canonical" href={`${SITE_CONFIG.siteUrl}/contact`} />
      </Helmet>

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#dc2626_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle, #fee2e2, transparent)' }} />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <img
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.logoAlt}
              className="h-14 w-auto object-contain mx-auto mb-5"
            />
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-3">
              Contact Us
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto mb-1">
              Enquire about products, request a quote or visit our factory.
            </p>
            <p className="text-sm font-semibold" style={{ color: '#dc2626' }}>
              {SITE_CONFIG.companyName} — Est. {SITE_CONFIG.established}, Coimbatore
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Quick-contact strip ───────────────────────────────────────────── */}
      <div style={{ background: '#dc2626' }}>
        <div className="container-custom py-3 flex flex-wrap justify-center md:justify-between items-center gap-4 text-white text-sm">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 font-semibold hover:text-red-200 transition-colors">
            <Phone size={14} /> {SITE_CONFIG.phone}
          </a>
          <a href={`tel:${SITE_CONFIG.phoneMobile2}`} className="flex items-center gap-2 hover:text-red-200 transition-colors">
            <Phone size={14} /> {SITE_CONFIG.phoneMobile2}
          </a>
          <a href={`tel:${SITE_CONFIG.phoneLandline}`} className="flex items-center gap-2 hover:text-red-200 transition-colors">
            <Phone size={14} /> {SITE_CONFIG.phoneLandline}
            <span className="text-red-200 text-xs">(Factory)</span>
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="hidden md:flex items-center gap-2 hover:text-red-200 transition-colors">
            <Mail size={14} /> {SITE_CONFIG.email}
          </a>
        </div>
      </div>

      <section className="py-14 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Contact Info Panel ─────────────────────────────────────── */}
            <div className="lg:col-span-1 space-y-4">

              {/* Company card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 size={20} style={{ color: '#dc2626' }} />
                  <div>
                    <p className="font-display font-bold text-gray-900 text-sm">{SITE_CONFIG.companyName}</p>
                    <p className="text-gray-400 text-xs">Est. {SITE_CONFIG.established}</p>
                  </div>
                </div>

                <ul className="space-y-3 text-sm">
                  {/* Phone 1 */}
                  <li>
                    <a href={`tel:${SITE_CONFIG.phone}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fee2e2' }}>
                        <Phone size={14} style={{ color: '#dc2626' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Mobile</p>
                        <p className="font-semibold">{SITE_CONFIG.phone}</p>
                      </div>
                    </a>
                  </li>
                  {/* Phone 2 */}
                  <li>
                    <a href={`tel:${SITE_CONFIG.phoneMobile2}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                        <Phone size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Mobile 2</p>
                        <p className="font-semibold">{SITE_CONFIG.phoneMobile2}</p>
                      </div>
                    </a>
                  </li>
                  {/* Landline */}
                  <li>
                    <a href={`tel:${SITE_CONFIG.phoneLandline}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                        <Phone size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Factory Line</p>
                        <p className="font-semibold">{SITE_CONFIG.phoneLandline}</p>
                      </div>
                    </a>
                  </li>
                  {/* Email 1 */}
                  <li>
                    <a href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fee2e2' }}>
                        <Mail size={14} style={{ color: '#dc2626' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="font-semibold break-all">{SITE_CONFIG.email}</p>
                      </div>
                    </a>
                  </li>
                  {/* Email 2 */}
                  <li>
                    <a href={`mailto:${SITE_CONFIG.emailAlt}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                        <Mail size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email 2</p>
                        <p className="font-semibold break-all">{SITE_CONFIG.emailAlt}</p>
                      </div>
                    </a>
                  </li>
                  {/* Address */}
                  <li>
                    <a href={SITE_CONFIG.googleMapsLink} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 text-gray-600 hover:text-brand-red transition-colors group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#fee2e2' }}>
                        <MapPin size={14} style={{ color: '#dc2626' }} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Factory Address</p>
                        <p className="font-medium leading-snug">
                          {SITE_CONFIG.addressLine1},<br />
                          {SITE_CONFIG.addressLine2}
                        </p>
                      </div>
                    </a>
                  </li>
                  {/* Hours */}
                  <li>
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-100">
                        <Clock size={14} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Business Hours</p>
                        <p className="font-medium">{SITE_CONFIG.businessHours}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center py-3.5 rounded-2xl text-sm"
              >
                <WA_SVG /> Chat on WhatsApp
              </a>

              {/* Social */}
              <div className="flex gap-3">
                <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 text-gray-600 hover:border-red-400 hover:text-red-500 transition-all text-sm font-medium">
                  <Instagram size={16} /> Instagram
                </a>
                <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-all text-sm font-medium">
                  <Facebook size={16} /> Facebook
                </a>
              </div>
            </div>

            {/* ── Form + Map ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
              >
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-1">Send an Enquiry</h2>
                <p className="text-gray-400 text-sm mb-7">We usually respond within a few hours during business hours.</p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="ct-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        id="ct-name" name="name" type="text"
                        value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                      />
                      {errors.name && <p role="alert" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="ct-phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        id="ct-phone" name="phone" type="tel"
                        value={form.phone} onChange={handleChange}
                        placeholder="94883 53564"
                        className={`input-field ${errors.phone ? 'border-red-400' : ''}`}
                      />
                      {errors.phone && <p role="alert" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ct-email" className="block text-sm font-medium text-gray-700 mb-1.5">Email (optional)</label>
                    <input
                      id="ct-email" name="email" type="email"
                      value={form.email} onChange={handleChange}
                      placeholder="your@email.com"
                      className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                    />
                    {errors.email && <p role="alert" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="ct-product" className="block text-sm font-medium text-gray-700 mb-1.5">Product Interest</label>
                    <select id="ct-product" name="productInterest" value={form.productInterest} onChange={handleChange} className="select-field">
                      <option value="">— Select a category (optional) —</option>
                      {CATEGORIES.map(c => <option key={c.id} value={c.label}>{c.label}</option>)}
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="ct-msg" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <textarea
                      id="ct-msg" name="message" rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Describe your water requirement — source type, depth, flow needed, location, etc."
                      className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                    />
                    {errors.message && <p role="alert" className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3.5 text-base">
                    {sending
                      ? <><Loader2 size={18} className="animate-spin" /> Sending…</>
                      : <><Send size={18} /> Send Message</>
                    }
                  </button>
                </form>
              </motion.div>

              {/* ── Map + Street View ─────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm"
              >
                {/* Embedded Google Map — real location */}
                <div className="relative" style={{ height: '320px' }}>
                  <iframe
                    src={SITE_CONFIG.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MAXBE INDUSTRIES — Kurukkampalayam Road, Coimbatore"
                    className="absolute inset-0"
                  />
                </div>

                {/* Address bar below map */}
                <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#fee2e2' }}>
                      <MapPin size={16} style={{ color: '#dc2626' }} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-gray-900 text-sm">{SITE_CONFIG.companyName}</p>
                      <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {SITE_CONFIG.addressLine1},<br className="sm:hidden" /> {SITE_CONFIG.addressLine2}
                      </p>
                    </div>
                  </div>
                  <a
                    href={SITE_CONFIG.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 border-2 font-semibold text-sm px-4 py-2 rounded-lg transition-all"
                    style={{ borderColor: '#dc2626', color: '#dc2626' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = '#fff' }}
                    onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#dc2626' }}
                  >
                    <ExternalLink size={13} /> Get Directions
                  </a>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
