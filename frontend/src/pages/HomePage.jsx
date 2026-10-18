import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, CheckCircle2, Zap, Shield, Award, Wrench,
  Droplets, Factory, Home, ChevronRight, Phone, Mail, Globe,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/ui/ProductCard'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { SITE_CONFIG, getWhatsAppUrl } from '../data/siteConfig'

gsap.registerPlugin(ScrollTrigger)

const FEATURED = [
  PRODUCTS.find(p => p.category === 'monoblock'),
  PRODUCTS.find(p => p.category === 'openwell'),
  PRODUCTS.find(p => p.category === 'v4-submersible'),
].filter(Boolean)

const BENEFITS = [
  { icon: <Zap    className="w-6 h-6" />, title: 'Low Voltage Operation', desc: 'Engineered to run efficiently even at low voltages — perfect for rural and semi-urban power conditions.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Built to Last',         desc: 'Premium cast iron and stainless steel construction withstands years of continuous operation.' },
  { icon: <Award  className="w-6 h-6" />, title: 'Trusted Quality',       desc: 'Each pump is tested before dispatch to meet strict performance standards.' },
  { icon: <Wrench className="w-6 h-6" />, title: 'Minimal Maintenance',   desc: 'Delivers consistent flow with minimal maintenance — saving time and running costs.' },
]

const APPLICATIONS = [
  { icon: <Droplets className="w-8 h-8" />, title: 'Agriculture', desc: 'Efficient water delivery for crop irrigation, canal lifting and drip systems across farm sizes.', image: '/images/app-agriculture.jpg' },
  { icon: <Home     className="w-8 h-8" />, title: 'Residential', desc: 'Reliable domestic water supply for individual homes, apartments and housing societies.',          image: '/images/app-residential.jpg' },
  { icon: <Factory  className="w-8 h-8" />, title: 'Industrial',  desc: 'Process water, cooling systems, boiler feed and general fluid transfer for light industry.',        image: '/images/app-industrial.jpg' },
]

const STATS = [
  { value: '500+', label: 'Products Sold' },
  { value: '3',    label: 'Product Categories' },
  { value: '100%', label: 'Tested Before Dispatch' },
  { value: '24/7', label: 'WhatsApp Support' },
]

/* WhatsApp SVG reused in multiple places */
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2 22l4.985-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"/>
  </svg>
)

