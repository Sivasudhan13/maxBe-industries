import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ui/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import { PRODUCTS, CATEGORIES } from '../data/products'
import { SITE_CONFIG } from '../data/siteConfig'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery]               = useState('')

  const activeCategory = searchParams.get('category') || 'all'

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat  = activeCategory === 'all' || p.category === activeCategory
      const matchText = !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.model.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(query.toLowerCase())
      return matchCat && matchText
    })
  }, [activeCategory, query])

  function setCategory(cat) {
    if (cat === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <>
      <Helmet>
        <title>Products — MAXBE PUMPS</title>
        <meta name="description" content="Browse MAXBE PUMPS full range of monoblock pumps, open well submersible pumps and V4 submersible pumps for agriculture, residential and industrial applications." />
        <link rel="canonical" href={`${SITE_CONFIG.siteUrl}/products`} />
      </Helmet>

      {/* Page Header */}
      <section className="bg-white border-b border-gray-100 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#16a34a_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-green-100 blur-3xl opacity-60 pointer-events-none" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-brand-green text-xs font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-green" />Complete Range
            </span>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-gray-900 mb-4">
              Product Catalogue
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Premium monoblock, open well submersible and V4 borewell pumps — engineered for every water requirement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 md:top-20 z-40 bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search pumps by name or model..."
                className="input-field pl-10 pr-10 py-2.5 text-sm"
                aria-label="Search products"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 w-full sm:w-auto" role="group" aria-label="Category filters">
              <button
                onClick={() => setCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-brand-electric text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Products
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-brand-electric text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            <p className="text-gray-500 text-sm whitespace-nowrap ml-auto hidden md:block">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 bg-gray-50 min-h-[50vh]" aria-label="Products grid">
        <div className="container-custom">
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" aria-hidden="true" />
              <p className="text-gray-500 text-lg font-medium">No products found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter.</p>
              <button onClick={() => { setQuery(''); setCategory('all') }} className="btn-outline mt-6 text-sm">
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
