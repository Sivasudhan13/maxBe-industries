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
const AdminLoginPage    = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminLayout       = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard    = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts     = lazy(() => import('./pages/admin/AdminProducts'))
const AdminEnquiries    = lazy(() => import('./pages/admin/AdminEnquiries'))
const AdminSettings     = lazy(() => import('./pages/admin/AdminSettings'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-brand-electric animate-spin" />
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
          {/* Public site */}
          <Route element={<Layout />}>
            <Route path="/"               element={<HomePage />} />
            <Route path="/products"       element={<ProductsPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="*"              element={<NotFoundPage />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard"  element={<AdminDashboard />} />
            <Route path="products"   element={<AdminProducts />} />
            <Route path="enquiries"  element={<AdminEnquiries />} />
            <Route path="settings"   element={<AdminSettings />} />
          </Route>
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
