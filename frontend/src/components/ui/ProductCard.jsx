import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { getProductWhatsAppUrl } from '../../data/siteConfig'
import { CATEGORIES } from '../../data/products'

// Inline SVG used when a product image fails to load — no external file needed
function ImgFallback({ name }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50">
      <svg viewBox="0 0 64 64" className="w-16 h-16 opacity-20" fill="none" stroke="#dc2626" strokeWidth="1.5">
        <rect x="4" y="4" width="56" height="56" rx="8"/>
        <circle cx="22" cy="24" r="6"/>
        <path d="M4 44l16-14 10 10 8-8 22 18"/>
      </svg>
      <span className="text-xs text-gray-400 text-center px-4 leading-tight">{name}</span>
    </div>
  )
}

export default function ProductCard({ product, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const category = CATEGORIES.find(c => c.id === product.category)
  const waUrl    = getProductWhatsAppUrl(product.name, product.model)
  const imgSrc   = product.images?.[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="card group overflow-hidden flex flex-col h-full border border-gray-100"
    >
      {/* ── Image ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden aspect-[4/3] bg-white">
        {imgSrc && !imgError ? (
          <img
            src={imgSrc}
            alt={`${product.name} ${product.model}`}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2"
            onError={() => setImgError(true)}
          />
        ) : (
          <ImgFallback name={`${product.name} — ${product.model}`} />
        )}

        {/* Red left accent bar on hover */}
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-red scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />

        {/* Category badge */}
        <span className="absolute top-3 left-4 tag">
          {category?.icon} {category?.label}
        </span>
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <p className="text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
            Model: {product.model}
          </p>
          <h3 className="font-display font-bold text-gray-900 text-lg leading-snug group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
          {product.shortDesc}
        </p>

        {/* Spec highlights */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {['Motor Power', 'Max Head'].map(key => {
            const val = product.specs?.[key]
            if (!val) return null
            return (
              <div key={key} className="bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-400">{key}</p>
                <p className="text-sm font-bold text-gray-800">{val}</p>
              </div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link
            to={`/products/${product.slug}`}
            className="btn-outline flex-1 justify-center text-sm py-2.5 gap-1.5"
          >
            <Eye size={15} />
            View Details
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-1 justify-center text-sm py-2.5"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2 22l4.985-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"/>
            </svg>
            Enquire
          </a>
        </div>
      </div>
    </motion.article>
  )
}
