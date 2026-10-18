import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import { Loader2 } from 'lucide-react'

// Public pages
const HomePage          = lazy(() => import('./pages/HomePage'))
const ProductsPage      = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const AboutPage         = lazy(() => import('./pages/AboutPage'))
const ContactPage       = lazy(() => import('./pages/ContactPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminLayout    = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts  = lazy(() => import('./pages/admin/AdminProducts'))
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'))
const AdminSettings  = lazy(() => import('./pages/admin/AdminSettings'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin" style={{ color: '#dc2626' }} />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <PageLoader />
  if (!isAuthenticated) return <Navigate to="/admin" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public site (with shared Navbar + Footer layout) ───── */}
          <Route element={<Layout />}>
            <Route index                  element={<HomePage />} />
            <Route path="/products"       element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/contact"        element={<ContactPage />} />
          </Route>

          {/* ── Admin login — standalone page, no sidebar ─────────── */}
          <Route path="/admin" element={<AdminLoginPage />} />

          {/* ── Admin dashboard — protected, has its own sidebar layout
                Uses /admin/dashboard, /admin/products, etc.
                Distinct from /admin (login) because these are deeper paths ── */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminDashboard />} />
          </Route>

          <Route
            path="/admin/products"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminProducts />} />
          </Route>

          <Route
            path="/admin/enquiries"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminEnquiries />} />
          </Route>

          <Route
            path="/admin/settings"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminSettings />} />
          </Route>

          {/* ── 404 ───────────────────────────────────────────────── */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
