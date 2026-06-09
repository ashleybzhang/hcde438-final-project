import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Styles from './pages/Styles'
import StyleDetail from './pages/StyleDetail'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import Login from './pages/Login'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/styles" element={<Styles />} />
        <Route path="/styles/:id" element={<StyleDetail />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:id" element={<BrandDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}