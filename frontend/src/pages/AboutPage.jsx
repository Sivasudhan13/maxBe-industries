import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Target, Eye, Award, CheckCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../data/siteConfig'
import SectionHeading from '../components/ui/SectionHeading'

const VALUES = [
  { icon: '⚙️', title: 'Precision Engineering', desc: 'Our pumps are manufactured to tight tolerances for consistent, reliable performance.' },
  { icon: '🌊', title: 'Water Expertise',        desc: 'Deep domain knowledge in water movement for agriculture, homes and industry.' },
  { icon: '🤝', title: 'Customer Focus',          desc: 'We listen to your application and recommend the right pump — no guesswork.' },
  { icon: '♻️', title: 'Efficiency First',        desc: 'Energy-efficient motors reduce running costs and environmental impact.' },
]

const PROCESS_STEPS = [
  { step: '01', title: 'Design & Selection', desc: 'Products are selected and specified for Indian water conditions and voltage standards.' },
  { step: '02', title: 'Quality Check',      desc: 'Each unit is inspected and load-tested before dispatch from our warehouse.' },
  { step: '03', title: 'Delivery',           desc: 'Fast, careful delivery to your location with full documentation.' },
  { step: '04', title: 'After-sales',        desc: 'Our team is reachable on WhatsApp and phone for any post-sale support.' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — MAXBE PUMPS</title>
        <meta name="description" content="Learn about MAXBE PUMPS — our mission, product quality process and commitment to reliable water pump solutions for India." />
        <link rel="canonical" href={`${SITE_CONFIG.siteUrl}/about`} />
      </Helmet>

      {/* Header */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#16a34a_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-green-100 blur-3xl opacity-60 pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-brand-green text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green" />Our Story
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-5">
              About <span className="text-brand-red">MAXBE</span> PUMPS
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              A dedicated team committed to supplying high-quality water pump solutions for agriculture, homes and industry across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="tag mb-4">Who We Are</span>
              <h2 className="section-heading mb-5">
                MAXBE INDUSTRIES — Coimbatore's Trusted Pump Manufacturer
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Established in {SITE_CONFIG.established} in Coimbatore, <strong>MAXBE INDUSTRIES</strong> manufactures and supplies the <strong>MAXBE PUMPS</strong> brand — renowned across Tamil Nadu and beyond as the <em>Low Voltage King</em>.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our factory at 264/5, Kurukkampalayam Road, Ganeshapuram, MGC Palayam Post, Coimbatore – 641107 produces a curated range of monoblock pumps, open well submersible pumps, and slim 4-inch V4 submersible pumps.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Every pump is engineered to perform reliably under the low-voltage conditions common in rural and semi-urban India — so your water keeps flowing even when power quality is poor.
              </p>
              <Link to="/products" className="btn-primary">
                Browse Our Products <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-br from-brand-blue to-blue-800 rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="/images/about-team.jpg"
                  alt="MAXBE PUMPS team"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                  onError={e => e.currentTarget.remove()}
                />
                <div className="relative z-10 p-10 flex flex-col h-full justify-end">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { v: '500+',  l: 'Products Sold' },
                      { v: '3',     l: 'Product Lines' },
                      { v: '100%',  l: 'Tested Units' },
                      { v: '24/7',  l: 'WA Support' },
                    ].map(s => (
                      <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <p className="font-display font-extrabold text-2xl text-white">{s.v}</p>
                        <p className="text-blue-200 text-xs">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon:  <Target className="w-8 h-8" />,
                title: 'Our Mission',
                text:  'To supply reliable, high-quality water pump solutions that meet the real-world needs of Indian farmers, homeowners and businesses — backed by honest product knowledge and responsive after-sales support.',
                color: 'bg-brand-green',
              },
              {
                icon:  <Eye className="w-8 h-8" />,
                title: 'Our Vision',
                text:  'To be the most trusted water pump supplier in our region, known for product quality, straightforward advice and a genuine commitment to keeping our customers\' water flowing reliably.',
                color: 'bg-brand-red',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`${item.color} rounded-3xl p-10 text-white`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-blue-100 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading label="Core Values" title="What We Stand For" subtitle="The principles that guide every product we supply and every customer interaction." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-7 hover:-translate-y-1 transition-transform duration-300"
              >
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="font-display font-bold text-lg text-brand-blue mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-20 bg-gray-900">
        <div className="container-custom">
          <SectionHeading label="Our Process" title="How We Ensure Quality" subtitle="From product selection to after-sales, quality is built into every step." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7"
              >
                <span className="font-display font-extrabold text-4xl text-brand-electric/40 mb-4 block">{step.step}</span>
                <h3 className="font-display font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading label="Our Facility" title="Where Your Pumps Come From" subtitle="Our clean, organised warehouse ensures every pump is stored, handled and dispatched in perfect condition." />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: '/images/facility-1.jpg', caption: 'Product warehouse' },
              { img: '/images/facility-2.jpg', caption: 'Quality inspection area' },
              { img: '/images/facility-3.jpg', caption: 'Dispatch and packaging' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden bg-gray-100 aspect-video relative"
              >
                <img
                  src={item.img}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.currentTarget.remove()
                    e.currentTarget?.parentElement && (e.currentTarget.parentElement.innerHTML += `<div class="flex items-center justify-center h-full text-gray-400 text-sm">${item.caption}</div>`)
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Find Our Factory — real Google Maps embed ── */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <SectionHeading
            label="Find Us"
            title="Our Factory in Coimbatore"
            subtitle="264/5, Kurukkampalayam Road, Ganeshapuram, MGC Palayam Post, Coimbatore – 641107"
          />
          <div className="grid lg:grid-cols-5 gap-8 items-stretch">

            {/* Map — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 rounded-3xl overflow-hidden shadow-lg border border-gray-100"
              style={{ minHeight: '380px' }}
            >
              <iframe
                src={SITE_CONFIG.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '380px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MAXBE INDUSTRIES factory location — Coimbatore"
              />
            </motion.div>

            {/* Info card — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col justify-between gap-6"
            >
              {/* Address card */}
              <div className="bg-gray-50 rounded-3xl p-7 flex-1">
                {/* Red top bar */}
                <div className="w-10 h-1 rounded-full mb-5" style={{ background: '#dc2626' }} />
                <p className="font-display font-bold text-xl text-gray-900 mb-1">{SITE_CONFIG.companyName}</p>
                <p className="text-sm font-semibold mb-4" style={{ color: '#dc2626' }}>Est. {SITE_CONFIG.established}</p>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#dc2626' }}>📍</span>
                    <span>{SITE_CONFIG.addressLine1},<br />{SITE_CONFIG.addressLine2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs" style={{ background: '#dc2626' }}>📞</span>
                    <div className="flex flex-col gap-0.5">
                      <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-brand-red transition-colors font-medium">{SITE_CONFIG.phone}</a>
                      <a href={`tel:${SITE_CONFIG.phoneMobile2}`} className="hover:text-brand-red transition-colors text-gray-500">{SITE_CONFIG.phoneMobile2}</a>
                      <a href={`tel:${SITE_CONFIG.phoneLandline}`} className="hover:text-brand-red transition-colors text-gray-500">{SITE_CONFIG.phoneLandline}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs" style={{ background: '#dc2626' }}>✉️</span>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-brand-red transition-colors break-all">{SITE_CONFIG.email}</a>
                  </div>
                </div>
              </div>

              {/* View on Maps button */}
              <a
                href={SITE_CONFIG.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: '#dc2626' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                View on Google Maps
              </a>

              {/* Street View link */}
              <a
                href={SITE_CONFIG.googleMapsStreetviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-semibold text-sm border-2 transition-all"
                style={{ borderColor: '#dc2626', color: '#dc2626' }}
                onMouseOver={e => { e.currentTarget.style.background = '#fee2e2' }}
                onMouseOut={e => { e.currentTarget.style.background = '' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                See Street View Photo
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-green">
        <div className="container-custom text-center">
          <div className="w-12 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h2 className="font-display font-bold text-3xl text-white mb-4">Ready to find the right pump?</h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">Contact our team and we'll guide you to the best MAXBE pump for your application.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-brand-green font-bold px-8 py-3.5 rounded-lg hover:bg-green-50 transition-colors shadow-lg text-base">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