export default function HomePage() {
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
        y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      <Helmet>
        <title>MAXBE PUMPS — Low Voltage King | Reliable Water Pumps</title>
        <meta name="description" content={SITE_CONFIG.description} />
        <meta property="og:title"       content="MAXBE PUMPS — Low Voltage King" />
        <meta property="og:description" content={SITE_CONFIG.description} />
        <meta property="og:image"       content={SITE_CONFIG.ogImage} />
        <meta property="og:type"        content="website" />
        <link rel="canonical" href={SITE_CONFIG.siteUrl} />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Canvas-inspired layout matching the brand poster style
          Warm cream/beige background · Logo top · Product photo centre
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden pt-16 md:pt-20"
        style={{ background: 'linear-gradient(160deg, #f5f0eb 0%, #ede8e0 40%, #e8e2d8 100%)' }}
        aria-label="Hero section"
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
          aria-hidden="true"
        />

        {/* Light shadow on left edge */}
        <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" aria-hidden="true" />

        <div className="container-custom relative z-10 flex flex-col flex-1 py-10">

          {/* ── Top: Logo + tagline (mirrors canvas layout) ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center text-center mb-8 md:mb-10"
          >
            {/* Real logo image */}
            <img
              src={SITE_CONFIG.logo}
              alt={SITE_CONFIG.logoAlt}
              className="h-24 md:h-32 w-auto object-contain mb-3 drop-shadow-sm"
            />
            {/* "LOW VOLTAGE KING" tagline in black, bold — exactly as on canvas */}
            <p className="font-display font-black text-xl md:text-3xl text-gray-900 tracking-wide uppercase">
              Low Voltage King
            </p>
          </motion.div>

          {/* ── Middle: Product desc + image side by side (canvas style) ── */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 flex-1">

            {/* Left: product pitch */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="lg:w-2/5 text-left"
            >
              {/* Italic "Premium" script label */}
              <p
                className="text-gray-500 text-lg mb-1 font-medium"
                style={{ fontStyle: 'italic' }}
              >
                Premium
              </p>

              {/* Divider + headline block matching canvas */}
              <div className="flex items-stretch gap-5 mb-6">
                <div className="w-0.5 bg-gray-400 rounded-full self-stretch" />
                <div>
                  <h1 className="font-display font-black text-3xl md:text-4xl text-gray-900 leading-tight uppercase">
                    Monoblock &amp;<br />Submersible<br />Pumps
                  </h1>
                </div>
              </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-sm">
                Delivers consistent flow with minimal maintenance — engineered for agriculture, homes and industry.
              </p>

              {/* Trust checks */}
              <div className="flex flex-col gap-2 mb-8">
                {['Low voltage operation', 'Quality tested before dispatch', 'Wide service network'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle2 size={16} style={{ color: '#dc2626' }} />
                    {t}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-primary gap-2">
                  Explore Products <ArrowRight size={17} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp gap-2"
                >
                  <WaIcon /> WhatsApp Enquiry
                </a>
              </div>
            </motion.div>

            {/* Right: hero pump image (canvas centrepiece) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
              className="lg:w-3/5 flex justify-center"
            >
              <div className="relative w-full max-w-lg">
                {/* Drop shadow beneath video */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Looping product video — no background, inline in hero right column */}
                <video
                  src="/images/gemini_generated_video_ff1ca2fe.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative z-10 w-full h-auto object-contain rounded-2xl"
                  style={{ filter: 'drop-shadow(0 24px 40px rgba(0,0,0,0.15))' }}
                  aria-label="MAXBE PUMPS product showcase video"
                />
              </div>
            </motion.div>
          </div>

          {/* ── Bottom: contact bar — matches canvas footer strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 pt-6 border-t border-gray-300/60 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm text-gray-500"
          >
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-brand-red transition-colors">
              <Mail size={14} style={{ color: '#dc2626' }} />
              {SITE_CONFIG.email}
            </a>
            <span className="hidden md:block text-gray-300">|</span>
            <a href={`https://${SITE_CONFIG.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-red transition-colors">
              <Globe size={14} style={{ color: '#dc2626' }} />
              {SITE_CONFIG.website}
            </a>
            <span className="hidden md:block text-gray-300">|</span>
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-brand-red transition-colors font-semibold">
              <Phone size={14} style={{ color: '#dc2626' }} />
              {SITE_CONFIG.phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS — red band ─────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-12" style={{ background: '#dc2626' }} aria-label="Company statistics">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="stat-item text-center">
                <p className="font-display font-extrabold text-3xl md:text-4xl text-white mb-1">{stat.value}</p>
                <p className="text-red-100 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Product categories">
        <div className="container-custom">
          <SectionHeading
            label="What We Supply"
            title="Our Product Categories"
            subtitle="Three specialised pump ranges engineered for every water challenge — from domestic wells to deep borewells and agricultural fields."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/products?category=${cat.id}`}
                  className="group block bg-white hover:bg-red-50 border-2 border-gray-100 hover:border-brand-red rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-red-50 group-hover:bg-brand-red flex items-center justify-center text-2xl mb-5 transition-all duration-300">
                    {cat.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-brand-red mb-3 transition-colors">
                    {cat.label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {cat.id === 'monoblock'     && 'Surface-mounted pumps for domestic water supply, garden irrigation and light agriculture.'}
                    {cat.id === 'openwell'       && 'Waterproof submersible pumps for open wells, sumps and rainwater harvesting pits.'}
                    {cat.id === 'v4-submersible' && 'High-head 4-inch borewell pumps for deep installations in agriculture and buildings.'}
                  </p>
                  <span className="flex items-center gap-2 text-brand-red text-sm font-semibold">
                    Browse Range <ChevronRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50" aria-label="Featured products">
        <div className="container-custom">
          <SectionHeading
            label="Popular Models"
            title="Featured Products"
            subtitle="A selection from each category — explore the full range on our products page."
          />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {FEATURED.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products" className="btn-primary px-8 py-3.5">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-label="Why choose MAXBE PUMPS">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="tag mb-3 !bg-red-50 !text-red-700 !border-red-100">Why MAXBE PUMPS?</span>
              <h2 className="section-heading mb-5">Engineering Quality You Can Count On</h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Every MAXBE pump is built with quality materials and tested under load before it leaves the warehouse — delivering reliable performance through years of daily operation.
              </p>
              <div className="space-y-5">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center shrink-0" style={{ color: '#dc2626' }}>
                      {b.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{b.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Canvas-style card: beige background like the poster */}
              <div
                className="rounded-3xl overflow-hidden aspect-square flex flex-col justify-end relative"
                style={{ background: 'linear-gradient(160deg, #f5f0eb 0%, #e8e2d8 100%)' }}
              >
                <img
                  src="/images/about-factory.jpg"
                  alt="MAXBE PUMPS facility"
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  onError={e => { e.currentTarget.remove() }}
                />
                {/* Red accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-brand-red" />
                <div className="relative z-10 p-10">
                  {/* Logo on card */}
                  <img
                    src={SITE_CONFIG.logo}
                    alt="MAXBE PUMPS"
                    className="h-14 w-auto object-contain mb-4"
                  />
                  <p className="font-display font-black text-xl text-gray-900 mb-1 uppercase">Low Voltage King</p>
                  <p className="text-gray-600 text-sm mb-6">Quality tested. Performance proven.</p>
                  <Link to="/about" className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-lg transition-colors text-white" style={{ background: '#dc2626' }}>
                    Learn About Us <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── APPLICATIONS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-900" aria-label="Applications">
        <div className="container-custom">
          <SectionHeading
            label="Where We're Used"
            title="Built for Every Application"
            subtitle="MAXBE pumps perform across diverse environments — from paddy fields to apartment blocks to small factories."
            light
          />
          <div className="grid md:grid-cols-3 gap-6">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/30 z-10" />
                <img
                  src={app.image}
                  alt={app.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.currentTarget.style.opacity = '0' }}
                />
                {/* Red top accent on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 z-20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: '#dc2626' }}
                />
                <div className="relative z-20 p-6 flex flex-col h-full justify-end">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)' }}
                  >
                    {app.icon}
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">{app.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{app.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MAP STRIP — shows real location before footer CTA ───────────── */}
      <section className="bg-white py-0" aria-label="Factory location map">
        <div className="container-custom py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-red-50 border border-red-100" style={{ color: '#dc2626' }}>Find Us</span>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">Our Factory, Coimbatore</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                264/5, Kurukkampalayam Road, Ganeshapuram,<br />
                MGC Palayam Post, Coimbatore – 641107
              </p>
              <div className="flex flex-col gap-2 text-sm mb-6">
                {[
                  { label: SITE_CONFIG.phone,         href: `tel:${SITE_CONFIG.phone}` },
                  { label: SITE_CONFIG.phoneMobile2,  href: `tel:${SITE_CONFIG.phoneMobile2}` },
                  { label: SITE_CONFIG.phoneLandline,  href: `tel:${SITE_CONFIG.phoneLandline}` },
                  { label: SITE_CONFIG.email,         href: `mailto:${SITE_CONFIG.email}` },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="flex items-center gap-2 text-gray-600 hover:text-brand-red transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#dc2626' }} />
                    {label}
                  </a>
                ))}
              </div>
              <a
                href={SITE_CONFIG.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-lg text-white transition-opacity hover:opacity-90"
                style={{ background: '#dc2626' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Get Directions
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100" style={{ height: '320px' }}>
              <iframe
                src={SITE_CONFIG.googleMapsEmbed}
                width="100%"
                height="320"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MAXBE INDUSTRIES — Coimbatore"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA — red band matching brand colour ─────────────────────────── */}
      <section className="py-20" style={{ background: '#dc2626' }} aria-label="Contact CTA">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo on CTA */}
              <img
                src={SITE_CONFIG.logo}
                alt="MAXBE PUMPS"
                className="h-16 w-auto object-contain mx-auto mb-6 brightness-0 invert"
              />
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
                Need a pump? Let's find the right one for you.
              </h2>
              <p className="text-red-100 text-lg mb-8 leading-relaxed">
                Tell us your application and we'll recommend the ideal MAXBE pump model. Fast response guaranteed.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white font-bold px-7 py-3.5 rounded-lg hover:bg-red-50 transition-colors shadow-lg text-base"
                  style={{ color: '#dc2626' }}
                >
                  Send an Enquiry <ArrowRight size={18} />
                </Link>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base px-7 py-3.5"
                >
                  <WaIcon /> Chat on WhatsApp
                </a>
              </div>
              {/* Contact info strip */}
              <div className="flex flex-wrap justify-center gap-6 text-red-100 text-sm">
                <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail size={14} /> {SITE_CONFIG.email}
                </a>
                <a href={`https://${SITE_CONFIG.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Globe size={14} /> {SITE_CONFIG.website}
                </a>
                <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors font-semibold">
                  <Phone size={14} /> {SITE_CONFIG.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
