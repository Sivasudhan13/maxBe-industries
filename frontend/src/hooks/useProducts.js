/**
 * useProducts — fetches products from the backend API.
 * Falls back to the static products.js data if the API is unreachable
 * (e.g. during local dev without the backend running).
 *
 * Backend products (added via admin) are merged on top of static ones:
 * - If the API returns data, use it exclusively.
 * - If the API fails, use the bundled static list.
 */
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES } from '../data/products'

function normaliseProduct(p) {
  // MongoDB documents use _id; static ones use id. Normalise to slug-based lookup.
  return {
    ...p,
    id:   p._id || p.id,
    slug: p.slug || buildSlug(p.name, p.model),
  }
}

function buildSlug(name = '', model = '') {
  return `${name}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function useProducts() {
  const [products, setProducts] = useState(STATIC_PRODUCTS)
  const [loading, setLoading]   = useState(true)
  const [source, setSource]     = useState('static')   // 'api' | 'static'

  const load = useCallback(async () => {
    setLoading(true)
    try {
      // Public endpoint — returns all active products
      const { data } = await axios.get('/api/products', { timeout: 5000 })
      if (data?.products?.length) {
        setProducts(data.products.map(normaliseProduct))
        setSource('api')
      } else {
        // API returned empty — fall back to static
        setProducts(STATIC_PRODUCTS)
        setSource('static')
      }
    } catch {
      // Backend unreachable — use static bundled data
      setProducts(STATIC_PRODUCTS)
      setSource('static')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { products, loading, source, reload: load }
}

export function useProduct(slug) {
  const { products, loading } = useProducts()
  const product = products.find(p => p.slug === slug) || null
  return { product, loading }
}
