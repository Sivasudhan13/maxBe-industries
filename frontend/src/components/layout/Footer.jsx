import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Clock, ExternalLink, Globe, Building2 } from 'lucide-react'
import { SITE_CONFIG, getWhatsAppUrl } from '../../data/siteConfig'

const WA_SVG = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2 22l4.985-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"/>
  </svg>
)

const PRODUCT_LINKS = [
  { to: '/products?category=monoblock',      label: 'Monoblock Pumps' },
  { to: '/products?category=openwell',       label: 'Open Well Submersible' },
  { to: '/products?category=v4-submersible', label: 'V4 Submersible Pumps' },
]

const COMPANY_LINKS = [
  { to: '/about',       label: 'About Us' },
  { to: '/contact',     label: 'Contact' },
  { to: '/contact',     label: 'Get a Quote' },
  { to: '/sitemap.xml', label: 'Sitemap', external: true },
]

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700" role="contentinfo">

      {/* ── Top red accent stripe ─────────────────────────────────────────── */}
      <div style={{ background: '#dc2626' }}>
        <div className="container-custom py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-white text-xs font-medium">
            <span className="font-bold text-sm">{SITE_CONFIG.brandName} — {SITE_CONFIG.tagline}</span>
            <span className="hidden sm:inline opacity-50">|</span>
            <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-red-200 transition-colors flex items-center gap-1">
              <Phone size={12} /> {SITE_CONFIG.phone}
            </a>
            <span className="hidden sm:inline opacity-50">|</span>
            <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-red-200 transition-colors hidden md:flex items-center gap-1">
              <Mail size={12} /> {SITE_CONFIG.email}
            </a>
          </div>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white font-bold text-xs px-4 py-2 rounded-full shadow hover:bg-red-50 transition-colors whitespace-nowrap shrink-0"
            style={{ color: '#dc2626' }}
          >
            <WA_SVG /> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main footer body ──────────────────────────────────────────────── */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4" aria-label="MAXBE PUMPS">
              <img
                src={SITE_CONFIG.logo}
                alt={SITE_CONFIG.logoAlt}
                className="h-16 w-auto object-contain"
              />
            </Link>

            {/* Company legal name + est. year */}
            <div className="flex items-start gap-2 mb-3">
              <Building2 size={14} className="shrink-0 mt-0.5 text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-700">{SITE_CONFIG.companyName}</p>
                <p className="text-xs text-gray-400">Est. {SITE_CONFIG.established}, Coimbatore</p>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Premium water pumps engineered for agriculture, residential and industrial applications. Quality you can trust since {SITE_CONFIG.established}.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg border border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href={SITE_CONFIG.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-lg border border-gray-200 text-gray-400 hover:border-blue-500 hover:text-blue-600 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg border border-gray-200 text-gray-400 hover:border-green-500 hover:text-green-500 flex items-center justify-center transition-colors">
                <WA_SVG />
              </a>
            </div>
          </div>

          {/* ── Products ── */}
          <div>
            <h3 className="font-display font-bold text-xs text-gray-900 uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: '#dc2626' }} />
              Our Products
            </h3>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="text-gray-500 hover:text-brand-red text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-brand-red transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="font-display font-bold text-xs text-gray-900 uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: '#dc2626' }} />
              Company
            </h3>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ to, label, external }) => (
                <li key={label}>
                  {external ? (
                    <a href={to} className="text-gray-500 hover:text-brand-red text-sm transition-colors inline-flex items-center gap-1">
                      {label} <ExternalLink size={11} />
                    </a>
                  ) : (
                    <Link to={to} className="text-gray-500 hover:text-brand-red text-sm transition-colors flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-brand-red transition-colors shrink-0" />
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact — all real details ── */}
          <div>
            <h3 className="font-display font-bold text-xs text-gray-900 uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ background: '#dc2626' }} />
              Contact Us
            </h3>
            <ul className="space-y-3">

              {/* Primary mobile */}
              <li>
                <a href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors group">
                  <Phone size={14} style={{ color: '#dc2626' }} className="shrink-0" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </li>

              {/* Second mobile */}
              <li>
                <a href={`tel:${SITE_CONFIG.phoneMobile2}`}
                  className="flex items-center gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors group">
                  <Phone size={14} className="shrink-0 text-gray-300" />
                  <span>{SITE_CONFIG.phoneMobile2}</span>
                </a>
              </li>

              {/* Landline */}
              <li>
                <a href={`tel:${SITE_CONFIG.phoneLandline}`}
                  className="flex items-center gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors group">
                  <Phone size={14} className="shrink-0 text-gray-300" />
                  <span>{SITE_CONFIG.phoneLandline} <span className="text-xs text-gray-400">(Factory)</span></span>
                </a>
              </li>

              {/* Primary email */}
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-start gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors">
                  <Mail size={14} style={{ color: '#dc2626' }} className="shrink-0 mt-0.5" />
                  <span className="break-all">{SITE_CONFIG.email}</span>
                </a>
              </li>

              {/* Alt email */}
              <li>
                <a href={`mailto:${SITE_CONFIG.emailAlt}`}
                  className="flex items-start gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors">
                  <Mail size={14} className="shrink-0 mt-0.5 text-gray-300" />
                  <span className="break-all">{SITE_CONFIG.emailAlt}</span>
                </a>
              </li>

              {/* Address */}
              <li>
                <a
                  href={SITE_CONFIG.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-gray-500 hover:text-brand-red text-sm transition-colors"
                >
                  <MapPin size={14} style={{ color: '#dc2626' }} className="shrink-0 mt-0.5" />
                  <span>
                    {SITE_CONFIG.addressLine1},<br />
                    {SITE_CONFIG.addressLine2}
                  </span>
                </a>
              </li>

              {/* Hours */}
              <li>
                <div className="flex items-center gap-2.5 text-gray-500 text-sm">
                  <Clock size={14} className="shrink-0 text-gray-400" />
                  <span>{SITE_CONFIG.businessHours}</span>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <span className="font-bold" style={{ color: '#dc2626' }}>MAXBE INDUSTRIES</span>
            {' '}— All rights reserved.
            {' '}Est. {SITE_CONFIG.established}, Coimbatore.
          </p>
          <div className="flex items-center gap-5">
            <a href={`https://${SITE_CONFIG.website}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-brand-red transition-colors">
              <Globe size={11} /> {SITE_CONFIG.website}
            </a>
            <Link to="/privacy" className="hover:text-brand-red transition-colors">Privacy</Link>
            <Link to="/terms"   className="hover:text-brand-red transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}
