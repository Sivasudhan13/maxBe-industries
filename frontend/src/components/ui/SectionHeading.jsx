import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeading({ label, title, subtitle, light = false, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {label && (
        <span className={`inline-block text-xs font-bold uppercase tracking-[0.2em] mb-3 px-3 py-1 rounded-full ${
          light
            ? 'bg-white/10 text-green-200'
            : 'bg-green-50 text-brand-green border border-green-100'
        }`}>
          {label}
        </span>
      )}
      <h2 className={`section-heading ${light ? '!text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subheading mt-3 ${centered ? 'mx-auto' : ''} ${light ? '!text-gray-300' : ''}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
