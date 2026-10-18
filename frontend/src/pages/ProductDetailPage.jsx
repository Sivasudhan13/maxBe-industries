import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {
  ArrowLeft, ChevronLeft, ChevronRight, Download,
  CheckCircle, Phone, Send, Loader2,
} from 'lucide-react'
import { getProductBySlug, getRelatedProducts, CATEGORIES } from '../data/products'
import { SITE_CONFIG, getProductWhatsAppUrl } from '../data/siteConfig'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'

export default function ProductDetailPage() {
  const { slug }                         = useParams()
  const navigate                         = useNavigate()
  const product                          = getProductBySlug(slug)
  const [activeImg, setActiveImg]        = useState(0)
  const [sending, setSending]            = useState(false)
  const [formData, setFormData]          = useState({ name: '', phone: '', email: '', message: '' })
  const [formErrors, setFormErrors]      = useState({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveImg(0)
  }, [slug])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="font-display font-bold text-3xl text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-6">This product does not exist or has been removed.</p>
        <Link to="/products" className="btn-primary">Browse All Products</Link>
      </div>
    )
  }

  const category  = CATEGORIES.find(c => c.id === product.category)
  const related   = getRelatedProducts(product)
  const waUrl     = getProductWhatsAppUrl(product.name, product.model)
  const images    = product.images?.length ? product.images : []

  function validate() {
    const errors = {}
    if (!formData.name.trim())  errors.name  = 'Name is required'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Invalid email'
    return errors
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) { setFormErrors(errors); return }
    setFormErrors({})
    setSending(true)
    try {
      await axios.post('/api/enquiries', {
        ...formData,
        productInterest: `${product.name} (${product.model})`,
        source:          'product-detail',
      })
      toast.success('Quote request sent! We will contact you shortly.')
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch {
      toast.error('Could not send your request. Please try WhatsApp or call us.')
    } finally {
      setSending(false)
    }
  }

  function handleChange(e) {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
    if (formErrors[e.target.name]) setFormErrors(p => ({ ...p, [e.target.name]: '' }))
  }

  return (
    <>
      <Helmet>
        <title>{product.name} {product.model} — MAXBE PUMPS</title>
        <meta name="description" content={product.shortDesc} />
        <meta property="og:title"       content={`${product.name} ${product.model} — MAXBE PUMPS`} />
        <meta property="og:description" content={product.shortDesc} />
        <meta property="og:image"       content={images[0]} />
        <link rel="canonical" href={`${SITE_CONFIG.siteUrl}/products/${product.slug}`} />
        {/* Product structured data */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type":    "Product",
          "name":     `${product.name} ${product.model}`,
          "description": product.shortDesc,
          "brand": { "@type": "Brand", "name": "MAXBE PUMPS" },
          "image": images,
          "offers": {
            "@type":        "Offer",
            "availability": "https://schema.org/InStock",
            "seller": { "@type": "Organization", "name": "MAXBE PUMPS" },
          },
        })}</script>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 pt-20 md:pt-24" aria-label="Breadcrumb">
        <div className="container-custom py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-brand-green transition-colors">Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-brand-green transition-colors">
            {category?.label}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.model}</span>
        </div>
      </nav>

      <div className="py-12 bg-white">
        <div className="container-custom">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-green text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Gallery */}
            <div>
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-square mb-4 border border-gray-100">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={images[activeImg]}
                  alt={`${product.name} ${product.model} — image ${activeImg + 1}`}
                  className="w-full h-full object-contain p-6"
                  onError={e => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f1f5f9"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="40">🔧</text><text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="%2394a3b8">Add product image</text></svg>'
                  }}
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImg(p => (p - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setActiveImg(p => (p + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      aria-label={`View image ${i + 1}`}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                        activeImg === i ? 'border-brand-green shadow-md' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover"
                        onError={e => { e.currentTarget.style.display = 'none' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="tag mb-3">{category?.icon} {category?.label}</span>
              <h1 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-brand-green font-semibold text-lg mb-4">Model: {product.model}</p>
              <p className="text-gray-600 leading-relaxed mb-7">{product.description}</p>

              {/* Specs */}
              <h2 className="font-display font-bold text-lg text-gray-900 mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex flex-col bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                    <span className="text-xs text-gray-500 font-medium">{key}</span>
                    <span className="text-sm font-semibold text-gray-900">{val}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <h2 className="font-display font-bold text-lg text-gray-900 mb-3">Key Features</h2>
              <ul className="space-y-2 mb-7">
                {product.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={16} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Applications */}
              <h2 className="font-display font-bold text-lg text-gray-900 mb-3">Suitable For</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {product.applications.map(a => (
                  <span key={a} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">{a}</span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 justify-center min-w-[140px]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.524 3.659 1.438 5.168L2 22l4.985-1.417A9.954 9.954 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.5a8.5 8.5 0 110-17 8.5 8.5 0 010 17z"/>
                  </svg>
                  WhatsApp Enquiry
                </a>
                <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline flex-1 justify-center min-w-[140px] text-sm">
                  <Phone size={16} /> Call Us
                </a>
                {product.brochure && (
                  <a href={product.brochure} download className="btn-secondary bg-gray-800 text-sm flex-1 justify-center min-w-[140px]">
                    <Download size={16} /> Brochure
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-3xl p-8 md:p-12 mb-16">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-display font-bold text-2xl text-gray-900 text-center mb-2">Request a Quote</h2>
              <p className="text-gray-500 text-sm text-center mb-8">
                Fill in the form and we'll get back to you with pricing and availability.
              </p>
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name" name="name" type="text"
                      value={formData.name} onChange={handleChange}
                      placeholder="Your name"
                      className={`input-field ${formErrors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      value={formData.phone} onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className={`input-field ${formErrors.phone ? 'border-red-400 focus:ring-red-400' : ''}`}
                      aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                    />
                    {formErrors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">{formErrors.phone}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email (optional)
                  </label>
                  <input
                    id="email" name="email" type="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="your@email.com"
                    className={`input-field ${formErrors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1" role="alert">{formErrors.email}</p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="prd-msg" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message / Requirements
                  </label>
                  <textarea
                    id="prd-msg" name="message" rows={4}
                    value={formData.message} onChange={handleChange}
                    placeholder={`I'm interested in the ${product.model}. Please provide pricing and availability.`}
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3.5 text-base">
                  {sending ? <><Loader2 size={18} className="animate-spin" /> Sending…</> : <><Send size={18} /> Send Quote Request</>}
                </button>
              </form>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <SectionHeading title="Related Products" subtitle="Other pumps from the same category you might be interested in." />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
