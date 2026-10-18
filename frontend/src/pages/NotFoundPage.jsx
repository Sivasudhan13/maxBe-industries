import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found — MAXBE PUMPS</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-brand-green flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="font-display font-extrabold text-8xl text-white/10 mb-4 select-none">404</div>
          <h1 className="font-display font-bold text-3xl text-white mb-4">Page Not Found</h1>
          <p className="text-blue-200 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home size={16} /> Go Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
